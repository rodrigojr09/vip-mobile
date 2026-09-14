import * as TaskManager from "expo-task-manager";
import type { LocationObject } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as BackgroundFetch from "expo-background-fetch";
import { getDistance } from "geolib";
import { events } from "./API/Event";
import { logger } from "./logger";
import { syncSystemData } from "./services/systemSync";
import { LocationFilter } from "./locationFilter";

export const LOCATION_TASK_NAME = "RASTREIO_LOCATION_TASK";
export const BACKGROUND_SYNC_TASK_NAME = "VIP_BACKGROUND_SYNC_TASK";
const LAST_BG_LOCATION_KEY = "@vip:last_bg_location";
const LAST_BG_FETCH_RUN_AT_KEY = "@vip:last_bg_fetch_run_at";
const LAST_DEVICE_BOOT_EVENT_AT_KEY = "@vip:last_device_boot_event_at";
const COORD_PRECISION = 6;
const SAME_LOCATION_DISTANCE_METERS = 1;
const locationFilter = new LocationFilter({
    minDistance: 5,
    minAccuracy: 20,
    stopSpeed: 0.5,
    stopTime: 60000,
    throttleTime: 5000,
    idleHeartbeatTime: 180000,
});

type LocationTaskData = {
    locations?: LocationObject[];
};

type StoredLocation = {
    latitude: number;
    longitude: number;
};

function normalizeCoord(value: number) {
    const factor = 10 ** COORD_PRECISION;
    return Math.round(value * factor) / factor;
}

function normalizeLocation(location: StoredLocation): StoredLocation {
    return {
        latitude: normalizeCoord(location.latitude),
        longitude: normalizeCoord(location.longitude),
    };
}

function isSameLocation(a: StoredLocation, b: StoredLocation) {
    return getDistance(a, b) <= SAME_LOCATION_DISTANCE_METERS;
}

function pickBestLocationSample(locations: LocationObject[]): LocationObject | null {
    if (!locations.length) return null;

    // Prefer better (smaller) accuracy; on ties, prefer the most recent fix.
    const sorted = [...locations].sort((a, b) => {
        const accA = a.coords.accuracy ?? Number.POSITIVE_INFINITY;
        const accB = b.coords.accuracy ?? Number.POSITIVE_INFINITY;
        if (accA !== accB) return accA - accB;
        return (b.timestamp ?? 0) - (a.timestamp ?? 0);
    });

    return sorted[0] ?? null;
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
    if (!locations.length) {
        logger.warn("LocationTask", "No location data received");
        return;
    }

    // TaskManager may batch multiple fixes. Sending the first item can be less
    // precise than sending the best fix of the batch (especially when offline).
    const bestSample = pickBestLocationSample(locations);
    if (!bestSample) return;

    let lastStored = await getLastBackgroundLocation();
    let sentAny = false;

    const point = {
        latitude: bestSample.coords.latitude,
        longitude: bestSample.coords.longitude,
        accuracy: bestSample.coords.accuracy ?? undefined,
        speed: bestSample.coords.speed ?? null,
        timestamp: bestSample.timestamp,
    };

    const filtered = locationFilter.process(point);
    if (filtered) {
        const localizacao = {
            latitude: filtered.latitude,
            longitude: filtered.longitude,
        };

        const normalizedLocation = normalizeLocation(localizacao);
        if (lastStored && isSameLocation(lastStored, normalizedLocation)) {
            logger.debug("LocationTask", "Same location received, skipping");
        } else {
            try {
                await events.sendEventWithLocation(
                    "Background location update",
                    normalizedLocation,
                    "background",
                );
                await setLastBackgroundLocation(normalizedLocation);
                await syncSystemData({ reason: "background-location" });
                lastStored = normalizedLocation;
                sentAny = true;
            } catch (sendError) {
                logger.error(
                    "LocationTask",
                    "Failed to send background location",
                    sendError,
                );
            }
        }
    }

    if (!sentAny) {
        logger.debug("LocationTask", "No location passed the filter");
    }
});

TaskManager.defineTask(BACKGROUND_SYNC_TASK_NAME, async () => {
    try {
        const now = Date.now();
        let shouldEmitBootEvent = false;

        try {
            const lastRunRaw = await AsyncStorage.getItem(LAST_BG_FETCH_RUN_AT_KEY);
            const lastRunAt = lastRunRaw ? Number(lastRunRaw) : null;
            if (!lastRunAt || Number.isNaN(lastRunAt) || now - lastRunAt > 1000 * 60 * 60) {
                // Large gap between background fetch runs usually means a device reboot / long power-off.
                shouldEmitBootEvent = true;
            }
            await AsyncStorage.setItem(LAST_BG_FETCH_RUN_AT_KEY, String(now));
        } catch (error) {
            logger.warn("BackgroundSync", "Failed to read/write bg fetch heartbeat", error);
        }

        if (shouldEmitBootEvent) {
            try {
                const lastBootRaw = await AsyncStorage.getItem(
                    LAST_DEVICE_BOOT_EVENT_AT_KEY,
                );
                const lastBootAt = lastBootRaw ? Number(lastBootRaw) : null;

                // Avoid duplicates if the OS fires multiple background fetch callbacks right after boot.
                if (
                    !lastBootAt ||
                    Number.isNaN(lastBootAt) ||
                    now - lastBootAt > 1000 * 60 * 15
                ) {
                    await events.sendEventWithLocation("Dispositivo Ligado", null, "boot");
                    await AsyncStorage.setItem(
                        LAST_DEVICE_BOOT_EVENT_AT_KEY,
                        String(now),
                    );
                }
            } catch (error) {
                logger.warn("BackgroundSync", "Failed to emit boot event", error);
            }
        }

        const synced = await syncSystemData({ reason: "background-fetch" });
        return synced
            ? BackgroundFetch.BackgroundFetchResult.NewData
            : BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {
        logger.error("BackgroundSync", "Background sync task failed", error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});
