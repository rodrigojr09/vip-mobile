import { createContext, type ReactNode, useContext, useState } from "react";
import type { VIPFuncaoType } from "@/types/Levantamento/VIPFuncaoType";
import type { VIPSetorType } from "@/types/Levantamento/VIPSetorType";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

const SetorContext = createContext<VIPSetorType | undefined>(undefined);

export function SetorProvider({ children }: { children: ReactNode }) {
	const [id, setId] = useState<string>(uuidv4());
	const [nome, setNome] = useState<string>("");
	const [comprimento, setComprimento] = useState<string>("");
	const [largura, setLargura] = useState<string>("");
	const [peDireito, setPeDireito] = useState<string>("");
	const [lux, setLux] = useState<string>("");
	const [piso, setPiso] = useState<string>("");
	const [estrutura, setEstrutura] = useState<string>("");
	const [forro, setForro] = useState<string>("");
	const [iluminacaoNatural, setIluminacaoNatural] = useState<string>("");
	const [iluminacaoArtificial, setIluminacaoArtificial] = useState<string>("");
	const [ventilacaoNatural, setVentilacaoNatural] = useState<string>("");
	const [ventilacaoArtificial, setVentilacaoArtificial] = useState<string>("");
	const [me, setMe] = useState<string>("");
	const [mce, setMce] = useState<string>("");
	const [mcr, setMcr] = useState<string>("");
	const [funcoes, setFuncoes] = useState<VIPFuncaoType[]>([]);
	const [images, setImages] = useState<string[]>([]);

	const clear = () => {
		setId(uuidv4());
		setNome("");
		setComprimento("");
		setLargura("");
		setPeDireito("");
		setPiso("");
		setEstrutura("");
		setForro("");
		setIluminacaoNatural("");
		setIluminacaoArtificial("");
		setVentilacaoNatural("");
		setVentilacaoArtificial("");
		setMe("");
		setMce("");
		setMcr("");
		setLux("");
		setFuncoes([]);
		setImages([]);
	};

	const load = (setor: VIPSetorType) => {
		setNome(setor.nome);
		setComprimento(setor.comprimento);
		setLargura(setor.largura);
		setPeDireito(setor.peDireito);
		setPiso(setor.piso);
		setEstrutura(setor.estrutura);
		setForro(setor.forro);
		setLux(setor.lux);
		setIluminacaoNatural(setor.iluminacao.natural);
		setIluminacaoArtificial(setor.iluminacao.artificial);
		setVentilacaoNatural(setor.ventilacao.natural);
		setVentilacaoArtificial(setor.ventilacao.artificial);
		setMe(setor.me);
		setMce(setor.mce);
		setMcr(setor.mcr);
		setFuncoes(setor.funcoes);
		setImages(setor.images);
	};

	return (
		<SetorContext.Provider
			value={{
				id,
				nome,
				setNome,
				comprimento,
				setComprimento,
				largura,
				setLargura,
				peDireito,
				setPeDireito,
				lux,
				setLux,
				piso,
				setPiso,
				estrutura,
				setEstrutura,
				forro,
				setForro,
				iluminacao: {
					natural: iluminacaoNatural,
					artificial: iluminacaoArtificial,
					setNatural: setIluminacaoNatural,
					setArtificial: setIluminacaoArtificial,
				},
				ventilacao: {
					natural: ventilacaoNatural,
					artificial: ventilacaoArtificial,
					setNatural: setVentilacaoNatural,
					setArtificial: setVentilacaoArtificial,
				},
				me,
				setMe,
				mce,
				setMce,
				mcr,
				setMcr,
				funcoes,
				setFuncoes,
				images,
				setImages,
				clear,
				load,
			}}
		>
			{children}
		</SetorContext.Provider>
	);
}

export function useSetor() {
	const context = useContext(SetorContext);
	if (!context) {
		throw new Error("useSetor must be used within a LevantamentoProvider");
	}

	return context;
}
