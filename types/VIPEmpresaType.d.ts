import { VIPSetorType } from "@/hooks/SetorProvider";

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
