import * as FileSystem from "expo-file-system";

export const quest_file = FileSystem.documentDirectory + "quests.json";

// Busca as quests da API e salva no arquivo local
export async function fetchQuests() {
	try {
		const response = await fetch("http://192.168.0.15:3000/api/quests");
		if (!response.ok) {
			throw new Error(`Erro HTTP: ${response.status}`);
		}

		const data = await response.json();
		await FileSystem.writeAsStringAsync(quest_file, JSON.stringify(data));
		console.log("Quests fetched e salvas com sucesso.");
	} catch (error: any) {
		console.error(
			"Erro ao buscar ou salvar quests:",
			error.message || error
		);
	}
}

// Lê as quests salvas localmente
export async function getQuests() {
	try {
		const fileInfo = await FileSystem.getInfoAsync(quest_file);

		if (!fileInfo.exists) {
			console.warn("Arquivo de quests não encontrado.");
			return null;
		}

		const content = await FileSystem.readAsStringAsync(quest_file);
		return JSON.parse(content);
	} catch (error: any) {
		console.error("Erro ao ler quests:", error.message || error);
		return null;
	}
}
