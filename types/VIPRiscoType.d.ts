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
		tipo: "Dias" | "Mês" | "Dia" | "Mêses";
		setTipo: (tipo: "Dias" | "Mês" | "Dia" | "Mêses") => void;
	};
	risco?: string;
	clear: () => void;
}
