import * as FileSystem from "expo-file-system";
import base_url from "./base_url";

const DEFAULT_QUEST_FILE = FileSystem.documentDirectory + "/quests.json";

/**
 * Busca as quests da API e salva localmente no arquivo.
 * @param filePath Caminho opcional do arquivo para salvar.
 */
export async function fetchQuests(filePath = DEFAULT_QUEST_FILE) {
	try {
		const response = await fetch(base_url + "/api/quests");

		if (!response.ok) {
			throw new Error(`Erro HTTP: ${response.status}`);
		}

		const quests = await response.json();
		await FileSystem.writeAsStringAsync(filePath, JSON.stringify(quests));
		console.log(`✅ Quests salvas com sucesso em: ${filePath}`);
	} catch (error: any) {
		console.error(
			"❌ Falha ao buscar/salvar quests:",
			error.message || error
		);
	}
}

/**
 * Lê as quests armazenadas localmente.
 * @param filePath Caminho opcional do arquivo a ser lido.
 * @returns Lista de quests ou null se não encontrado ou erro.
 */
export async function getQuests(filePath = DEFAULT_QUEST_FILE) {
	try {
		const fileInfo = await FileSystem.getInfoAsync(filePath);

		if (!fileInfo.exists) {
			console.warn("⚠️ Arquivo de quests não encontrado.");
			return null;
		}
		const content = await FileSystem.readAsStringAsync(filePath);
		console.log(`✅ Quests lidas com sucesso em: ${filePath}`);
		return JSON.parse(content);
	} catch (error: any) {
		console.error("❌ Erro ao ler quests:", error.message || error);
		return null;
	}
}
