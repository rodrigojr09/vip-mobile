export interface VisitaType {
    id: string;
    empresa: EmpresaType | null;
    responsavel: string;
    tecnico: string;
    data: string;
    horaEntrada: string;
    horaSaida: string;
    respostas: RespostaType[];
    setores: SetorType[];
    assinatura?: string;
}

export interface VisitaProps {
    visita: VisitaType;
    setor?: SetorType;
    selecionarSetor: (id: string) => void;
    atualizarVisita: (key: keyof VisitaType, value: string | EmpresaType | SetorType[] | RespostaType[] | null) => void;
    atualizarSetor: (key: keyof SetorType, value: string | RespostaType[]) => void;
    clear: () => void;
    serialize: () => string;
}

export interface EmpresaType {
    id: string;
    token: string;
    razao_social: string;
    nome_fantasia: string;
    cnpj: string;
    visitas?: Visita[];
}

export default interface SetorType {
    id: string;
    nome: string;
    respostas: RespostaType[];
}


export interface PerguntaType {
    id: string;
    pergunta: string;
    when?: "sim" | "não" | "na";
    type: "boolean" | "check" | "info" | "text";
    subpergunta?: PerguntaType[];
}

export interface RespostaType {
    pergunta: string;
    observation?: string;
    checked: "Sim" | "Não" | "NA" | "Check" | null;
}
