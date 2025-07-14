import { VIPEmpresaType } from "./VIPEmpresaType";
import { VIPRespostaType } from "./VIPPerguntaType";
import VIPSetorType from "./VIPSetorType";

export interface VIPVisitaType {
	id: string;
	empresa: VIPEmpresaType | null;
	responsavel: string;
	tecnico: string;
    data: string;
    horaEntrada: string;
    horaSaida: string;
	empresas: VIPEmpresa[];
	perguntas: { adm: VIPPerguntaType[]; setor: VIPPerguntaType[] };
	respostas: VIPRespostaType[];
	setores: VIPSetorType[];
	assinatura?: string;
	setEmpresa: (value: VIPVisitaType["empresa"]) => void;
	setResponsavel: (value: string) => void;
	setTecnico: (value: string) => void;
	addResposta: (resposta: VIPRespostaType) => void;
	addSetor: (setor: VIPSetorType) => void;
	removerSetor: (id: string) => void;
	clear: () => void;
}
