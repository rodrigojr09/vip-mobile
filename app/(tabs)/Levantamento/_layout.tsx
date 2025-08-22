import { EmpresaProvider } from "@/hooks/Levantamento/EmpresaProvider";
import { FuncaoProvider } from "@/hooks/Levantamento/FuncaoProvider";
import { SetorProvider } from "@/hooks/Levantamento/SetorProvider";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<EmpresaProvider>
			<SetorProvider>
				<FuncaoProvider>
					<Stack screenOptions={{ headerShown: false }} />
				</FuncaoProvider>
			</SetorProvider>
		</EmpresaProvider>
	);
}
