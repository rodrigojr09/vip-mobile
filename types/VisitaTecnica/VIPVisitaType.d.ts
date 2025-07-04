import { VIPEmpresaType } from "./VIPEmpresaType";
import { VIPRespostaType } from "./VIPPerguntaType";

export interface VIPVisitaType {
    id: string;
	empresa: VIPEmpresaType | null;
	responsavel: string;
	tecnico: string;
	data: string;
	empresas: VIPEmpresa[];
	perguntas: VIPPerguntaType[];
    respostas: VIPRespostaType[];
    assinatura?: string;
	setEmpresa: (value: VIPVisitaType["empresa"]) => void;
	setResponsavel: (value: string) => void;
	setTecnico: (value: string) => void;
	addResposta: (resposta: VIPRespostaType) => void;
	clear: () => void;
}
