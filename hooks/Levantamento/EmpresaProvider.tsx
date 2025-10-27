import { createContext, type ReactNode, useContext, useState } from "react";
import "react-native-get-random-values";
import type { VIPEmpresaType } from "@/types/Levantamento/VIPEmpresaType";
import type { VIPSetorType } from "@/types/Levantamento/VIPSetorType";

const EmpresaContext = createContext<VIPEmpresaType | undefined>(undefined);

export const EmpresaProvider = ({ children }: { children: ReactNode }) => {
	const [id, setId] = useState<string>("");
	const [nome, setNome] = useState<string>("");
	const [responsavel, setResponsavel] = useState<string>("");
	const [setores, setSetores] = useState<VIPSetorType[]>([]);
	const hoje = new Date();
	const dia = String(hoje.getDate()).padStart(2, "0");
	const mes = String(hoje.getMonth() + 1).padStart(2, "0"); // Janeiro = 0
	const ano = hoje.getFullYear();

	const dataFormatada = `${dia}/${mes}/${ano}`;
	return (
		<EmpresaContext.Provider
			value={{
				id,
				setId,
				nome,
				setNome,
				responsavel,
				setResponsavel,
				setores,
				setSetores,
				data: dataFormatada,
				clear: () => {
					setId("");
					setNome("");
					setResponsavel("");
					setSetores([]);
				},
			}}
		>
			{children}
		</EmpresaContext.Provider>
	);
};

export function useEmpresa() {
	const context = useContext(EmpresaContext);
	if (!context) {
		throw new Error("useEmpresa must be used within a EmpresaProvider");
	}

	return context;
}
