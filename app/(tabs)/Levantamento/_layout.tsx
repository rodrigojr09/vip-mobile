import { EmpresaProvider } from "@/hooks/Levantamento/EmpresaProvider";
import { FuncaoProvider } from "@/hooks/Levantamento/FuncaoProvider";
import { RiscoProvider } from "@/hooks/Levantamento/RiscoProvider";
import { SetorProvider } from "@/hooks/Levantamento/SetorProvider";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<EmpresaProvider>
			<SetorProvider>
				<FuncaoProvider>
					<RiscoProvider>
						<Stack screenOptions={{ headerShown: false }} />
					</RiscoProvider>
				</FuncaoProvider>
			</SetorProvider>
		</EmpresaProvider>
	);
}
