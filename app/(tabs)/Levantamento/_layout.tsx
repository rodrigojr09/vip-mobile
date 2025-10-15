import { Stack } from "expo-router";
import { useEffect } from "react";
import {
	EmpresaProvider,
	useEmpresa,
} from "@/hooks/Levantamento/EmpresaProvider";
import { FuncaoProvider, useFuncao } from "@/hooks/Levantamento/FuncaoProvider";
import { SetorProvider, useSetor } from "@/hooks/Levantamento/SetorProvider";
import { storage } from "@/utils/Storage";

function AutoSave({ children }: { children: React.ReactNode }) {
	const empresa = useEmpresa();
    const setor = useSetor();
    const funcao = useFuncao();

	useEffect(() => {
		const saveData = async () => {
            if (empresa.id === "") return;
			console.log("Salvando dados de levantamento automaticamente...");
			try {
				storage.saveLevantamento({ empresa,setor,funcao });
				console.log("Dados de levantamento salvos automaticamente.");
			} catch (error) {
				console.error(
					"Erro ao salvar dados de levantamento automaticamente:",
					error,
				);
			}
		};

		saveData();
	}, [empresa,setor,funcao]);

	return <>{children}</>;
}

export default function Layout() {
	return (
		<EmpresaProvider>
			<SetorProvider>
				<FuncaoProvider>
					<AutoSave>
						<Stack screenOptions={{ headerShown: false }} />
					</AutoSave>
				</FuncaoProvider>
			</SetorProvider>
		</EmpresaProvider>
	);
}
