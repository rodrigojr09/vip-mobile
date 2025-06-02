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

	const handleAnswer = (path: string, value: boolean) => {
		setAnswers((prev) => {
			const current = prev[path]?.value;

			// Se clicar de novo no mesmo valor, desmarca e remove filhos
			if (current === value) {
				const updated: typeof prev = {};
				Object.keys(prev).forEach((key) => {
					if (!key.startsWith(path)) {
						updated[key] = prev[key];
					}
				});
				return updated;
			}

			// Marca nova resposta
			return {
				...prev,
				[path]: {
					...prev[path],
					value,
				},
			};
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
					<TouchableOpacity
						style={[
							styles.choiceButton,
							selected === true && styles.choiceButtonSelectedGreen,
						]}
						onPress={() => handleAnswer(currentPath, true)}
					>
						<Text style={styles.choiceLabel}>Sim</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={[
							styles.choiceButton,
							selected === false && styles.choiceButtonSelectedRed,
						]}
						onPress={() => handleAnswer(currentPath, false)}
					>
						<Text style={styles.choiceLabel}>Não</Text>
					</TouchableOpacity>
				</View>

				{selected !== undefined && !hasSubQuestion && (
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
						`${currentPath}-${selected}`
					)}
			</View>
		);
	};

	return (
		<Container>
			<ScrollView contentContainerStyle={styles.container}>
				{questions.map((q, idx) => renderQuestion(q, `q${idx}`))}
			</ScrollView>
		</Container>
	);
}
 // Estilização dos botões 
const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#121212",
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
		width: "45%",
	},
	choiceButtonSelectedGreen: {
		backgroundColor: "#4caf50",
	},
	choiceButtonSelectedRed: {
		backgroundColor: "#f44336",
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
