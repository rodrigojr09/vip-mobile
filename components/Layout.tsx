import * as Location from "expo-location";
import * as Device from "expo-device";
import * as TaskManager from "expo-task-manager";
import { LOCATION_TASK_NAME } from "@/utils/BackgroundTasks";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	BackHandler,
	Alert,
} from "react-native";
import Loading from "@/components/Loading";
import { usePathname } from "expo-router";
import Data from "@/utils/API/Data";
import { events } from "@/utils/API/Event";
import { useNavigationHistory } from "@/hooks/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const nav = useNavigationHistory();
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		(async () => {
			try {
				await Data.getData();
				await startBackgroundLocation();
				setLoading(false);
			} catch (error) {
				console.error("Erro ao carregar dados iniciais:", error);
				setLoading(false);
				events.sendEvent(
					"Erro ao carregar dados iniciais: " + JSON.stringify(error)
				);
			}
		})();
	}, []);

	const startBackgroundLocation = async () => {
		const { status: foregroundStatus } =
			await Location.requestForegroundPermissionsAsync();
		const { status: backgroundStatus } =
			await Location.requestBackgroundPermissionsAsync();

		if (foregroundStatus !== "granted" || backgroundStatus !== "granted") {
			console.warn("Permissão de localização não concedida.");
			return;
		}

		const isTaskDefined = TaskManager.isTaskDefined(LOCATION_TASK_NAME);
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			LOCATION_TASK_NAME
		);
		if (!hasStarted) {
			await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
				accuracy: Location.Accuracy.Balanced,
				timeInterval: 60000, // 1 minuto
				distanceInterval: 1, // ou 50 metros
				foregroundService: {
					notificationTitle: "Vip Mobile",
					notificationBody:
						"Registrando sua localização em segundo plano",
				},
				showsBackgroundLocationIndicator: true,
			});
			console.log("Atualizações de localização iniciadas.");
		}
		if (isTaskDefined) {
			console.log("Tarefa de localização definida.");
		}
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => true
		);
		return () => backHandler.remove();
	}, []);

	const isTablet = Device.deviceType === Device.DeviceType.TABLET;

	return (
		<View
			style={{
				...styles.container,
				paddingBottom: isTablet ? 40 : 0,
				paddingTop: isTablet ? 25 : 0,
			}}
		>
			{!pathname.endsWith("assinatura") && (
				<View style={styles.header}>
					<Text style={styles.headerText}>Vip Mobile</Text>
				</View>
			)}

			{pathname !== "/" &&
				!pathname.endsWith("assinatura") &&
				!pathname.endsWith("finalizado") && (
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => {
							if (events.atual !== null) {
								if (nav.history.length > 1) {
									console.log(nav.history);
								} else {
									events.sendEvent(
										"O evento " +
											events.atual +
											" foi cancelado."
									);
									events.endEvent();
								}
							}
							nav.back();
						}}
					>
						<Text style={styles.backButtonText}>Voltar</Text>
					</TouchableOpacity>
				)}

			{!loading ? (
				<View style={styles.content}>{children}</View>
			) : (
				<Loading />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0f172a",
	},
	header: {
		backgroundColor: "green",
		padding: 18,
		alignItems: "center",
		width: "100%",
	},
	headerText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	content: {
		flex: 1,
	},
	backButton: {
		position: "absolute",
		top: 35,
		left: 20,
		zIndex: 1000,
		padding: 8,
		backgroundColor: "red",
		borderRadius: 6,
	},
	backButtonText: {
		color: "white",
		fontSize: 16,
	},
});
