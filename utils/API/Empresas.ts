import * as FileSystem from "expo-file-system";
import base_url from "./base_url";

const DEFAULT_EMPRESAS_FILE = FileSystem.documentDirectory + "/empresas.json";

export async function Empresas() {
	const response = await fetch(base_url + "/api/empresas");
	const empresas = await response.json();
	return empresas;
}

interface Visita {
	acompanhante: string;
	data: string;
	id: string;
	empresaId: string;
	perguntas: any[];
	respostas: any[];
	visitante: string;
	assinatura?: string;
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

export async function NovaVisita(visita: Visita) {
	const response = await fetch(base_url + "/api/visitas", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(visita),
	});
	return response.json();
}
