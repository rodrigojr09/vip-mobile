import Container from "@/components/Container";
import questions from "@/utils/questions";
import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	StyleSheet,
	TextInput,
} from "react-native";

export default function Visita() {
	const [answers, setAnswers] = useState<{ [key: string]: any }>({});

	// Estados do cabeçalho (dados da visita)
	const [empresa, setEmpresa] = useState("");
	const [visitante, setVisitante] = useState("");
	const [acompanhante, setAcompanhante] = useState("");
	const [data, setData] = useState("");

	const handleAnswer = (path: string, value: boolean | string) => {
		setAnswers((prev) => {
			const current = prev[path]?.value;

			if (current === value) {
				const updated: typeof prev = {};
				Object.keys(prev).forEach((key) => {
					if (!key.startsWith(path)) {
						updated[key] = prev[key];
					}
				});
				return updated;
			}

			const updatedAnswer = {
				...prev,
				[path]: {
					...prev[path],
					value,
				},
			};

			if (value === "NA") {
				updatedAnswer[path].observation = "";
			}

			return updatedAnswer;
		});
	};

	const handleObservationChange = (path: string, text: string) => {
		setAnswers((prev) => ({
			...prev,
			[path]: {
				...prev[path],
				observation: text,
			},
		}));
	};

	const renderQuestion = (question: any, path = "") => {
		const currentPath = path;
		const selected = answers[currentPath]?.value;

		const hasSubQuestion =
			selected !== undefined &&
			question.subquest &&
			question.subquest[selected];

		return (
			<View key={currentPath} style={styles.questionBlock}>
				<Text style={styles.questionText}>{question.label}</Text>

				<View style={styles.buttonGroup}>
					{["Sim", "Não", "N/A"].map((label) => {
						const value = label === "Sim" ? true : label === "Não" ? false : "NA";
						const isSelected = selected === value;

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
								onPress={() => handleAnswer(currentPath, value)}
							>
								<Text style={styles.choiceLabel}>{label}</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				{selected !== undefined && selected !== "NA" && !hasSubQuestion && (
					<TextInput
						style={styles.observationInput}
						placeholder="Observações (opcional)"
						placeholderTextColor="#aaa"
						multiline
						value={answers[currentPath]?.observation || ""}
						onChangeText={(text) =>
							handleObservationChange(currentPath, text)
						}
					/>
				)}

				{hasSubQuestion &&
					renderQuestion(
						question.subquest[selected],
						`${currentPath}.${selected}`
					)}
			</View>
		);
	};

	return (
		<Container>
			<ScrollView contentContainerStyle={styles.container}>
				{/* TABELA DE DADOS */}
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

				{/* PERGUNTAS */}
				{questions.map((q, idx) => renderQuestion(q, `q${idx}`))}
			</ScrollView>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#121212",
	},

	// Header (Tabela)
	headerTable: {
		marginBottom: 32,
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#1f1f1f",
		elevation: 3,
	},   
	headerTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 16,
		textAlign: "center",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	label: {
		width: 110,
		color: "#fff",
		fontSize: 16,
	},
	input: {
		flex: 1,
		backgroundColor: "#2a2a2a",
		color: "#fff",
		padding: 10,
		borderRadius: 8,
		fontSize: 16,
	},

	// Questões
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
