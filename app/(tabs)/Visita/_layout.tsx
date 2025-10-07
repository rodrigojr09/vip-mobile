import { Stack } from "expo-router";
import VisitaProvider from "@/hooks/VisitaTecnica/VisitaProvider";

export default function Layout() {
	return (
		<VisitaProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</VisitaProvider>
	);
}
