import type { VIPEmpresaType } from "./VIPEmpresaType";
import type { VIPRespostaType } from "./VIPPerguntaType";
import type VIPSetorType from "./VIPSetorType";

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
    setId: (value: string) => void;
    setEmpresa: (value: VIPVisitaType["empresa"]) => void;
    setResponsavel: (value: string) => void;
    setTecnico: (value: string) => void;
    addResposta: (resposta: VIPRespostaType) => void;
    addSetor: (setor: VIPSetorType) => void;
    removerSetor: (id: string) => void;
    clear: () => void;
}
