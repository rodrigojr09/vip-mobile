import * as FileSystem from "expo-file-system/legacy";
import { Data } from "./Data";

const DEFAULT_QUEST_FILE = `${FileSystem.documentDirectory}/quests.json`;

/**
 * Busca as quests da API, salva localmente e exporta para galeria.
 * @param filePath Caminho do arquivo local opcional
 */
export async function fetchQuests(filePath = DEFAULT_QUEST_FILE) {
    try {
        const response = await fetch(`${Data.base_url}/api/quests`);

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const quests = await response.json();

        const jsonContent = JSON.stringify(quests, null, 2);

        await FileSystem.writeAsStringAsync(filePath, jsonContent);
        console.log(`✅ Quests salvas localmente em: ${filePath}`);
    } catch (error: any) {
        console.error("❌ Erro ao buscar/salvar quests:", error.message || error);
    }
}

/**
 * Lê as quests armazenadas localmente.
 * @param filePath Caminho do arquivo local opcional
 * @returns Lista de quests ou null
 */
export async function getQuests(filePath = DEFAULT_QUEST_FILE) {
    try {
        const content = await FileSystem.readAsStringAsync(filePath);
        console.log(`✅ Quests lidas com sucesso em: ${filePath}`);
        return JSON.parse(content);
    } catch (error: any) {
        console.error("❌ Erro ao ler quests:", error.message || error);
        return null;
    }
}
