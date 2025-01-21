import { VIPRiscoType } from "@/types/VIPRiscoType";
import { VIPEpiType } from "@/types/VIPRiscoType";
import { createContext, ReactNode, useContext, useState } from "react";

const RiscoContext = createContext<VIPRiscoType | undefined>(undefined);

export const RiscoProvider = ({ children }: { children: ReactNode }) => {
	const [risco, setRisco] = useState<string>("");
	const [exposicao, setExposicao] = useState<string>("");
	const [fonteGeradora, setFonteGeradora] = useState<string>("");
	const [episExistentes, setEPIsExistentes] = useState<VIPEpiType[]>([]);
	const [episRecomendados, setEPIsRecomendados] = useState<VIPEpiType[]>([]);
	const [possuiEpi, setPossuiEpi] = useState<boolean | undefined>();
	const [recomendarEpi, setRecomendarEpi] = useState<boolean | undefined>();

	const clear = () => {
		setRisco("");
		setExposicao("");
		setFonteGeradora("");
		setEPIsExistentes([]);
		setEPIsRecomendados([]);
		setPossuiEpi(undefined);
		setRecomendarEpi(undefined);
	};

	return (
		<RiscoContext.Provider
			value={{
				risco,
				setRisco,
				exposicao,
				setExposicao,
				fonteGeradora,
				setFonteGeradora,
				possuiEpi,
				setPossuiEpi,
				recomendarEpi,
				setRecomendarEpi,
				epis: {
					recomendados: episRecomendados,
					existentes: episExistentes,
					setExistentes: setEPIsExistentes,
					setRecomendados: setEPIsRecomendados,
				},
				clear,
			}}
		>
			{children}
		</RiscoContext.Provider>
	);
};

export function useRisco() {
	const context = useContext(RiscoContext);
	if (!context) {
		throw new Error("useRisco must be used within a RiscoProvider");
	}

	return context;
}
