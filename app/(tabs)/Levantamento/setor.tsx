import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	type ScrollView,
	StyleSheet,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import Button from "@/components/Button";
import Container from "@/components/Container";
import VIPTabela from "@/components/VIPTabela";
import { Form } from "@/components/v2/Levantamento/Form";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useLevantamento } from "@/hooks/v2/Levantamentos/Levantamento";

export default function Setor() {
	const nav = useNavigationHistory();
	const params = useLocalSearchParams();
	const levantamento = useLevantamento();

	async function validarSetor() {
		if (!levantamento.setor?.nome.trim())
			throw Alert.alert("Erro", "Nome do setor inválido!");
		if (!levantamento.setor?.largura.trim())
			throw Alert.alert("Erro", "Largura do setor inválida!");
		if (!levantamento.setor?.comprimento.trim())
			throw Alert.alert("Erro", "Comprimento do setor inválido!");
		if (!levantamento.setor?.peDireito.trim())
			throw "Pé direito do setor inválido!";
		if (!levantamento.setor?.piso.trim()) throw "Piso do setor inválido!";
		if (!levantamento.setor?.estrutura.trim())
			throw "Estrutura do setor inválida!";
		if (!levantamento.setor?.forro.trim()) throw "Forro do setor inválido!";
		if (!levantamento.setor?.iluminacaoNatural.trim())
			throw "Iluminação natural do setor inválida!";
		if (!levantamento.setor?.iluminacaoArtificial.trim())
			throw "Iluminação artificial do setor inválida!";
		if (!levantamento.setor?.ventilacaoNatural.trim())
			throw "Ventilação natural do setor inválida!";
		if (!levantamento.setor?.ventilacaoArtificial.trim())
			throw "Ventilação artificial do setor inválida!";
		if (!levantamento.setor?.me.trim())
			throw "Máquinas e equipamentos inválidos!";
		if (!levantamento.setor?.mce.trim())
			throw "Medidas de controle existentes inválidas!";
		if (!levantamento.setor?.mcr.trim())
			throw "Medidas de controle recomendadas inválidas!";

		if (levantamento.setor.funcoes.length === 0) {
			// Confirmação se as funções estão vazias
			return Alert.alert(
				"Confirmação",
				"Realmente não existe nenhuma função no setor?",
				[
					{ text: "Cancelar", style: "cancel" },
					{
						text: "Confirmar",
						onPress: () => {
							nav.back();
						},
					},
				],
				{ cancelable: false },
			);
		}
		return true;
	}

	function salvarSetor() {
		validarSetor()
			.then(() => {
				levantamento.selecionarSetor("");
				levantamento.selecionarFuncao("");
				nav.back();
			})
			.catch((err) => {
				Alert.alert("Erro", err);
			});
	}

	useEffect(() => {
		if (params.setor) {
			const hasSetor = levantamento.empresa.setores.find(
				(a) => a.id === (params.setor as string),
			);
			if (hasSetor) levantamento.selecionarSetor(hasSetor.id);
		} else {
			const setor = {
				id: uuidv4(),
				nome: "",
				largura: "",
				comprimento: "",
				peDireito: "",
				piso: "",
				estrutura: "",
				forro: "",
				iluminacaoArtificial: "",
				iluminacaoNatural: "",
				ventilacaoArtificial: "",
				ventilacaoNatural: "",
				images: [],
				me: "",
				mce: "",
				mcr: "",
				lux: "",
				funcoes: [],
			};
			levantamento.atualizarEmpresa("setores", [
				...levantamento.empresa.setores,
				setor,
			]);
			levantamento.selecionarSetor(setor.id);
		}
		return () => {
			levantamento.selecionarSetor("");
			levantamento.selecionarFuncao("");
		};
	}, []);

	const inputs = [
		{
			placeholder: "Digite o nome do setor...",
			name: "nome",
		},
		{
			placeholder: "Digite o lux do setor...",
			name: "lux",
		},
		{
			placeholder: "Digite a largura do setor...",
			name: "largura",
		},
		{
			placeholder: "Digite o comprimento do setor...",
			name: "comprimento",
		},
		{
			placeholder: "Digite o pe direito do setor...",
			name: "peDireito",
		},
		{
			placeholder: "Digite o piso do setor...",
			name: "piso",
		},
		{
			placeholder: "Digite a estrutura do setor...",
			name: "estrutura",
		},
		{
			placeholder: "Digite o forro do setor...",
			name: "forro",
		},
		{
			placeholder: "Digite a iluminação natural do setor...",
			name: "iluminacaoNatural",
		},
		{
			placeholder: "Digite a iluminação artificial do setor...",
			name: "iluminacaoArtificial",
		},
		{
			placeholder: "Digite a ventilação natural do setor...",
			name: "ventilacaoNatural",
		},
		{
			placeholder: "Digite a ventilação artificial do setor...",
			name: "ventilacaoArtificial",
		},
		{
			placeholder: "Digite as máquinas e equipamentos do setor...",
			name: "me",
		},
		{
			placeholder: "Digite as medidas de controle existentes do setor...",
			name: "mce",
		},
		{
			placeholder: "Digite as medidas de controle recomendadas do setor...",
			name: "mcr",
		},
	];

	const scrollRef = useRef<ScrollView>(null);
	const [kbHeight, setKbHeight] = useState(0);

	useEffect(() => {
		const showEvt =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvt =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		const onShow = (e: any) => {
			const h = e.endCoordinates?.height ?? 0;
			setKbHeight(h);
		};

		const onHide = () => setKbHeight(0);

		const subShow = Keyboard.addListener(showEvt, onShow);
		const subHide = Keyboard.addListener(hideEvt, onHide);

		return () => {
			subShow.remove();
			subHide.remove();
		};
	}, []);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === "ios" ? "padding" : "height"} // iOS usa padding, Android height
		>
			<Container
				scrollRef={scrollRef}
				style={styles.formContainer}
				contentContainerStyle={{ paddingBottom: kbHeight + 24 }}
				scroller
				avoidKeyboard
			>
				<Form campos={inputs} onSubmit={() => salvarSetor()} type="SETOR" />
				<VIPTabela
					headers={["Função", "Descrição", "Riscos"]}
					valores={
						levantamento.setor?.funcoes.map((a) => {
							return {
								id: a.id,
								// prettier-ignore
								Função: a.nome,
								// prettier-ignore
								Descrição: a.description,
								// prettier-ignore
								Riscos: `${a.riscos.length}`,
							};
						}) || []
					}
					onExcluir={(item) =>
						levantamento.atualizarSetor(
							"funcoes",
							levantamento.setor?.funcoes.filter((a) => a.id !== item.id) || [],
						)
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
				<Button
					onPress={() => {
						nav.push("/Levantamento/funcao");
					}}
				>
					Adicionar Função
				</Button>
				<Button onPress={() => salvarSetor()}>
					{params.setor ? "Atualizar" : "Criar"}
				</Button>
			</Container>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
});
