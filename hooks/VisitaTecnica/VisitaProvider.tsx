import { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useCallback,
} from "react";
import Data from "@/utils/API/Data";

// Tipagem segura para o contexto
interface VisitaContextType extends VIPVisitaType {
	setEmpresa: (empresa: VIPVisitaType["empresa"] | null) => void;
	setResponsavel: (responsavel: string) => void;
	setTecnico: (tecnico: string) => void;
	addResposta: (resposta: VIPVisitaType["respostas"][number]) => void;
	clear: () => void;
}

const VisitaContext = createContext<VisitaContextType | undefined>(undefined);

export default function VisitaProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [empresa, setEmpresa] = useState<VIPVisitaType["empresa"] | null>(
		null
	);
	const [responsavel, setResponsavel] = useState<string>("");
	const [tecnico, setTecnico] = useState<string>("");
	const [respostas, setRespostas] = useState<VIPVisitaType["respostas"]>([]);
	const [perguntas, setPerguntas] = useState<VIPVisitaType["perguntas"]>({
		adm: [],
		setor: [],
	});
	const [setores, setSetores] = useState<VIPVisitaType["setores"]>([]);
	const [empresas, setEmpresas] = useState<VIPVisitaType["empresas"]>([]);

	const dataFormatada = new Date().toLocaleDateString("pt-BR");

	// Adiciona ou atualiza uma resposta
	const addResposta = useCallback(
		(resposta: VIPVisitaType["respostas"][number]) => {
			setRespostas((prev) => {
				const index = prev.findIndex(
					(r) => r.pergunta === resposta.pergunta
				);

				if (index !== -1) {
					const existente = prev[index];
					// Remove se for igual
					if (
						existente.checked === resposta.checked &&
						existente.observation === resposta.observation
					) {
						return prev.filter((_, i) => i !== index);
					}

					// Atualiza
					return prev.map((r, i) =>
						i === index ? { ...r, ...resposta } : r
					);
				}

				// Adiciona
				return [...prev, resposta];
			});
		},
		[]
	);

	const clear = () => {
		setEmpresa(null);
		setResponsavel("");
		setTecnico("");
		setRespostas([]);
		setSetores([]);
	};

	useEffect(() => {
		setEmpresas(Data.empresas);
		setPerguntas(Data.perguntas);
		console.log(Data.empresas.length, "empresas carregadas");
		console.log(
			Data.perguntas.adm.length,
			"perguntas administrativas carregadas"
		);
		console.log(
			Data.perguntas.setor.length,
			"perguntas de setor carregadas"
		);
	}, []);

	return (
		<VisitaContext.Provider
			value={{
				id: uuidv4(),
				empresa,
				setEmpresa,
				responsavel,
				setResponsavel,
				tecnico,
				setTecnico,
				respostas,
				perguntas,
				empresas,
				data: dataFormatada,
				addResposta,
				setores,
				removerSetor: (id: string) => {
					setSetores((prev) => prev.filter((s) => s.id !== id));
				},

				addSetor(setor) {
					setSetores((prev) => {
						const index = prev.findIndex((s) => s.id === setor.id);
						if (index !== -1) {
							// Atualiza o setor existente
							return prev.map((s, i) =>
								i === index ? setor : s
							);
						}
						// Adiciona novo setor
						return [...prev, setor];
					});
				},
				clear,
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
