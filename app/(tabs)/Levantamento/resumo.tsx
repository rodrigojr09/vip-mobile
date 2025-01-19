import Button from "@/components/Button";
import Container from "@/components/Container";
import Tabela from "@/components/Tabela";
import { useLevantamento } from "@/hooks/LevantamentoProvider";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Resumo() {
	const levantamento = useLevantamento();
	const router = useRouter();

	return (
		<Container style={styles.container}>
			{/* Título */}
			<Text style={styles.title}>
				Setores da Empresa: {levantamento.nome}
			</Text>

			{/* Tabela */}
			<Tabela
				dados={levantamento.setores}
				onExcluir={(setor) => {
					levantamento.setSetores(
						levantamento.setores.filter((a) => a.nome !== setor)
					);
				}}
			/>

			<Button
				onPress={(e) => {
					router.push("/Levantamento/setor");
				}}
			>
				Novo Setor
			</Button>

			<Button onPress={(e) => {}}>Finalizar Levantamento</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		paddingHorizontal: 10,
	},
	title: {
		marginVertical: 20,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#28A745",
	},
});
