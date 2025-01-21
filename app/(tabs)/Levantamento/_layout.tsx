import { EmpresaProvider } from "@/hooks/EmpresaProvider";
import { FuncaoProvider } from "@/hooks/FuncaoProvider";
import { RiscoProvider } from "@/hooks/RiscoProvider";
import { SetorProvider } from "@/hooks/SetorProvider";
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
