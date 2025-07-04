import * as FileSystem from "expo-file-system";
import * as Network from "expo-network";
import base_url from "./base_url";
import saveOffline from "../VisitaTecnica/saveOffline";
import { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";

const DEFAULT_EMPRESAS_FILE = FileSystem.documentDirectory + "empresas.json";

export async function Empresas() {
	const response = await fetch(base_url + "/api/empresas");
	const empresas = await response.json();
	return empresas;
}

/**
 * Busca as empresas da API e salva localmente no arquivo.
 * @param filePath Caminho opcional do arquivo para salvar.
 */
export async function fetchEmpresas(filePath = DEFAULT_EMPRESAS_FILE) {
	try {
		const response = await fetch(base_url + "/api/empresas");

		if (!response.ok) {
			throw new Error(`Erro HTTP: ${response.status}`);
		}

		const empresas = await response.json();
		await FileSystem.writeAsStringAsync(filePath, JSON.stringify(empresas));
		console.log(`✅ Empresas salvas com sucesso em: ${filePath}`);
	} catch (error: any) {
		console.error(
			"❌ Falha ao buscar/salvar empresas:",
			error.message || error
		);
	}
}

/**
 * Lê as empresas armazenadas localmente.
 * @param filePath Caminho opcional do arquivo a ser lido.
 * @returns Lista de empresas ou null se não encontrado ou erro.
 */
export async function getEmpresas(filePath = DEFAULT_EMPRESAS_FILE) {
	try {
		const fileInfo = await FileSystem.getInfoAsync(filePath);

		if (!fileInfo.exists) {
			console.warn("⚠️ Arquivo de empresas não encontrado.");
			return null;
		}

		const content = await FileSystem.readAsStringAsync(filePath);
		console.log(`✅ Empresas lidas com sucesso em: ${filePath}`);
		return JSON.parse(content);
	} catch (error: any) {
		console.error("❌ Erro ao ler empresas:", error.message || error);
		return null;
	}
}

export async function NovaVisita(visita: VIPVisitaType, offline: boolean) {
	const status = await Network.getNetworkStateAsync();
	if (status.isConnected && status.isInternetReachable) {
		const response = await fetch(base_url + "/api/visitas", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				id: visita.id,
				data: visita.data,
				empresa_id: visita.empresa?.id,
				tecnico: visita.tecnico,
				responsavel: visita.responsavel,
                respostas: visita.respostas,
                assinatura: visita.assinatura
			}),
		});
		console.log(response);
		if (response.ok) return true;
		else if (offline) return saveOffline(visita);
	} else if (offline) return saveOffline(visita);
}
