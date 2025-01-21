import { EmpresaProvider } from "@/hooks/EmpresaProvider";
import { SetorProvider } from "@/hooks/SetorProvider";
import { Stack } from "expo-router";

export default function Layout() {
	return (
		<EmpresaProvider>
			<SetorProvider>
				<Stack screenOptions={{ headerShown: false }} />
			</SetorProvider>
		</EmpresaProvider>
	);
}
