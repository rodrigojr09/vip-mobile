import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type {
	VIPPerguntaType,
	VIPRespostaType,
} from "@/types/VisitaTecnica/VIPPerguntaType";
import ObservacaoCampo from "./ObservacaoCampo";

interface Props {
	pergunta: VIPPerguntaType;
	resposta?: VIPRespostaType;
	onChange: (resposta: VIPRespostaType) => void;
	respostas: VIPRespostaType[];
}

const BOOLEAN_OPTIONS = ["Sim", "Não", "NA"] as const;

function getButtonStyle(status: VIPRespostaType["checked"], key: string) {
	if (status !== key) return null;
	if (key === "Sim") return styles.choiceButtonSelectedGreen;
	if (key === "Não") return styles.choiceButtonSelectedRed;
	return styles.choiceButtonSelectedGray;
}

function splitSubquestions(
	subperguntas: VIPPerguntaType[],
	status: VIPRespostaType["checked"],
) {
	const matchesStatus = (item: VIPPerguntaType) =>
		item.when?.toLowerCase() === status?.toString().toLowerCase();

	return {
		checks: subperguntas.filter((item) => item.type === "check" && !item.when),
		texts: subperguntas.filter(
			(item) => item.type === "text" && matchesStatus(item),
		),
		infos: subperguntas.filter(
			(item) => item.type === "info" && matchesStatus(item),
		),
		conditionals: subperguntas.filter(
			(item) => item.type === "boolean" && matchesStatus(item),
		),
	};
}

const QuestionBlock = ({ pergunta, resposta, onChange, respostas }: Props) => {
	const status = resposta?.checked ?? null;
	const obs = resposta?.observation || "";
	const subperguntas = pergunta.subpergunta || [];

	const findResposta = (question: VIPPerguntaType) =>
		respostas.find((item) => item.pergunta === question.pergunta);

	const emitChange = (
		perguntaLabel: string,
		checked: VIPRespostaType["checked"],
		observation?: string,
	) => {
		onChange({
			pergunta: perguntaLabel,
			checked,
			observation,
		});
	};

	const renderNestedQuestions = (questions: VIPPerguntaType[]) =>
		questions.map((sub) => (
			<View key={sub.id} style={styles.subQuestionWrapper}>
				<QuestionBlock
					pergunta={sub}
					resposta={findResposta(sub)}
					onChange={onChange}
					respostas={respostas}
				/>
			</View>
		));

	const renderButtons = () =>
		BOOLEAN_OPTIONS.map((key) => (
			<TouchableOpacity
				key={key}
				style={[styles.choiceButton, getButtonStyle(status, key)]}
				onPress={() => emitChange(pergunta.pergunta, key)}
			>
				<Text style={styles.choiceLabel}>{key}</Text>
			</TouchableOpacity>
		));

	const renderCheckOptions = (checks: VIPPerguntaType[]) => {
		if (checks.length === 0) return null;

		return (
			<View style={styles.checkGrid}>
				{checks.map((sub) => {
					const isSelected = findResposta(sub);

					return (
						<TouchableOpacity
							key={sub.pergunta}
							style={[
								styles.checkItem,
								isSelected && styles.checkItemSelected,
							]}
							onPress={() => emitChange(sub.pergunta, "Check")}
						>
							<Text style={styles.checkText}>
								{sub.pergunta.split(" - ")[0]}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	const renderSubperguntas = () => {
		if (subperguntas.length === 0) return null;

		const { checks, texts, infos, conditionals } = splitSubquestions(
			subperguntas,
			status,
		);

		return (
			<>
				{renderNestedQuestions(texts)}
				{renderNestedQuestions(conditionals)}
				{renderNestedQuestions(infos)}
				{renderCheckOptions(checks)}
			</>
		);
	};

	return (
		<View>
			<Text style={styles.questionText}>{pergunta.pergunta}</Text>

			{pergunta.type === "boolean" && (
				<View style={styles.buttonGroup}>{renderButtons()}</View>
			)}

			{(resposta || pergunta.type === "text") && (
				<ObservacaoCampo
					label={pergunta.pergunta}
					status={pergunta.type === "text" ? "Check" : status}
					obs={obs}
					onChange={(label, selectedStatus, observation) =>
						emitChange(
							label,
							pergunta.type === "text" ? "Check" : selectedStatus,
							observation,
						)
					}
				/>
			)}

			{renderSubperguntas()}
		</View>
	);
};

const styles = StyleSheet.create({
	subQuestionWrapper: {
		marginTop: 32,
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
		marginBottom: 12,
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
	checkGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 16,
	},
	checkItem: {
		padding: 8,
		margin: 8,
		width: "20%",
		alignItems: "center",
		backgroundColor: "rgba(255, 255, 255, 0.1)",
		borderRadius: 4,
	},
	checkItemSelected: {
		backgroundColor: "limegreen",
	},
	checkText: {
		fontSize: 16,
		color: "#fff",
	},
});

export default QuestionBlock;
