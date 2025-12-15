import { Stack } from "expo-router";
import { useEffect } from "react";
import Levantamento, {
	useLevantamento,
} from "@/hooks/v2/Levantamentos/Levantamento";
import manager from "@/utils/Data/manager";

function AutoSave({ children }: { children: React.ReactNode }) {
	const levantamento = useLevantamento();

	useEffect(() => {
		const saveData = async () => {
			if (levantamento.empresa.id === "") return;
			console.log("Salvando dados de levantamento automaticamente...");
			try {
				manager.levantamentos.salvar(levantamento.empresa);
				console.log("Dados de levantamento salvos automaticamente.");
			} catch (error) {
				console.error(
					"Erro ao salvar dados de levantamento automaticamente:",
					error,
				);
			}
		};

		saveData();
	}, []);

	return <>{children}</>;
}

export default function Layout() {
	return (
		<Levantamento>
			<AutoSave>
				<Stack screenOptions={{ headerShown: false }} />
			</AutoSave>
		</Levantamento>
	);
}
