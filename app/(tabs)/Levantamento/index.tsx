import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useEmpresa } from "@/hooks/EmpresaProvider";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";

export default function Levantamento() {
	const router = useRouter();
	const levantamento = useEmpresa();
	const campos = ["nome", "responsavel"];
	const refs = useRef<TextInput[]>([]);
	const focarProximo = (index: number) => {
		if (index + 1 < campos.length) {
			refs.current[index + 1]?.focus();
		} else {
			console.log("📨 Enviar formulário!");
		}
	};
	const handleCreateLevantamento = () => {
		if (!levantamento.nome.trim() || !levantamento.responsavel.trim()) {
			Alert.alert("Atenção! preencha todos os campos");
		} else {
			router.push("/Levantamento/resumo");
		}
	};

	return (
		<Container style={styles.formContainer}>
			<Input
				placeholder="Digite o nome da empresa..."
				value={levantamento.nome}
				onChange={levantamento.setNome}
				ref={(ref) => {
					if (ref) refs.current[0] = ref;
				}}
				returnKeyType={0 === campos.length - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(0)}
			/>
			<Input
				placeholder="Quem está auxiliando o levantamento ?"
				value={levantamento.responsavel}
				onChange={levantamento.setResponsavel}
				ref={(ref) => {
					if (ref) refs.current[1] = ref;
				}}
				returnKeyType={1 === campos.length - 1 ? "done" : "next"}
				onSubmitEditing={() => handleCreateLevantamento()}
			/>
			<Button onPress={handleCreateLevantamento}>Criar</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		alignItems: "center",
		padding: 20,
	},
});
