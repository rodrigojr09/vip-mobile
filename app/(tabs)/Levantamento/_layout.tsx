import { EmpresaProvider } from "@/hooks/EmpresaProvider";
import { FuncaoProvider } from "@/hooks/FuncaoProvider";
import { SetorProvider } from "@/hooks/SetorProvider";
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
