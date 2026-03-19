import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import { events } from "@/utils/API/Event";
import manager from "@/utils/Data/manager";

export interface FinalizedVisitLink {
	id: string;
	empresa: string;
	token: string;
}

type SaveMode = "junto" | "separado";

function getHoraSaida() {
	const agora = new Date();
	const hora = agora.getHours().toString().padStart(2, "0");
	const minutos = agora.getMinutes().toString().padStart(2, "0");
	return `${hora}:${minutos}`;
}

function buildStoredVisita(
	visita: VIPVisitaType,
	assinatura: string,
	horaSaida: string,
): VIPVisitaType {
	return {
		empresa: visita.empresa,
		inclusas: visita.inclusas,
		id: visita.id,
		data: visita.data,
		tecnico: visita.tecnico,
		responsavel: visita.responsavel,
		perguntas: visita.perguntas,
		respostas: visita.respostas,
		horaEntrada: visita.horaEntrada,
		setores: visita.setores,
		assinatura,
		horaSaida,
		empresas: [],
	};
}

async function persistVisita(
	visita: VIPVisitaType,
	assinatura: string,
	horaSaida: string,
): Promise<FinalizedVisitLink> {
	const visitToCreate: VIPVisitaType = {
		...visita,
		horaSaida,
		assinatura,
	};

	const result = await manager.visitas.create(visitToCreate);
	await manager.visitas.salvar(buildStoredVisita(visitToCreate, assinatura, horaSaida));

	return {
		id: visitToCreate.id,
		empresa: visitToCreate.empresa?.razao_social || "N/D",
		token: result === "offline" ? "offline" : visitToCreate.empresa?.token || "offline",
	};
}

export async function finalizeVisita(
	visita: VIPVisitaType,
	assinatura: string,
	saveMode: SaveMode = "junto",
) {
	const msg = `Finalização da visita - Empresa: ${
		visita.empresa?.razao_social || "N/D"
	}, Técnico: ${visita.tecnico || "N/D"}, Responsável: ${
		visita.responsavel || "N/D"
	}`;

	events.sendEvent(msg);
	events.endEvent();

	const horaSaida = getHoraSaida();

	if (saveMode === "separado") {
		const payloads: VIPVisitaType[] = [
			{
				...visita,
				id: visita.id,
				empresa: visita.empresa,
				inclusas: [],
			},
			...visita.inclusas.map(({ id, empresa }) => ({
				...visita,
				id,
				empresa,
				inclusas: [],
			})),
		];

		return Promise.all(
			payloads.map((item) => persistVisita(item, assinatura, horaSaida)),
		);
	}

	return [await persistVisita(visita, assinatura, horaSaida)];
}
