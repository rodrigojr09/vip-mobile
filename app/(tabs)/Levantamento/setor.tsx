import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useLevantamento, VIPSetor } from "@/hooks/LevantamentoProvider";
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
	const setor = VIPSetor();

	return (
		<Container style={styles.formContainer}>
			<Input
				placeholder="Digite o nome do setor..."
				value={setor.nome}
				onChange={setor.setNome}
			/>
			<Button
				onPress={(e) => {
					levantamento.setSetores([...levantamento.setores, setor]);
					router.back();
				}}
			>
				Criar
			</Button>
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
