import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	type ScrollView,
	StyleSheet,
	type TextInput,
} from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import RiscoForm from "@/components/RiscoForm";
import { useFuncao } from "@/hooks/Levantamento/FuncaoProvider";
import { useSetor } from "@/hooks/Levantamento/SetorProvider";
import { useNavigationHistory } from "@/hooks/Navigation";

export default function Funcao() {
	const nav = useNavigationHistory();
	const setor = useSetor();
	const funcao = useFuncao();
	const params = useLocalSearchParams();

	const campos = 4;
	const refs = useRef<TextInput[]>([]);
	const focarProximo = (index: number) => {
		if (index + 1 < campos) {
			refs.current[index + 1]?.focus();
		} else {
			refs.current[index].blur();
		}
	};

	useEffect(() => {
		if (params.funcao) {
			const hasFuncao = setor.funcoes.find(
				(a) => a.id === (params.funcao as string),
			);
			if (hasFuncao) funcao.load(hasFuncao);
		}
		return () => {
			funcao.clear();
		};
	}, []);
	const handleCreateFuncao = () => {
		if (!funcao.nome.trim()) return Alert.alert("Digite o nome da função");
		if (!funcao.description.trim())
			return Alert.alert("Digite a descrição da função");
		if (!funcao.funcionarios.trim())
			return Alert.alert("Digite o nome dos funcionarios da função");
		//Se tudo tiver ok
		setor.setFuncoes([...setor.funcoes, funcao]);
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
				<Input
					placeholder="Digite o nome da função"
					value={funcao.nome}
					onChange={funcao.setNome}
					ref={(ref) => {
						if (ref) refs.current[0] = ref;
					}}
					returnKeyType={0 === campos - 1 ? "done" : "next"}
					onSubmitEditing={() => focarProximo(0)}
				/>
				<Input
					placeholder="Digite a descrição da função"
					value={funcao.description}
					onChange={funcao.setDescription}
					ref={(ref) => {
						if (ref) refs.current[1] = ref;
					}}
					returnKeyType={1 === campos - 1 ? "done" : "next"}
					onSubmitEditing={() => focarProximo(1)}
				/>
				<Input
					placeholder="Digite os funcionarios da função"
					value={funcao.funcionarios}
					onChange={funcao.setFuncionarios}
					ref={(ref) => {
						if (ref) refs.current[2] = ref;
					}}
					returnKeyType={2 === campos - 1 ? "done" : "next"}
					onSubmitEditing={() => focarProximo(2)}
				/>

				<RiscoForm />

				{!params.funcao && (
					<Button
						onPress={() => {
							handleCreateFuncao();
						}}
					>
						Adicionar
					</Button>
				)}
				{params.funcao && (
					<Button
						onPress={() => {
							if (!funcao.nome.trim())
								return Alert.alert("Digite o nome da função");
							if (!funcao.description.trim())
								return Alert.alert("Digite a descrição da função");
							if (!funcao.funcionarios.trim())
								return Alert.alert("Digite o nome dos funcionarios da função");
							//Se tudo tiver ok
							setor.setFuncoes(
								setor.funcoes.map((a) => {
									if (a.id !== params.funcao) return a;
									console.log(a);
									return funcao;
								}),
							);
							nav.back();
						}}
					>
						Atualizar
					</Button>
				)}
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
