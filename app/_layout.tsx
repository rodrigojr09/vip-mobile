import Layout from "@/components/Layout";
import { NavigationProvider } from "@/hooks/Navigation";
import { Stack } from "expo-router";

export default function BaseLayout() {
	return (
		<NavigationProvider>
			<Layout>
				<Stack screenOptions={{ headerShown: false }} />
			</Layout>
		</NavigationProvider>
	);
}
