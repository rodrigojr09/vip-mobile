import * as FileSystem from "expo-file-system";
import * as Network from "expo-network";
import type { VIPEmpresaType } from "@/types/VisitaTecnica/VIPEmpresaType";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import "react-native-get-random-values";
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
	public perguntas: VIPVisitaType["perguntas"] = {
		adm: [],
		setor: [],
	};

	private loading = true;

	static base_url = __DEV__
		? "http://192.168.3.40:3000/api/v3"
		: "https://mobile.vipsst.com.br/api/v3";
	static base_dir = FileSystem.documentDirectory;

	public async getData() {
		const empresas = await this.getEmpresas();
		const perguntas = await this.getPerguntas();
		await events.syncOfflineEventos(); // sincroniza eventos offline

		if (empresas) this.empresas = empresas;
		if (perguntas) this.perguntas = perguntas;

		this.loading = false;
		return this.loading;
	}

	public async getEmpresas(): Promise<VIPEmpresaType[]> {
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

	public async getPerguntas(): Promise<VIPVisitaType["perguntas"]> {
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

	private async saveJson(arquivo: string, data: string) {
		const path = `${Data.base_dir}${arquivo}`;
		console.log(`📝 | Salvando dados em: ${path}`);
		await FileSystem.writeAsStringAsync(path, data);
		console.log(`✅ | Arquivo salvo localmente em: ${path}`);
	}

	private async getJson(arquivo: string) {
		const path = `${Data.base_dir}${arquivo}`;
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
				headers: {
					"Content-Type": "application/json",
				},
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
}

const data = new Data();

export default data;
