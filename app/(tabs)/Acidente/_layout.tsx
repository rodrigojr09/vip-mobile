import { Stack } from "expo-router";
import AcidenteProvider from "@/hooks/Acidente/AcidenteProvider";

export default function Layout() {
	return (
		<AcidenteProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</AcidenteProvider>
	);
}
