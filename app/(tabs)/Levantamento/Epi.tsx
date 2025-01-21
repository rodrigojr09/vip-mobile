import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useEffect, useState } from "react";
import { getRiscos, RiscoDataType } from "@/utils/Riscos";
import { VIPRiscoType } from "@/types/VIPRiscoType";
import RadioButton from "@/components/RadioButton";
import VIPTabela from "@/components/VIPTabela";
import { VIPEpi, VIPRisco } from "@/hooks/EmpresaProvider";
import { useRisco } from "@/hooks/RiscoProvider";
import getEpis from "@/utils/Epis";

export default function Risco(a: any) {
	const params = useLocalSearchParams();
	const router = useRouter();
	const risco = useRisco();
	const epi = VIPEpi();
	const [query, setQuery] = useState("");

	const [filteredData, setFilteredData] = useState<{ nome: string }[]>([]);

	const handleSearch = (text: string) => {
		setQuery(text);
		if (text.trim().length === 0) {
			setFilteredData([]);
			return;
		}
		const results = getEpis().filter((item) =>
			item.nome.toLowerCase().includes(text.toLowerCase())
		);
		setFilteredData(results as any);
	};

	const handleSelect = (item: string) => {
		setQuery(item);
		epi.setNome(item);
		setFilteredData([]); // Fecha a lista de sugestões
	};
	useEffect(() => {
		return () => {
			epi.clear();
		};
	}, []);

	return (
		<Container style={styles.formContainer} scroller>
			<Input
				placeholder="Digite um EPI..."
				value={query}
				onChange={handleSearch}
			/>
			{filteredData.length > 0 && (
				<FlatList
					style={styles.suggestionsList}
					data={filteredData}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.suggestionItem}
							onPress={() => handleSelect(item.nome)}
						>
							<Text style={styles.suggestionText}>
								{item.nome}
							</Text>
						</TouchableOpacity>
					)}
				/>
			)}
			<View>
				<Text>Periodicidade</Text>
				<Input
					placeholder="DD"
					onChange={epi.periodicidade.setTempo}
					value={epi.periodicidade.tempo}
				/>
				<View style={styles.pickerContainer}>
					<Picker
						selectedValue={epi.periodicidade.tipo}
						onValueChange={(value) =>
							epi.periodicidade.setTipo(value)
						}
						style={styles.picker}
					>
						{/* "Dias" | "Mês" | "Dia" | "Mêses" */}
						<Picker.Item label="Dia" value="Dia" />
						<Picker.Item label="Dias" value="Dias" />
						<Picker.Item label="Mês" value="Mês" />
						<Picker.Item label="Meses" value="Mêses" />
					</Picker>
				</View>
			</View>

			<Button
				onPress={(e) => {
					console.log(params);
					if (params.tipo === "e") {
						risco.epis.setExistentes([
							...risco.epis.existentes,
							{ ...epi, risco: params.risco as string },
						]);
					} else {
						risco.epis.setRecomendados([
							...risco.epis.recomendados,
							{ ...epi, risco: params.risco as string },
						]);
					}
					router.back();
				}}
			>
				Adicionar
			</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
	suggestionsList: {
		marginTop: 5,
		maxHeight: 200, // Limita o tamanho da lista
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

	pickerContainer: {
		borderWidth: 2,
		borderColor: "white",
		borderRadius: 8,
		overflow: "hidden", // Garante que o Picker fique dentro das bordas
	},
	picker: {
		color: "white", // Cor do texto do Picker
		backgroundColor: "transparent", // Deixa o fundo transparente
	},
});
