import { Question, Resposta, VIPVisitaType } from "@/types/VIPVisitaType";
import { getQuests } from "@/utils/API/Quests";
import questions from "@/utils/questions";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const VisitaContext = createContext<VIPVisitaType | undefined>(undefined);

export default function VisitaProvider({ children }: { children: ReactNode }) {
	const [empresa, setEmpresa] = useState<string>("");
	const [visitante, setVisitante] = useState<string>("");
	const [acompanhante, setAcompanhante] = useState<string>("");
	const [perguntas, setPerguntas] = useState<Question[]>([]);
    const [respostas, setRespostas] = useState<Resposta[]>([]);
    
    useEffect(() => {
        (async () => {
            const questions = await getQuests();
            setPerguntas(questions || []);
        })
	}, []);

	return (
		<VisitaContext.Provider
			value={{
				empresa,
				setEmpresa,
				visitante,
				setVisitante,
				acompanhante,
				setAcompanhante,
				perguntas,
				setPerguntas,
				respostas,
                setRespostas,
                clear: () => {
                    setEmpresa("");
                    setVisitante("");
                    setAcompanhante("");
                    setPerguntas([]);
                    setRespostas([]);
                }
			}}
		>
			{children}
		</VisitaContext.Provider>
	);
}

export function useVisita() {
	const context = useContext(VisitaContext);
	if (!context) {
		throw new Error("useVisita must be used within a VisitaProvider");
	}
	return context;
}
