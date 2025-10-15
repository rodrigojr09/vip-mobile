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

const QuestionBlock = ({ pergunta, resposta, onChange, respostas }: Props) => {
	const status = resposta?.checked ?? null;
	const obs = resposta?.observation || "";
	const subperguntas = pergunta.subpergunta;

	const renderButtons = () =>
		["Sim", "Não", "NA"].map((key) => {
			const isSelected = status === key;
			const selectedStyle =
				key === "Sim"
					? styles.choiceButtonSelectedGreen
					: key === "Não"
						? styles.choiceButtonSelectedRed
						: styles.choiceButtonSelectedGray;

			return (
				<TouchableOpacity
					key={key}
					style={[styles.choiceButton, isSelected && selectedStyle]}
					onPress={() =>
						onChange({
							pergunta: pergunta.pergunta,
							checked: key as VIPRespostaType["checked"],
						})
					}
				>
					<Text style={styles.choiceLabel}>{key}</Text>
				</TouchableOpacity>
			);
		});

	const renderSubperguntas = () => {
		if (!subperguntas) return null;

		const checks = subperguntas.filter((s) => s.type === "check" && !s.when);

		const texts = subperguntas.filter(
			(s) =>
				s.type === "text" &&
				s.when?.toLowerCase() === status?.toString().toLowerCase(),
		);

		const infos = subperguntas.filter(
			(s) =>
				s.type === "info" &&
				s.when?.toLowerCase() === status?.toString().toLowerCase(),
		);

		const condicionais = subperguntas.filter(
			(s) =>
				s.type === "boolean" &&
				s.when?.toLowerCase() === status?.toString().toLowerCase(),
		);

		return (
			<>
				{texts.map((sub) => (
					<View key={sub.id} style={{ marginTop: 32 }}>
						<QuestionBlock
							pergunta={sub}
							resposta={respostas.find((r) => r.pergunta === sub.pergunta)}
							onChange={onChange}
							respostas={respostas}
						/>
					</View>
				))}

				{condicionais.map((sub) => (
					<View key={sub.id} style={{ marginTop: 32 }}>
						<QuestionBlock
							pergunta={sub}
							resposta={respostas.find((r) => r.pergunta === sub.pergunta)}
							onChange={onChange}
							respostas={respostas}
						/>
					</View>
				))}

				{infos.map((sub) => (
					<View key={sub.id} style={{ marginTop: 32 }}>
						<QuestionBlock
							pergunta={sub}
							resposta={respostas.find((r) => r.pergunta === sub.pergunta)}
							onChange={onChange}
							respostas={respostas}
						/>
					</View>
				))}

				{checks.length > 0 && (
					<View style={styles.checkGrid}>
						{checks.map((sub) => {
							const isSelected = respostas.find(
								(r) => r.pergunta === sub.pergunta,
							);
							return (
								<TouchableOpacity
									style={[
										styles.checkItem,
										isSelected && styles.checkItemSelected,
									]}
									key={sub.pergunta}
									onPress={() =>
										onChange({
											pergunta: sub.pergunta,
											checked: "Check",
										})
									}
								>
									<Text style={styles.checkText}>
										{sub.pergunta.split(" - ")[0]}
									</Text>
								</TouchableOpacity>
							);
						})}
					</View>
				)}
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
					onChange={(label, status, obs) =>
						onChange({
							pergunta: label,
							checked: pergunta.type === "text" ? "Check" : status,
							observation: obs,
						})
					}
				/>
			)}

			{renderSubperguntas()}
		</View>
	);
};

const styles = StyleSheet.create({
	questionText: {
		fontSize: 20,
		color: "#ffffff",
		fontWeight: "bold",
		marginBottom: 20,
	},
	infoText: {
		fontSize: 18,
		color: "#ccc",
		fontStyle: "italic",
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
