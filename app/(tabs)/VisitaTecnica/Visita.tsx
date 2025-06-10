import Container from "@/components/Container";
import questionsData, { Question } from "@/utils/questions";
import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	TextInput,
} from "react-native";

type Resposta = {
	value: boolean | "NA";
	observation?: string;
};

interface Pergunta {
	id: string;
	status: "Sim" | "Não" | "N/A" | null;
}

export default function Visita() {
	const [respostas, setRespostas] = useState<Record<string, Resposta>>({});
	const [empresa, setEmpresa] = useState("");
	const [visitante, setVisitante] = useState("");
	const [acompanhante, setAcompanhante] = useState("");

	const [questions, setQuestions] = useState<Pergunta[]>([]);

	useEffect(() => {
		const primeiras = questionsData.filter((q) => q.first);
		if (primeiras) {
			setQuestions(
				primeiras.map((a) => {
					return {
						id: a.id,
						status: null,
					};
				})
			);
		}
	}, []);

	const handleAnswer = (id: string, value: boolean | "NA") => {
		setRespostas((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				value,
			},
		}));

		const nextId =
			value === true
				? perguntas[id].next.true
				: value === false
				? perguntas[id].next.false
				: perguntas[id].next.none;

		if (nextId && !fluxoIds.includes(nextId)) {
			setFluxoIds((prev) => [...prev, nextId]);
		}
	};

	const handleObservationChange = (id: string, text: string) => {
		setRespostas((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				observation: text,
			},
		}));
	};

	const renderQuestion = (id: string) => {
		const pergunta = perguntas[id];
		const resposta = respostas[id]?.value;

		return (
			<View key={id} style={styles.questionBlock}>
				<Text style={styles.questionText}>{pergunta.label}</Text>

				<View style={styles.buttonGroup}>
					{["Sim", "Não", "N/A"].map((label) => {
						const value =
							label === "Sim"
								? true
								: label === "Não"
								? false
								: "NA";
						const isSelected = resposta === value;

						return (
							<TouchableOpacity
								key={label}
								style={[
									styles.choiceButton,
									isSelected &&
										(value === true
											? styles.choiceButtonSelectedGreen
											: value === false
											? styles.choiceButtonSelectedRed
											: styles.choiceButtonSelectedGray),
								]}
								onPress={() => handleAnswer(id, value)}
							>
								<Text style={styles.choiceLabel}>{label}</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				{resposta !== undefined &&
					resposta !== "NA" &&
					!pergunta.next && (
						<TextInput
							style={styles.observationInput}
							placeholder="Observações (opcional)"
							placeholderTextColor="#aaa"
							multiline
							value={respostas[id]?.observation || ""}
							onChangeText={(text) =>
								handleObservationChange(id, text)
							}
						/>
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

				{/* Perguntas sequenciais */}
				{fluxoIds.map((id) => renderQuestion(id))}
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
