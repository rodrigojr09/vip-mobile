import { Stack } from "expo-router";
import PsicoProvider from "@/hooks/Psicossocial/PsicoProvider";

export default function Layout() {
	return (
		<PsicoProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</PsicoProvider>
	);
}