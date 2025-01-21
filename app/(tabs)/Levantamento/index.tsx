import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useEmpresa } from "@/hooks/EmpresaProvider";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Alert,
	TextInput,
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
} from "react-native";

export default function Levantamento() {
	const router = useRouter();
	const levantamento = useEmpresa();

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
			/>
			<Input
				placeholder="Quem está auxiliando o levantamento ?"
				value={levantamento.responsavel}
				onChange={levantamento.setResponsavel}
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
