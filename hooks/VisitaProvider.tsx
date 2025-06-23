import {
	Empresa,
	Question,
	Resposta,
	VIPVisitaType,
	Visita,
} from "@/types/VIPVisitaType";
import { Empresas, getEmpresas } from "@/utils/API/Empresas";
import { getQuests } from "@/utils/API/Quests";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

const VisitaContext = createContext<VIPVisitaType | undefined>(undefined);

export default function VisitaProvider({ children }: { children: ReactNode }) {
	const [empresa, setEmpresa] = useState<Empresa | null>(null);
	const [visitante, setVisitante] = useState<string>("");
	const [acompanhante, setAcompanhante] = useState<string>("");
	const [perguntas, setPerguntas] = useState<Question[]>([]);
	const [respostas, setRespostas] = useState<Resposta[]>([]);
    const [empresas, setEmpresas] = useState<Empresa[]>([]);
    
	useEffect(() => {
		(async () => {
			const quests = await getQuests();
			const data = await getEmpresas();
			setPerguntas(quests);
			setEmpresas(data);
		})();
	}, []);
	const hoje = new Date();
	const dia = String(hoje.getDate()).padStart(2, "0");
	const mes = String(hoje.getMonth() + 1).padStart(2, "0");
	const ano = hoje.getFullYear();

	const dataFormatada = `${dia}/${mes}/${ano}`;
	return (
		<VisitaContext.Provider
			value={{
				empresa,
				data: dataFormatada,
				setEmpresa,
				visitante,
				setVisitante,
				acompanhante,
				setAcompanhante,
				perguntas,
				setPerguntas,
				respostas,
				setRespostas,
				empresas,
				clear: () => {
					setEmpresa(null);
					setVisitante("");
					setAcompanhante("");
					setPerguntas([]);
					setRespostas([]);
				},
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
