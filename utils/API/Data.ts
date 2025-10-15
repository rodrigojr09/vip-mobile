import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system/legacy";
import * as Network from "expo-network";
import { DIRECTORY_KEY } from "@/components/Layout";
import type { VIPEmpresaType } from "@/types/VisitaTecnica/VIPEmpresaType";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import saveOffline from "../Visita/saveOffline";
import { events } from "./Event";

export class Data {
	private paths = {
		empresas: "empresas.json",
		perguntas: "perguntas.json",
		offline_empresas: "offline_empresas.json",
		offline_perguntas: "offline_perguntas.json",
		offline_eventos: "offline_eventos.json",
	};

	public empresas: VIPEmpresaType[] = [];
	public perguntas: VIPVisitaType["perguntas"] = { adm: [], setor: [] };
	private loading = true;
	private safDirUri: string | null = null; // <- guarda pasta pública escolhida

	static base_url = __DEV__
		? "http://192.168.3.29:3000/api/v3"
		: "https://mobile.vipsst.com.br/api/v3";
	static base_dir = FileSystem.documentDirectory;

	async getData() {
		const empresas = await this.getEmpresas();
		const perguntas = await this.getPerguntas();
		await events.syncOfflineEventos();

		if (empresas) this.empresas = empresas;
		if (perguntas) this.perguntas = perguntas;

		this.loading = false;
		return this.loading;
	}

	async getEmpresas(): Promise<VIPEmpresaType[]> {
		console.log("🔎 | Buscando empresas...");
		const network = await Network.getNetworkStateAsync();
		if (!network.isConnected || !network.isInternetReachable) {
			this.empresas = await this.getJson(this.paths.offline_empresas);
		}
		const response = await fetch(`${Data.base_url}/empresas`);
		if (!response.ok) {
			console.error(`❌ | Erro ao buscar empresas: ${response.status}`);
			this.empresas = await this.getJson(this.paths.offline_empresas);
		} else {
			console.log("✅ | Empresas buscadas com sucesso.");
			const empresas = await response.json();
			this.saveJson(this.paths.offline_empresas, JSON.stringify(empresas));
			this.empresas = empresas;
		}
		return this.empresas;
	}

	async getPerguntas(): Promise<VIPVisitaType["perguntas"]> {
		console.log("🔎 | Buscando perguntas...");
		const network = await Network.getNetworkStateAsync();
		if (!network.isConnected || !network.isInternetReachable) {
			this.empresas = await this.getJson(this.paths.offline_empresas);
		}
		const response = await fetch(`${Data.base_url}/perguntas`);
		if (!response.ok) {
			console.error(`❌ | Erro ao buscar perguntas: ${response.status}`);
			this.perguntas = await this.getJson(this.paths.offline_perguntas);
			return this.perguntas;
		} else {
			console.log("✅ | Perguntas buscadas com sucesso.");
			const perguntas = await response.json();
			this.saveJson(
				this.paths.offline_perguntas,
				JSON.stringify({
					adm: perguntas.questionsAdm,
					setor: perguntas.questionsSetor,
				}),
			);
			this.perguntas = {
				adm: perguntas.questionsAdm,
				setor: perguntas.questionsSetor,
			};
			return this.perguntas;
		}
	}

	/** 🔄 Método atualizado: salva JSON em pasta pública (SAF) */
	private async saveJson(arquivo: string, data: string) {
		try {
			if (!this.safDirUri) {
				const dir = await AsyncStorage.getItem(DIRECTORY_KEY);
				this.safDirUri = dir;
			}

			// Agora cria o arquivo
			const created = await (
				FileSystem as any
			).StorageAccessFramework.createFileAsync(
				this.safDirUri,
				arquivo,
				"application/json",
			);

			await FileSystem.writeAsStringAsync(created, data);
			console.log(`✅ Arquivo salvo publicamente em: ${created}`);
		} catch (error) {
			console.error("❌ Erro ao salvar publicamente:", error);
			await this.saveInternal(arquivo, data);
		}
	}

	/** Fallback: salva internamente se SAF falhar */
	private async saveInternal(arquivo: string, data: string) {
		const path = `${FileSystem.documentDirectory}${arquivo}`;
		await FileSystem.writeAsStringAsync(path, data);
		console.log(`💾 (Interno) Arquivo salvo em: ${path}`);
	}

	private async getJson(arquivo: string) {
		const path = `${FileSystem.documentDirectory}${arquivo}`;
		try {
			const fileInfo = await FileSystem.getInfoAsync(path);
			if (!fileInfo.exists) {
				console.warn(`⚠️ | Arquivo ${arquivo} não encontrado.`);
				return null;
			}
			const content = await FileSystem.readAsStringAsync(path);
			console.log(`✅ | Leitura local de ${arquivo} concluída`);
			return JSON.parse(content);
		} catch (error: any) {
			console.error("❌ | Erro ao ler arquivo:", error.message || error);
			return null;
		}
	}

	async createVisita(visita: VIPVisitaType, offline: boolean) {
		console.log(visita);
		try {
			const res = await fetch(`${Data.base_url}/visitas`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(
					offline
						? {
								id: visita.id,
								empresaId: visita.empresa?.id,
								responsavel: visita.responsavel,
								tecnico: visita.tecnico,
								data: visita.data,
								horaEntrada: visita.horaEntrada,
								horaSaida: visita.horaSaida,
								perguntas: visita.perguntas,
								respostas: visita.respostas,
								setores: visita.setores,
								assinatura: visita.assinatura,
							}
						: visita,
				),
			});
			if (res.ok) return true;
			else if (offline) return saveOffline(visita);
			else return false;
		} catch (e) {
			console.error(e);
			if (offline) return saveOffline(visita);
			else return false;
		}
	}

	/** 🔄 Adaptado: salva levantamento em pasta pública */
	public async saveLevantamento(save: any) {
		try {
			if (!save.empresa || !save.empresa.id) {
				console.error(
					"❌ Erro: empresa ou ID da empresa ausente no levantamento.",
				);
				return null;
			}
			if (!this.safDirUri) {
				console.log("tec2 "+DIRECTORY_KEY);
				const dir = await AsyncStorage.getItem(DIRECTORY_KEY);
				console.log("tec2 "+dir);
				this.safDirUri = dir;
			}
			console.log("SAF Directory URI:", this.safDirUri);
			console.log("Saving levantamento for empresa ID:", save.empresa.id);
			const fileUri = await (
				FileSystem as any
			).StorageAccessFramework.createFileAsync(
				this.safDirUri,
				`levantamento-${save.empresa.id}.json`,
				"application/json",
			);

			await FileSystem.writeAsStringAsync(
				fileUri,
				JSON.stringify(save, null, 2),
			);
			console.log(`✅ Levantamento salvo publicamente em: ${fileUri}`);
			return fileUri;
		} catch (error) {
			console.error("❌ Erro ao salvar levantamento:", error);
			return null;
		}
	}
}

const data = new Data();
export default data;
