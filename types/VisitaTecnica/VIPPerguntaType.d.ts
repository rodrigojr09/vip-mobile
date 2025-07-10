export interface VIPPerguntaType {
	id: string;
    pergunta: string;
    type?: "sim" | "nao" | "na";
    subpergunta?: VIPPerguntaType[];
}

export interface VIPRespostaType {
	id: string;
	pergunta: string;
	observation?: string;
	checked: boolean | null;
	subresposta: {
		pergunta: string;
		checked: boolean | null;
		observation?: string;
		subresposta: VIPRespostaType["subresposta"];
	};
}
