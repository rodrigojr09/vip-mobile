import AsyncStorage from "@react-native-async-storage/async-storage";
import type { VIPEmpresaType as LevantamentoVIPEmpresaType } from "@/types/Levantamento/VIPEmpresaType";
import type { VIPFuncaoType } from "@/types/Levantamento/VIPFuncaoType";
import type { VIPSetorType } from "@/types/Levantamento/VIPSetorType";
import type { VIPEvento } from "@/types/VIPEvent";
import type { VIPEmpresaType } from "@/types/VisitaTecnica/VIPEmpresaType";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";

export default class Storage {
	private keys = {
		EMPRESAS_KEY: "@vip:empresas",
		PERGUNTAS_KEY: "@vip:perguntas",
		LEVANTAMENTOS_KEY: "@vip:levantamentos",
		VISITAS_KEY: "@vip:visitas",
		EVENTOS_KEY: "@vip:eventos",
	};

	public empresas: VIPEmpresaType[] = [];
	public perguntas: VIPVisitaType["perguntas"] = { adm: [], setor: [] };

	static base_url = __DEV__
		? "http://192.168.3.29:3000/api/v3"
		: "https://mobile.vipsst.com.br/api/v3";

	async init() {
		try {
			console.log("🔄 Iniciando carregamento de dados...");

			// Fetch empresas
			console.log("🌐 Buscando empresas da API...");
			const res_empresas = await fetch(`${Storage.base_url}/empresas`);
			if (res_empresas.ok) {
				const empresas = await res_empresas.json();
				this.empresas = empresas;
				console.log(`✅ Empresas carregadas da API: ${empresas.length} itens`);
				await this.save(this.keys.EMPRESAS_KEY, JSON.stringify(empresas));
				console.log("💾 Empresas salvas no storage local");
			} else {
				console.warn(
					`⚠️ Falha ao carregar empresas da API (status: ${res_empresas.status}). Carregando do storage local...`,
				);
				const storedEmpresas = await this.get(this.keys.EMPRESAS_KEY);
				this.empresas = JSON.parse(storedEmpresas || "[]");
				console.log(
					`💾 Empresas carregadas do storage local: ${this.empresas.length} itens`,
				);
			}

			// Fetch perguntas
			console.log("🌐 Buscando perguntas da API...");
			const res_perguntas = await fetch(`${Storage.base_url}/perguntas`);
			if (res_perguntas.ok) {
				const perguntas = await res_perguntas.json();
				this.perguntas = {
					adm: perguntas.questionsAdm,
					setor: perguntas.questionsSetor,
				};
				console.log(
					`✅ Perguntas carregadas da API: adm=${perguntas.questionsAdm.length}, setor=${perguntas.questionsSetor.length}`,
				);
				await this.save(
					this.keys.PERGUNTAS_KEY,
					JSON.stringify({
						adm: perguntas.questionsAdm,
						setor: perguntas.questionsSetor,
					}),
				);
				console.log("💾 Perguntas salvas no storage local");
			} else {
				console.warn(
					`⚠️ Falha ao carregar perguntas da API (status: ${res_perguntas.status}). Carregando do storage local...`,
				);
				const storedPerguntas = await this.get(this.keys.PERGUNTAS_KEY);
				this.perguntas = JSON.parse(storedPerguntas || "{}");
				console.log(
					`💾 Perguntas carregadas do storage local: adm=${this.perguntas.adm?.length || 0}, setor=${this.perguntas.setor?.length || 0}`,
				);
			}

			console.log("🎯 Carregamento de dados concluído com sucesso!");
		} catch (error) {
			console.error("❌ Erro ao inicializar dados:", error);
		}
	}

	async addVisita(visita: VIPVisitaType) {
		const visitas = JSON.parse(
			(await this.get(this.keys.VISITAS_KEY)) || "[]",
		) as VIPVisitaType[];
		visitas.push(visita);
		await this.save(this.keys.VISITAS_KEY, JSON.stringify(visitas));
	}

	async addEvento(evento: VIPEvento) {
		const eventos = JSON.parse(
			(await this.get(this.keys.EVENTOS_KEY)) || "[]",
		) as any[];
		eventos.push(evento);
		await this.save(this.keys.EVENTOS_KEY, JSON.stringify(eventos));
	}

	async getEventos(): Promise<string | null> {
		return this.get(this.keys.EVENTOS_KEY);
	}

	async clearEventos() {
		await this.save(this.keys.EVENTOS_KEY, JSON.stringify([]));
	}

	async clearVisitas() {
		await this.save(this.keys.VISITAS_KEY, JSON.stringify([]));
	}

	async saveLevantamento(levantamento: {
		empresa: LevantamentoVIPEmpresaType;
		setor?: VIPSetorType | null;
		funcao?: VIPFuncaoType | null;
	}) {
		if (!levantamento.empresa.id) {
			console.log("⚠️ ID vazio, não salvando levantamento");
			return;
		}

		const raw = (await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]";
		const levantamentos = JSON.parse(raw) as {
			empresa: LevantamentoVIPEmpresaType;
		}[];

		// Encontra o índice da empresa existente
		const indexEmpresa = levantamentos.findIndex(
			(l) => l.empresa.id === levantamento.empresa.id,
		);

		if (indexEmpresa !== -1) {
			// Empresa já existe -> atualiza parcialmente
			const empresaExistente = levantamentos[indexEmpresa].empresa;
			let empresaAtualizada: LevantamentoVIPEmpresaType = {
				...empresaExistente,
				// mantemos os setores por padrão (serão modificados abaixo se necessário)
				setores:
					empresaExistente.setores?.map((s) => ({
						...s,
						funcoes: (s.funcoes || []).filter(
							(f: VIPFuncaoType) => f.nome?.trim() !== "",
						),
					})) ?? [],
			};

			// 1) Atualização de função (caso venha funcao)
			if (levantamento.funcao) {
				// tenta localizar setor alvo: preferencialmente pelo setor enviado, senão procura setor que contenha a função
				let setorIndex = -1;
				if (levantamento.setor?.id) {
					setorIndex = empresaAtualizada.setores.findIndex(
						(s) => s.id === levantamento.setor!.id,
					);
				}
				if (setorIndex === -1) {
					// procura setor que contenha a função pelo id
					setorIndex = empresaAtualizada.setores.findIndex((s) =>
						(s.funcoes || []).some(
							(f: VIPFuncaoType) => f.id === levantamento.funcao!.id,
						),
					);
				}

				// Se encontrar o setor, atualiza a função dentro dele
				if (setorIndex !== -1) {
					empresaAtualizada.setores = empresaAtualizada.setores.map((s, si) => {
						if (si !== setorIndex) return s;
						return {
							...s,
							funcoes: (s.funcoes || []).map((f: VIPFuncaoType) =>
								f.id === levantamento.funcao!.id
									? { ...levantamento.funcao! }
									: f,
							),
						};
					});
				} else if (levantamento.setor) {
					// Não encontrou setor, mas setor foi enviado: adiciona setor (com funcoes filtradas)
					const novoSetor: VIPSetorType = {
						...levantamento.setor,
						funcoes: (levantamento.setor.funcoes || []).filter(
							(f) => f.nome?.trim() !== "",
						),
					};
					empresaAtualizada.setores = [...empresaAtualizada.setores, novoSetor];
					// garante que, se funcao existe dentro do setor enviado, ela esteja atualizada
				} else {
					// Não encontramos setor e nem foi enviado setor: log e não aplicamos alteração
					console.warn(
						"⚠️ Tentativa de atualizar função, mas setor não foi localizado e não foi enviado.",
					);
				}
			}
			// 2) Atualização de setor (quando sector enviado e funcao não enviada)
			else if (levantamento.setor) {
				const setorId = levantamento.setor.id;
				const encontrado = empresaAtualizada.setores.some(
					(s) => s.id === setorId,
				);

				const setorAtualizado: VIPSetorType = {
					...levantamento.setor,
					funcoes: (levantamento.setor.funcoes || []).filter(
						(f) => f.nome?.trim() !== "",
					),
				};

				if (encontrado) {
					empresaAtualizada.setores = empresaAtualizada.setores.map((s) =>
						s.id === setorId ? setorAtualizado : s,
					);
				} else {
					// se não existir, adiciona como novo setor
					empresaAtualizada.setores = [
						...empresaAtualizada.setores,
						setorAtualizado,
					];
				}
			}
			// 3) Atualização apenas da empresa (sem setor/funcao)
			else {
				// mescla campos gerais da empresa (preservando setores já limpos acima)
				empresaAtualizada = {
					...empresaAtualizada,
					...levantamento.empresa,
					// garante funcoes limpas (já aplicadas na criação de empresaAtualizada inicial)
				};
			}

			// grava de volta no array
			levantamentos[indexEmpresa] = { empresa: empresaAtualizada };
		} else {
			// Empresa não existe -> criar nova (filtrando funcoes vazias)
			const novaEmpresa: LevantamentoVIPEmpresaType = {
				...levantamento.empresa,
				setores:
					(levantamento.empresa.setores || []).map((s) => ({
						...s,
						funcoes: (s.funcoes || []).filter((f:VIPFuncaoType) => f.nome?.trim() !== ""),
					})) || [],
			};
			levantamentos.push({ empresa: novaEmpresa });
		}

		// Salva no storage
		await this.save(this.keys.LEVANTAMENTOS_KEY, JSON.stringify(levantamentos));
		console.log("✅ Levantamento salvo com sucesso!");
	}

	async getLevantamentos(): Promise<string | null> {
		return this.get(this.keys.LEVANTAMENTOS_KEY);
	}

	async clearLevantamentos() {
		await this.save(this.keys.LEVANTAMENTOS_KEY, JSON.stringify([]));
	}

	async deleteLevantamento(id: string) {
		const levantamentos = JSON.parse(
			(await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]",
		) as { empresa: LevantamentoVIPEmpresaType }[];
		const filtered = levantamentos.filter((l) => l.empresa.id !== id);
		await this.save(this.keys.LEVANTAMENTOS_KEY, JSON.stringify(filtered));
		return true;
	}

	async getLevantamento(
		id: string,
	): Promise<LevantamentoVIPEmpresaType | null> {
		const levantamentos = JSON.parse(
			(await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]",
		) as { empresa: LevantamentoVIPEmpresaType }[];
		const found = levantamentos.find((l) => l.empresa.id === id);
		return found ? found.empresa : null;
	}

	private async save(key: string, value: string) {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			console.error("Error saving data", e);
		}
	}

	private async get(key: string): Promise<string | null> {
		try {
			const value = await AsyncStorage.getItem(key);
			return value;
		} catch (e) {
			console.error("Error reading data", e);
			return null;
		}
	}
}

export const storage = new Storage();
