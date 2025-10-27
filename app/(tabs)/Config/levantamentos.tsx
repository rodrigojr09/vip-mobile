import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Alert,
	FlatList,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Container from "@/components/Container";
import type { VIPEmpresaType } from "@/types/Levantamento/VIPEmpresaType";
import { events } from "@/utils/API/Event";
import manager from "@/utils/Data/manager";
import { getHtml } from "@/utils/formatHTML";

export default function Config() {
	const [levantamentos, setLevantamentos] = useState<
		{ id: string; nome: string; responsavel: string; data: string }[]
	>([]);
	const [loading, setLoading] = useState(true);

	// 🔄 Carrega os levantamentos
	useEffect(() => {
		(async () => {
			try {
				const data = JSON.parse(
					(await manager.levantamentos.getAll()) || "[]",
				).map((lev: { empresa: VIPEmpresaType }) => ({
					id: lev.empresa.id || "-",
					nome: lev.empresa.nome || "Sem Nome",
					responsavel: lev.empresa.responsavel || "Sem Responsável",
					data: lev.empresa.data || "Sem Data",
				}));
				setLevantamentos(data);
			} catch (error) {
				console.error("❌ Erro ao listar levantamentos:", error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	// 🗑️ Função para apagar levantamentos
	const _apagarLevantamentos = async () => {
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
							await manager.levantamentos.clear(); // limpa os dados salvos
							setLevantamentos([]);
							events.sendEvent("🗑️ Todos os levantamentos foram apagados");
							Alert.alert("Sucesso", "Todos os levantamentos foram apagados!");
						} catch (error) {
							events.sendEvent(
								`❌ Erro ao apagar levantamentos: ${JSON.stringify(error)}`,
							);
							Alert.alert("Erro", "Não foi possível apagar os levantamentos.");
						}
					},
				},
			],
		);
	};

	if (loading) {
		return (
			<Container
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#0d1117",
				}}
			>
				<ActivityIndicator size="large" color="#0dcaf0" />
				<Text style={{ marginTop: 10, color: "#c9d1d9" }}>
					Carregando levantamentos...
				</Text>
			</Container>
		);
	}

	return (
		<Container style={{ padding: 16, backgroundColor: "#0d1117" }} scroller>
			{/* Cabeçalho com botão */}
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: 16,
				}}
			>
				<Text
					style={{
						fontSize: 22,
						fontWeight: "bold",
						color: "#00B26D", // cor verde
					}}
				>
					Levantamentos Salvos
				</Text>
			</View>

			{/* Cabeçalho da tabela */}
			<View
				style={{
					flexDirection: "row",
					paddingVertical: 10,
					backgroundColor: "#21262d",
					borderRadius: 8,
					marginBottom: 8,
					elevation: 2,
				}}
			>
				<Text
					style={{
						flex: 0.25,
						fontWeight: "bold",
						color: "#00B26D",
						textAlign: "center",
					}}
				>
					ID
				</Text>
				<Text
					style={{
						flex: 0.6,
						fontWeight: "bold",
						color: "#00B26D",
						textAlign: "center",
					}}
				>
					Empresa
				</Text>
				<Text
					style={{
						flex: 0.6,
						fontWeight: "bold",
						color: "#00B26D",
						textAlign: "center",
					}}
				>
					Responsável
				</Text>
				<Text
					style={{
						flex: 0.45,
						fontWeight: "bold",
						color: "#00B26D",
						textAlign: "center",
					}}
				>
					Data
				</Text>
				<Text
					style={{
						flex: 0.3,
						fontWeight: "bold",
						color: "#00B26D",
						textAlign: "center",
					}}
				></Text>
			</View>

			{/* Lista */}
			<FlatList
				data={levantamentos}
				scrollEnabled={false}
				keyExtractor={(item, index) => `${item.id}-${index}`}
				contentContainerStyle={{ paddingBottom: 80 }}
				ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
				renderItem={({ item }) => (
					<View
						style={{
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
						}}
					>
						<Text
							style={{
								flex: 0.25,
								color: "#9ba3af",
								fontWeight: "bold",
								textAlign: "center",
							}}
						>
							{item.id?.slice(0, 7) || "-"}
						</Text>

						<Text
							style={{
								flex: 0.6,
								color: "#f0f6fc",
								textAlign: "center",
								fontSize: 15,
							}}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{item.nome}
						</Text>

						<Text
							style={{
								flex: 0.6,
								color: "#f0f6fc",
								textAlign: "center",
								fontSize: 15,
							}}
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{item.responsavel}
						</Text>

						<Text
							style={{
								flex: 0.45,
								color: "#8b949e",
								textAlign: "center",
								fontSize: 13,
							}}
						>
							{item.data}
						</Text>

						<TouchableOpacity
							onPress={() => {
								Alert.alert("ID do Levantamento", item.id, [
									{
										text: "Baixar",
										style: "default",
										onPress: async () => {
											const empresa = await manager.levantamentos.getById(
												item.id,
											);
											if (!empresa) {
												Alert.alert(
													"Erro",
													"Não foi possível encontrar os dados do levantamento.",
												);
												return;
											}

											const htmlContent = getHtml(empresa)
												.replace("$assinatura", empresa.assinatura || "")
												.replace("not-assinatura", "");

											// Caminho interno
											const fileName = `Levantamento-${empresa.nome}.html`;
											const filePath = `${FileSystem.documentDirectory}${fileName}`;

											// Salva o arquivo internamente
											await FileSystem.writeAsStringAsync(
												filePath,
												htmlContent,
												{
													encoding: FileSystem.EncodingType.UTF8,
												},
											);

											Sharing.shareAsync(filePath);
										},
									},
									{ text: "Fechar", style: "cancel" },
								]);
							}}
							style={{
								flex: 0.3,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Text style={{ color: "#58a6ff", fontWeight: "bold" }}>+</Text>
						</TouchableOpacity>
					</View>
				)}
				ListEmptyComponent={
					<View
						style={{
							padding: 20,
							alignItems: "center",
							backgroundColor: "#161b22",
							borderRadius: 8,
							marginTop: 20,
						}}
					>
						<Text style={{ color: "#8b949e", fontStyle: "italic" }}>
							Nenhum levantamento encontrado
						</Text>
					</View>
				}
			/>
		</Container>
	);
}
