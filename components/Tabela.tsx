import { LevantamentoSetorType } from "@/types/LevantamentoTypes";
import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
} from "react-native";

interface TabelaProps {
	dados: LevantamentoSetorType[];
	onExcluir: (setor: string) => void;
}

const Tabela: React.FC<TabelaProps> = ({ dados, onExcluir }) => {
	return (
		<View style={styles.container}>
			{/* Cabeçalho da tabela */}
			<View style={[styles.row, styles.headerRow]}>
				<View style={[styles.cell, styles.headerCell]}>
					<Text style={styles.headerText}>Setor</Text>
				</View>
				<View style={[styles.cell, styles.headerCell]}>
					<Text style={styles.headerText}>Funções</Text>
				</View>
				<View style={[styles.cell, styles.headerCell]}>
					<Text style={styles.headerText}>Ações</Text>
				</View>
			</View>

			{/* Linhas da tabela */}
			<FlatList
				data={dados}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<View style={styles.row}>
						<View style={styles.cell}>
							<Text style={styles.bodyText}>{item.nome}</Text>
						</View>
						<View style={styles.cell}>
							<Text style={styles.bodyText}>
								{item.funcoes.map(a=>a.nome).join(", ") || "Nenhuma Função"}
							</Text>
						</View>
						<View style={styles.cell}>
							<TouchableOpacity
								style={styles.excluirButton}
								onPress={() => onExcluir(item.nome)}
							>
								<Text style={styles.excluirText}>Excluir</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
				ListEmptyComponent={
					<View style={styles.emptyRow}>
						<Text style={styles.emptyText}>
							Nenhuma Função disponível
						</Text>
					</View>
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#0d1117", // Fundo escuro
		borderRadius: 8,
		padding: 10,
		overflow: "hidden",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between", // Garante espaçamento uniforme
		borderBottomWidth: 1,
		borderColor: "#343a40", // Cor da borda
		paddingVertical: 12,
	},
	headerRow: {
		backgroundColor: "#212529", // Fundo do cabeçalho
	},
	cell: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	headerCell: {
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10,
	},
	headerText: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#ffffff",
		textAlign: "center",
	},
	bodyText: {
		fontSize: 14,
		color: "#c9d1d9", // Texto mais claro
		textAlign: "center", // Centraliza o texto nas células
	},
	excluirButton: {
		backgroundColor: "#e63946", // Vermelho
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 4,
		alignSelf: "center",
	},
	excluirText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 14,
		textAlign: "center",
	},
	emptyRow: {
		padding: 20,
		alignItems: "center",
	},
	emptyText: {
		color: "#c9d1d9",
		fontStyle: "italic",
		fontSize: 14,
	},
});

export default Tabela;
