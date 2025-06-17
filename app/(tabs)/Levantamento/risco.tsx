import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFuncao } from "@/hooks/FuncaoProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	FlatList,
	Alert,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { useEffect, useState } from "react";
import { getRiscos, RiscoDataType } from "@/utils/Riscos";
import RadioButton from "@/components/RadioButton";
import VIPTabela from "@/components/VIPTabela";
import { useRisco } from "@/hooks/RiscoProvider";

export default function Risco() {
	const params = useLocalSearchParams();
	const router = useRouter();
	const funcao = useFuncao();
	const risco = useRisco();

	const [query, setQuery] = useState("");

	const exposicoes_tipo = [
		{ label: "Habitual Permanente", value: "habitual_permanente" },
		{ label: "Habitual Intermitente", value: "habitual_intermitente" },
		{ label: "Ocasional", value: "ocasional" },
	];

	const [filteredData, setFilteredData] = useState<RiscoDataType[]>([]);

	const normalize = (str: string) =>
		str
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase();

	const handleSearch = (text: string) => {
		setQuery(text);

		if (text.trim().length === 0) {
			setFilteredData([]);
			return;
		}

		const normalizedText = normalize(text);

		const results = getRiscos().filter(
			(item) =>
				item.tipo === (params.tipo as any) &&
				normalize(item.risco).includes(normalizedText) 
		);

		setFilteredData(results as any);

		if (query !== risco.risco) risco.setRisco("");
	};
	const handleSelect = (item: string) => {
		setQuery(item);
		risco.setRisco(item);
		setFilteredData([]); // Fecha a lista de sugestões
	};
	useEffect(() => {
		if (params.risco && params.id) {
			const hasRisco = funcao[params.risco as "Acidente"].riscos.find(
				(a) => a.id === (params.id as string)
			);
			if (hasRisco) {
				risco.load(hasRisco);
				setQuery(hasRisco.risco);
			}
		}
		return () => {
			risco.clear();
		};
	}, []);

	const handleCreateRisco = () => {
		if (!risco.risco.trim())
			return Alert.alert("Erro", "Selecione um risco");
		if (!risco.fonteGeradora.trim())
			return Alert.alert("Erro", "Digite uma fonte geradora");
		if (!risco.exposicao.trim())
			return Alert.alert("Erro", "Selecione uma exposição");
		if (risco.possuiEpi === undefined)
			return Alert.alert("Erro", "Selecione se existe EPI ou não");
		if (risco.recomendarEpi === undefined)
			return Alert.alert(
				"Erro",
				"Selecione se deseja recomendar EPI ou não"
			);

		funcao[params.tipo as "Acidente"].setRiscos([
			...funcao[params.tipo as "Acidente"].riscos,
			risco,
		]);
		router.back();
	};

	return (
		<Container style={styles.formContainer} scroller>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Input
					style={{ width: "80%" }}
					placeholder="Digite um risco..."
					value={query}
					onChange={handleSearch}
				/>
				<TouchableOpacity
					style={{
						borderWidth: 1,
						borderColor: "green",
						borderRadius: 5,
						alignItems: "center",
						width: "15%",
						marginLeft: 15,
						padding: 15,
						backgroundColor: "green",
					}}
					onPress={() => handleSelect(query)}
				>
					<Text style={{ color: "#FFF", textAlign: "center" }}>
						+
					</Text>
				</TouchableOpacity>
			</View>
			{filteredData.length > 0 && (
				<FlatList
					style={styles.suggestionsList}
					data={filteredData}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.suggestionItem}
							onPress={() => handleSelect(item.risco)}
						>
							<Text style={styles.suggestionText}>
								{item.risco}
							</Text>
						</TouchableOpacity>
					)}
				/>
			)}

			{risco.risco !== "" && risco.risco === query && (
				<>
					<Input
						placeholder="Qual a Fonte Geradora?"
						value={risco.fonteGeradora}
						onChange={risco.setFonteGeradora}
					/>
					<View>
						<Text
							style={{
								color: "white",
								fontSize: 16,
								textAlign: "center",
								marginBottom: 3,
							}}
						>
							Selecione a Exposição
						</Text>
						{exposicoes_tipo.map((button) => (
							<TouchableOpacity
								key={button.value}
								style={[
									exposicaoStyles.button,
									risco.exposicao === button.value &&
										exposicaoStyles.selectedButton,
								]}
								onPress={() => risco.setExposicao(button.value)}
							>
								<Text
									style={[
										exposicaoStyles.buttonText,
										risco.exposicao === button.value &&
											exposicaoStyles.selectedText,
									]}
								>
									{button.label}
								</Text>
							</TouchableOpacity>
						))}
					</View>
					<RadioButton
						placeholder="Possui EPIs?"
						setValue={risco.setPossuiEpi}
						value={risco.possuiEpi}
					/>
					{risco.possuiEpi && (
						<>
							<Button
								secundary
								onPress={(e) => {
									router.push({
										pathname: "/Levantamento/epi",
										params: {
											tipo: "e",
											risco: risco.risco,
										},
									});
								}}
							>
								Adicionar EPI
							</Button>
							<VIPTabela
								headers={["EPI", "Risco", "Periodicidade"]}
								valores={[
									...risco.epis.existentes.map((a) => {
										return {
											EPI: a.nome,
											Risco: a.risco || "",
											Periodicidade: `${a.periodicidade.tempo} ${a.periodicidade.tipo}`,
										};
									}),
								]}
								onExcluir={(item) => {
									risco.epis.setExistentes(
										risco.epis.existentes.filter(
											(a) => a.nome !== item.EPI
										)
									);
								}}
							/>
						</>
					)}
					<RadioButton
						placeholder="Deseja recomendar EPIs?"
						setValue={risco.setRecomendarEpi}
						value={risco.recomendarEpi}
					/>
					{risco.recomendarEpi && (
						<>
							<Button
								secundary
								onPress={(e) => {
									router.push({
										pathname: "/Levantamento/epi",
										params: {
											tipo: "r",
											risco: risco.risco,
										},
									});
								}}
							>
								Adicionar EPI
							</Button>
							<VIPTabela
								headers={["EPI", "Risco", "Periodicidade"]}
								valores={[
									...risco.epis.recomendados.map((a) => {
										return {
											EPI: a.nome,
											Risco: a.risco || "",
											Periodicidade: `${a.periodicidade.tempo} ${a.periodicidade.tipo}`,
										};
									}),
								]}
								onExcluir={(item) => {
									risco.epis.setRecomendados(
										risco.epis.recomendados.filter(
											(a) => a.nome !== item.EPI
										)
									);
								}}
							/>
						</>
					)}
				</>
			)}
			{!params.risco && (
				<Button
					onPress={(e) => {
						handleCreateRisco();
					}}
				>
					Adicionar
				</Button>
			)}
			{params.risco && (
				<Button
					onPress={(e) => {
						if (!risco.risco.trim())
							return Alert.alert("Erro", "Selecione um risco");
						if (!risco.fonteGeradora.trim())
							return Alert.alert(
								"Erro",
								"Digite uma fonte geradora"
							);
						if (!risco.exposicao.trim())
							return Alert.alert(
								"Erro",
								"Selecione uma exposição"
							);
						if (risco.possuiEpi === undefined)
							return Alert.alert(
								"Erro",
								"Selecione se existe EPI ou não"
							);
						if (risco.recomendarEpi === undefined)
							return Alert.alert(
								"Erro",
								"Selecione se deseja recomendar EPI ou não"
							);

						funcao[params.risco as "Acidente"].setRiscos(
							funcao[params.risco as "Acidente"].riscos.map(
								(a) => {
									if (a.id !== params.id) return a;
									return risco;
								}
							)
						);
						router.back();
					}}
				>
					Atualizar
				</Button>
			)}
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
});

const exposicaoStyles = StyleSheet.create({
	button: {
		flex: 1, // Cada botão ocupa espaço igual
		marginHorizontal: 6,
		marginVertical: 5,
		padding: 15,
		borderRadius: 10,
		backgroundColor: "green",
		alignItems: "center",
		justifyContent: "center",
	},
	selectedButton: {
		backgroundColor: "lightgreen", // Botão selecionado fica mais claro
	},
	buttonText: {
		fontSize: 16,
		color: "white",
	},
	selectedText: {
		color: "black", // Texto do botão selecionado muda de cor
	},
});
