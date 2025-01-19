import { VIPEmpresaType, VIPSetorType } from "@/types/LevantamentoTypes";
import { createContext, ReactNode, useContext, useState } from "react";

const LevantamentoContext = createContext<VIPEmpresaType | undefined>(
	undefined
);

export const LevantamentoProvider = ({ children }: { children: ReactNode }) => {
	const [nome, setNome] = useState<string>("");
	const [responsavel, setResponsavel] = useState<string>("");
	const [setores, setSetores] = useState<VIPSetorType[]>([]);

	return (
		<LevantamentoContext.Provider
			value={{
				nome,
				setNome,
				responsavel,
				setResponsavel,
				setores,
				setSetores,
				clear: () => {
					setNome("");
					setResponsavel("");
					setSetores([]);
				},
			}}
		>
			{children}
		</LevantamentoContext.Provider>
	);
};

export function useLevantamento() {
	const context = useContext(LevantamentoContext);
	if (!context) {
		throw new Error(
			"useLevantamento must be used within a LevantamentoProvider"
		);
	}
	return context;
}
