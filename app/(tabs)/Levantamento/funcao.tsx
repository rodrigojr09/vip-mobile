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
import Button from "@/components/Button";
import Container from "@/components/Container";
import RiscoForm from "@/components/RiscoForm";
import "react-native-get-random-values";
import { Form } from "@/components/v2/Levantamento/Form";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useLevantamento } from "@/hooks/v2/Levantamentos/Levantamento";

export default function Funcao() {
	const nav = useNavigationHistory();
	const levantamento = useLevantamento();
	const params = useLocalSearchParams();

	useEffect(() => {
		if (params.funcao) {
			const hasFuncao = levantamento.setor?.funcoes.find(
				(a) => a.id === (params.funcao as string),
			);
			if (hasFuncao) levantamento.selecionarFuncao(hasFuncao.id);
		} else {
			const funcao = {
				id: uuidv4(),
				nome: "",
				description: "",
				funcionarios: "",
				riscos: [],
			};
			levantamento.atualizarSetor("funcoes", [
				...(levantamento.setor?.funcoes || []),
				funcao,
			]);
			levantamento.selecionarFuncao(funcao.id);
		}
		return () => {
			levantamento.selecionarSetor("");
			levantamento.selecionarFuncao("");
		};
	}, []);

	const salvarFuncao = () => {
		if (!levantamento.funcao?.nome.trim())
			return Alert.alert("Digite o nome da função");
		if (!levantamento.funcao?.description.trim())
			return Alert.alert("Digite a descrição da função");
		if (!levantamento.funcao?.funcionarios.trim())
			return Alert.alert("Digite o nome dos funcionarios da função");

		levantamento.selecionarFuncao("");
		nav.back();
	};

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

	const inputs = [
		{ placeholder: "Digite o nome da função...", name: "nome" },
		{ placeholder: "Digite a descrição da função...", name: "description" },
		{
			placeholder: "Digite o nome dos funcionarios da função...",
			name: "funcionarios",
		},
	];

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
				<Form campos={inputs} onSubmit={salvarFuncao} type="FUNCAO" />

				<RiscoForm />

				<Button
					onPress={() => {
						salvarFuncao();
					}}
				>
					{params.funcao ? "Atualizar" : "Adicionar"}
				</Button>
			</Container>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		padding: 20,
	},
});
