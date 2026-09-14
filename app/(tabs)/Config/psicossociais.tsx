import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Container from "@/components/Container";
import type PsicossocialType from "@/types/Psicossocial/PsicossocialType";
import { events } from "@/utils/API/Event";
import manager from "@/utils/Data/manager";
import { getRelatorioPsicossocialHtml } from "@/utils/Psicossocial/formatHTML";

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
			<Text style={styles.emptyStateText}>Nenhum psicossocial encontrado</Text>
		</View>
	);
}

export default function Config() {
	const [psicossociais, setPsicossociais] = useState<PsicossocialType[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadPsicossociais();
	}, []);

	async function loadPsicossociais() {
		try {
			const rawData = (await manager.psicos.getAll()) || "[]";
			const parsedData = JSON.parse(rawData) as PsicossocialType[];
            console.log(parsedData)
			setPsicossociais(parsedData);
		} catch (error) {
			console.error("Erro ao listar psicossociais:", error);
		} finally {
			setLoading(false);
		}
	}

	async function generatePdfFromHtml(html: string) {
		const { uri } = await Print.printToFileAsync({
			html,
		});
		return uri;
	}

	async function handleExport(id: string) {
		const htmlContent = getRelatorioPsicossocialHtml(
			psicossociais.find((item) => item.id === id) as PsicossocialType,
		);

		// 🔥 AGORA GERA PDF (não HTML)
		const pdfUri = await generatePdfFromHtml(htmlContent);

		if (!pdfUri) {
			Alert.alert("Nenhum arquivo", "Nenhum relatório foi gerado ainda.");
			return;
		}

		await Sharing.shareAsync(pdfUri);
	}

	function handleClearAll() {
		Alert.alert(
			"Apagar psicossociais",
			"Tem certeza que deseja apagar todos os psicossociais salvos?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Apagar",
					style: "destructive",
					onPress: async () => {
						try {
							await manager.psicos.clear();
							setPsicossociais([]);
							events.sendEvent("Todos os psicossociais foram apagados");
							Alert.alert("Sucesso", "Todos os psicossociais foram apagados!");
						} catch (error) {
							events.sendEvent(
								`Erro ao apagar psicossociais: ${JSON.stringify(error)}`,
							);
							Alert.alert("Erro", "Não foi possível apagar os psicossociais.");
						}
					},
				},
			],
		);
	}

	if (loading) {
		return (
			<Container style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#0dcaf0" />
				<Text style={styles.loadingText}>Carregando psicossociais...</Text>
			</Container>
		);
	}

	return (
		<Container style={styles.container} scroller>
			<View style={styles.titleRow}>
				<Text style={styles.title}>Psicossociais Salvos</Text>
				<TouchableOpacity onPress={handleClearAll}>
					<Text style={styles.clearAction}>Apagar tudo</Text>
				</TouchableOpacity>
			</View>

			<TableHeader />

			<FlatList
				data={[...psicossociais].reverse()}
				scrollEnabled={false}
				keyExtractor={(item, index) => `${item.id}-${index}`}
				contentContainerStyle={{ paddingBottom: 80 }}
				ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
				renderItem={({ item }) => (
					<View style={styles.row}>
						<Text style={[styles.idText, styles.idColumn]}>
							{item.id?.slice(0, 7) || "-"}
						</Text>

						<Text
							style={[styles.primaryText, styles.nameColumn]}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{item.empresa?.razao_social}
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
								Alert.alert("ID do psicossocial", item.id, [
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
					</View>
				)}
				ListEmptyComponent={<EmptyList />}
			/>
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
	clearAction: {
		color: "#f85149",
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
});
