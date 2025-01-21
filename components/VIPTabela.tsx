import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	FlatList,
} from "react-native";

interface TabelaProps {
	headers: string[];
	valores: { [chave: string]: string }[];
	onExcluir?: (item: { [chave: string]: string }) => void;
}

const VIPTabela: React.FC<TabelaProps> = ({ headers, valores, onExcluir }) => {
	return (
		<View style={styles.container}>
			{/* Cabeçalho da tabela */}
			<View style={[styles.row, styles.headerRow]}>
				{headers.map((header, index) => (
					<View key={index} style={[styles.cell, styles.headerCell]}>
						<Text style={styles.headerText}>{header}</Text>
					</View>
				))}
				<View style={[styles.cell, styles.headerCell]}>
					<Text style={styles.headerText}></Text>
				</View>
			</View>

			{/* Linhas da tabela */}
			<FlatList
				data={valores}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<View style={styles.row}>
						{headers.map((header) => (
							<View key={header} style={styles.cell}>
								<Text style={styles.bodyText}>
									{item[header]}
								</Text>
							</View>
						))}
						{onExcluir && (
							<View style={styles.cell}>
								<TouchableOpacity
									style={styles.excluirButton}
									onPress={() => onExcluir(item)}
								>
									<Text style={styles.excluirText}>
										Excluir
									</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				)}
				ListEmptyComponent={
					<View style={styles.emptyRow}>
						<Text style={styles.emptyText}>
							Nenhuma informação disponível
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
		paddingHorizontal: 8,
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

export default VIPTabela;
