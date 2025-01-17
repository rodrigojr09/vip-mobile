import { LevantamentoProvider } from "@/hooks/LevantamentoProvider";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<LevantamentoProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</LevantamentoProvider>
	);
}
