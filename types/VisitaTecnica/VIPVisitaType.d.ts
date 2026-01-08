import type { VIPEmpresaType } from "./VIPEmpresaType";
import type { VIPRespostaType } from "./VIPPerguntaType";
import type VIPSetorType from "./VIPSetorType";

export interface VIPVisitaType {
    id: string;
    empresa: VIPEmpresaType | null;
    inclusas: { id: string; empresa: VIPEmpresaType | null }[];
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

}
