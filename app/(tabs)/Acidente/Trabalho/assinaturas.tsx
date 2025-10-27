import { useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Assinatura from "@/components/Assinatura";
import { useAcidente } from "@/hooks/Acidente/AcidenteProvider";
import { useNavigationHistory } from "@/hooks/Navigation";

export default function Assinaturas() {
	const { acidente, setAcidente } = useAcidente();
	const nav = useNavigationHistory();

	// Estado local inicial baseado no acidente
	const [assinaturas, setAssinaturas] = useState({
		acidentado: acidente?.cat5?.assinaturaAcidentado || null,
		responsavel: acidente?.cat7?.assinaturaResponsavel || null,
		testemunhas: acidente.cat8?.testemunhos || [],
	});

	const [coletando, setColetando] = useState<
		"acidentado" | "responsavel" | string | null
	>(null);

	const handleSubmit = () => {
		setAcidente((prev) => ({
			...prev,
			cat5: {
				...prev.cat5,
				assinaturaAcidentado: assinaturas.acidentado || undefined,
			},
			cat7: {
				...prev.cat7,
				assinaturaResponsavel: assinaturas.responsavel || undefined,
			},
			cat8: {
				...prev.cat8,
				testemunhos: assinaturas.testemunhas || [],
			},
		}));
		nav.push("/Acidente/Trabalho/finalizado");
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>Coleta de Assinaturas</Text>

			{/* Acidentado */}
			<TouchableOpacity
				style={styles.assinaturaBox}
				onPress={() => setColetando("acidentado")}
			>
				<Text style={styles.label}>Assinatura do Acidentado</Text>
				<Text style={styles.subtext}>
					{assinaturas.acidentado
						? "✅ Assinatura coletada"
						: "Toque para assinar"}
				</Text>
			</TouchableOpacity>

			{/* Responsável */}
			<TouchableOpacity
				style={styles.assinaturaBox}
				onPress={() => setColetando("responsavel")}
			>
				<Text style={styles.label}>Assinatura do Responsável</Text>
				<Text style={styles.subtext}>
					{assinaturas.responsavel
						? "✅ Assinatura coletada"
						: "Toque para assinar"}
				</Text>
			</TouchableOpacity>

			{/* Testemunhas */}
			<Text style={[styles.label, { marginTop: 20 }]}>Testemunhas</Text>
			{assinaturas.testemunhas.map((t, i) => (
				<TouchableOpacity
					key={t.id || i}
					style={styles.assinaturaBox}
					onPress={() => setColetando(`testemunha-${i}`)}
				>
					<Text style={styles.label}>
						Testemunha {i + 1}: {t.nome}
					</Text>
					<Text style={styles.subtext}>
						{t.assinaturaTestemunha
							? "✅ Assinatura coletada"
							: "Toque para assinar"}
					</Text>
				</TouchableOpacity>
			))}

			{/* Botão finalizar */}
			<TouchableOpacity style={styles.finishButton} onPress={handleSubmit}>
				<Text style={styles.finishText}>Finalizar Coleta</Text>
			</TouchableOpacity>

			{/* Modal de assinatura */}
			{coletando && (
				<View style={styles.modal}>
					<Assinatura
						assinante={
							coletando === "acidentado"
								? "Acidentado"
								: coletando === "responsavel"
									? "Responsável da Empresa"
									: `Testemunha ${coletando.split("-")[1]}`
						}
						onSubmit={(signature) => {
							if (!signature) {
								setColetando(null);
								return;
							}

							setAssinaturas((prev) => {
								const newState = { ...prev };

								if (coletando === "acidentado") {
									newState.acidentado = signature;
								} else if (coletando === "responsavel") {
									newState.responsavel = signature;
								} else if (coletando.startsWith("testemunha-")) {
									const index = parseInt(coletando.split("-")[1], 10);
									newState.testemunhas[index].assinaturaTestemunha = signature;
								}

								// Salva direto no hook global
								setAcidente((prev) => ({
									...prev,
									cat5: {
										...prev.cat5,
										assinaturaAcidentado: newState.acidentado || undefined,
									},
									cat7: {
										...prev.cat7,
										assinaturaResponsavel: newState.responsavel || undefined,
									},
									cat8: {
										...prev.cat8,
										testemunhos: newState.testemunhas || [],
									},
								}));
								return newState;
							});

							setColetando(null);
						}}
					/>
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: "#121212",
		flexGrow: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#fff",
		marginBottom: 16,
	},
	label: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	subtext: {
		color: "#bbb",
		fontSize: 14,
		marginTop: 4,
	},
	assinaturaBox: {
		backgroundColor: "rgba(255,255,255,0.1)",
		borderRadius: 10,
		padding: 14,
		marginVertical: 8,
	},
	finishButton: {
		marginTop: 24,
		backgroundColor: "#007AFF",
		padding: 14,
		borderRadius: 10,
		alignItems: "center",
	},
	finishText: {
		color: "#fff",
		fontWeight: "600",
		fontSize: 16,
	},
	modal: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "#000",
		zIndex: 100,
	},
});
