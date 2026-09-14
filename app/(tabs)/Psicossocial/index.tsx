import { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Container from "@/components/Container";
import { useNavigationHistory } from "@/hooks/Navigation";
import Button from "@/components/Button";
import { usePsico } from "@/hooks/Psicossocial/PsicoProvider";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import Input from "@/components/Input";
import { deviceType, DeviceType } from "expo-device";
import manager from "@/utils/Data/manager";
import { Ionicons } from "@expo/vector-icons";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

type EmpresaItem = VIPVisitaType["empresas"][0];

function matchesSearch(item: EmpresaItem, value: string) {
	const normalized = value.toLowerCase();

	return (
		item.nome_fantasia.toLowerCase().includes(normalized) ||
		item.apelido?.toLowerCase().includes(normalized) ||
		item.razao_social.toLowerCase().includes(normalized) ||
		item.cnpj.toLowerCase().includes(normalized)
	);
}

function truncateLabel(value: string, maxLength: number) {
	if (value.length <= maxLength) return value;
	return `${value.slice(0, maxLength)}...`;
}

export default function Psicossocial() {
	const nav = useNavigationHistory();
	const [inclusaSearch, setInclusaSearch] = useState("");
	const [openInclusa, setOpenInclusa] = useState(false);
	const {
        setId,
		empresa,
		setEmpresa,
        setData,
		observacao,
		setObservacao,
		autorizado,
		setAutorizado,
		orientacao,
		setOrientacao,
		tecnico,
		setTecnico,
		responsavel,
		setResponsavel,
		inclusas,
		setInclusas,
	} = usePsico();
	const [block, setBlock] = useState(false);
	const isTablet = deviceType === DeviceType.TABLET;
	const titleLimit = isTablet ? 60 : 25;
	const [search, setSearch] = useState("");

	const filteredEmpresas = manager.visitas.empresas.filter((item) =>
		matchesSearch(item, search),
	);
	const filteredInclusas = manager.visitas.empresas.filter((item) =>
		matchesSearch(item, inclusaSearch),
	);

	function getButtonStyle(status: 1 | 2 | 3 | null, key: string) {
		if (status === 1 && key === "Sim") {
			return styles.choiceButtonSelectedGreen;
		} else if (status === 2 && key === "Não") {
			return styles.choiceButtonSelectedRed;
		} else if (status === 3 && key === "N/A") {
			return styles.choiceButtonSelectedGray;
		} else {
			return styles.choiceButton;
		}
	}

	function addEmpresaInclusa(selectedEmpresa: EmpresaItem) {
		setInclusas([...inclusas, selectedEmpresa]);
		setOpenInclusa(false);
		setInclusaSearch("");
	}

	function removeEmpresaInclusa(empresaId?: string) {
		setInclusas(inclusas.filter((item) => item?.cnpj !== empresaId));
	}

	function handleFinalizar() {
		if (block) return;
        setId(uuidv4());
        const day = new Date().getDate();
        const month = new Date().getMonth() + 1;
        const year = new Date().getFullYear();
        const date = `${day}/${month}/${year}`;
        setData(date);
		nav.push("/Psicossocial/resumo");
	}

	function renderSuggestionItem(
		item: EmpresaItem,
		onPress: (empresaSelecionada: EmpresaItem) => void,
	) {
		return (
			<TouchableOpacity
				style={styles.suggestionItem}
				onPress={() => onPress(item)}
			>
				<Text style={styles.suggestionText}>{item.razao_social}</Text>
				<Text style={styles.suggestionText2}>
					{item.apelido || item.nome_fantasia}
				</Text>
			</TouchableOpacity>
		);
	}

	useEffect(() => {
		setBlock(
			!orientacao ||
				!autorizado ||
				!empresa ||
				tecnico.trim() === "" ||
				responsavel.trim() === "",
		);
	}, [orientacao, autorizado,empresa,responsavel,tecnico]);

	return (
		<Container scroller>
			<View style={styles.formContainer}>
				<Text style={styles.title}>Relatório de Psicossocial</Text>

				<View style={styles.headerTable}>
					<View style={styles.headerRow}>
						<View style={styles.searchWrapper}>
							<Input
								style={styles.searchInput}
								placeholder="Nome da empresa"
								value={
									empresa
										? truncateLabel(empresa.razao_social, titleLimit)
										: search
								}
								onChange={setSearch}
							/>
							{empresa && (
								<TouchableOpacity
									onPress={() => setEmpresa(null)}
									style={styles.companyClearButton}
								>
									<Text style={styles.clearButtonText}>Limpar</Text>
								</TouchableOpacity>
							)}
						</View>

						<TouchableOpacity
							onPress={() => setOpenInclusa(!openInclusa)}
							style={styles.includeToggleButton}
						>
							{!openInclusa ? (
								<Ionicons name="add-outline" size={24} color="green" />
							) : (
								<Ionicons name="remove-outline" size={24} color="red" />
							)}
						</TouchableOpacity>
					</View>

					{!empresa && search.trim() !== "" && filteredEmpresas.length > 0 && (
						<FlatList
							scrollEnabled
							style={styles.suggestionsList}
							data={filteredEmpresas}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item }) => renderSuggestionItem(item, setEmpresa)}
						/>
					)}

					{openInclusa && (
						<View style={styles.row}>
							<Input
								placeholder="Incluir empresa na visita"
								value={inclusaSearch}
								onChange={setInclusaSearch}
							/>
						</View>
					)}

					{inclusaSearch.trim() !== "" && filteredInclusas.length > 0 && (
						<FlatList
							scrollEnabled
							style={styles.suggestionsList}
							data={filteredInclusas}
							keyExtractor={(_, index) => index.toString()}
							renderItem={({ item }) =>
								renderSuggestionItem(item, addEmpresaInclusa)
							}
						/>
					)}

					<View style={styles.row}>
						<Input
							placeholder="Nome do Técnico"
							value={tecnico}
							onChange={setTecnico}
						/>
					</View>

					<View style={styles.row}>
						<Input
							placeholder="Responsável (Cliente)"
							value={responsavel}
							onChange={setResponsavel}
						/>
					</View>

					{inclusas.length > 0 && (
						<View style={styles.row}>
							<Text style={styles.inclusasTitle}>Empresas Inclusas:</Text>
							{inclusas.map((empresaInclusa) => (
								<View key={empresaInclusa?.id} style={styles.inclusaItem}>
									<Text style={styles.inclusaText}>
										{empresaInclusa?.razao_social}
									</Text>
									<TouchableOpacity
										onPress={() => removeEmpresaInclusa(empresaInclusa?.id)}
									>
										<Ionicons name="remove-outline" size={20} color="red" />
									</TouchableOpacity>
								</View>
							))}
						</View>
					)}
				</View>

				<View style={styles.questionBlock}>
					<Text style={styles.questionText}>
						Foi orientada a empresa sobre o Psicossocial?
					</Text>
					<View style={styles.buttonGroup}>
						<TouchableOpacity
							style={[styles.choiceButton, getButtonStyle(orientacao, "Sim")]}
							onPress={() => setOrientacao(1)}
						>
							<Text style={styles.choiceLabel}>Sim</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.choiceButton, getButtonStyle(orientacao, "Não")]}
							onPress={() => setOrientacao(2)}
						>
							<Text style={styles.choiceLabel}>Não</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.choiceButton, getButtonStyle(orientacao, "N/A")]}
							onPress={() => setOrientacao(3)}
						>
							<Text style={styles.choiceLabel}>N/A</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.questionBlock}>
					<Text style={styles.questionText}>
						Foi autorizada a aplicação dos questionários do Psicossocial?
					</Text>
					<View style={styles.buttonGroup}>
						<TouchableOpacity
							style={[styles.choiceButton, getButtonStyle(autorizado, "Sim")]}
							onPress={() => setAutorizado(1)}
						>
							<Text style={styles.choiceLabel}>Sim</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.choiceButton, getButtonStyle(autorizado, "Não")]}
							onPress={() => setAutorizado(2)}
						>
							<Text style={styles.choiceLabel}>Não</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.choiceButton, getButtonStyle(autorizado, "N/A")]}
							onPress={() => setAutorizado(3)}
						>
							<Text style={styles.choiceLabel}>N/A</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.questionBlock}>
					<Text style={styles.questionText}>Alguma outra observação?</Text>
					<TextInput
						style={styles.observationInput}
						placeholder={`Escreva aqui... (opcional)`}
						placeholderTextColor="#aaa"
						multiline
						value={observacao}
						onChangeText={(value) => setObservacao(value)}
					/>
				</View>

				<View
					style={{
						marginTop: 20,
						flexDirection: "column",
						gap: 10,
						flex: 1,
						justifyContent: "space-between",
					}}
				>
					<Button disabled={block} onPress={() => handleFinalizar()}>
						Gerar Relátorio
					</Button>
				</View>
			</View>
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
	headerTable: {
		marginBottom: 32,
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#1f1f1f",
		elevation: 3,
	},
	headerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
		marginTop: 20,
		color: "lime",
		textAlign: "center",
	},
	questionBlock: {
		marginBottom: 32,
		padding: 20,
		borderRadius: 16,
		backgroundColor: "#2a2a2a",
		elevation: 3,
	},
	questionText: {
		fontSize: 20,
		color: "#ffffff",
		fontWeight: "bold",
		marginBottom: 20,
	},
	row: {
		flexDirection: "column",
		width: "100%",
		alignItems: "center",
		marginTop: 12,
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
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginBottom: 12,
	},
	observationInput: {
		marginTop: 16,
		backgroundColor: "#2a2a2a",
		color: "#fff",
		padding: 12,
		borderRadius: 12,
		borderColor: "#fff",
		borderWidth: 0.5,
		fontSize: 16,
		minHeight: 60,
		textAlignVertical: "top",
	},
	searchWrapper: {
		width: "80%",
		position: "relative",
	},
	searchInput: {
		width: "100%",
		paddingRight: 44,
	},
	includeToggleButton: {
		width: "15%",
		backgroundColor: "#2d2d2d",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 8,
		height: 50,
	},
	suggestionsList: {
		marginTop: 5,
		maxHeight: 200,
		borderColor: "white",
		borderRadius: 10,
		borderWidth: 1,
	},
	suggestionItem: {
		padding: 15,
		marginVertical: 2,
		borderRadius: 10,
		borderColor: "white",
		borderWidth: 1,
	},
	suggestionText: {
		fontSize: 16,
		color: "white",
	},
	suggestionText2: {
		fontSize: 14,
		color: "gray",
	},
	companyClearButton: {
		position: "absolute",
		right: 6,
		top: "50%",
		transform: [{ translateY: -12 }],
		width: 50,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
	},
	clearButtonText: {
		fontSize: 16,
		color: "red",
	},
	inclusasTitle: {
		color: "white",
		fontWeight: "bold",
	},
	inclusaItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	inclusaText: {
		color: "white",
	},
});
