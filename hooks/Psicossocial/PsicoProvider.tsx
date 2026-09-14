import { createContext, type ReactNode, useContext, useState } from "react";
import type PsicossocialType from "@/types/Psicossocial/PsicossocialType";

interface PsicoContextType extends PsicossocialType {
	setOrientacao: (value: PsicoContextType["orientacao"]) => void;
	setAutorizado: (value: PsicoContextType["autorizado"]) => void;
	setObservacao: (value: PsicoContextType["observacao"]) => void;
	setEmpresa: (value: PsicoContextType["empresa"]) => void;
	setTecnico: (value: PsicoContextType["tecnico"]) => void;
	setResponsavel: (value: PsicoContextType["responsavel"]) => void;
	setInclusas: (value: PsicoContextType["inclusas"]) => void;
	setAssinatura: (value: PsicoContextType["assinatura"]) => void;
    setId: (value: PsicoContextType["id"]) => void;
    setData: (value: PsicoContextType["data"]) => void;
    clear: () => void;
}

const PsicoContext = createContext<PsicoContextType>({} as PsicoContextType);

export default function PsicoProvider({ children }: { children: ReactNode }) {
    const [id, setId] = useState<string>("");
	const [orientacao, setOrientacao] =
		useState<PsicoContextType["orientacao"]>(null);
	const [autorizado, setAutorizado] =
		useState<PsicoContextType["autorizado"]>(null);
	const [observacao, setObservacao] = useState<string>("");
	const [empresa, setEmpresa] = useState<PsicoContextType["empresa"]>(null);
	const [inclusas, setInclusas] = useState<PsicoContextType["inclusas"]>([]);
	const [tecnico, setTecnico] = useState<PsicoContextType["tecnico"]>("");
	const [responsavel, setResponsavel] =
		useState<PsicoContextType["responsavel"]>("");
    const [data, setData] = useState<PsicoContextType["data"]>("");

	const [assinatura, setAssinatura] =
		useState<PsicoContextType["assinatura"]>("");

    const clear = () => {
        setOrientacao(null);
        setAutorizado(null);
        setObservacao("");
        setEmpresa(null);
        setInclusas([]);
        setTecnico("");
        setResponsavel("");
        setAssinatura("");
    }

	return (
		<PsicoContext.Provider
			value={{
                id,
                setId,
                data,
                setData,
				orientacao,
				setOrientacao,
				autorizado,
				setAutorizado,
				observacao,
				setObservacao,
				empresa,
				setEmpresa,
				tecnico,
				setTecnico,
				responsavel,
				setResponsavel,
				inclusas,
				setInclusas,
				assinatura,
				setAssinatura,
                clear
			}}
		>
			{children}
		</PsicoContext.Provider>
	);
}

export function usePsico() {
	const context = useContext(PsicoContext);
	if (!context) {
		throw new Error("usePsico must be used within a PsicoProvider");
	}
	return context;
}
