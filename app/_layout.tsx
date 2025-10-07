import { Stack } from "expo-router";
import Layout from "@/components/Layout";
import { NavigationProvider } from "@/hooks/Navigation";

export default function BaseLayout() {
	return (
		<NavigationProvider>
			<Layout>
				<Stack screenOptions={{ headerShown: false }} />
			</Layout>
		</NavigationProvider>
	);
}
