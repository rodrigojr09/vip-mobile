import * as Network from "expo-network";
import { events } from "@/utils/API/Event";
import manager from "@/utils/Data/manager";
import { logger } from "@/utils/logger";
import { syncOfflineVisitas } from "./visitaSync";

type SyncOptions = {
	force?: boolean;
	reason?: string;
};

let syncing = false;
let lastSyncAt = 0;

const MIN_INTERVAL_MS = 30000;

function isOnline(state: Network.NetworkState) {
	return state.isConnected === true && state.isInternetReachable !== false;
}

export async function syncSystemData(options: SyncOptions = {}) {
	if (syncing) {
		logger.debug("Sync", "Sync skipped: already running");
		return false;
	}

	const now = Date.now();
	if (!options.force && now - lastSyncAt < MIN_INTERVAL_MS) {
		logger.debug("Sync", "Sync skipped: throttled");
		return false;
	}

	syncing = true;
	try {
		const networkState = await Network.getNetworkStateAsync();
		if (!isOnline(networkState)) {
			logger.warn("Sync", "Sync skipped: offline");
			return false;
		}

		events.startEvent("sync");
		await events.sendEvent(
			options.reason
				? `Sincronizando os dados (${options.reason})...`
				: "Sincronizando os dados...",
		);

		await events.syncOfflineEventos();
		await syncOfflineVisitas();
		await manager.visitas.init();

		await events.sendEvent("Dados sincronizados!");
		return true;
	} catch (error) {
		logger.error("Sync", "Failed to sync system data", error);
		await events.sendEvent(
			`Falha ao sincronizar: ${
				error instanceof Error ? error.message : "erro desconhecido"
			}`,
		);
		return false;
	} finally {
		events.endEvent();
		syncing = false;
		lastSyncAt = Date.now();
	}
}
