export interface VIPPerguntaType {
	id: string;
	pergunta: string;
	when?: "sim" | "não" | "na";
	type: "boolean" | "check" | "info" | "text";
	subpergunta?: VIPPerguntaType[];
}

export interface VIPRespostaType {
	pergunta: string;
	observation?: string;
	checked: "Sim" | "Não" | "NA" | "Check" | null;
}
