import Container from "@/components/Container";
import questions, { Question } from "@/utils/questions";
import React, { useState, useEffect, ReactNode } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	TextInput,
} from "react-native";

type Resposta = {
	pergunta: string;
	value: "Sim" | "Não" | "N/A" | null;
	observation?: string;
};

export default function Visita() {
	const [respostas, setRespostas] = useState<Resposta[]>([]);
	const [empresa, setEmpresa] = useState("");
	const [visitante, setVisitante] = useState("");
	const [acompanhante, setAcompanhante] = useState("");
	const [perguntas, setPerguntas] = useState<Question[]>([]);

	useEffect(() => {
		setPerguntas(questions);
	}, []);

	function setStatus(pergunta: string, status: Resposta["value"]) {
		if (respostas.find((r) => r.pergunta === pergunta)) {
			setRespostas((prev) =>
				prev.map((r) =>
					r.pergunta === pergunta ? { ...r, value: status === r.value ? null : status } : r
				)
			);
		} else {
			setRespostas((prev) => [
				...prev,
				{
					pergunta,
					value: status,
				},
			]);
		}
	}

	function setObs(
		pergunta: string,
		status: Resposta["value"],
		obs: string
	) {
		if (respostas.find((r) => r.pergunta === pergunta)) {
			setRespostas((prev) =>
				prev.map((r) =>
					r.pergunta === pergunta ? { ...r, observation: obs } : r
				)
			);
		} else {
			setRespostas((prev) => [
				...prev,
				{
					pergunta,
					value: status,
					observation: obs,
				},
			]);
		}
	}

	function getObsCampo(
		label: string,
		status: Resposta["value"],	
		obs?: string
	) {
		return (
			<TextInput
				style={styles.observationInput}
				placeholder="Observações (opcional)"
				placeholderTextColor="#aaa"
				multiline
				value={obs}
				onChangeText={(text) => setObs(label, status, text)}
			/>
		);
	}

	const renderQuestion = ({ label, subquest }: Question) => {
		const id = Math.floor(Math.random() * 1000).toString();
		const status = respostas.find((r) => r.pergunta === label)?.value;
		return (
			<View key={id} style={styles.questionBlock}>
				<Text style={styles.questionText}>{label}</Text>

				<View style={styles.buttonGroup}>
					{["Sim", "Não", "N/A"].map((key) => {
						const isSelected = status === key;
						return (
							<TouchableOpacity
								key={id + key}
								style={[
									styles.choiceButton,
									isSelected &&
										(status === "Sim"
											? styles.choiceButtonSelectedGreen
											: status === "Não"
											? styles.choiceButtonSelectedRed
											: styles.choiceButtonSelectedGray),
								]}
								onPress={() =>
									setStatus(label, key as Resposta["value"])
								}
							>
								<Text style={styles.choiceLabel}>{key}</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				{subquest && status &&
					status !== "N/A" &&
					renderQuestion(
						subquest[status === "Sim" ? "true" : "false"]
					)}
				{status && (status === "N/A" || !subquest) &&
					getObsCampo(
						label,
						status as Resposta["value"],
						respostas.find((r) => r.pergunta === label)?.observation
					)}
			</View>
		);
	};

	return (
		<Container>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.headerTable}>
					<View style={styles.row}>
						<TextInput
							style={styles.input}
							placeholder="Nome da empresa"
							placeholderTextColor="#aaa"
							value={empresa}
							onChangeText={setEmpresa}
						/>
					</View>
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

				{/* Renderiza todas as perguntas sequencialmente */}
				{perguntas.map((p) => renderQuestion(p))}
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#121212",
	},
	headerTable: {
		marginBottom: 32,
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#1f1f1f",
		elevation: 3,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	input: {
		flex: 1,
		backgroundColor: "#2a2a2a",
		color: "#fff",
		padding: 10,
		borderRadius: 8,
		fontSize: 16,
	},
	questionBlock: {
		marginBottom: 32,
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#1f1f1f",
		elevation: 3,
	},
	questionText: {
		fontSize: 20,
		color: "#ffffff",
		fontWeight: "bold",
		marginBottom: 20,
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "space-around",
	},
	choiceButton: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#2e2e2e",
		paddingVertical: 16,
		paddingHorizontal: 24,
		borderRadius: 12,
		elevation: 2,
	},
	choiceButtonSelectedGreen: {
		backgroundColor: "#4caf50",
	},
	choiceButtonSelectedRed: {
		backgroundColor: "#f44336",
	},
	choiceButtonSelectedGray: {
		backgroundColor: "#9e9e9e",
	},
	choiceLabel: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "600",
	},
	observationInput: {
		marginTop: 16,
		backgroundColor: "#2a2a2a",
		color: "#fff",
		padding: 12,
		borderRadius: 12,
		fontSize: 16,
		minHeight: 60,
		textAlignVertical: "top",
	},
});
