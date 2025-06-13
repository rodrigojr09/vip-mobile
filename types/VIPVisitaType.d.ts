export type Resposta = {
	pergunta: string;
	value: "Sim" | "Não" | "N/A" | null;
	observation?: string;
};

export interface Question {
	label: string;
	subquest: {
		true: Question;
		false: Question;
	} | null;
}

export interface VIPVisitaType {
	respostas: Resposta[];
	empresa: string;
	visitante: string;
	acompanhante: string;
	perguntas: Question[];
	setRespostas: React.Dispatch<React.SetStateAction<Resposta[]>>;
	setEmpresa: React.Dispatch<React.SetStateAction<string>>;
	setVisitante: React.Dispatch<React.SetStateAction<string>>;
	setAcompanhante: React.Dispatch<React.SetStateAction<string>>;
    setPerguntas: React.Dispatch<React.SetStateAction<Question[]>>;
    clear: () => void;
}
