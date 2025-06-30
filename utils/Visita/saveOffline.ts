import { Visita } from "@/types/VIPVisitaType";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

const base_dir = FileSystem.documentDirectory + "offline_visitas/";

export default async function saveOffline(visita: Visita) {
	try {
		// Define o caminho interno
		const filePath = base_dir + visita.id + ".json";

		const jsonData = JSON.stringify(visita);

		// 1. Salva localmente (sandbox)
		await FileSystem.writeAsStringAsync(filePath, jsonData);
		console.log("✅ Visita salva localmente:", filePath);

		return "offline";
	} catch (err: any) {
		console.error("❌ Erro ao salvar visita offline:", err.message || err);
		return "erro";
	}
}
