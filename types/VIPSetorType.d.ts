import { VIPFuncaoType } from "./VIPFuncaoType";

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
	load: (setor: VIPSetorType) => void;
}
