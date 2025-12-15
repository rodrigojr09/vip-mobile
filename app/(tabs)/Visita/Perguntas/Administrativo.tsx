import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import QuestionBlock from "@/components/Visita/QuestionBlock";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/v2/Visitas/Visita";
import type { RespostaType } from "@/types/Visita";
import manager from "@/utils/Data/manager";
import { verifyPerguntas } from "@/utils/verifyPerguntas";

export default function Sidebar() {
	const { visita, atualizarVisita } = useVisita();
	const [block, setBlock] = React.useState(false);
	const nav = useNavigationHistory();
	const perguntas = manager.visitas.perguntas;

	const addResposta = useCallback((resposta: RespostaType) => {
		const att = (prev: RespostaType[]) => {
			const index = prev.findIndex((r) => r.pergunta === resposta.pergunta);

			if (index !== -1) {
				const existente = prev[index];
				// Remove se for igual
				if (
					(existente.checked === resposta.checked &&
						existente.observation === resposta.observation) ||
					(resposta.checked === "Check" && resposta.observation === "")
				) {
					return prev.filter((_, i) => i !== index);
				}

				// Atualiza
				return prev.map((r, i) => (i === index ? { ...r, ...resposta } : r));
			}

			// Adiciona
			return [...prev, resposta];
		};
		atualizarVisita("respostas", att(visita.respostas));
	}, []);

	useEffect(() => {
		setBlock(verifyPerguntas(perguntas.adm, visita.respostas));
	}, [visita.respostas, perguntas.adm]);
	return (
		<Container scroller>
			<View style={styles.formContainer}>
				<Text style={styles.title}>Perguntas Administrativas</Text>
				{perguntas.adm.map((q) => (
					<View key={q.id} style={styles.questionBlock}>
						<QuestionBlock
							pergunta={q}
							resposta={visita.respostas.find((r) => r.pergunta === q.pergunta)}
							onChange={addResposta}
							respostas={visita.respostas}
						/>
					</View>
				))}
				<Button
					disabled={block}
					onPress={async () => {
						nav.push("/Visita/Perguntas/Setor");
					}}
				>
					Proximo
				</Button>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 20,
		color: "lime",
		textAlign: "center",
	},
	questionBlock: {
		marginBottom: 32,
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#2a2a2a",
		elevation: 3,
	},
});
