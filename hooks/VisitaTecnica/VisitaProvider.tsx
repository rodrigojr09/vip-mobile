import { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
import { getQuests } from "@/utils/API/Quests";
import { getEmpresas } from "@/utils/API/Empresas";

const VisitaContext = createContext<VIPVisitaType | undefined>(undefined);

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

	const [perguntas, setPerguntas] = useState<VIPVisitaType["perguntas"]>([]);
	const [empresas, setEmpresas] = useState<VIPVisitaType["empresas"]>([]);

	const data = new Date();
	const dia = String(data.getDate()).padStart(2, "0");
	const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro = 0
	const ano = data.getFullYear();

	const dataFormatada = `${dia}/${mes}/${ano}`;

	function addResposta(resposta: VIPVisitaType["respostas"][number]) {
		const hasResposta = respostas.find((r) => r.id === resposta.id);
		if (hasResposta) {
			setRespostas((prev) => {
				if (
					hasResposta.checked === resposta.checked &&
					resposta.observation === hasResposta.observation
				) {
					return prev.filter((r) => r.id !== resposta.id);
				} else {
					return prev.map((r) => {
						if (r.id === resposta.id) {
							return {
								...r,
								observation: resposta.observation,
								checked: resposta.checked,
							};
						}
						return r;
					});
				}
			});
		} else {
			setRespostas((prev) => [...prev, resposta]);
		}
	}

	useEffect(() => {
		(async () => {
			const p = await getQuests();
			const e = await getEmpresas();
			setPerguntas(p);
			setEmpresas(e);
		})();
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
				clear: () => {
					setEmpresa(null);
					setResponsavel("");
					setTecnico("");
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
	if (!context)
		throw new Error("useVisita must be used within a VisitaProvider");
	return context;
}
