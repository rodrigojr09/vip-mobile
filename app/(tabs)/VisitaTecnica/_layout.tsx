import { EmpresaProvider } from "@/hooks/EmpresaProvider";
import { FuncaoProvider } from "@/hooks/FuncaoProvider";
import { RiscoProvider } from "@/hooks/RiscoProvider";
import { SetorProvider } from "@/hooks/SetorProvider";
import VisitaProvider from "@/hooks/VisitaProvider";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<VisitaProvider>
			<Stack screenOptions={{ headerShown: false }} />
		</VisitaProvider>
	);
}
