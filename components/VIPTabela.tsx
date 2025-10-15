import React from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface TabelaProps {
	headers: string[];
	valores: { [chave: string]: string }[];
	onExcluir?: (item: any) => void;
	goTo?: (item: any) => void;
}

const VIPTabela: React.FC<TabelaProps> = ({
	headers,
	valores,
	onExcluir,
	goTo,
}) => {
	return (
		<View style={styles.container}>
			{/* Cabeçalho da tabela */}
			<View style={[styles.row, styles.headerRow]}>
				{headers.map((header) => (
					<View key={header} style={[styles.cell, styles.headerCell]}>
						<Text style={styles.headerText}>{header}</Text>
					</View>
				))}
				{onExcluir && (
					<View style={[styles.cell, styles.headerCell]}>
						<Text style={styles.headerText}></Text>
					</View>
				)}
			</View>

			{/* Linhas da tabela */}
			<FlatList
				data={valores}
				keyExtractor={(_item, index) => index.toString()}
				renderItem={({ item }) => (
					<View style={styles.row}>
						{headers.map((header) => (
							<View key={header} style={styles.cell}>
								<TouchableOpacity onPress={() => goTo?.(item)}>
									<Text style={styles.bodyText}>{item[header]}</Text>
								</TouchableOpacity>
							</View>
						))}
						{onExcluir && (
							<View style={styles.cell}>
								<TouchableOpacity
									style={styles.excluirButton}
									onPress={() => onExcluir(item)}
								>
									<Text style={styles.excluirText}>Excluir</Text>
								</TouchableOpacity>
							</View>
						)}
					</View>
				)}
				ListEmptyComponent={
					<View style={styles.emptyRow}>
						<Text style={styles.emptyText}>Nenhuma informação disponível</Text>
					</View>
				}
				scrollEnabled={false} // 👈 desativa o scroll interno
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#0d1117",
		borderRadius: 8,
		padding: 10,
		marginBottom: 16,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderColor: "#343a40",
		paddingVertical: 12,
	},
	headerRow: {
		backgroundColor: "#212529",
	},
	cell: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	headerCell: {
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
		color: "#c9d1d9",
		textAlign: "center",
	},
	excluirButton: {
		backgroundColor: "#e63946",
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
