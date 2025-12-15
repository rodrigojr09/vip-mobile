import { useState } from "react";
import {
	Alert,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/v2/Visitas/Visita";
import { events } from "@/utils/API/Event";
import "react-native-get-random-values";
import { DeviceType, deviceType } from "expo-device";
import { v4 as uuidv4 } from "uuid";
import type { EmpresaType } from "@/types/Visita";
import manager from "@/utils/Data/manager";

export default function Visita() {
	const { visita, atualizarVisita } = useVisita();
	const empresas = manager.visitas.empresas;

	const nav = useNavigationHistory();

	const [search, setSearch] = useState("");

	async function handleSave() {
		if (visita.empresa === null)
			return Alert.alert("Atenção! O nome da empresa precisa ser preenchido");
		if (visita.tecnico.trim().length === 0)
			return Alert.alert("Atenção! O nome do técnico precisa ser preenchido");
		if (visita.responsavel.trim().length === 0)
			return Alert.alert(
				"Atenção! O nome do cliente responsável precisa ser preenchido",
			);

		// Montar mensagem do evento
		const msg = `Início da visita - Empresa: ${visita.empresa?.razao_social}, Técnico: ${visita.tecnico}, Responsável: ${visita.responsavel}`;

		try {
			events.sendEvent(msg);
			events.startEvent("visita");
		} catch (error) {
			console.warn("Erro ao adicionar evento:", error);
		}

		atualizarVisita("id", uuidv4());
		nav.push({ pathname: "/Visita/Perguntas/Administrativo" });
	}

	function filter(item: EmpresaType) {
		return (
			item.nome_fantasia.toLowerCase().includes(search.toLowerCase()) ||
			item.razao_social.toLowerCase().includes(search.toLowerCase()) ||
			item.cnpj.toLowerCase().includes(search.toLowerCase())
		);
	}

	const isTablet = deviceType === DeviceType.TABLET;
	const index = isTablet ? 60 : 25;

	return (
		<Container style={styles.formContainer}>
			<View style={styles.headerTable}>
				<View style={styles.row}>
					<Input
						placeholder="Nome da empresa"
						value={
							visita.empresa
								? visita.empresa.razao_social
										.split("")
										.filter((_a, i) => i < index)
										.join("") +
									(visita.empresa.razao_social.length > index ? "..." : "")
								: search
						}
						onChange={(e) => setSearch(e)}
					/>
					{visita.empresa && (
						<TouchableOpacity
							onPress={() => atualizarVisita("empresa", null)}
							style={styles.clearButton}
						>
							<Text style={styles.clearButtonText}>Limpar</Text>
						</TouchableOpacity>
					)}
				</View>
				{!visita.empresa &&
					search.trim() !== "" &&
					empresas.filter(filter).length > 0 && (
						<FlatList
							scrollEnabled
							style={styles.suggestionsList}
							data={empresas.filter(filter)}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item }) => (
								<TouchableOpacity
									style={styles.suggestionItem}
									onPress={() => atualizarVisita("empresa", item)}
								>
									<Text style={styles.suggestionText}>{item.razao_social}</Text>
								</TouchableOpacity>
							)}
						/>
					)}
				<View style={styles.row}>
					<Input
						placeholder="Nome do Técnico"
						value={visita.tecnico}
						onChange={(text) => atualizarVisita("tecnico", text)}
					/>
				</View>
				<View style={styles.row}>
					<Input
						placeholder="Responsável (Cliente)"
						value={visita.responsavel}
						onChange={(text) => atualizarVisita("responsavel", text)}
					/>
				</View>
			</View>
			<Button onPress={handleSave}>Proximo</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		padding: 20,
	},
	headerTable: {
		marginBottom: 32,
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#1f1f1f",
		elevation: 3,
	},
	row: {
		flexDirection: "column",
		width: "100%",
		alignItems: "center",
		marginTop: 12,
	},

	resultItem: {
		padding: 10,
		backgroundColor: "#f0f0f0",
		marginBottom: 8,
		borderRadius: 6,
	},
	noResults: {
		marginTop: 10,
		color: "#888",
		fontStyle: "italic",
	},
	suggestionsList: {
		marginTop: 5,
		maxHeight: 200, // Limita o tamanho da lista
		borderColor: "white",
		borderRadius: 10,
		borderWidth: 1,
	},
	suggestionItem: {
		padding: 15,
		marginVertical: 2,
		borderRadius: 10,
		borderColor: "white",
		borderWidth: 1,
	},
	suggestionText: {
		fontSize: 16,
		color: "white",
	},
	clearButton: {
		position: "absolute",
		top: 25,
		right: 10,
		zIndex: 1,
	},
	clearButtonText: {
		fontSize: 16,
		color: "red",
	},
	nextButton: {
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 1,
	},
	nextButtonText: {
		fontSize: 16,
		color: "green",
	},
});
