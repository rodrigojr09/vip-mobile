import * as FileSystem from "expo-file-system/legacy";
import type { VisitaType } from "@/types/Visita";
import manager from "../Data/manager";

const base_dir = `${FileSystem.documentDirectory}offline_visitas/`;

export default async function saveOffline(visita: VisitaType) {
    try {
        // Define o caminho interno
        const perguntas = manager.visitas.perguntas;
        const filePath = `${base_dir + visita.id}.json`;

        const jsonData = JSON.stringify({
            id: visita.id,
            empresaId: visita.empresa?.id,
            responsavel: visita.responsavel,
            tecnico: visita.tecnico,
            data: visita.data,
            horaEntrada: visita.horaEntrada,
            horaSaida: visita.horaSaida,
            perguntas: perguntas,
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
