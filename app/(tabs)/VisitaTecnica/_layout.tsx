import VisitaProvider from "@/hooks/VisitaProvider";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<VisitaProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</VisitaProvider>
	);
}
