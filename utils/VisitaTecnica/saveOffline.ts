import { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import * as FileSystem from "expo-file-system";

const base_dir = FileSystem.documentDirectory + "offline_visitas/";

export default async function saveOffline(visita: VIPVisitaType) {
	try {
		// Define o caminho interno
		const filePath = base_dir + visita.id + ".json";

        const jsonData = JSON.stringify({
            id: visita.id,
            data: visita.data,
            empresa: visita.empresa,
            tecnico: visita.tecnico,
            responsavel: visita.responsavel,
            respostas: visita.respostas,
            assinatura: visita.assinatura
        });

		// 1. Salva localmente (sandbox)
		await FileSystem.writeAsStringAsync(filePath, jsonData);
		console.log("✅ Visita salva localmente:", filePath);

		return "offline";
	} catch (err: any) {
		console.error("❌ Erro ao salvar visita offline:", err.message || err);
		return "erro";
	}
}
