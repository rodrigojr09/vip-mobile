import { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import * as Location from "expo-location";
import { VIPEmpresaType } from "@/types/VisitaTecnica/VIPEmpresaType";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import * as FileSystem from "expo-file-system";
import saveOffline from "../Visita/saveOffline";
import { VIPEvento, VIPLocalizacao } from "@/types/VIPEvent";

class Data {
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

	private base_url = __DEV__
		? "http://192.168.3.29:3000/api/v3"
		: "https://mobile.vipsst.com.br/api/v3";
	private base_dir = FileSystem.documentDirectory;

	public async getData() {
		const empresas = await this.getEmpresas();
		const perguntas = await this.getPerguntas();
		await this.syncOfflineEventos(); // sincroniza eventos offline

		if (empresas) this.empresas = empresas;
		if (perguntas) this.perguntas = perguntas;

		return (this.loading = false);
	}

	public async getEmpresas(): Promise<VIPEmpresaType[]> {
		console.log("🔎 | Buscando empresas...");
		const response = await fetch(this.base_url + "/empresas");
		if (!response.ok) {
			console.error(`❌ | Erro ao buscar empresas: ${response.status}`);
			return (this.empresas = await this.getJson(
				this.paths.offline_empresas
			));
		} else {
			console.log("✅ | Empresas buscadas com sucesso.");
			const empresas = await response.json();
			this.saveJson(
				this.paths.offline_empresas,
				JSON.stringify(empresas)
			);
			return (this.empresas = empresas);
		}
	}

	public async getPerguntas(): Promise<VIPVisitaType["perguntas"]> {
		console.log("🔎 | Buscando perguntas...");
		const response = await fetch(this.base_url + "/perguntas");
		if (!response.ok) {
			console.error(`❌ | Erro ao buscar perguntas: ${response.status}`);
			return (this.perguntas = await this.getJson(
				this.paths.offline_perguntas
			));
		} else {
			console.log("✅ | Perguntas buscadas com sucesso.");
			const perguntas = await response.json();
			this.saveJson(
				this.paths.offline_perguntas,
				JSON.stringify({
					adm: perguntas.questionsAdm,
					setor: perguntas.questionsSetor,
				})
			);
			return (this.perguntas = {
				adm: perguntas.questionsAdm,
				setor: perguntas.questionsSetor,
			});
		}
	}

	private async saveJson(arquivo: string, data: string) {
		const path = `${this.base_dir}${arquivo}`;
		console.log(`📝 | Salvando dados em: ${path}`);
		await FileSystem.writeAsStringAsync(path, data);
		console.log(`✅ | Arquivo salvo localmente em: ${path}`);
	}

	private async getJson(arquivo: string) {
		const path = `${this.base_dir}${arquivo}`;
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
			const res = await fetch(this.base_url + "/visitas", {
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
						: visita
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

	async getCurrentLocation(): Promise<VIPLocalizacao | undefined> {
		try {
			const { status } =
				await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.warn("Permissão de localização negada");
				return undefined;
			}

			const location = await Location.getCurrentPositionAsync({
				accuracy: Location.Accuracy.High,
			});

			return {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			};
		} catch (error) {
			console.error("Erro ao obter localização:", error);
			return undefined;
		}
	}

	async sendEvent(evento: string) {
		const agora = new Date();
		const data =
			agora.getDate() +
			"/" +
			(agora.getMonth() + 1) +
			"/" +
			agora.getFullYear();
		const hora =
			agora.getHours() +
			":" +
			agora.getMinutes() +
			":" +
			agora.getSeconds();

		const novoEvento: VIPEvento = {
			id: uuidv4(),
			data,
			hora,
			msg: evento,
			localizacao: await this.getCurrentLocation(),
		};

		try {
			const res = await fetch(this.base_url + "/eventos/send", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(novoEvento),
			});
			if (res.ok) return true;
			else throw new Error("Falha ao enviar para API");
		} catch (e) {
			console.warn("⚠️ Evento salvo offline:", novoEvento.msg);
			await this.saveOfflineEvento(novoEvento);
			return false;
		}
	}

	private async saveOfflineEvento(evento: VIPEvento) {
		const path = this.base_dir + this.paths.offline_eventos;
		let eventosSalvos: VIPEvento[] = [];

		try {
			const fileInfo = await FileSystem.getInfoAsync(path);
			if (fileInfo.exists) {
				const content = await FileSystem.readAsStringAsync(path);
				eventosSalvos = JSON.parse(content);
			}
		} catch (e) {
			console.warn("Não foi possível ler eventos offline:", e);
		}

		eventosSalvos.push(evento);

		await FileSystem.writeAsStringAsync(
			path,
			JSON.stringify(eventosSalvos),
			{ encoding: FileSystem.EncodingType.UTF8 }
		);

		console.log("📦 Evento salvo offline:", evento.msg);
	}

	private async syncOfflineEventos() {
		const path = this.base_dir + this.paths.offline_eventos;
		try {
			const fileInfo = await FileSystem.getInfoAsync(path);
			if (!fileInfo.exists) return;

			const content = await FileSystem.readAsStringAsync(path);
			const eventos: VIPEvento[] = JSON.parse(content);

			if (eventos.length === 0) return;

			const enviado = await this.setEventos(eventos);

			if (enviado) {
				await FileSystem.deleteAsync(path);
				console.log("✅ Eventos offline sincronizados com sucesso.");
			} else {
				console.warn("⚠️ Falha ao sincronizar eventos offline.");
			}
		} catch (e) {
			console.error("❌ Erro ao sincronizar eventos offline:", e);
		}
	}

	async setEventos(eventos: VIPEvento[]) {
		try {
			const res = await fetch(this.base_url + "/eventos/set", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(eventos),
			});
			if (res.ok) return true;
			else return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	}
}

export default new Data();
