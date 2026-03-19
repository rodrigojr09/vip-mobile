import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef } from "react";
import { Alert, StyleSheet, type TextInput } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import VIPTabela from "@/components/VIPTabela";
import { useEmpresa } from "@/hooks/Levantamento/EmpresaProvider";
import { useSetor } from "@/hooks/Levantamento/SetorProvider";
import { useNavigationHistory } from "@/hooks/Navigation";

const campos = 12;

const validationRules = [
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.nome.trim(), message: "Nome do setor invalido!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.largura.trim(), message: "Largura do setor invalida!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.comprimento.trim(), message: "Comprimento do setor invalido!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.peDireito.trim(), message: "Pe direito do setor invalido!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.piso.trim(), message: "Piso do setor invalido!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.estrutura.trim(), message: "Estrutura do setor invalida!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.forro.trim(), message: "Forro do setor invalido!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.iluminacao.natural.trim(), message: "Iluminacao natural do setor invalida!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.iluminacao.artificial.trim(), message: "Iluminacao artificial do setor invalida!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.ventilacao.natural.trim(), message: "Ventilacao natural do setor invalida!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.ventilacao.artificial.trim(), message: "Ventilacao artificial do setor invalida!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.me.trim(), message: "Maquinas e equipamentos invalidos!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.mce.trim(), message: "Medidas de controle existentes invalidas!" },
	{ isValid: (setor: ReturnType<typeof useSetor>) => setor.mcr.trim(), message: "Medidas de controle recomendadas invalidas!" },
];

export default function Setor() {
	const nav = useNavigationHistory();
	const params = useLocalSearchParams();
	const empresa = useEmpresa();
	const setor = useSetor();
	const refs = useRef<TextInput[]>([]);

	const isEditing = typeof params.setor === "string" && params.setor.length > 0;

	useEffect(() => {
		if (isEditing && setor.nome === "") {
			const selectedSetor = empresa.setores.find((item) => item.id === params.setor);
			if (selectedSetor) setor.load(selectedSetor);
		}

		return () => {
			setor.clear();
		};
	}, []);

	function focarProximo(index: number) {
		if (index + 1 <= campos) {
			refs.current[index + 1]?.focus();
		}
	}

	function validateForm() {
		for (const rule of validationRules) {
			if (!rule.isValid(setor)) {
				Alert.alert("Erro", rule.message);
				return false;
			}
		}

		return true;
	}

	function persistSetor() {
		if (isEditing) {
			empresa.setSetores(
				empresa.setores.map((item) => {
					if (item.id !== params.setor) return item;
					return setor;
				}),
			);
		} else {
			empresa.setSetores([...empresa.setores, setor]);
		}

		nav.back();
	}

	function handleSave() {
		if (!validateForm()) return;

		if (setor.funcoes.length === 0) {
			Alert.alert(
				"Confirmacao",
				"Realmente nao existe nenhuma funcao no setor?",
				[
					{ text: "Cancelar", style: "cancel" },
					{
						text: "Confirmar",
						onPress: persistSetor,
					},
				],
				{ cancelable: false },
			);
			return;
		}

		persistSetor();
	}

	const sectorInputs = [
		{
			placeholder: "Digite o nome do setor...",
			value: setor.nome,
			onChange: setor.setNome,
		},
		{
			placeholder: "Digite o lux do setor...",
			value: setor.lux,
			onChange: setor.setLux,
		},
		{
			placeholder: "Digite a largura setor...",
			value: setor.largura,
			onChange: setor.setLargura,
		},
		{
			placeholder: "Digite o comprimento do setor...",
			value: setor.comprimento,
			onChange: setor.setComprimento,
		},
		{
			placeholder: "Digite o pe direito do setor...",
			value: setor.peDireito,
			onChange: setor.setPeDireito,
		},
		{
			placeholder: "Digite o piso do setor...",
			value: setor.piso,
			onChange: setor.setPiso,
		},
		{
			placeholder: "Digite a estrutura do setor...",
			value: setor.estrutura,
			onChange: setor.setEstrutura,
		},
		{
			placeholder: "Digite o forro do setor...",
			value: setor.forro,
			onChange: setor.setForro,
		},
		{
			placeholder: "Digite a iluminacao natural do setor...",
			value: setor.iluminacao.natural,
			onChange: setor.iluminacao.setNatural,
		},
		{
			placeholder: "Digite a iluminacao artificial do setor...",
			value: setor.iluminacao.artificial,
			onChange: setor.iluminacao.setArtificial,
		},
		{
			placeholder: "Digite a ventilacao natural do setor...",
			value: setor.ventilacao.natural,
			onChange: setor.ventilacao.setNatural,
		},
		{
			placeholder: "Digite a ventilacao artificial do setor...",
			value: setor.ventilacao.artificial,
			onChange: setor.ventilacao.setArtificial,
		},
	];

	const textareaInputs = [
		{
			placeholder: "Digite as maquinas e equipamentos presente setor",
			value: setor.me,
			onChange: setor.setMe,
		},
		{
			placeholder: "Digite as medidas de controle existentes no setor",
			value: setor.mce,
			onChange: setor.setMce,
		},
		{
			placeholder: "Digite as medidas de controle recomendadas para o setor",
			value: setor.mcr,
			onChange: setor.setMcr,
		},
	];

	return (
		<Container style={styles.formContainer} scroller>
			{sectorInputs.map((field, index) => (
				<Input
					key={field.placeholder}
					placeholder={field.placeholder}
					value={field.value}
					onChange={field.onChange}
					ref={(ref) => {
						if (ref) refs.current[index] = ref;
					}}
					returnKeyType={index === campos - 1 ? "done" : "next"}
					onSubmitEditing={() => focarProximo(index)}
				/>
			))}

			{textareaInputs.map((field, index) => (
				<Input
					key={field.placeholder}
					placeholder={field.placeholder}
					value={field.value}
					textarea
					ref={(ref) => {
						if (index === 0 && ref) refs.current[12] = ref;
					}}
					onChange={field.onChange}
				/>
			))}

			<VIPTabela
				headers={["Função", "Descrição", "Riscos"]}
				valores={setor.funcoes.map((funcao) => ({
					id: funcao.id,
					Função: funcao.nome,
					Descrição: funcao.description,
					Riscos: `${funcao.riscos.length}`,
				}))}
				onExcluir={(item) =>
					setor.setFuncoes(setor.funcoes.filter((funcao) => funcao.id !== item.id))
				}
				goTo={(item) => {
					nav.push({
						pathname: "/Levantamento/funcao",
						params: {
							funcao: item.id,
						},
					});
				}}
			/>

			<Button onPress={() => nav.push("/Levantamento/funcao")}>
				Adicionar Função
			</Button>

			<Button onPress={handleSave}>{isEditing ? "Atualizar" : "Criar"}</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
});
