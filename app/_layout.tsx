import "@/utils/BackgroundTasks";
import { Stack } from "expo-router";
import Layout from "@/components/Layout";
import { NavigationProvider } from "@/hooks/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import manager from "@/utils/Data/manager";
import { syncSystemData } from "@/utils/services/systemSync";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function BaseLayout() {
	useEffect(() => {
		manager.visitas;
		manager.levantamentos;
		manager.eventos;

		void syncSystemData({ force: true, reason: "startup" });
	}, []);
	return (
		<NavigationProvider>
			{/* Color slate-900 */}
			<SafeAreaView style={{ flex: 1, backgroundColor: "#0f172a" }}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS usa padding, Android height
				>
					<Layout>
						<Stack screenOptions={{ headerShown: false }} />
					</Layout>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</NavigationProvider>
	);
}
