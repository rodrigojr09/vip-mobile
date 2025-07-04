import { VIPSetorType } from "@/hooks/Levantamento/SetorProvider";

export interface VIPEmpresaType {
	responsavel: string;
	setResponsavel: (value: string) => void;
	nome: string;
	setNome: (value: string) => void;
	setores: VIPSetorType[];
	data: string;
	setSetores: (value: VIPSetorType[]) => void;
	clear: () => void;
}
