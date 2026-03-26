import * as TaskManager from "expo-task-manager";
import type { LocationObject } from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as BackgroundFetch from "expo-background-fetch";
import { events } from "./API/Event";
import { logger } from "./logger";
import { syncSystemData } from "./services/systemSync";

export const LOCATION_TASK_NAME = "RASTREIO_LOCATION_TASK";
export const BACKGROUND_SYNC_TASK_NAME = "VIP_BACKGROUND_SYNC_TASK";
const LAST_BG_LOCATION_KEY = "@vip:last_bg_location";
const COORD_PRECISION = 5;

type LocationTaskData = {
    locations?: LocationObject[];
};

type StoredLocation = {
    latitude: number;
    longitude: number;
};

function normalizeCoord(value: number) {
    return Number(value.toFixed(COORD_PRECISION));
}

function normalizeLocation(location: StoredLocation): StoredLocation {
    return {
        latitude: normalizeCoord(location.latitude),
        longitude: normalizeCoord(location.longitude),
    };
}

function isSameLocation(a: StoredLocation, b: StoredLocation) {
    return a.latitude === b.latitude && a.longitude === b.longitude;
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

    const normalizedLocation = normalizeLocation(localizacao);
    const last = await getLastBackgroundLocation();
    if (last && isSameLocation(last, normalizedLocation)) {
        logger.debug("LocationTask", "Same location received, skipping");
        return;
    }

    try {
        await events.sendEventWithLocation(
            "Background location update",
            normalizedLocation,
            "background",
        );
        await setLastBackgroundLocation(normalizedLocation);
    } catch (sendError) {
        logger.error("LocationTask", "Failed to send background location", sendError);
    }
});

TaskManager.defineTask(BACKGROUND_SYNC_TASK_NAME, async () => {
    try {
        const synced = await syncSystemData({ reason: "background-fetch" });
        return synced
            ? BackgroundFetch.BackgroundFetchResult.NewData
            : BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {
        logger.error("BackgroundSync", "Background sync task failed", error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});
