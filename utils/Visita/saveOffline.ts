import * as FileSystem from "expo-file-system/legacy";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";

const base_dir = `${FileSystem.documentDirectory}offline_visitas/`;

export default async function saveOffline(visita: VIPVisitaType) {
    try {
        // Define o caminho interno
        const filePath = `${base_dir + visita.id}.json`;

        const jsonData = JSON.stringify({
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
