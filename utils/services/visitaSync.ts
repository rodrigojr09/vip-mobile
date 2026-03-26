import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import manager from "@/utils/Data/manager";
import Storage from "@/utils/Storage";
import { logger } from "@/utils/logger";

async function syncSingleVisita(visita: VIPVisitaType): Promise<boolean> {
	if (!visita.id || !visita.assinatura) return false;

	try {
		const response = await fetch(`${Storage.base_url}/visitas/${visita.id}`);

		if (response.status === 404) {
			const created = await manager.visitas.create(visita);
			if (created !== true) {
				logger.warn("VisitaSync", `Visita ${visita.id} not synced`, created);
				return false;
			}
		} else if (!response.ok) {
			logger.warn(
				"VisitaSync",
				`Failed to check visita ${visita.id}`,
				response.status,
			);
			return false;
		}

		await manager.visitas.delete(visita.id);
		return true;
	} catch (error) {
		logger.warn("VisitaSync", `Failed to sync visita ${visita.id}`, error);
		return false;
	}
}

export async function syncOfflineVisitas(): Promise<{
	total: number;
	synced: number;
}> {
	try {
		const storedVisitas = await manager.visitas.getAll();
		if (!storedVisitas.length) return { total: 0, synced: 0 };

		let synced = 0;
		for (const visita of storedVisitas) {
			if (await syncSingleVisita(visita)) synced += 1;
		}

		return { total: storedVisitas.length, synced };
	} catch (error) {
		logger.error("VisitaSync", "Failed to read stored visitas", error);
		return { total: 0, synced: 0 };
	}
}
