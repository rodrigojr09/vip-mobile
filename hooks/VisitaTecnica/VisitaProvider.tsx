import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import manager from "@/utils/Data/manager";

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
	const [id, setId] = useState<string>("");
	const [empresa, setEmpresa] = useState<VIPVisitaType["empresa"] | null>(null);
	const [responsavel, setResponsavel] = useState<string>("");
	const [tecnico, setTecnico] = useState<string>("");
	const [respostas, setRespostas] = useState<VIPVisitaType["respostas"]>([]);
	const [perguntas, setPerguntas] = useState<VIPVisitaType["perguntas"]>({
		adm: [],
		setor: [],
	});
	const [setores, setSetores] = useState<VIPVisitaType["setores"]>([]);
	const [empresas, setEmpresas] = useState<VIPVisitaType["empresas"]>([]);

	const agora = new Date();
	const dia = agora.getDate().toString().padStart(2, "0");
	const mes = (agora.getMonth() + 1).toString().padStart(2, "0");
	const ano = agora.getFullYear();
	const dataFormatada = `${dia}/${mes}/${ano}`;
	const hora = agora.getHours().toString().padStart(2, "0");
	const minutos = agora.getMinutes().toString().padStart(2, "0");
	const horaFormatada = `${hora}:${minutos}`;

	// Adiciona ou atualiza uma resposta
	const addResposta = useCallback(
		(resposta: VIPVisitaType["respostas"][number]) => {
			setRespostas((prev) => {
				const index = prev.findIndex((r) => r.pergunta === resposta.pergunta);

				if (index !== -1) {
					const existente = prev[index];
					// Remove se for igual
					if (
						(existente.checked === resposta.checked &&
							existente.observation === resposta.observation) ||
						(resposta.checked === "Check" && resposta.observation === "")
					) {
						return prev.filter((_, i) => i !== index);
					}

					// Atualiza
					return prev.map((r, i) => (i === index ? { ...r, ...resposta } : r));
				}

				// Adiciona
				return [...prev, resposta];
			});
		},
		[],
	);

	const clear = () => {
		setEmpresa(null);
		setResponsavel("");
		setTecnico("");
		setRespostas([]);
		setSetores([]);
		setId("");
	};

	useEffect(() => {
		setEmpresas(manager.visitas.empresas);
		setPerguntas(manager.visitas.perguntas);
	}, []);

	return (
		<VisitaContext.Provider
			value={{
				id,
                setId,
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
				horaEntrada: horaFormatada,
				horaSaida: "",
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
							return prev.map((s, i) => (i === index ? setor : s));
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
