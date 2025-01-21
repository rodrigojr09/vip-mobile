export interface VIPEmpresaType {
	responsavel: string;
	setResponsavel: (value: string) => void;
	nome: string;
	setNome: (value: string) => void;
	setores: VIPSetorType[];
	setSetores: (value: VIPSetorType[]) => void;
	clear: () => void;
}
export interface VIPSetorType {
	id: string;
	nome: string;
	setNome: (value: string) => void;
	comprimento: string;
	setComprimento: (value: string) => void;
	largura: string;
	setLargura: (value: string) => void;
	peDireito: string;
	setPeDireito: (value: string) => void;
	piso: string;
	setPiso: (value: string) => void;
	estrutura: string;
	setEstrutura: (value: string) => void;
	forro: string;
	setForro: (value: string) => void;
	iluminacao: {
		natural: string;
		artificial: string;
		setNatural: (value: string) => void;
		setArtificial: (value: string) => void;
	};
	ventilacao: {
		natural: string;
		artificial: string;
		setNatural: (value: string) => void;
		setArtificial: (value: string) => void;
	};
	me: string;
	setMe: (value: string) => void;
	mce: string;
	setMce: (value: string) => void;
	mcr: string;
	setMcr: (value: string) => void;
	funcoes: VIPFuncaoType[];
	setFuncoes: (value: VIPFuncaoType[]) => void;
	images: string[];
	setImages: (value: string[]) => void;
	extintores: boolean | undefined;
	setExtintores: (value: boolean) => void;
	saidaEmergencia: boolean | undefined;
	setSaidaEmergencia: (value: boolean) => void;
	rotaFuga: boolean | undefined;
	setRotaFuga: (value: boolean) => void;
	sinalizacaoEmergencia: boolean | undefined;
	setSinalizacaoEmergencia: (value: boolean) => void;
	clear: () => void;
}

export interface VIPRiscoType {
	risco: string;
	setRisco: (value: string) => void;
	exposicao: string;
	setExposicao: (value: string) => void;
	fonteGeradora: string;
	setFonteGeradora: (value: string) => void;
	possuiEpi: boolean | undefined;
	setPossuiEpi: (value: boolean) => void;
	recomendarEpi: boolean | undefined;
	setRecomendarEpi: (value: boolean) => void;
	epis: {
		recomendados: VIPEpiType[];
		existentes: VIPEpiType[];
		setRecomendados: (value: VIPEpiType[]) => void;
		setExistentes: (value: VIPEpiType[]) => void;
	};
	clear: () => void;
}

export interface VIPEpiType {
	nome: string;
	setNome: (value: string) => void;
	periodicidade: {
		tempo: string;
		setTempo: (value: string) => void;
		tipo: "Dias" | "Mês" | "Dia" | "Mêses" | undefined;
		setTipo: (tipo: "Dias" | "Mês" | "Dia" | "Mêses" | undefined) => void;
	};
	risco?: string;
	clear: () => void;
}

export interface VIPFuncaoType {
	nome: string;
	setNome: (value: string) => void;
	description: string;
	setDescription: (value: string) => void;
	funcionarios: string;
	setFuncionarios: (value: string) => void;
	lux: string;
	setLux: (value: string) => void;
	Fisico: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	Quimico: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	Biologico: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	Ergonomico: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	Acidente: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	clear: () => void;
}

type VIPRiscosTipo =
	| "Fisico"
	| "Quimico"
	| "Biologico"
	| "Ergonomico"
	| "Acidente";
