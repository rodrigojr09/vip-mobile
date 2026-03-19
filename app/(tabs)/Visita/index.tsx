import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
	Alert,
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { deviceType, DeviceType } from "expo-device";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import { events } from "@/utils/API/Event";

type EmpresaItem = VIPVisitaType["empresas"][0];

function matchesSearch(item: EmpresaItem, value: string) {
	const normalized = value.toLowerCase();

	return (
		item.nome_fantasia.toLowerCase().includes(normalized) ||
		item.razao_social.toLowerCase().includes(normalized) ||
		item.cnpj.toLowerCase().includes(normalized)
	);
}

function truncateLabel(value: string, maxLength: number) {
	if (value.length <= maxLength) return value;
	return `${value.slice(0, maxLength)}...`;
}

export default function Visita() {
	const {
		empresa,
		setEmpresa,
		responsavel,
		setResponsavel,
		setId,
		tecnico,
		empresas,
		setTecnico,
		inclusas,
		setInclusas,
	} = useVisita();

	const nav = useNavigationHistory();

	const [search, setSearch] = useState("");
	const [inclusaSearch, setInclusaSearch] = useState("");
	const [openInclusa, setOpenInclusa] = useState(false);

	const isTablet = deviceType === DeviceType.TABLET;
	const titleLimit = isTablet ? 60 : 25;

	const filteredEmpresas = empresas.filter((item) => matchesSearch(item, search));
	const filteredInclusas = empresas.filter((item) =>
		matchesSearch(item, inclusaSearch),
	);
	const selectedInclusas = inclusas.filter((item) => item.empresa !== null);

	async function handleSave() {
		if (empresa === null) {
			return Alert.alert("Atenção! O nome da empresa precisa ser preenchido");
		}

		if (tecnico.trim().length === 0) {
			return Alert.alert("Atenção! O nome do técnico precisa ser preenchido");
		}

		if (responsavel.trim().length === 0) {
			return Alert.alert(
				"Atenção! O nome do cliente responsável precisa ser preenchido",
			);
		}

		const msg = `Início da visita - Empresa: ${empresa.razao_social}, Técnico: ${tecnico}, Responsável: ${responsavel}`;

		try {
			events.sendEvent(msg);
			events.startEvent("visita");
		} catch (error) {
			console.warn("Erro ao adicionar evento:", error);
		}

		setId(uuidv4());
		nav.push({ pathname: "/Visita/Perguntas/Setor" });
	}

	function addEmpresaInclusa(selectedEmpresa: EmpresaItem) {
		setInclusas([...inclusas, { id: uuidv4(), empresa: selectedEmpresa }]);
		setOpenInclusa(false);
		setInclusaSearch("");
	}

	function removeEmpresaInclusa(empresaId?: string) {
		setInclusas(inclusas.filter((item) => item.empresa?.id !== empresaId));
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
				<Text style={styles.suggestionText2}>{item.nome_fantasia}</Text>
			</TouchableOpacity>
		);
	}

	return (
		<Container style={styles.formContainer}>
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

				{selectedInclusas.length > 0 && (
					<View style={styles.row}>
						<Text style={styles.inclusasTitle}>Empresas Inclusas:</Text>
						{selectedInclusas.map(({ empresa: empresaInclusa }) => (
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

			<Button onPress={handleSave}>Proximo</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		padding: 20,
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
	row: {
		flexDirection: "column",
		width: "100%",
		alignItems: "center",
		marginTop: 12,
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
