import * as Location from "expo-location";
import type { VIPLocalizacao } from "@/types/VIPEvent";
import { logger } from "../logger";

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

		const location = await Location.getCurrentPositionAsync({
			accuracy: Location.Accuracy.High,
		});

		return {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		};
	} catch (error) {
		logger.error("Location", "Failed to read current location", error);
		return undefined;
	}
}
