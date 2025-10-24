import type { VIPRiscoType } from "@/types/Levantamento/VIPRiscoType";

export interface VIPFuncaoType {
    id: string;
    nome: string;
    description: string;
    funcionarios: string;
    riscos: VIPRiscoType[];
    setNome: (value: string) => void;
    setDescription: (value: string) => void;
    setFuncionarios: (value: string) => void;
    setRiscos: (value: VIPRiscoType[]) => void;
    clear: () => void;
    load: (funcao: VIPFuncaoType) => void;
}
