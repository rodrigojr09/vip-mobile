import Button from "@/components/Button";
import Tabela from "@/components/Tabela";
import { useLevantamento } from "@/hooks/LevantamentoProvider";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Resumo() {
	const levantamento = useLevantamento();

	return (
		<View style={styles.container}>
			{/* Título */}
			<Text style={styles.title}>
				Setores da Empresa: {levantamento.nome}
			</Text>

			{/* Tabela */}
			<Tabela dados={levantamento.setores} onExcluir={(setor) => {}} />

			<Button onPress={(e) => {}}>Novo Setor</Button>

			<Button onPress={(e) => {}}>Finalizar Levantamento</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1C1C2E", // Fundo escuro
		paddingTop: 30,
		paddingHorizontal: 10,
	},
	header: {
		backgroundColor: "#28A745", // Verde
		padding: 15,
		borderBottomWidth: 2,
		borderBottomColor: "#FFFFFF",
	},
	headerText: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
	},
	title: {
		marginVertical: 20,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#28A745",
	},
	table: {
		marginHorizontal: 15,
		marginTop: 20,
		borderWidth: 1,
		padding: 10,
		borderColor: "#FFFFFF",
		borderRadius: 5,
		overflow: "hidden",
	},
	tableHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: "#2C2C3E",
		borderBottomWidth: 1,
		borderBottomColor: "#FFFFFF",
	},
	headerColumn: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "bold",
		flex: 1, // Ajusta as colunas para dividir o espaço igualmente
	},
	row: {
		backgroundColor: "#28A745",
		paddingVertical: 15,
		paddingHorizontal: 15,
		marginBottom: 1,
	},
	rowText: {
		color: "#FFFFFF",
		fontSize: 16,
		textAlign: "center",
	},
	spacer: {
		height: 10, // Altura do espaçamento entre as linhas
	},
});
