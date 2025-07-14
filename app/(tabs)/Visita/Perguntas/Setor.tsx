import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import QuestionBlock from "@/components/Visita/QuestionBlock";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import { VIPRespostaType } from "@/types/VisitaTecnica/VIPPerguntaType";
import { quests_setor } from "@/utils/quests";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";
import Sidebar from "@/components/Visita/Sidebar";

export default function PerguntasSetor() {
	const { addSetor, setores, perguntas, removerSetor } = useVisita();
	const [respostas, setRespostas] = useState<VIPRespostaType[]>([]);
	const [nome, setNome] = useState("");

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const params = useLocalSearchParams();

	useEffect(() => {
		if (params.id) {
			const setor = setores.find((s) => s.id === params.id);
			if (setor) {
				setNome(setor.nome);
				setRespostas(setor.respostas || []);
			}
		}
	}, [params.id]);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const addResposta = useCallback((resposta: VIPRespostaType) => {
		setRespostas((prev) => {
			const index = prev.findIndex(
				(r) => r.pergunta === resposta.pergunta
			);

			if (index !== -1) {
				const existente = prev[index];
				if (
					existente.checked === resposta.checked &&
					existente.observation === resposta.observation
				) {
					return prev.filter((_, i) => i !== index);
				}
				return prev.map((r, i) =>
					i === index ? { ...r, ...resposta } : r
				);
			}

			return [...prev, resposta];
		});
	}, []);

	function handleAvancar() {
		if (!nome.trim()) {
			alert("Informe o nome do setor antes de continuar.");
			return;
		}
		addSetor({
			id: (params.id as string) || uuidv4(),
			nome,
			respostas,
			perguntas: quests_setor,
		});
		router.push("/Visita/Perguntas/Setor");
	}

	return (
		<>
			<Pressable onPress={toggleSidebar} style={styles.abrirBotao}>
				<Text style={styles.botaoTexto}>☰ Abrir Menu</Text>
			</Pressable>
			<Container scroller>
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
								resposta={respostas.find(
									(r) => r.pergunta === q.pergunta
								)}
								onChange={addResposta}
								respostas={respostas}
							/>
						</View>
					))}

					<View
						style={{
							marginTop: 20,
							flexDirection: "row",
							gap: 10,
							flex: 1,
							justifyContent: "space-between",
						}}
					>
						<Button
							disabled={
								!nome.trim() ||
								respostas.length !== perguntas.setor.length
							}
							onPress={() => handleAvancar()}
						>
							Salvar Setor
						</Button>
					</View>
				</View>

				{isSidebarOpen && (
					<Pressable style={styles.overlay} onPress={toggleSidebar} />
				)}

				{/* Sidebar */}
				{isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
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
		zIndex: 9999,
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
