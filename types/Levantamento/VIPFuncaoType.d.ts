import type { VIPRiscoType } from "@/types/Levantamento/VIPRiscoType";

export interface VIPFuncaoType {
    id: string;
    nome: string;
    setNome: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    funcionarios: string;
    setFuncionarios: (value: string) => void;
    riscos: VIPRiscoType[];
    setRiscos: (value: VIPRiscoType[]) => void;
    clear: () => void;
    load: (funcao: VIPFuncaoType) => void;
}
