import * as TaskManager from "expo-task-manager";
import type { LocationObject } from "expo-location";
import { events } from "./API/Event";
import { logger } from "./logger";

export const LOCATION_TASK_NAME = "RASTREIO_LOCATION_TASK";

type LocationTaskData = {
	locations?: LocationObject[];
};

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
	if (error) {
		logger.error("LocationTask", "Task error", error);
		return;
	}

	const payload = data as LocationTaskData | undefined;
	const locations = payload?.locations ?? [];
	const latest = locations[locations.length - 1];

	const localizacao = latest
		? {
				latitude: latest.coords.latitude,
				longitude: latest.coords.longitude,
			}
		: undefined;

	await events.sendEventWithLocation(
		"Background location update",
		localizacao,
		"background",
	);
});
