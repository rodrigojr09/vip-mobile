import "react-native-get-random-values";
import { createContext, type ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { VIPFuncaoType } from "@/types/Levantamento/VIPFuncaoType";
import type { VIPRiscoType } from "@/types/Levantamento/VIPRiscoType";

const FuncaoContext = createContext<VIPFuncaoType | undefined>(undefined);

export const FuncaoProvider = ({ children }: { children: ReactNode }) => {
	const [nome, setNome] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [funcionarios, setFuncionarios] = useState<string>("");
	const [riscos, setRiscos] = useState<VIPRiscoType[]>([]);

	const clear = () => {
		setNome("");
		setDescription("");
		setFuncionarios("");
		setRiscos([]);
	};

	const load = (funcao: VIPFuncaoType) => {
		setNome(funcao.nome);
		setDescription(funcao.description);
		setFuncionarios(funcao.funcionarios);
		setRiscos(funcao.riscos);
	};

	return (
		<FuncaoContext.Provider
			value={{
				id: uuidv4(),
				nome,
				setNome,
				description,
				setDescription,
				funcionarios,
				setFuncionarios,
				riscos,
				setRiscos,
				clear,
				load,
			}}
		>
			{children}
		</FuncaoContext.Provider>
	);
};

export function useFuncao(funcao?: VIPFuncaoType) {
	const context = useContext(FuncaoContext);
	if (!context) {
		throw new Error("useFuncao must be used within a FuncaoProvider");
	}

	if (funcao) {
	}

	return context;
}
