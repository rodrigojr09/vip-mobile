import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import manager from "@/utils/Data/manager";
import Storage from "@/utils/Storage";

export default function Dev() {
	const storage = new Storage();
	const [senha, setSenha] = useState("");

	if (senha !== "1236677")
		return (
			<Container style={styles.container}>
				<Text style={styles.title}>Area de Desenvolvimento</Text>
				<TextInput
					secureTextEntry
					style={styles.input}
					placeholder="Senha"
					value={senha}
					onChangeText={setSenha}
				/>
			</Container>
		);

	return (
		<Container style={styles.container}>
			<Text style={styles.title}>Backup's</Text>
			<View style={styles.formContainer}>
				<Button
					//Alinha com o centro o texto
					styles={{ width: "30%", alignSelf: "center" }}
					onPress={async () => {
						const { levantamentos, levantamentos_v2 } =
							await storage.importAll();
						await FileSystem.writeAsStringAsync(
							`${FileSystem.documentDirectory}backup_levantamentos.json`,
							JSON.stringify([...levantamentos_v2, ...levantamentos]),
						);
						Sharing.shareAsync(
							`${FileSystem.documentDirectory}backup_levantamentos.json`,
						);
						Alert.alert("Levantamentos baixados com sucesso!");
					}}
				>
					Baixar Levantamentos
				</Button>
				<Button
					//Alinha com o centro o texto
					styles={{ width: "30%", alignSelf: "center" }}
					onPress={async () => {
						// Confirmação
						Alert.alert(
							"Apagar Levantamentos",
							"Tem certeza que deseja apagar todos os Levantamentos salvos?",
							[
								{ text: "Cancelar", style: "cancel" },
								{
									text: "Apagar",
									style: "destructive",
									onPress: async () => {
										await manager.levantamentos.clear(); // limpa os dados salvos
										Alert.alert(
											"Sucesso",
											"Todos os Levantamentos foram apagados!",
										);
									},
								},
							],
						);
					}}
				>
					Apagar Levantamentos
				</Button>
			</View>
			<View style={styles.formContainer}>
				<Button
					//Alinha com o centro o texto
					styles={{ width: "30%", alignSelf: "center" }}
					onPress={async () => {
						const { visitas } = await storage.importAll();
						await FileSystem.writeAsStringAsync(
							`${FileSystem.documentDirectory}backup_visitas.json`,
							JSON.stringify(visitas),
						);
						Sharing.shareAsync(
							`${FileSystem.documentDirectory}backup_visitas.json`,
						);
						Alert.alert("Visitas Técnicas baixadas com sucesso!");
					}}
				>
					Baixar Visitas Técnicas
				</Button>
				<Button
					//Alinha com o centro o texto
					styles={{ width: "30%", alignSelf: "center" }}
					onPress={async () => {
						// Confirmação
						Alert.alert(
							"Apagar Visitas Técnicas",
							"Tem certeza que deseja apagar todos as Visitas Técnicas salvos?",
							[
								{ text: "Cancelar", style: "cancel" },
								{
									text: "Apagar",
									style: "destructive",
									onPress: async () => {
										await manager.visitas.clearVisitas(); // limpa os dados salvos
										Alert.alert("Sucesso", "Visitas Técnicas apagadas!");
									},
								},
							],
						);
					}}
				>
					Apagar Visitas Técnicas
				</Button>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#22c55e",
	},
	input: {
		borderWidth: 1,
		borderColor: "green",
		borderRadius: 5,
		padding: 15,
		marginVertical: 10,
		width: "100%",
		color: "#FFF",
	},
	// Filhos lado a lado
	formContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: 20,
	},
});
