import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { VIPFuncaoType } from "@/types/Levantamento/VIPFuncaoType";
import { VIPRiscoType } from "@/types/Levantamento/VIPRiscoType";
import { createContext, ReactNode, useContext, useState } from "react";

const FuncaoContext = createContext<VIPFuncaoType | undefined>(undefined);

export const FuncaoProvider = ({ children }: { children: ReactNode }) => {
	const [nome, setNome] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [funcionarios, setFuncionarios] = useState<string>("");
	const [lux, setLux] = useState<string>("");
	const [fisicos, setFisicos] = useState<VIPRiscoType[]>([]);
	const [quimicos, setQuimicos] = useState<VIPRiscoType[]>([]);
	const [biologicos, setBiologicos] = useState<VIPRiscoType[]>([]);
	const [ergonomicos, setErgonomicos] = useState<VIPRiscoType[]>([]);
	const [acidentes, setAcidentes] = useState<VIPRiscoType[]>([]);
	const [fisicoExiste, setFisicoExiste] = useState<boolean | undefined>();
	const [quimicoExiste, setQuimicoExiste] = useState<boolean | undefined>();
	const [biologicoExiste, setBiologicoExiste] = useState<
		boolean | undefined
	>();
	const [ergonomicoExiste, setErgonomicoExiste] = useState<
		boolean | undefined
	>();
	const [acidenteExiste, setAcidenteExiste] = useState<boolean | undefined>();

	const clear = () => {
		setNome("");
		setDescription("");
		setFuncionarios("");
		setFisicos([]);
		setQuimicos([]);
		setBiologicos([]);
		setErgonomicos([]);
		setAcidentes([]);
		setFisicoExiste(undefined);
		setQuimicoExiste(undefined);
		setBiologicoExiste(undefined);
		setErgonomicoExiste(undefined);
		setAcidenteExiste(undefined);
		setLux("");
	};

	const load = (funcao: VIPFuncaoType) => {
		setNome(funcao.nome);
		setDescription(funcao.description);
		setFuncionarios(funcao.funcionarios);
		setLux(funcao.lux);
		setFisicos(funcao.Fisico.riscos);
		setQuimicos(funcao.Quimico.riscos);
		setBiologicos(funcao.Biologico.riscos);
		setErgonomicos(funcao.Ergonomico.riscos);
		setAcidentes(funcao.Acidente.riscos);
		setFisicoExiste(funcao.Fisico.existe);
		setQuimicoExiste(funcao.Quimico.existe);
		setBiologicoExiste(funcao.Biologico.existe);
		setErgonomicoExiste(funcao.Ergonomico.existe);
		setAcidenteExiste(funcao.Acidente.existe);
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
				lux,
				setLux,
				Acidente: {
					existe: acidenteExiste,
					setExiste: setAcidenteExiste,
					riscos: acidentes,
					setRiscos: setAcidentes,
				},
				Biologico: {
					existe: biologicoExiste,
					setExiste: setBiologicoExiste,
					riscos: biologicos,
					setRiscos: setBiologicos,
				},
				Ergonomico: {
					existe: ergonomicoExiste,
					setExiste: setErgonomicoExiste,
					riscos: ergonomicos,
					setRiscos: setErgonomicos,
				},
				Fisico: {
					existe: fisicoExiste,
					setExiste: setFisicoExiste,
					riscos: fisicos,
					setRiscos: setFisicos,
				},
				Quimico: {
					existe: quimicoExiste,
					setExiste: setQuimicoExiste,
					riscos: quimicos,
					setRiscos: setQuimicos,
				},
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
