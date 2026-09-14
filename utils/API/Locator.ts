import * as Location from "expo-location";
import type { VIPLocalizacao } from "@/types/VIPEvent";
import { logger } from "../logger";

const MAX_LAST_KNOWN_AGE_MS = 30_000;
const MIN_GOOD_ACCURACY_METERS = 25;

function isFiniteNumber(value: unknown): value is number {
	return typeof value === "number" && Number.isFinite(value);
}

function pickBestPosition(
	positions: Array<Location.LocationObject | null | undefined>,
): Location.LocationObject | null {
	const scored = positions
		.filter((p): p is Location.LocationObject => Boolean(p))
		.map((p) => {
			const accuracy = isFiniteNumber(p.coords.accuracy)
				? p.coords.accuracy
				: Number.POSITIVE_INFINITY;
			const timestamp = isFiniteNumber(p.timestamp) ? p.timestamp : 0;
			return { p, accuracy, timestamp };
		});

	if (scored.length === 0) return null;

	// Prefer better (smaller) accuracy; on ties, prefer the most recent fix.
	scored.sort((a, b) => {
		if (a.accuracy !== b.accuracy) return a.accuracy - b.accuracy;
		return b.timestamp - a.timestamp;
	});

	return scored[0]?.p ?? null;
}

export async function getCurrentLocation(): Promise<VIPLocalizacao | undefined> {
	try {
		let { status } = await Location.getForegroundPermissionsAsync();

		if (status !== "granted") {
			const response = await Location.requestForegroundPermissionsAsync();
			status = response.status;
		}

		if (status !== "granted") {
			logger.warn("Location", "Foreground permission denied");
			return undefined;
		}

		const lastKnown = await Location.getLastKnownPositionAsync();
		const lastKnownIsFresh =
			lastKnown &&
			isFiniteNumber(lastKnown.timestamp) &&
			Date.now() - lastKnown.timestamp <= MAX_LAST_KNOWN_AGE_MS;
		const lastKnownIsAccurateEnough =
			lastKnown &&
			isFiniteNumber(lastKnown.coords.accuracy) &&
			lastKnown.coords.accuracy <= MIN_GOOD_ACCURACY_METERS;

		const current = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.BestForNavigation,
			mayShowUserSettingsDialog: true,
		});

		// If the current fix came back with poor accuracy, give the GNSS another
		// chance to settle (common in cold-start/offline scenarios).
		let secondTry: Location.LocationObject | null = null;
		const currentAccuracy = isFiniteNumber(current.coords.accuracy)
			? current.coords.accuracy
			: Number.POSITIVE_INFINITY;

		if (currentAccuracy > MIN_GOOD_ACCURACY_METERS) {
			try {
				secondTry = await Location.getCurrentPositionAsync({
					accuracy: Location.Accuracy.BestForNavigation,
					mayShowUserSettingsDialog: true,
				});
			} catch (retryError) {
				logger.debug("Location", "Second fix attempt failed", retryError);
			}
		}

		const best = pickBestPosition([
			lastKnownIsFresh && lastKnownIsAccurateEnough ? lastKnown : null,
			current,
			secondTry,
		]);

		if (!best) return undefined;

		return {
			latitude: best.coords.latitude,
			longitude: best.coords.longitude,
		};
	} catch (error) {
		logger.error("Location", "Failed to read current location", error);
		return undefined;
	}
}
