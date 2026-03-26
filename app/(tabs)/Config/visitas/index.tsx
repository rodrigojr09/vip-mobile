import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Container from "@/components/Container";
import Input from "@/components/Input";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import manager from "@/utils/Data/manager";
import { exportVisitaReport } from "@/utils/services/configExports";
import { syncOfflineVisitas } from "@/utils/services/visitaSync";

interface VisitaListItem {
	id: string;
	nome: string;
	responsavel: string;
	data: string;
}

const DEV_PASSWORD = "Erodev19";

function TableHeader() {
	return (
		<View style={styles.tableHeader}>
			<Text style={[styles.headerText, styles.idColumn]}>ID</Text>
			<Text style={[styles.headerText, styles.nameColumn]}>Empresa</Text>
			<Text style={[styles.headerText, styles.nameColumn]}>Responsável</Text>
			<Text style={[styles.headerText, styles.dateColumn]}>Data</Text>
			<Text style={[styles.headerText, styles.actionColumn]}></Text>
		</View>
	);
}

function EmptyList() {
	return (
		<View style={styles.emptyState}>
			<Text style={styles.emptyStateText}>Nenhum Visita encontrado</Text>
		</View>
	);
}

export default function Config() {
	const [visitas, setVisitas] = useState<VisitaListItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [openModal, setOpenModal] = useState(false);
	const [senha, setSenha] = useState("");

	useEffect(() => {
		loadVisitas();
	}, []);

	async function loadVisitas() {
		try {
			const visitasData = await manager.visitas.getAll();
			setVisitas(
				visitasData.map((visita: VIPVisitaType) => ({
					id: visita.id || "-",
					nome: visita.empresa?.razao_social || "Sem Nome",
					responsavel: visita.responsavel || "Sem Responsável",
					data: `${visita.data} ${visita.horaEntrada}` || "Sem Data",
				})),
			);
		} catch (error) {
			console.error("Erro ao listar Visitas:", error);
		} finally {
			setLoading(false);
		}
	}

	async function handleSyncAll() {
		await syncOfflineVisitas();
		await loadVisitas();
	}

	async function handleExport(id: string) {
		const result = await exportVisitaReport(id);

		if (!result) {
			Alert.alert("Erro", "Não foi possível encontrar os dados da visita.");
		}
	}

	function handleDeveloperAccess() {
		if (senha === DEV_PASSWORD) {
			setOpenModal(false);
			setSenha("");
			router.replace("/Config/visitas/dev");
			return;
		}

		Alert.alert("Senha incorreta", "A senha informada está inválida.");
	}

	if (loading) {
		return (
			<Container style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0dcaf0" />
				<Text style={styles.loadingText}>Carregando visitas...</Text>
			</Container>
		);
	}

	return (
		<Container style={styles.container} scroller>
			<View style={styles.titleRow}>
				<Text style={styles.title}>Visitas Salvas</Text>

				<View style={styles.headerActions}>
					<TouchableOpacity
						style={styles.devButton}
						onPress={() => setOpenModal(true)}
					>
						<Text style={styles.devButtonText}>Desenvolvedor</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.syncButton}
						onPress={handleSyncAll}
					>
						<Text style={styles.syncButtonText}>Sincronizar</Text>
					</TouchableOpacity>
				</View>
			</View>

			<TableHeader />

			<FlatList
				data={[...visitas].reverse()}
				scrollEnabled={false}
				keyExtractor={(item, index) => `${item.id}-${index}`}
				contentContainerStyle={{ paddingBottom: 80 }}
				ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
				renderItem={({ item }) => (
					<Pressable
						onPress={() =>
							router.push({
								pathname: "/Config/visitas/info",
								params: { id: item.id },
							})
						}
						style={styles.row}
					>
						<Text style={[styles.idText, styles.idColumn]}>
							{item.id?.slice(0, 7) || "-"}
						</Text>

						<Text
							style={[styles.primaryText, styles.nameColumn]}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{item.nome}
						</Text>

						<Text
							style={[styles.primaryText, styles.nameColumn]}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{item.responsavel}
						</Text>

						<Text style={[styles.secondaryText, styles.dateColumn]}>
							{item.data}
						</Text>

						<TouchableOpacity
							onPress={() => {
								Alert.alert("ID do Visita", item.id, [
									{
										text: "Baixar",
										style: "default",
										onPress: async () => {
											await handleExport(item.id);
										},
									},
									{ text: "Fechar", style: "cancel" },
								]);
							}}
							style={styles.actionColumn}
						>
							<Text style={styles.actionText}>+</Text>
						</TouchableOpacity>
					</Pressable>
				)}
				ListEmptyComponent={<EmptyList />}
			/>

			{openModal && (
				<View style={styles.modalOverlay}>
					<View style={styles.modalBox}>
						<Text style={styles.modalText}>Digite sua senha para acessar:</Text>
						<Input placeholder="Senha" value={senha} onChange={setSenha} />
						<View style={styles.modalActions}>
							<Pressable
								onPress={handleDeveloperAccess}
								style={styles.enterButton}
							>
								<Text style={styles.modalButtonText}>Entrar</Text>
							</Pressable>
							<Pressable
								onPress={() => setOpenModal(false)}
								style={styles.cancelButton}
							>
								<Text style={styles.modalButtonText}>Cancelar</Text>
							</Pressable>
						</View>
					</View>
				</View>
			)}
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#0d1117",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0d1117",
	},
	loadingText: {
		marginTop: 10,
		color: "#c9d1d9",
	},
	titleRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	title: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#00B26D",
	},
	headerActions: {
		flexDirection: "row",
		gap: 8,
	},
	devButton: {
		padding: 8,
		borderRadius: 8,
	},
	devButtonText: {
		color: "#00B26D",
		fontWeight: "bold",
	},
	syncButton: {
		backgroundColor: "#00B26D",
		padding: 8,
		borderRadius: 8,
	},
	syncButtonText: {
		color: "#fff",
		fontWeight: "bold",
	},
	tableHeader: {
		flexDirection: "row",
		paddingVertical: 10,
		backgroundColor: "#21262d",
		borderRadius: 8,
		marginBottom: 8,
		elevation: 2,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 10,
		backgroundColor: "#161b22",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 3,
		elevation: 2,
	},
	headerText: {
		fontWeight: "bold",
		color: "#00B26D",
		textAlign: "center",
	},
	idText: {
		color: "#9ba3af",
		fontWeight: "bold",
		textAlign: "center",
	},
	primaryText: {
		color: "#f0f6fc",
		textAlign: "center",
		fontSize: 15,
	},
	secondaryText: {
		color: "#8b949e",
		textAlign: "center",
		fontSize: 13,
	},
	idColumn: {
		flex: 0.25,
	},
	nameColumn: {
		flex: 0.6,
	},
	dateColumn: {
		flex: 0.45,
	},
	actionColumn: {
		flex: 0.3,
		alignItems: "center",
		justifyContent: "center",
	},
	actionText: {
		color: "#58a6ff",
		fontWeight: "bold",
	},
	emptyState: {
		padding: 20,
		alignItems: "center",
		backgroundColor: "#161b22",
		borderRadius: 8,
		marginTop: 20,
	},
	emptyStateText: {
		color: "#8b949e",
		fontStyle: "italic",
	},
	modalOverlay: {
		position: "absolute",
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		zIndex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modalBox: {
		backgroundColor: "#161b22",
		padding: 20,
		borderRadius: 8,
		width: "80%",
	},
	modalText: {
		color: "#8b949e",
		marginBottom: 10,
	},
	modalActions: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	enterButton: {
		marginTop: 10,
		backgroundColor: "#58a6ff",
		padding: 10,
		borderRadius: 8,
	},
	cancelButton: {
		marginTop: 10,
		backgroundColor: "#dc3545",
		padding: 10,
		borderRadius: 8,
	},
	modalButtonText: {
		color: "#f0f6fc",
		fontWeight: "bold",
		fontSize: 16,
	},
});
