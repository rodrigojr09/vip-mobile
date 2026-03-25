import * as TaskManager from "expo-task-manager";
import type { LocationObject } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { events } from "./API/Event";
import { logger } from "./logger";

export const LOCATION_TASK_NAME = "RASTREIO_LOCATION_TASK";
const LAST_BG_LOCATION_KEY = "@vip:last_bg_location";
const MIN_DISTANCE_METERS = 50;

type LocationTaskData = {
	locations?: LocationObject[];
};

type StoredLocation = {
	latitude: number;
	longitude: number;
};

function toRadians(value: number) {
	return (value * Math.PI) / 180;
}

function getDistanceMeters(a: StoredLocation, b: StoredLocation) {
	const earthRadius = 6371000;
	const deltaLat = toRadians(b.latitude - a.latitude);
	const deltaLon = toRadians(b.longitude - a.longitude);
	const lat1 = toRadians(a.latitude);
	const lat2 = toRadians(b.latitude);

	const sinLat = Math.sin(deltaLat / 2);
	const sinLon = Math.sin(deltaLon / 2);
	const h =
		sinLat * sinLat +
		Math.cos(lat1) * Math.cos(lat2) * sinLon * sinLon;
	const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
	return earthRadius * c;
}

async function getLastBackgroundLocation(): Promise<StoredLocation | null> {
	try {
		const raw = await AsyncStorage.getItem(LAST_BG_LOCATION_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as StoredLocation;
		if (
			typeof parsed?.latitude !== "number" ||
			typeof parsed?.longitude !== "number"
		) {
			return null;
		}
		return parsed;
	} catch (error) {
		logger.warn("LocationTask", "Failed to read last background location", error);
		return null;
	}
}

async function setLastBackgroundLocation(location: StoredLocation) {
	try {
		await AsyncStorage.setItem(
			LAST_BG_LOCATION_KEY,
			JSON.stringify(location),
		);
	} catch (error) {
		logger.warn("LocationTask", "Failed to save last background location", error);
	}
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
	if (error) {
		logger.error("LocationTask", "Task error", error);
		return;
	}

	const payload = data as LocationTaskData | undefined;
	const locations = payload?.locations ?? [];
	const latest = locations[locations.length - 1];

	if (!latest) {
		logger.warn("LocationTask", "No location data received");
		return;
	}

	const localizacao = {
		latitude: latest.coords.latitude,
		longitude: latest.coords.longitude,
	};

	const last = await getLastBackgroundLocation();
	if (last) {
		const distance = getDistanceMeters(last, localizacao);
		if (distance < MIN_DISTANCE_METERS) {
			logger.debug(
				"LocationTask",
				`Location change below ${MIN_DISTANCE_METERS}m`,
				Math.round(distance),
			);
			return;
		}
	}

	try {
		await events.sendEventWithLocation(
			"Background location update",
			localizacao,
			"background",
		);
		await setLastBackgroundLocation(localizacao);
	} catch (sendError) {
		logger.error("LocationTask", "Failed to send background location", sendError);
	}
});
