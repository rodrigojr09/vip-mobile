import { VIPEmpresaType } from "@/types/VIPEmpresaType";
import { VIPRiscoType } from "@/types/VIPRiscoType";
import { VIPEpiType } from "@/types/VIPRiscoType";
import { createContext, ReactNode, useContext, useState } from "react";
import { VIPSetorType } from "@/types/VIPSetorType";

const EmpresaContext = createContext<VIPEmpresaType | undefined>(undefined);

export const EmpresaProvider = ({ children }: { children: ReactNode }) => {
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
				nome,
				setNome,
				responsavel,
				setResponsavel,
				setores,
				setSetores,
				data: dataFormatada,
				clear: () => {
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

export function VIPEpi(): VIPEpiType {
	const [nome, setNome] = useState<string>("");
	const [periodicidadeTempo, setPeriodicidadeTempo] = useState<string>("");
	const [periodicidadeTipo, setPeriodicidadeTipo] = useState<
		"Mês" | "Mêses" | "Dia" | "Dias"
	>("Dias");

	function clear() {
		setNome("");
		setPeriodicidadeTempo("");
		setPeriodicidadeTipo("Dias");
	}

	return {
		nome,
		setNome,
		periodicidade: {
			tempo: periodicidadeTempo,
			tipo: periodicidadeTipo,
			setTempo: setPeriodicidadeTempo,
			setTipo: setPeriodicidadeTipo,
		},
		risco: "",
		clear,
	};
}
