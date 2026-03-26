import { Stack } from "expo-router";
import Layout from "@/components/Layout";
import { NavigationProvider } from "@/hooks/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import manager from "@/utils/Data/manager";
import { syncSystemData } from "@/utils/services/systemSync";

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
				<Layout>
					<Stack screenOptions={{ headerShown: false }} />
				</Layout>
			</SafeAreaView>
		</NavigationProvider>
	);
}
