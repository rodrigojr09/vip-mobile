import uuid from "react-native-uuid";
import {
	VIPEmpresaType,
	VIPSetorType,
	VIPFuncaoType,
	VIPRiscoType,
	VIPEpiType,
} from "@/types/LevantamentoTypes";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

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

export function VIPSetor(): VIPSetorType {
	const [nome, setNome] = useState<string>("");
	const [comprimento, setComprimento] = useState<string>("");
	const [largura, setLargura] = useState<string>("");
	const [peDireito, setPeDireito] = useState<string>("");
	const [piso, setPiso] = useState<string>("");
	const [estrutura, setEstrutura] = useState<string>("");
	const [forro, setForro] = useState<string>("");
	const [iluminacaoNatural, setIluminacaoNatural] = useState<string>("");
	const [iluminacaoArtificial, setIluminacaoArtificial] =
		useState<string>("");
	const [ventilacaoNatural, setVentilacaoNatural] = useState<string>("");
	const [ventilacaoArtificial, setVentilacaoArtificial] =
		useState<string>("");
	const [me, setMe] = useState<string>("");
	const [mce, setMce] = useState<string>("");
	const [mcr, setMcr] = useState<string>("");
	const [funcoes, setFuncoes] = useState<VIPFuncaoType[]>([]);
	const [images, setImages] = useState<string[]>([]);
	const [extintores, setExtintores] = useState<boolean | undefined>();
	const [saidaEmergencia, setSaidaEmergencia] = useState<
		boolean | undefined
	>();
	const [rotaFuga, setRotaFuga] = useState<boolean | undefined>();
	const [sinalizacaoEmergencia, setSinalizacaoEmergencia] = useState<
		boolean | undefined
	>();

	const clear = () => {
		setNome("");
		setComprimento("");
		setLargura("");
		setPeDireito("");
		setPiso("");
		setEstrutura("");
		setForro("");
		setIluminacaoNatural("");
		setIluminacaoArtificial("");
		setVentilacaoNatural("");
		setVentilacaoArtificial("");
		setMe("");
		setMce("");
		setMcr("");
		setFuncoes([]);
		setImages([]);
		setExtintores(undefined);
		setSaidaEmergencia(undefined);
		setRotaFuga(undefined);
		setSinalizacaoEmergencia(undefined);
	};

	return {
		id: uuid.v4(),
		nome,
		setNome,
		comprimento,
		setComprimento,
		largura,
		setLargura,
		peDireito,
		setPeDireito,
		piso,
		setPiso,
		estrutura,
		setEstrutura,
		forro,
		setForro,
		iluminacao: {
			natural: iluminacaoNatural,
			artificial: iluminacaoArtificial,
			setNatural: setIluminacaoNatural,
			setArtificial: setIluminacaoArtificial,
		},
		ventilacao: {
			natural: ventilacaoNatural,
			artificial: ventilacaoArtificial,
			setNatural: setVentilacaoNatural,
			setArtificial: setVentilacaoArtificial,
		},
		me,
		setMe,
		mce,
		setMce,
		mcr,
		setMcr,
		funcoes,
		setFuncoes,
		images,
		setImages,
		extintores,
		setExtintores,
		saidaEmergencia,
		setSaidaEmergencia,
		rotaFuga,
		setRotaFuga,
		sinalizacaoEmergencia,
		setSinalizacaoEmergencia,
		clear,
	};
}

export function VIPFuncao(): VIPFuncaoType {
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

	return {
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
	};
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
