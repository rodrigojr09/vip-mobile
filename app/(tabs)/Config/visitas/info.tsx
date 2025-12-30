import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Text,
	View,
	StyleSheet,
	ScrollView,
    Alert,
    TouchableOpacity,
    Modal,
    TextInput,
} from "react-native";

import Container from "@/components/Container";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import manager from "@/utils/Data/manager";

export default function VisualizarVisita() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const [visita, setVisita] = useState<VIPVisitaType | null>(null);
	const [loading, setLoading] = useState(true);

    const [modalVisible, setModalVisible] = useState(false);
	const [senha, setSenha] = useState("");
	const [deletando, setDeletando] = useState(false);


	useEffect(() => {
		(async () => {
			try {
				const data = await manager.visitas.getById(id);
				if (!data) throw new Error("Visita não encontrada");
				setVisita(data);
			} catch (error) {
				console.error("Erro ao carregar visita:", error);
				router.replace("/Config/visitas");
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);

    const SENHA_DELETE = "vip123"; // depois pode puxar do backend

	async function handleDelete() {
		if (!senha) {
			Alert.alert("Erro", "Informe a senha.");
			return;
		}

		if (senha !== SENHA_DELETE) {
			Alert.alert("Senha incorreta", "A senha informada está inválida.");
			return;
		}

		try {
			setDeletando(true);
			await manager.visitas.delete(id);

			Alert.alert("Sucesso", "Visita deletada com sucesso.", [
				{
					text: "OK",
					onPress: () => router.replace("/Config/visitas"),
				},
			]);
		} catch (error) {
			console.error(error);
			Alert.alert("Erro", "Não foi possível deletar a visita.");
		} finally {
			setDeletando(false);
			setSenha("");
			setModalVisible(false);
		}
	}


	if (loading) {
		return (
			<Container style={styles.center}>
				<ActivityIndicator size="large" color="#0dcaf0" />
				<Text style={styles.textMuted}>Carregando visita...</Text>
			</Container>
		);
	}

	if (!visita) return null;

	return (
		<Container style={styles.container} scroller>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* 🔹 Dados da Visita */}
				<Section title="Dados da Visita">
					<Item label="ID" value={visita.id} />
					<Item label="Data" value={visita.data} />
					<Item label="Hora Entrada" value={visita.horaEntrada} />
					<Item label="Hora Saída" value={visita.horaSaida} />
					<Item label="Responsável" value={visita.responsavel} />
					<Item label="Técnico" value={visita.tecnico} />
				</Section>

				{/* 🔹 Empresa */}
				{visita.empresa && (
					<Section title="Empresa">
						<Item label="Razão Social" value={visita.empresa.razao_social} />
						<Item label="Nome Fantasia" value={visita.empresa.nome_fantasia} />
						<Item label="CNPJ" value={visita.empresa.cnpj} />
					</Section>
				)}

				{/* 🔹 Setores */}
				<Section title="Setores Avaliados">
					{visita.setores.map((setor) => (
						<View key={setor.id} style={styles.card}>
							<Text style={styles.cardTitle}>{setor.nome}</Text>

							{setor.respostas.map((resposta) => (
								<View key={resposta.pergunta} style={styles.resposta}>
									<Text style={styles.pergunta}>• {resposta.pergunta}</Text>
									<Text style={styles.respostaValor}>
										Resposta: {resposta.checked ?? "-"}
									</Text>

									{resposta.observation && (
										<Text style={styles.observacao}>
											Obs: {resposta.observation}
										</Text>
									)}
								</View>
							))}
						</View>
					))}
				</Section>

				{/* 🔹 Assinatura */}
				{visita.assinatura && (
					<Section title="Assinatura">
						<Text style={styles.textMuted}>
							Assinatura registrada no sistema.
						</Text>
					</Section>
				)}
				<View style={{ marginTop: 30 }}>
					<TouchableOpacity
						style={styles.deleteButton}
						onPress={() => setModalVisible(true)}
					>
						<Text style={styles.deleteButtonText}>Deletar Visita</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
			<Modal
				visible={modalVisible}
				transparent
				animationType="fade"
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalBox}>
						<Text style={styles.modalTitle}>Confirmar exclusão</Text>

						<Text style={styles.modalText}>
							Digite a senha para deletar esta visita.
						</Text>

						<TextInput
							secureTextEntry
							placeholder="Senha"
							placeholderTextColor="#8b949e"
							value={senha}
							onChangeText={setSenha}
							style={styles.input}
						/>

						<View style={styles.modalActions}>
							<TouchableOpacity
								style={styles.cancelButton}
								onPress={() => setModalVisible(false)}
							>
								<Text style={styles.cancelText}>Cancelar</Text>
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.confirmButton}
								onPress={handleDelete}
								disabled={deletando}
							>
								<Text style={styles.confirmText}>
									{deletando ? "Deletando..." : "Confirmar"}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</Container>
	);
}

/* ================= COMPONENTES AUXILIARES ================= */

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{title}</Text>
			{children}
		</View>
	);
}

function Item({ label, value }: { label: string; value?: string }) {
	return (
		<View style={styles.item}>
			<Text style={styles.label}>{label}:</Text>
			<Text style={styles.value}>{value || "-"}</Text>
		</View>
	);
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0d1117",
		padding: 16,
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#0d1117",
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#0dcaf0",
		marginBottom: 8,
	},
	item: {
		flexDirection: "row",
		marginBottom: 4,
	},
	label: {
		color: "#8b949e",
		width: 120,
	},
	value: {
		color: "#c9d1d9",
		flex: 1,
	},
	textMuted: {
		color: "#8b949e",
		marginTop: 10,
	},
	card: {
		backgroundColor: "#161b22",
		padding: 12,
		borderRadius: 8,
		marginBottom: 12,
	},
	cardTitle: {
		color: "#c9d1d9",
		fontWeight: "600",
		marginBottom: 8,
	},
	resposta: {
		marginBottom: 6,
	},
	pergunta: {
		color: "#c9d1d9",
	},
	respostaValor: {
		color: "#58a6ff",
		marginLeft: 8,
	},
	observacao: {
		color: "#f85149",
		marginLeft: 8,
		fontStyle: "italic",
	},
	deleteButton: {
		backgroundColor: "#f85149",
		padding: 14,
		borderRadius: 8,
		alignItems: "center",
	},
	deleteButtonText: {
		color: "#fff",
		fontWeight: "600",
	},

	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.6)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalBox: {
		width: "85%",
		backgroundColor: "#161b22",
		borderRadius: 8,
		padding: 16,
	},
	modalTitle: {
		color: "#f85149",
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 8,
	},
	modalText: {
		color: "#c9d1d9",
		marginBottom: 12,
	},
	input: {
		backgroundColor: "#0d1117",
		borderRadius: 6,
		padding: 10,
		color: "#c9d1d9",
		borderWidth: 1,
		borderColor: "#30363d",
		marginBottom: 12,
	},
	modalActions: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 12,
	},
	cancelButton: {
		padding: 10,
	},
	cancelText: {
		color: "#8b949e",
	},
	confirmButton: {
		backgroundColor: "#f85149",
		padding: 10,
		borderRadius: 6,
	},
	confirmText: {
		color: "#fff",
		fontWeight: "600",
	},
});
