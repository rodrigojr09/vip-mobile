export interface VIPPerguntaType {
	id: string;
	pergunta: string;
}

export interface VIPRespostaType {
	id: string;
	pergunta: string;
	observation?: string;
	checked: boolean | null;
}
