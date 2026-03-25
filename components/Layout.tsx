import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { usePathname } from "expo-router";
import { useEffect, useState } from "react";
import {
	BackHandler,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Loading from "@/components/Loading";
import { useNavigationHistory } from "@/hooks/Navigation";
import { events } from "@/utils/API/Event";
import { LOCATION_TASK_NAME } from "@/utils/BackgroundTasks";
import manager from "@/utils/Data/manager";
import { logger } from "@/utils/logger";

export const DIRECTORY_KEY = "DIRECTORY_URI";

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const nav = useNavigationHistory();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				await startBackgroundLocation();
				await manager.visitas.init();
			} catch (error) {
				logger.error("Layout", "Failed to load initial data", error);
				events.sendEvent(
					`Failed to load initial data: ${JSON.stringify(error)}`,
				);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		events.setContext(pathname);
	}, [pathname]);

	const startBackgroundLocation = async () => {
		const { status: foregroundStatus } =
			await Location.requestForegroundPermissionsAsync();

		if (foregroundStatus !== "granted") {
			logger.warn("Location", "Foreground permission denied");
			events.sendEvent("Foreground location permission denied");
			return;
		}

		const { status: backgroundStatus } =
			await Location.requestBackgroundPermissionsAsync();

		if (backgroundStatus !== "granted") {
			logger.warn("Location", "Background permission denied");
			events.sendEvent("Background location permission denied");
			return;
		}

		const isTaskDefined = TaskManager.isTaskDefined(LOCATION_TASK_NAME);
		if (!isTaskDefined) {
			logger.error("Location", "Location task not defined");
			events.sendEvent("Location task not defined");
			return;
		}

		const hasStarted =
			await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

		if (hasStarted) {
			logger.debug("Location", "Background updates already running");
			return;
		}

		try {
			await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
				accuracy: Location.Accuracy.Balanced,
				timeInterval: 60000,
				deferredUpdatesInterval: 60000,
				distanceInterval: 50,
				deferredUpdatesDistance: 50,
				pausesUpdatesAutomatically: false,
				foregroundService: {
					notificationTitle: "Vip Mobile",
					notificationBody: "Registrando sua localizacao em segundo plano",
				},
				showsBackgroundLocationIndicator: true,
			});
			logger.info("Location", "Background updates started");
			events.sendEvent("Background location updates started");
		} catch (error) {
			logger.error("Location", "Failed to start background updates", error);
			events.sendEvent(
				`Failed to start background updates: ${JSON.stringify(error)}`,
			);
		}
	};

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => true,
		);
		return () => backHandler.remove();
	}, []);

	return (
		<View style={styles.container}>
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
								if (!(nav.history.length > 1)) {
									events.sendEvent(`Event ${events.atual} was cancelled.`);
									events.endEvent();
								}
							}
							nav.back();
						}}
					>
						<Text style={styles.backButtonText}>Voltar</Text>
					</TouchableOpacity>
				)}

			{!loading ? <View style={styles.content}>{children}</View> : <Loading />}
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
		top: 12,
		right: 20,
		zIndex: 1000,
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: "gray",
		borderRadius: 6,
	},
	backButtonText: {
		color: "white",
		fontSize: 16,
	},
});
