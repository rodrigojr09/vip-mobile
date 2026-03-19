import * as ScreenOrientation from "expo-screen-orientation";
import type { VIPEmpresaType } from "@/types/Levantamento/VIPEmpresaType";
import { events } from "@/utils/API/Event";
import manager from "@/utils/Data/manager";
import { getHtml } from "@/utils/formatHTML";
import { writeHtmlReport } from "./reportFile";

export async function finalizeLevantamento(
	empresa: VIPEmpresaType,
	assinatura: string,
) {
	await ScreenOrientation.lockAsync(
		ScreenOrientation.OrientationLock.PORTRAIT_UP,
	);

	const mensagem = `Finalização da visita - Empresa: ${empresa.nome}, Responsável: ${empresa.responsavel}`;
	events.sendEvent(mensagem);
	events.endEvent();

	const htmlContent = getHtml(empresa)
		.replace("$assinatura", assinatura)
		.replace("not-assinatura", "");

	const fileUri = await writeHtmlReport(
		`Levantamento-${empresa.nome}.html`,
		htmlContent,
	);

	await manager.levantamentos.salvar({
		empresa: {
			...empresa,
			assinatura,
		},
	});

	return { fileUri };
}
