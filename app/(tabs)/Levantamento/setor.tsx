import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useLevantamento } from "@/hooks/LevantamentoProvider";
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

export default function Setor() {
	const router = useRouter();
	const levantamento = useLevantamento();

	return (
		<Container style={styles.formContainer}>
			<Input
				placeholder="Digite o nome do setor..."
				value={levantamento.nome}
				onChange={levantamento.setNome}
			/>
			<Input
				placeholder="Quem está auxiliando o levantamento?"
				value={levantamento.responsavel}
				onChange={levantamento.setResponsavel}
			/>
			<Button onPress={(e) => {}}>Criar</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		alignItems: "center",
		padding: 20,
	},
});
