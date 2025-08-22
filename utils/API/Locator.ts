import { VIPLocalizacao } from "@/types/VIPEvent";
import * as Location from "expo-location";

export class Locator {
	static async getCurrentLocation(): Promise<VIPLocalizacao | undefined> {
		try {
			const { status } =
				await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				console.warn("Permissão de localização negada");
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
			console.error("Erro ao obter localização:", error);
			return undefined;
		}
	}
}
