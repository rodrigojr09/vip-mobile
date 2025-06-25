export type Resposta = {
	pergunta: string;
	value: "Sim" | "Não" | "NA" | null;
	observation?: string;
};

export interface Question {
	label: string;
	perguntas: string[];
}

export interface VIPVisitaType {
	respostas: Resposta[];
	empresa: Empresa | null;
	visitante: string;
	data: string;
	acompanhante: string;
	perguntas: Question[];
	empresas: Empresa[];
	setRespostas: React.Dispatch<React.SetStateAction<Resposta[]>>;
	setEmpresa: React.Dispatch<React.SetStateAction<Empresa | null>>;
	setVisitante: React.Dispatch<React.SetStateAction<string>>;
	setAcompanhante: React.Dispatch<React.SetStateAction<string>>;
	setPerguntas: React.Dispatch<React.SetStateAction<Question[]>>;
	clear: () => void;
}

export interface Visita {
	id: string;
	respostas: any[];
	visitante: string;
	data: string;
	acompanhante: string;
	perguntas: any[];
	empresaId: string;
}

export interface Empresa {
	id: string;
	token: string;
	razao_social: string;
	nome_fantasia: string;
	cnpj: string;
	visitas: Visita[];
}
