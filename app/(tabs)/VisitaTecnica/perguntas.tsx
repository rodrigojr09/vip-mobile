import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";

import { router } from "expo-router";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function PerguntaField({
	pergunta,
	addResposta,
	respostas,
}: {
	pergunta: VIPVisitaType["perguntas"][number];
	addResposta: (resposta: VIPVisitaType["respostas"][number]) => void;
	respostas: VIPVisitaType["respostas"];
}) {
	const opcoes = [
		{ label: "Sim", value: true },
		{ label: "Não", value: false },
	];

	return (
		<View style={styles.card}>
			<Text style={styles.pergunta}>{pergunta.pergunta}</Text>

			<View style={styles.opcoesContainer}>
				{opcoes.map((opcao) => (
					<TouchableOpacity
						key={opcao.label}
						style={styles.opcao}
						onPress={() =>
							addResposta({
								id: pergunta.id,
								pergunta: pergunta.pergunta,
								checked: opcao.value,
							})
						}
					>
						<View style={styles.radio}>
							{respostas.find((r) => r.id === pergunta.id)
								?.checked === opcao.value && (
								<View style={styles.radioSelecionado} />
							)}
						</View>
						<Text style={styles.opcaoLabel}>{opcao.label}</Text>
					</TouchableOpacity>
				))}
			</View>
			<Input
				textarea
				value={
					respostas.find((r) => r.id === pergunta.id)?.observation ||
					""
				}
				placeholder="Observação"
				onChange={(text) => {
					addResposta({
						id: pergunta.id,
						pergunta: pergunta.pergunta,
						checked:
							respostas.find((r) => r.id === pergunta.id)
								?.checked || null,
						observation: text,
					});
				}}
			/>
		</View>
	);
}

export default function Perguntas() {
	const { perguntas, respostas, addResposta } = useVisita();

	const handleSave = () => {
		router.push({ pathname: "/VisitaTecnica/resumo" });
	};

	return (
		<Container style={styles.formContainer} scroller>
			{perguntas.map((pergunta, index) => (
				<View style={styles.headerTable} key={index}>
					<PerguntaField
						pergunta={pergunta}
						respostas={respostas}
						addResposta={addResposta}
					/>
				</View>
			))}
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
		marginBottom: 24,
		borderRadius: 16,
		backgroundColor: "#1f1f1f",
		elevation: 3,
	},
	card: {
		padding: 16,
	},
	pergunta: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 12,
	},
	opcoesContainer: {
		flexDirection: "row",
		gap: 24,
	},
	opcao: {
		flexDirection: "row",
		alignItems: "center",
	},
	radio: {
		height: 20,
		width: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 8,
	},
	radioSelecionado: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: "#fff",
	},
	opcaoLabel: {
		color: "#fff",
		fontSize: 16,
	},
});
