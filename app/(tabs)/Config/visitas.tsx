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
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import { events } from "@/utils/API/Event";
import manager from "@/utils/Data/manager";
import { getHtmlVisita } from "@/utils/Visita/formatHTML";

export default function Config() {
	const [visitas, setVisitas] = useState<
		{ id: string; nome: string; responsavel: string; data: string }[]
	>([]);
	const [loading, setLoading] = useState(true);

	// 🔄 Carrega os Visitas
	useEffect(() => {
		(async () => {
			try {
				const visitasData = await manager.visitas.getAll();
				const data = visitasData?.map((visita: VIPVisitaType) => ({
					id: visita.id || "-",
					nome: visita.empresa?.razao_social || "Sem Nome",
					responsavel: visita.responsavel || "Sem Responsável",
					data: `${visita.data} ${visita.horaEntrada}` || "Sem Data",
				}));
                
				if (data) setVisitas(data);
                else setVisitas([]);
			} catch (error) {
				console.error("❌ Erro ao listar Visitas:", error);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	// 🗑️ Função para apagar Visitas
	const _apagarVisitas = async () => {
		Alert.alert(
			"Apagar Visitas",
			"Tem certeza que deseja apagar todos os Visitas salvos?",
			[
				{ text: "Cancelar", style: "cancel" },
				{
					text: "Apagar",
					style: "destructive",
					onPress: async () => {
						try {
							await manager.visitas.clearVisitas(); // limpa os dados salvos
							setVisitas([]);
							events.sendEvent("🗑️ Todos os Visitas foram apagados");
							Alert.alert("Sucesso", "Todos os Visitas foram apagados!");
						} catch (error) {
							events.sendEvent(
								`❌ Erro ao apagar Visitas: ${JSON.stringify(error)}`,
							);
							Alert.alert("Erro", "Não foi possível apagar os Visitas.");
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
					Carregando visitas...
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
					Visitas Salvas
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
				data={visitas.reverse()}
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
								Alert.alert("ID do Visita", item.id, [
									{
										text: "Baixar",
										style: "default",
										onPress: async () => {
											const visita = await manager.visitas.getById(item.id);
											if (!visita) {
												Alert.alert(
													"Erro",
													"Não foi possível encontrar os dados do Visita.",
												);
												return;
											}

											const htmlContent = getHtmlVisita(visita)
												.replace("$assinatura", visita.assinatura || "")
												.replace("not-assinatura", "");

											// Caminho interno
											const fileName = `Visita - ${visita.empresa?.razao_social}.html`;
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
							Nenhum Visita encontrado
						</Text>
					</View>
				}
			/>
		</Container>
	);
}
