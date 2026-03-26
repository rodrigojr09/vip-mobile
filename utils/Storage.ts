import AsyncStorage from "@react-native-async-storage/async-storage";
import type { VIPEmpresaType } from "@/types/VisitaTecnica/VIPEmpresaType";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";

export default class Storage {
	public keys = {
		EMPRESAS_KEY: "@vip:empresas",
		PERGUNTAS_KEY: "@vip:perguntas",
		LEVANTAMENTOS_KEY: "@vip:levantamentos",
		VISITAS_KEY: "@vip:visitas",
		EVENTOS_KEY: "@vip:eventos",
		QUESTS_KEY: "@vip:quests",
	} as const;

	public empresas: VIPEmpresaType[] = [];
	public perguntas: VIPVisitaType["perguntas"] = { adm: [], setor: [] };

	static base_url = __DEV__
		? "http://192.168.3.66:3000/api/v3"
		: "https://vip-admin.vercel.app/api/v3";

	constructor() {
		console.log("Storage base inicializado");
	}

	private isStorageFullError(error: unknown) {
		const message =
			typeof error === "object" && error !== null && "message" in error
				? String((error as { message?: unknown }).message)
				: String(error);
		return (
			message.includes("SQLITE_FULL") ||
			message.includes("database or disk is full")
		);
	}

	private async tryFreeSpace() {
		try {
			await AsyncStorage.removeItem(this.keys.QUESTS_KEY);
		} catch (e) {
			console.error("Erro ao limpar cache de quests:", e);
		}

		try {
			const rawEvents = await AsyncStorage.getItem(this.keys.EVENTOS_KEY);
			if (!rawEvents) return;

			let parsed: unknown = null;
			try {
				parsed = JSON.parse(rawEvents);
			} catch {
				await AsyncStorage.removeItem(this.keys.EVENTOS_KEY);
				return;
			}

			if (Array.isArray(parsed) && parsed.length > 200) {
				const trimmed = parsed.slice(-200);
				await AsyncStorage.setItem(
					this.keys.EVENTOS_KEY,
					JSON.stringify(trimmed),
				);
			} else {
				await AsyncStorage.removeItem(this.keys.EVENTOS_KEY);
			}
		} catch (e) {
			console.error("Erro ao liberar espaco no AsyncStorage:", e);
		}
	}

	async save(key: string, value: string): Promise<void> {
		try {
			await AsyncStorage.setItem(key, value);
		} catch (e) {
			if (this.isStorageFullError(e)) {
				console.warn(
					`AsyncStorage cheio. Tentando liberar espaco para salvar ${key}...`,
				);
				await this.tryFreeSpace();
				try {
					await AsyncStorage.setItem(key, value);
					return;
				} catch (retryError) {
					console.error(`Erro ao salvar dados em ${key}:`, retryError);
					return;
				}
			}
			console.error(`Erro ao salvar dados em ${key}:`, e);
		}
	}

	async get(key: string): Promise<string | null> {
		try {
			const value = await AsyncStorage.getItem(key);
			return value;
		} catch (e) {
			console.error(`Erro ao ler dados de ${key}:`, e);
			return null;
		}
	}

	async remove(key: string): Promise<void> {
		try {
			await AsyncStorage.removeItem(key);
		} catch (e) {
			console.error(`Erro ao remover ${key}:`, e);
		}
	}

	static async clearAll(): Promise<void> {
		try {
			await AsyncStorage.clear();
			console.log("Todos os dados locais foram apagados!");
		} catch (e) {
			console.error("Erro ao limpar o AsyncStorage:", e);
		}
	}
}
