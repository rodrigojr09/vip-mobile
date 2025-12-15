import { createContext, type ReactNode, useContext, useState } from "react";
import type {
	EmpresaType,
	FuncaoType,
	LevantamentoProps,
	RiscoType,
	SetorType,
} from "@/types/Levantamento";

const LevantamentoContext = createContext<LevantamentoProps | null>(null);

export default function Levantamento({ children }: { children: ReactNode }) {
	const defaultEmpresa: EmpresaType = {
		id: "",
		responsavel: "",
		nome: "",
		setores: [],
		data: "",
	};

	const [empresa, setEmpresa] = useState<EmpresaType>(defaultEmpresa);
	const [setorSelecionado, setSetorSelecionado] = useState<string>();
	const [funcaoSelecionada, setFuncaoSelecionada] = useState<string>();

	function selecionarSetor(id: string) {
		setSetorSelecionado(id);
		setFuncaoSelecionada(undefined);
	}

	function selecionarFuncao(id: string) {
		setFuncaoSelecionada(id);
	}

	function clear() {
		setEmpresa(defaultEmpresa);
		setSetorSelecionado(undefined);
		setFuncaoSelecionada(undefined);
	}

	const atualizarEmpresa = (
		key: keyof EmpresaType,
		value: string | SetorType[],
	) => setEmpresa((prev) => ({ ...prev, [key]: value }));

	const atualizarSetor = (key: keyof SetorType, value: string | FuncaoType[]) =>
		setEmpresa((prev) => ({
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

	const atualizarFuncao = (
		key: keyof FuncaoType,
		value: string | RiscoType[],
	) =>
		setEmpresa((prev) => ({
			...prev,
			setores: prev.setores.map((setor) => {
				if (setor.id === setorSelecionado) {
					return {
						...setor,
						funcoes: setor.funcoes.map((funcao) => {
							if (funcao.id === funcaoSelecionada) {
								return {
									...funcao,
									[key]: value,
								};
							}
							return funcao;
						}),
					};
				}
				return setor;
			}),
		}));

	function serialize() {
		return JSON.stringify(empresa);
	}

	return (
		<LevantamentoContext.Provider
			value={{
				selecionarSetor,
				selecionarFuncao,
				atualizarEmpresa,
				atualizarFuncao,
				atualizarSetor,
				clear,
				serialize,
				empresa,
				setor: empresa.setores.find((a) => a.id === setorSelecionado),
				funcao: empresa.setores
					.find((a) => a.id === setorSelecionado)
					?.funcoes.find((a) => a.id === funcaoSelecionada),
			}}
		>
			{children}
		</LevantamentoContext.Provider>
	);
}

export function useLevantamento() {
	const context = useContext(LevantamentoContext);
	if (!context) {
		throw new Error(
			"useLevantamento must be used within a LevantamentoProvider",
		);
	}
	return context;
}

export enum FuncTypes {
	EMPRESA = "atualizarEmpresa",
	SETOR = "atualizarSetor",
	FUNCAO = "atualizarFuncao",
}
