import { Stack } from "expo-router";
import VisitaProvider, {
	useVisita,
} from "@/hooks/VisitaTecnica/VisitaProvider";
import { useEffect } from "react";
import manager from "@/utils/Data/manager";

export default function Layout() {
	return (
		<VisitaProvider>
			<VisitaAutoSave />
			<Stack screenOptions={{ headerShown: false }} />
		</VisitaProvider>
	);
}

function VisitaAutoSave() {
	const visita = useVisita();

	useEffect(() => {
		if (visita.id === "") return;

		let mounted = true;
		const saveData = async () => {
			console.log("Salvando dados de Visita automaticamente...");
			try {
				await manager.visitas.salvar(visita);
				if (mounted) console.log("Dados de Visita salvos automaticamente.");
			} catch (error) {
				console.error("Erro ao salvar dados de visita automaticamente:", error);
			}
		};

		saveData();
		return () => {
			mounted = false;
		};
	}, [visita]);

	return null;
}
