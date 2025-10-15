import * as Location from "expo-location";
import type { VIPLocalizacao } from "@/types/VIPEvent";

export async function getCurrentLocation(): Promise<VIPLocalizacao | undefined> {
	try {
		// 1️⃣ Verifica se a permissão já foi concedida
		let { status } = await Location.getForegroundPermissionsAsync();

		// 2️⃣ Se não tiver, solicita
		if (status !== "granted") {
			const response =
				await Location.requestForegroundPermissionsAsync();
			status = response.status;
		}

		if (status !== "granted") {
			console.warn("Permissão de localização negada");
			return undefined;
		}

		// 3️⃣ Pega a localização
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
