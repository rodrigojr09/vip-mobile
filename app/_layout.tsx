import { fetchEmpresas } from "@/utils/API/Empresas";
import * as Device from "expo-device";
import { fetchQuests } from "@/utils/API/Quests";
import { router, Stack, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	BackHandler,
} from "react-native";
import Loading from "@/components/Loading";
import Data from "@/utils/API/Data";

export default function Layout() {
	const pathname = usePathname();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			await Data.getData();
            setLoading(false);
		})();
	}, []);

	// Bloqueia botão físico de voltar
	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => true // bloqueia
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
			{/* Header */}
			{!pathname.endsWith("assinatura") && (
				<View style={styles.header}>
					<Text style={styles.headerText}>Vip Mobile</Text>
				</View>
			)}

			{/* Botão de voltar manual */}
			{pathname !== "/" &&
				!pathname.endsWith("assinatura") &&
				!pathname.endsWith("finalizado") && (
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => router.back()}
					>
						<Text style={styles.backButtonText}>Voltar</Text>
					</TouchableOpacity>
				)}

			{/* Conteúdo */}
			{!loading ? (
				<View style={styles.content}>
					<Stack screenOptions={{ headerShown: false }} />
				</View>
			) : (
				<Loading />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0f172a", // slate-900
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
		backgroundColor: "red", // slate-800
		borderRadius: 6,
	},
	backButtonText: {
		color: "white",
		fontSize: 16,
	},
});
