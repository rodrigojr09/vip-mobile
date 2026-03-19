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
import type { VIPEmpresaType } from "@/types/Levantamento/VIPEmpresaType";
import { events } from "@/utils/API/Event";
import manager from "@/utils/Data/manager";
import { exportLevantamentoReport } from "@/utils/services/configExports";

interface LevantamentoListItem {
	id: string;
	nome: string;
	responsavel: string;
	data: string;
}

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
			<Text style={styles.emptyStateText}>Nenhum levantamento encontrado</Text>
		</View>
	);
}

export default function Config() {
	const [levantamentos, setLevantamentos] = useState<LevantamentoListItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		loadLevantamentos();
	}, []);

	async function loadLevantamentos() {
		try {
			const rawData = (await manager.levantamentos.getAll()) || "[]";
			const parsedData = JSON.parse(rawData) as { empresa: VIPEmpresaType }[];

			setLevantamentos(
				parsedData.map((item) => ({
					id: item.empresa.id || "-",
					nome: item.empresa.nome || "Sem Nome",
					responsavel: item.empresa.responsavel || "Sem Responsável",
					data: item.empresa.data || "Sem Data",
				})),
			);
		} catch (error) {
			console.error("Erro ao listar levantamentos:", error);
		} finally {
			setLoading(false);
		}
	}

	async function handleExport(id: string) {
		const result = await exportLevantamentoReport(id);

		if (!result) {
			Alert.alert(
				"Erro",
				"Não foi possível encontrar os dados do levantamento.",
			);
		}
	}

	function handleClearAll() {
		Alert.alert(
			"Apagar levantamentos",
			"Tem certeza que deseja apagar todos os levantamentos salvos?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Apagar",
					style: "destructive",
					onPress: async () => {
						try {
							await manager.levantamentos.clear();
							setLevantamentos([]);
							events.sendEvent("Todos os levantamentos foram apagados");
							Alert.alert("Sucesso", "Todos os levantamentos foram apagados!");
						} catch (error) {
							events.sendEvent(
								`Erro ao apagar levantamentos: ${JSON.stringify(error)}`,
							);
							Alert.alert(
								"Erro",
								"Não foi possível apagar os levantamentos.",
							);
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
				<Text style={styles.loadingText}>Carregando levantamentos...</Text>
			</Container>
		);
	}

	return (
		<Container style={styles.container} scroller>
			<View style={styles.titleRow}>
				<Text style={styles.title}>Levantamentos Salvos</Text>
				<TouchableOpacity onPress={handleClearAll}>
					<Text style={styles.clearAction}>Apagar tudo</Text>
				</TouchableOpacity>
			</View>

			<TableHeader />

			<FlatList
				data={[...levantamentos].reverse()}
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
								Alert.alert("ID do Levantamento", item.id, [
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
