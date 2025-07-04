import VisitaProvider from "@/hooks/VisitaTecnica/VisitaProvider";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<VisitaProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</VisitaProvider>
	);
}
