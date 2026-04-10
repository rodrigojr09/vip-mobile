import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import { usePathname } from "expo-router";
import { useEffect, useRef, useState } from "react";
import * as Network from "expo-network";
import {
	AppState,
	BackHandler,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Loading from "@/components/Loading";
import { useNavigationHistory } from "@/hooks/Navigation";
import { events } from "@/utils/API/Event";
import {
	BACKGROUND_SYNC_TASK_NAME,
	LOCATION_TASK_NAME,
} from "@/utils/BackgroundTasks";
import manager from "@/utils/Data/manager";
import { logger } from "@/utils/logger";
import { syncSystemData } from "@/utils/services/systemSync";

export const DIRECTORY_KEY = "DIRECTORY_URI";

export default function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const nav = useNavigationHistory();
	const [loading, setLoading] = useState(true);
	const isOnlineRef = useRef(false);

	useEffect(() => {
		(async () => {
			try {
				await registerBackgroundSync();
			} catch (error) {
				logger.error("Layout", "Failed to register background sync", error);
			}

			try {
				await startBackgroundLocation();
			} catch (error) {
				logger.error("Layout", "Failed to start background location", error);
				events.sendEvent(
					`Failed to start background location: ${JSON.stringify(error)}`,
				);
			}

			try {
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
		const handleNetworkChange = (state: Network.NetworkState) => {
			const online =
				state.isConnected === true && state.isInternetReachable !== false;

			if (online && !isOnlineRef.current) {
				isOnlineRef.current = true;
				void syncSystemData({ reason: "reconexao" });
				return;
			}

			if (!online) {
				isOnlineRef.current = false;
			}
		};

		Network.getNetworkStateAsync()
			.then((state) => {
				isOnlineRef.current =
					state.isConnected === true && state.isInternetReachable !== false;
			})
			.catch((error) =>
				logger.warn("Network", "Failed to read initial network state", error),
			);

		const subscription = Network.addNetworkStateListener(handleNetworkChange);
		return () => subscription.remove();
	}, []);

	useEffect(() => {
		events.setContext(pathname);
	}, [pathname]);

	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				const isRunning =
					await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

				if (!isRunning) {
					logger.warn("Location", "Watchdog restarting location");
					await startBackgroundLocation();
				}
			} catch (error) {
				logger.error("Location", "Watchdog error", error);
			}
		}, 60000); // a cada 1 min

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		const sub = AppState.addEventListener("change", async (state) => {
			if (state === "active") {
				const isRunning =
					await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

				if (!isRunning) {
					logger.warn("Location", "App resumed, restarting location");
					await startBackgroundLocation();
				}
			}
		});

		return () => sub.remove();
	}, []);

	const startBackgroundLocation = async () => {
		try {
			// 🔐 Permissões
			const { status: fgStatus } =
				await Location.requestForegroundPermissionsAsync();

			if (fgStatus !== "granted") {
				logger.warn("Location", "Foreground permission denied");
				return;
			}

			const { status: bgStatus } =
				await Location.requestBackgroundPermissionsAsync();

			if (bgStatus !== "granted") {
				logger.warn("Location", "Background permission denied");
				return;
			}

			// 🧠 Garantir que task existe
			if (!TaskManager.isTaskDefined(LOCATION_TASK_NAME)) {
				logger.error("Location", "Task not defined");
				return;
			}

			// 🧹 Sempre reinicia (evita estado bugado do Android)
			const hasStarted =
				await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);

			if (hasStarted) {
				logger.warn("Location", "Restarting location updates (force)");
				await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
			}

			// 🚀 Start forte
			await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
				accuracy: Location.Accuracy.BestForNavigation,

				timeInterval: 10000, // 10s
				distanceInterval: 5,

				deferredUpdatesInterval: 0,
				deferredUpdatesDistance: 0,

				pausesUpdatesAutomatically: false,

				foregroundService: {
					notificationTitle: "Vip Mobile",
					notificationBody: "Rastreamento ativo em segundo plano",
					notificationColor: "#0000ff",
				},

				showsBackgroundLocationIndicator: true,
			});

			logger.info("Location", "Background location STARTED");
			events.sendEvent("Background location started");
		} catch (error) {
			logger.error("Location", "Start failed", error);
			events.sendEvent(`Start failed: ${JSON.stringify(error)}`);
		}
	};

	const registerBackgroundSync = async () => {
		const status = await BackgroundFetch.getStatusAsync();
		if (status !== BackgroundFetch.BackgroundFetchStatus.Available) {
			logger.warn("BackgroundSync", "Background fetch unavailable", status);
			return;
		}

		const isRegistered = await TaskManager.isTaskRegisteredAsync(
			BACKGROUND_SYNC_TASK_NAME,
		);
		if (isRegistered) {
			logger.debug("BackgroundSync", "Background sync already registered");
			return;
		}

		await BackgroundFetch.registerTaskAsync(BACKGROUND_SYNC_TASK_NAME, {
			minimumInterval: 15 * 60,
			stopOnTerminate: false,
			startOnBoot: true,
		});
		logger.info("BackgroundSync", "Background sync registered");
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
