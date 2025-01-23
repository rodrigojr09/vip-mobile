import { VIPSetorType } from "@/types/VIPSetorType";
import { VIPFuncaoType } from "@/types/VIPFuncaoType";
import { createContext, ReactNode, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SetorContext = createContext<VIPSetorType | undefined>(undefined);

export function SetorProvider({ children }: { children: ReactNode }) {
	const [nome, setNome] = useState<string>("");
	const [comprimento, setComprimento] = useState<string>("");
	const [largura, setLargura] = useState<string>("");
	const [peDireito, setPeDireito] = useState<string>("");
	const [piso, setPiso] = useState<string>("");
	const [estrutura, setEstrutura] = useState<string>("");
	const [forro, setForro] = useState<string>("");
	const [iluminacaoNatural, setIluminacaoNatural] = useState<string>("");
	const [iluminacaoArtificial, setIluminacaoArtificial] =
		useState<string>("");
	const [ventilacaoNatural, setVentilacaoNatural] = useState<string>("");
	const [ventilacaoArtificial, setVentilacaoArtificial] =
		useState<string>("");
	const [me, setMe] = useState<string>("");
	const [mce, setMce] = useState<string>("");
	const [mcr, setMcr] = useState<string>("");
	const [funcoes, setFuncoes] = useState<VIPFuncaoType[]>([]);
	const [images, setImages] = useState<string[]>([]);
	const [extintores, setExtintores] = useState<boolean | undefined>();
	const [saidaEmergencia, setSaidaEmergencia] = useState<
		boolean | undefined
	>();
	const [rotaFuga, setRotaFuga] = useState<boolean | undefined>();
	const [sinalizacaoEmergencia, setSinalizacaoEmergencia] = useState<
		boolean | undefined
	>();

	const clear = () => {
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
		setFuncoes([]);
		setImages([]);
		setExtintores(undefined);
		setSaidaEmergencia(undefined);
		setRotaFuga(undefined);
		setSinalizacaoEmergencia(undefined);
	};

	const load = (setor: VIPSetorType) => {
		setNome(setor.nome);
		setComprimento(setor.comprimento);
		setLargura(setor.largura);
		setPeDireito(setor.peDireito);
		setPiso(setor.piso);
		setEstrutura(setor.estrutura);
		setForro(setor.forro);
		setIluminacaoNatural(setor.iluminacao.natural);
		setIluminacaoArtificial(setor.iluminacao.artificial);
		setVentilacaoNatural(setor.ventilacao.natural);
		setVentilacaoArtificial(setor.ventilacao.artificial);
		setMe(setor.me);
		setMce(setor.mce);
		setMcr(setor.mcr);
		setFuncoes(setor.funcoes);
		setImages(setor.images);
		setExtintores(setor.extintores);
		setSaidaEmergencia(setor.saidaEmergencia);
		setRotaFuga(setor.rotaFuga);
		setSinalizacaoEmergencia(setor.sinalizacaoEmergencia);
	};

	return (
		<SetorContext.Provider
			value={{
				id: uuidv4(),
				nome,
				setNome,
				comprimento,
				setComprimento,
				largura,
				setLargura,
				peDireito,
				setPeDireito,
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
				extintores,
				setExtintores,
				saidaEmergencia,
				setSaidaEmergencia,
				rotaFuga,
				setRotaFuga,
				sinalizacaoEmergencia,
				setSinalizacaoEmergencia,
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
