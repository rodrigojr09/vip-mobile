import { VIPPerguntaType, VIPRespostaType } from "./VIPPerguntaType";

export default interface VIPSetorType {
    id: string;
	nome: string;
	respostas: VIPRespostaType[];
	perguntas: VIPPerguntaType[];
}
