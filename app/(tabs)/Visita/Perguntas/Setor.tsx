import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { v4 as uuidv4 } from "uuid";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import QuestionBlock from "@/components/Visita/QuestionBlock";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import type { VIPRespostaType } from "@/types/VisitaTecnica/VIPPerguntaType";
import "react-native-get-random-values";
import { useNavigationHistory } from "@/hooks/Navigation";

export default function PerguntasSetor() {
	const { addSetor, setores, perguntas } = useVisita();
	const [respostas, setRespostas] = useState<VIPRespostaType[]>([]);
	const [nome, setNome] = useState("");

	const nav = useNavigationHistory();

	const params = useLocalSearchParams();

	useEffect(() => {
		if (params.id) {
			const setor = setores.find((s) => s.id === params.id);
			if (setor) {
				setNome(setor.nome);
				setRespostas(setor.respostas || []);
			}
		}
	}, []);

	const addResposta = useCallback((resposta: VIPRespostaType) => {
		setRespostas((prev) => {
			const index = prev.findIndex((r) => r.pergunta === resposta.pergunta);

			if (index !== -1) {
				const existente = prev[index];
				if (
					existente.checked === resposta.checked &&
					existente.observation === resposta.observation
				) {
					return prev.filter((_, i) => i !== index);
				}
				return prev.map((r, i) => (i === index ? { ...r, ...resposta } : r));
			}

			return [...prev, resposta];
		});
	}, []);

	function handleAvancar(type?: "adm") {
		if (
			setores.length === 0 &&
			(!nome.trim() || respostas.length !== perguntas.setor.length)
		) {
			alert("Informe o nome do setor antes de continuar.");
			return;
		} else if (
			nome.trim() !== "" &&
			respostas.length === perguntas.setor.length
		) {
			addSetor({
				id: (params.id as string) || uuidv4(),
				nome,
				respostas,
				perguntas: perguntas.setor,
			});
		}
		if (type === "adm") nav.push("/Visita/Perguntas/Administrativo");
		else nav.replace("/Visita/Perguntas/Setor");
	}
	console.log(process.env.NODE_ENV);
	return (
		<>
			{/* Se for dev */}
			{process.env.NODE_ENV === "development" && (
				<View style={styles.abrirBotao}>
					<Pressable
						style={{ padding: 10, backgroundColor: "red" }}
						onPress={() => {
							perguntas.setor.forEach((q) => {
								addResposta({
									pergunta: q.pergunta,
									checked: "NA",
									observation: "Resposta automática para dev",
								});
							});
						}}
					>
						<Text style={{ color: "white" }}>Dev</Text>
					</Pressable>
				</View>
			)}

			<Container style={{ zIndex: 1 }} scroller>
				<View style={styles.formContainer}>
					<Text style={styles.title}>Perguntas do Setor</Text>

					<View style={styles.inputContainer}>
						<Input
							placeholder="Setor Vistoriado"
							onChange={setNome}
							value={nome}
						/>
					</View>

					{perguntas.setor.map((q) => (
						<View key={q.id} style={styles.questionBlock}>
							<QuestionBlock
								pergunta={q}
								resposta={respostas.find((r) => r.pergunta === q.pergunta)}
								onChange={addResposta}
								respostas={respostas}
							/>
						</View>
					))}

					<View
						style={{
							marginTop: 20,
							flexDirection: "column",
							gap: 10,
							flex: 1,
							justifyContent: "space-between",
						}}
					>
						<Button
							disabled={
								!nome.trim() || respostas.length !== perguntas.setor.length
							}
							onPress={() => handleAvancar()}
						>
							Proximo Setor
						</Button>
						<Button
							secundary
							disabled={
								!(
									(nome.trim() &&
										respostas.length === perguntas.setor.length) ||
									setores.length !== 0
								)
							}
							onPress={() => handleAvancar("adm")}
						>
							Ir para perguntas administrativas
						</Button>
					</View>
				</View>
			</Container>
		</>
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
	inputContainer: {
		marginBottom: 32,
		paddingHorizontal: 10,
		borderRadius: 16,
		backgroundColor: "#2a2a2a",
		elevation: 3,
	},
	questionBlock: {
		marginBottom: 32,
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#2a2a2a",
		elevation: 3,
	},
	abrirBotao: {
		position: "fixed",
		backgroundColor: "#444",
		padding: 10,
	},
	botaoTexto: {
		color: "#fff",
		fontSize: 16,
	},
	overlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.4)",
		zIndex: 5,
	},
});
