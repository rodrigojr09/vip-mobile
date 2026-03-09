import { Stack } from "expo-router";
import Layout from "@/components/Layout";
import { NavigationProvider } from "@/hooks/Navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import manager from "@/utils/Data/manager";
import { events } from "@/utils/API/Event";

export default function BaseLayout() {
	useEffect(() => {
		manager.visitas;
		manager.levantamentos;
		manager.eventos;

		events.startEvent("sync");
		events.sendEvent("Sincronizando os dados...");

		events.syncOfflineEventos();

		events.sendEvent("Dados sincronizados!");
		events.endEvent();
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
