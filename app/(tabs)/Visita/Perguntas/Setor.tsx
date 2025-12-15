import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { v4 as uuidv4 } from "uuid";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import QuestionBlock from "@/components/Visita/QuestionBlock";
import { useVisita } from "@/hooks/v2/Visitas/Visita";
import type { RespostaType } from "@/types/Visita";
import "react-native-get-random-values";
import Sidebar from "@/components/Visita/Sidebar";
import { useNavigationHistory } from "@/hooks/Navigation";
import type SetorType from "@/types/Visita";
import manager from "@/utils/Data/manager";

export default function PerguntasSetor() {
	const { visita, setor, selecionarSetor, atualizarSetor } = useVisita();

	const perguntas = manager.visitas.perguntas;

	const nav = useNavigationHistory();

	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const params = useLocalSearchParams();

	useEffect(() => {
		if (params.id) {
			const setor = visita.setores.find((s) => s.id === params.id);
			if (setor) {
				selecionarSetor(setor.id);
			} else {
				const defaultSetor: SetorType = {
					id: uuidv4(),
					nome: "",
					respostas: [],
				};
				selecionarSetor(defaultSetor.id);
			}
		}
	}, []);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const addResposta = useCallback((resposta: RespostaType) => {
		const att = (prev: RespostaType[]) => {
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
		};
		atualizarSetor("respostas", att(setor?.respostas || []));
	}, []);

	function handleAvancar() {
		if (!setor?.nome.trim()) {
			alert("Informe o nome do setor antes de continuar.");
			return;
		}

		nav.push("/Visita/Perguntas/Setor");
	}

	return (
		<>
			<Pressable onPress={toggleSidebar} style={styles.abrirBotao}>
				<Text style={styles.botaoTexto}>☰ Abrir Menu</Text>
			</Pressable>
			{isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}

			<Container style={{ zIndex: 1 }} scroller>
				<View style={styles.formContainer}>
					<Text style={styles.title}>Perguntas do Setor</Text>

					<View style={styles.inputContainer}>
						<Input
							placeholder="Setor Vistoriado"
							onChange={(nome) => atualizarSetor("nome", nome)}
							value={setor?.nome || ""}
						/>
					</View>

					{perguntas.setor.map((q) => (
						<View key={q.id} style={styles.questionBlock}>
							<QuestionBlock
								pergunta={q}
								resposta={setor?.respostas.find(
									(r) => r.pergunta === q.pergunta,
								)}
								onChange={addResposta}
								respostas={setor?.respostas || []}
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
								!setor?.nome.trim() ||
								visita?.respostas.length !== perguntas.setor.length
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
				<View
					style={{ position: "absolute", width: "75%", height: "100%" }}
				></View>
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
