import uuid from "react-native-uuid";
import { VIPEmpresaType } from "@/types/VIPEmpresaType";
import { VIPFuncaoType } from "@/types/VIPFuncaoType";
import { VIPRiscoType } from "@/types/VIPRiscoType";
import { VIPEpiType } from "@/types/VIPRiscoType";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

const EmpresaContext = createContext<VIPEmpresaType | undefined>(undefined);

export const EmpresaProvider = ({ children }: { children: ReactNode }) => {
	const [nome, setNome] = useState<string>("");
	const [responsavel, setResponsavel] = useState<string>("");
	const [setores, setSetores] = useState<VIPSetorType[]>([]);

	return (
		<EmpresaContext.Provider
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

export function VIPRisco(): VIPRiscoType {
	const [risco, setRisco] = useState<string>("");
	const [exposicao, setExposicao] = useState<string>("");
	const [fonteGeradora, setFonteGeradora] = useState<string>("");
	const [episExistentes, setEPIsExistentes] = useState<VIPEpiType[]>([]);
	const [episRecomendados, setEPIsRecomendados] = useState<VIPEpiType[]>([]);
	const [possuiEpi, setPossuiEpi] = useState<boolean | undefined>();
	const [recomendarEpi, setRecomendarEpi] = useState<boolean | undefined>();

	const clear = () => {
		setRisco("");
		setExposicao("");
		setFonteGeradora("");
		setEPIsExistentes([]);
		setEPIsRecomendados([]);
		setPossuiEpi(undefined);
		setRecomendarEpi(undefined);
	};

	return {
		risco,
		setRisco,
		exposicao,
		setExposicao,
		fonteGeradora,
		setFonteGeradora,
		possuiEpi,
		setPossuiEpi,
		recomendarEpi,
		setRecomendarEpi,
		epis: {
			recomendados: episRecomendados,
			existentes: episExistentes,
			setExistentes: setEPIsExistentes,
			setRecomendados: setEPIsRecomendados,
		},
		clear,
	};
}

export function VIPEpi(): VIPEpiType {
	const [nome, setNome] = useState<string>("");
	const [periodicidadeTempo, setPeriodicidadeTempo] = useState<string>("");
	const [periodicidadeTipo, setPeriodicidadeTipo] = useState<
		"Mês" | "Mêses" | "Dia" | "Dias" | undefined
	>();

	function clear() {
		setNome("");
		setPeriodicidadeTempo("");
		setPeriodicidadeTipo(undefined);
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
