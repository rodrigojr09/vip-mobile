import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Model from "@/components/Model";
import QuestionBlock from "@/components/Visita/QuestionBlock";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import { verifyPerguntas } from "@/utils/verifyPerguntas";

export default function Sidebar() {
	const { respostas, addResposta, perguntas, inclusas } = useVisita();
	const [block, setBlock] = React.useState(false);
	const nav = useNavigationHistory();

	useEffect(() => {
		setBlock(verifyPerguntas(perguntas.adm, respostas));
	}, [respostas, perguntas.adm]);

	const [openModel, setOpenModel] = useState(false);
	function handleFinalizar() {
		if (inclusas.length) setOpenModel(true);
		else nav.push("/Visita/resumo");
	}

	return !openModel ? (
		<Container scroller>
			<View style={styles.formContainer}>
				<Text style={styles.title}>Perguntas Administrativas</Text>
				{perguntas.adm.map((q) => (
					<View key={q.id} style={styles.questionBlock}>
						<QuestionBlock
							pergunta={q}
							resposta={respostas.find((r) => r.pergunta === q.pergunta)}
							onChange={addResposta}
							respostas={respostas}
						/>
					</View>
				))}

				<View style={{}}>
					<Button disabled={block} onPress={handleFinalizar}>
						Finalizar Visita
					</Button>
					<Button disabled={block} onPress={() => nav.push("/Visita/setores")}>
						Revisar Setores
					</Button>
				</View>
			</View>
		</Container>
	) : (
		<Model setOpenModel={setOpenModel} />
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
