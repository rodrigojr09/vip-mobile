export interface EmpresaType {
    id: string;
    responsavel: string;
    nome: string;
    setores: SetorType[];
    data: string;
    assinatura?: string;
}

export interface SetorType {
    id: string;
    nome: string;
    comprimento: string;
    largura: string;
    peDireito: string;
    piso: string;
    estrutura: string;
    forro: string;
    iluminacaoNatural: string;
    iluminacaoArtificial: string;
    ventilacaoNatural: string;
    ventilacaoArtificial: string;
    me: string;
    mce: string;
    mcr: string;
    funcoes: FuncaoType[];
    images: string[];
    lux: string;
}

export interface FuncaoType {
    id: string;
    nome: string;
    description: string;
    funcionarios: string;
    riscos: RiscoType[];
}

export interface RiscoType {
    id: string;
    risco: string;
    fonteGeradora: string;
}

export type Types = "EMPRESA" | "SETOR" | "FUNCAO";

export enum VarTypes {
    EMPRESA = "empresa",
    SETOR = "setor",
    FUNCAO = "funcao",
}

export interface LevantamentoProps {
    selecionarSetor: (id: string) => void;
    selecionarFuncao: (id: string) => void;
    atualizarEmpresa: (
        key: keyof EmpresaType,
        value: string | SetorType[],
    ) => void;
    atualizarSetor: (key: keyof SetorType, value: string | FuncaoType[]) => void;
    atualizarFuncao: (key: keyof FuncaoType, value: string | RiscoType[]) => void;
    clear: () => void;
    serialize: () => string;
    empresa: EmpresaType;
    setor?: SetorType;
    funcao?: FuncaoType;
}