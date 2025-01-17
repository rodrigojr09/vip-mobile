import {
	LevantamentoSetorType,
	LevantamentoType,
} from "@/types/LevantamentoTypes";
import { createContext, ReactNode, useContext, useState } from "react";

const LevantamentoContext = createContext<LevantamentoType | undefined>(
	undefined
);

export const LevantamentoProvider = ({ children }: { children: ReactNode }) => {
	const [nome, setNome] = useState<string>("");
	const [auxiliar, setAuxiliar] = useState<string>("");
	const [setores, setSetores] = useState<LevantamentoSetorType[]>([]);

	return (
		<LevantamentoContext.Provider
			value={{
				nome,
				setNome,
				auxiliar,
				setAuxiliar,
				setores,
				setSetores,
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
