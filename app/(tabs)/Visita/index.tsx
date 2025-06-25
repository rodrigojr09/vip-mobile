import Button from "@/components/Button";
import Container from "@/components/Container";
import { useVisita } from "@/hooks/VisitaProvider";
import { Empresa, Question, Resposta } from "@/types/VIPVisitaType";
import { getEmpresas } from "@/utils/API/Empresas";
import { useRouter } from "expo-router";
import React, { useState, useEffect, JSX } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	TextInput,
	Alert,
	FlatList,
} from "react-native";

export default function Visita() {
	const {
		empresa,
		acompanhante,
		visitante,
		setAcompanhante,
		setVisitante,
		setEmpresa,
		empresas,
	} = useVisita();
	const router = useRouter();
	const [search, setSearch] = useState("");

	function handleSave() {
		if (empresa === null)
			return Alert.alert(
				"Atenção! O nome da empresa precisa ser preenchido"
			);
		if (visitante.trim().length === 0)
			return Alert.alert(
				"Atenção! O nome do técnico precisa ser preenchido"
			);
		if (acompanhante.trim().length === 0)
			return Alert.alert(
				"Atenção! O nome do cliente responsável precisa ser preenchido"
			);
		router.push({ pathname: "/Visita/perguntas" });
	}

	function filter(empresa: Empresa) {
		return (
			empresa.nome_fantasia
				.toLowerCase()
				.includes(search.toLowerCase()) ||
			empresa.razao_social.toLowerCase().includes(search.toLowerCase()) ||
			empresa.cnpj.toLowerCase().includes(search.toLowerCase())
		);
	}

	return (
		<Container style={styles.formContainer} scroller>
			<View style={styles.headerTable}>
				<View style={styles.row}>
					<TextInput
						style={styles.input}
						placeholder="Nome da empresa"
						placeholderTextColor="#aaa"
						value={empresa ? empresa.razao_social : search}
						onChangeText={(e) => setSearch(e)}
					/>
					{empresa && (
						<TouchableOpacity
							onPress={() => setEmpresa(null)}
							style={styles.clearButton}
						>
							<Text style={styles.clearButtonText}>Limpar</Text>
						</TouchableOpacity>
					)}
				</View>
				{!empresa && search.trim() !== "" && empresas.filter(filter).length > 0 && (
					<FlatList
						style={styles.suggestionsList}
						data={empresas.filter(filter)}
						keyExtractor={(_, index) => index.toString()}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.suggestionItem}
								onPress={() => setEmpresa(item)}
							>
								<Text style={styles.suggestionText}>
									{item.razao_social}
								</Text>
							</TouchableOpacity>
						)}
					/>
				)}
				<View style={styles.row}>
					<TextInput
						style={styles.input}
						placeholder="Nome do Técnico"
						placeholderTextColor="#aaa"
						value={visitante}
						onChangeText={setVisitante}
					/>
				</View>
				<View style={styles.row}>
					<TextInput
						style={styles.input}
						placeholder="Responsável (Cliente)"
						placeholderTextColor="#aaa"
						value={acompanhante}
						onChangeText={setAcompanhante}
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
	input: {
		flex: 1,
		backgroundColor: "#2a2a2a",
		color: "#fff",
		padding: 10,
		width: "100%",
		borderRadius: 8,
		fontSize: 16,
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
		top: 10,
		right: 10,
		zIndex: 1,
	},
	clearButtonText: {
		fontSize: 16,
		color: "red",
	},
});
