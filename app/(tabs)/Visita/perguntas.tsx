import Button from "@/components/Button";
import Container from "@/components/Container";
import { useVisita } from "@/hooks/VisitaProvider";
import { Resposta } from "@/types/VIPVisitaType";
import { useRouter } from "expo-router";
import React, { useState, useEffect, JSX } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	Alert,
	Dimensions,
	Pressable,
} from "react-native";
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import {
	PanGestureHandler,
	GestureHandlerRootView,
} from "react-native-gesture-handler";

const ObservacaoCampo = ({
	label,
	status,
	initialValue,
	onChange,
}: {
	label: string;
	status: Resposta["value"];
	initialValue?: string;
	onChange: (label: string, status: Resposta["value"], obs: string) => void;
}) => {
	const [text, setText] = useState(initialValue || "");

	useEffect(() => {
		setText(initialValue || "");
	}, [initialValue]);

	return (
		<TextInput
			style={styles.observationInput}
			placeholder="Observações (opcional)"
			placeholderTextColor="#aaa"
			multiline
			value={text}
			onChangeText={(value) => {
				setText(value);
				onChange(label, status, value);
			}}
		/>
	);
};

const { width, height: windowHeight } = Dimensions.get("window");
const SIDEBAR_WIDTH = width * 0.75;

export default function Sidebar() {
	const sidebarX = useSharedValue(-SIDEBAR_WIDTH);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		const isOpen = sidebarX.value === 0;
		sidebarX.value = withTiming(isOpen ? -SIDEBAR_WIDTH : 0, {
			duration: 200,
		});
		setIsSidebarOpen(!isOpen); // ⚠️ atualiza o React
	};

	const sidebarStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: sidebarX.value }],
	}));

	const { perguntas, respostas, setRespostas } = useVisita();
	const router = useRouter();
	const [topic, setTopic] = useState<string>("");
	useEffect(() => {
		setTopic(perguntas[0].label);
	}, []);

	function setStatus(pergunta: string, status: Resposta["value"]) {
		if (respostas.find((r) => r.pergunta === pergunta))
			setRespostas((prev) =>
				respostas.map((r) =>
					r.pergunta === pergunta
						? { ...r, value: r.value === status ? null : status }
						: r
				)
			);
		else setRespostas((prev) => [...prev, { pergunta, value: status }]);
	}

	function setObs(pergunta: string, status: Resposta["value"], obs: string) {
		setRespostas((prev) => {
			const existing = prev.find((r) => r.pergunta === pergunta);
			if (existing) {
				return prev.map((r) =>
					r.pergunta === pergunta ? { ...r, observation: obs } : r
				);
			}
			return [
				...prev,
				{ pergunta, value: status || null, observation: obs },
			];
		});
	}

	const renderQuestion = ({
		pergunta,
	}: {
		pergunta: string;
	}): JSX.Element => {
		const status = respostas.find((r) => r.pergunta === pergunta)
			?.value as any;

		return (
			<View key={pergunta} style={styles.questionBlock}>
				<Text style={styles.questionText}>{pergunta}</Text>

				<View style={styles.buttonGroup}>
					{["Sim", "Não", "NA"].map((key) => {
						const isSelected = status === key;
						return (
							<TouchableOpacity
								key={pergunta + "-" + key}
								style={[
									styles.choiceButton,
									isSelected &&
										(status === "Sim"
											? styles.choiceButtonSelectedGreen
											: status === "Não"
											? styles.choiceButtonSelectedRed
											: styles.choiceButtonSelectedGray),
								]}
								onPress={() =>
									setStatus(
										pergunta,
										key as Resposta["value"]
									)
								}
							>
								<Text style={styles.choiceLabel}>{key}</Text>
							</TouchableOpacity>
						);
					})}
				</View>

				{status && (
					<ObservacaoCampo
						label={pergunta}
						status={status}
						initialValue=""
						onChange={setObs}
					/>
				)}
			</View>
		);
	};

	function handleSave() {
		const hasUnanswered = perguntas.some((topico) =>
			topico.perguntas.some(
				(pergunta) =>
					!respostas.find(
						(r) =>
							r.pergunta === pergunta &&
							r.value !== null &&
							r.value !== undefined
					)
			)
		);
		if (hasUnanswered)
			return Alert.alert("Atenção! Preencha todas as perguntas.");
		router.push({ pathname: "/Visita/resumo" });
	}

	const t = perguntas.find((a) => a.label === topic);

	return (
		<Container scroller>
			<View style={styles.formContainer}>
				<Pressable onPress={toggleSidebar} style={styles.abrirBotao}>
					<Text style={styles.botaoTexto}>☰ Abrir Menu</Text>
				</Pressable>

				{t && (
					<View>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								marginBottom: 10,
								marginTop: 20,
								color: "lime",
								textAlign: "center",
							}}
						>
							{t.label}
						</Text>
						{t.perguntas.map((p) =>
							renderQuestion({ pergunta: p })
						)}
					</View>
				)}
			</View>
			{isSidebarOpen && (
				<Pressable style={styles.overlay} onPress={toggleSidebar} />
			)}

			<Animated.View style={[styles.sidebar, sidebarStyle]}>
				<Text style={styles.sidebarTitulo}>Menu</Text>
				<Pressable onPress={toggleSidebar}>
					<Text style={styles.fecharTexto}>✕ Fechar</Text>
				</Pressable>
				<View style={styles.menuItens}>
					{perguntas.map((t) => {
						const isCompleted = t.perguntas.every((p) =>
							respostas.some(
								(r) =>
									r.pergunta === p &&
									r.value !== null &&
									r.value !== undefined
							)
						);
						return (
							<Pressable
								key={t.label}
								onPress={() => {
									setTopic(t.label);
									toggleSidebar();
								}}
							>
								<Text
									style={{
										...styles.item,
										color: isCompleted ? "lime" : "gray",
									}}
								>
									{t.label}
								</Text>
							</Pressable>
						);
					})}

					<Button onPress={handleSave}>Salvar</Button>
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
	},
	row: {
		flexDirection: "column",
		width: "100%",
		alignItems: "center",
		marginTop: 12,
	},

	questionBlock: {
		marginBottom: 32,
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#1f1f1f",
		elevation: 3,
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
	observationInput: {
		marginTop: 16,
		backgroundColor: "#2a2a2a",
		color: "#fff",
		padding: 12,
		borderRadius: 12,
		fontSize: 16,
		minHeight: 60,
		textAlignVertical: "top",
	},
	abrirBotao: {
		position: "absolute", // <== substitui o "fixed"
		top: 40, // ajuste para ficar abaixo do status bar
		right: 20, // margem lateral
		backgroundColor: "#444",
		padding: 10,
		borderRadius: 6,
		zIndex: 9999, // garantir que fique por cima
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
