export interface LevantamentoType {
	nome: string;
	auxiliar: string;
	setores: LevantamentoSetorType[];
	setNome: (value: string) => void;
	setAuxiliar: (value: string) => void;
	setSetores: (value: LevantamentoSetorType[]) => void;
}

export interface LevantamentoSetorType {
	nome: string;
	funcoes: LevantamentoFuncaoType[];
}

export interface LevantamentoFuncaoType {
	nome: string;
}
