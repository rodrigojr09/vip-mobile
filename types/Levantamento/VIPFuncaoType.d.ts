import { VIPRiscoType } from "./VIPRiscoType";

export interface VIPFuncaoType {
	id: string;
	nome: string;
	setNome: (value: string) => void;
	description: string;
	setDescription: (value: string) => void;
	funcionarios: string;
	setFuncionarios: (value: string) => void;
	lux: string;
	setLux: (value: string) => void;
	Fisico: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	Quimico: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	Biologico: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	Ergonomico: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	Acidente: {
		existe: boolean | undefined;
		setExiste: (value: boolean) => void;
		riscos: VIPRiscoType[];
		setRiscos: (value: VIPRiscoType[]) => void;
	};
	clear: () => void;
	load: (funcao: VIPFuncaoType) => void;
}
