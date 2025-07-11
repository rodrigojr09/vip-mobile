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
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.75;

export default function PerguntasSetor() {
	const { addSetor, setores, perguntas, removerSetor } = useVisita();
	const [respostas, setRespostas] = useState<VIPRespostaType[]>([]);
	const [nome, setNome] = useState("");

	const sidebarX = useSharedValue(-SIDEBAR_WIDTH);
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
		const isOpen = sidebarX.value === 0;
		sidebarX.value = withTiming(isOpen ? -SIDEBAR_WIDTH : 0, {
			duration: 200,
		});
		setIsSidebarOpen(!isOpen);
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

	const sidebarStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: sidebarX.value }],
	}));

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
		<Container scroller>
			<Pressable onPress={toggleSidebar} style={styles.abrirBotao}>
				<Text style={styles.botaoTexto}>☰ Abrir Menu</Text>
			</Pressable>

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

				<Button
					disabled={
						!nome.trim() ||
						respostas.length !== perguntas.setor.length
					}
					onPress={() => handleAvancar()}
				>
					Próximo
				</Button>
			</View>

			{isSidebarOpen && (
				<Pressable style={styles.overlay} onPress={toggleSidebar} />
			)}

			{/* Sidebar */}
			<Animated.View style={[styles.sidebar, sidebarStyle]}>
				<Text style={styles.sidebarTitulo}>Setores Registrados</Text>
				<Pressable onPress={toggleSidebar}>
					<Text style={styles.fecharTexto}>✕ Fechar</Text>
				</Pressable>
				<View style={styles.menuItens}>
					{setores.map((t) => (
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
                                marginBottom: 12,
                                padding: 12,
                                borderRadius: 12,
                                alignItems: "center",
                                backgroundColor: "#2a2a2a", 
							}}
							key={t.id}
						>
							<Pressable
								onPress={() => {
									router.push({
										pathname: "/Visita/Perguntas/Setor",
										params: { id: t.id },
									});
								}}
							>
								<Text style={[{ color: "lime" }]}>
									{t.nome}
								</Text>
							</Pressable>
							<Pressable
								onPress={() => removerSetor(t.id as string)}
							>
								<Text style={[{ color: "red" }]}>
									Remover
								</Text>
							</Pressable>
						</View>
					))}

					<Button
						onPress={() => router.push("/Visita/Perguntas/Setor")}
					>
						Novo Setor
					</Button>
				</View>
			</Animated.View>
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
		position: "absolute",
		top: 20,
		right: 20,
		backgroundColor: "#444",
		padding: 10,
		borderRadius: 6,
		zIndex: 9999,
	},
	botaoTexto: {
		color: "#fff",
		fontSize: 16,
	},
	sidebar: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		width: SIDEBAR_WIDTH,
		backgroundColor: "#111",
		padding: 20,
		zIndex: 20,
	},
	sidebarTitulo: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
	},
	fecharTexto: {
		color: "#f55",
		fontSize: 16,
		marginBottom: 20,
	},
	menuItens: {
		gap: 10,
	},
	item: {
		color: "#ccc",
		fontSize: 18,
		marginBottom: 10,
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
