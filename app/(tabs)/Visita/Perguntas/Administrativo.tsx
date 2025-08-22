import Button from "@/components/Button";
import Container from "@/components/Container";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { quests_adm } from "@/utils/quests";
import { router } from "expo-router";
import QuestionBlock from "@/components/Visita/QuestionBlock";
import { VIPPerguntaType } from "@/types/VisitaTecnica/VIPPerguntaType";
import { verifyPerguntas } from "@/utils/verifyPerguntas";

export default function Sidebar() {
	const { respostas, addResposta, perguntas } = useVisita();
	const [block, setBlock] = React.useState(false);
	useEffect(() => {
		setBlock(verifyPerguntas(perguntas.adm, respostas));
	}, [respostas]);
	return (
		<Container scroller>
			<View style={styles.formContainer}>
				<Text style={styles.title}>Perguntas Administrativas</Text>
				{perguntas.adm.map((q) => (
					<View key={q.id} style={styles.questionBlock}>
						<QuestionBlock
							pergunta={q}
							resposta={respostas.find(
								(r) => r.pergunta === q.pergunta
							)}
							onChange={addResposta}
							respostas={respostas}
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
