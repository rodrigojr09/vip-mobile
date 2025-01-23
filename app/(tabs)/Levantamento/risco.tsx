import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFuncao } from "@/hooks/FuncaoProvider";
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
import { VIPRisco } from "@/hooks/EmpresaProvider";
import { useRisco } from "@/hooks/RiscoProvider";

export default function Risco(a: any) {
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

	const handleSearch = (text: string) => {
		setQuery(text);
		if (text.trim().length === 0) {
			setFilteredData([]);
			return;
		}
		const results = getRiscos().filter(
			(item) =>
				item.tipo === (params.tipo as any) &&
				item.risco.toLowerCase().includes(text.toLowerCase())
		);
		setFilteredData(results as any);
	};
	console.log(risco.epis);
	const handleSelect = (item: string) => {
		setQuery(item);
		risco.setRisco(item);
		setFilteredData([]); // Fecha a lista de sugestões
	};
	useEffect(() => {
		return () => {
			risco.clear();
		};
	}, []);
	return (
		<Container style={styles.formContainer} scroller>
			<Input
				placeholder="Digite um risco..."
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
							onPress={() => handleSelect(item.risco)}
						>
							<Text style={styles.suggestionText}>
								{item.risco}
							</Text>
						</TouchableOpacity>
					)}
				/>
			)}

			{risco.risco !== "" && (
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
										pathname: "/Levantamento/Epi",
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
									...risco.epis.recomendados.map((a) => {
										return {
											EPI: a.nome,
											Risco: a.risco || "",
											Periodicidade: `${a.periodicidade.tempo} ${a.periodicidade.tipo}`,
										};
									}),
								]}
								onExcluir={() => {}}
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
										pathname: "/Levantamento/Epi",
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
								onExcluir={() => {}}
							/>
						</>
					)}
				</>
			)}
			<Button
				onPress={(e) => {
					funcao[params.tipo as "Acidente"].setRiscos([
						...funcao[params.tipo as "Acidente"].riscos,
						risco,
					]);
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
