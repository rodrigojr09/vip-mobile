import type { VIPSetorType } from "@/types/Levantamento/VIPSetorType";

export interface VIPEmpresaType {
	id: string;
	setId: (value: string) => void;
	responsavel: string;
	setResponsavel: (value: string) => void;
	nome: string;
	setNome: (value: string) => void;
	setores: VIPSetorType[];
	data: string;
	setSetores: (value: VIPSetorType[]) => void;
	assinatura?: string;
	clear: () => void;
}
