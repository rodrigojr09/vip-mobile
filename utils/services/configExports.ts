import manager from "@/utils/Data/manager";
import { getHtml } from "@/utils/formatHTML";
import { getHtmlVisita } from "@/utils/Visita/formatHTML";
import { shareReport, writeHtmlReport } from "./reportFile";

export async function exportLevantamentoReport(id: string) {
	const empresa = await manager.levantamentos.getById(id);

	if (!empresa) {
		return null;
	}

	const htmlContent = getHtml(empresa)
		.replace("$assinatura", empresa.assinatura || "")
		.replace("not-assinatura", "");

	const fileUri = await writeHtmlReport(
		`Levantamento-${empresa.nome}.html`,
		htmlContent,
	);

	await shareReport(fileUri);
	return fileUri;
}

export async function exportVisitaReport(id: string) {
	const visita = await manager.visitas.getById(id);

	if (!visita) {
		return null;
	}

	const htmlContent = getHtmlVisita(visita)
		.replace("$assinatura", visita.assinatura || "")
		.replace("not-assinatura", "");

	const fileUri = await writeHtmlReport(
		`Visita - ${visita.empresa?.razao_social}.html`,
		htmlContent,
	);

	await shareReport(fileUri);
	return fileUri;
}
