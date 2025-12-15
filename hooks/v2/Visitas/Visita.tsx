import { createContext, useContext, useState } from "react";
import type SetorType from "@/types/Visita";
import type {
	EmpresaType,
	RespostaType,
	VisitaProps,
	VisitaType,
} from "@/types/Visita";

const VisitaContext = createContext<VisitaProps | null>(null);

export default function VisitaProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const defaultVisita: VisitaType = {
		id: "",
		empresa: null,
		responsavel: "",
		tecnico: "",
		data: "",
		horaEntrada: "",
		horaSaida: "",
		respostas: [],
		setores: [],
	};

	const [visita, setVisita] = useState<VisitaType>(defaultVisita);
	const [setorSelecionado, setSetorSelecionado] = useState<string>("");

	const atualizarVisita = (
		key: keyof VisitaType,
		value: string | EmpresaType | SetorType[] | RespostaType[] | null,
	) => {
		setVisita((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const atualizarSetor = (
		key: keyof SetorType,
		value: string | RespostaType[],
	) => {
		setVisita((prev) => ({
			...prev,
			setores: prev.setores.map((setor) => {
				if (setor.id === setorSelecionado) {
					return {
						...setor,
						[key]: value,
					};
				}
				return setor;
			}),
		}));
	};

	const selecionarSetor = (id: string) => {
		setSetorSelecionado(id);
	};

	const serialize = () => JSON.stringify(visita);

	const clear = () => {
		setVisita(defaultVisita);
		setSetorSelecionado("");
	};

	return (
		<VisitaContext.Provider
			value={{
				visita,
				setor: visita.setores.find((setor) => setor.id === setorSelecionado),
				atualizarVisita,
				atualizarSetor,
				selecionarSetor,
				serialize,
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
