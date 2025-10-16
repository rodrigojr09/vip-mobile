import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { useFuncao } from "@/hooks/Levantamento/FuncaoProvider";
import { riscos } from "@/utils/Riscos";
import "react-native-get-random-values";
import Input from "./Input";

export default function RiscoForm() {
	const funcao = useFuncao();
	const riscosPadrao = riscos;

	const isChecked = (nome: string) => {
		return funcao.riscos.some((r) => r.risco === nome);
	};

	const toggleRisco = (nome: string) => {
		const exists = isChecked(nome);
		if (exists) {
			funcao.setRiscos(funcao.riscos.filter((r) => r.risco !== nome));
		} else {
			funcao.setRiscos([
				...funcao.riscos,
				{ id: uuidv4(), risco: nome, fonteGeradora: "" },
			]);
		}
	};

	return (
		<ScrollView nestedScrollEnabled={true} style={{ marginTop: 20 }}>
			<Text style={styles.title}>Tabela de Riscos</Text>

			{/* Cabeçalho */}
			<View style={[styles.row, styles.headerRow]}>
				<Text style={[styles.cell, styles.headerCell, styles.col1]}>
					Selecionar
				</Text>
				<Text style={[styles.cell, styles.headerCell, styles.col2]}>Risco</Text>
				<Text style={[styles.cell, styles.headerCell, styles.col3]}>
					Descrição do Risco
				</Text>
			</View>

			{/* Linhas */}
			{riscosPadrao.map((item) => {
				const checked = isChecked(item);
				const userRisco = funcao.riscos.find((r) => r.risco === item);

				return (
					<View key={item} style={styles.row}>
						<View style={[styles.cell, styles.col1]}>
							<Switch value={checked} onValueChange={() => toggleRisco(item)} />
						</View>
						<View
							style={[styles.cell, styles.col2, { backgroundColor: "#1f2937" }]}
						>
							<Text
								style={{
									color: "#fff",
								}}
							>
								{item}
							</Text>
						</View>

						<View style={[styles.col3]}>
							<Input
								value={userRisco?.fonteGeradora || ""}
								placeholder="Descrição do Risco"
								editable={checked}
								onChange={(text) => {
									if (!checked) return;
									const updated = [...funcao.riscos];
									const index = updated.findIndex((r) => r.risco === item);
									if (index >= 0) {
										updated[index].fonteGeradora = text;
										funcao.setRiscos(updated);
									}
								}}
								textarea
								style={{ color: "#fff", marginVertical: 0, borderRadius: 0 }}
							/>
						</View>
					</View>
				);
			})}
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	title: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#22c55e",
		textAlign: "center",
		padding: 10,
		borderWidth: 1,
		borderColor: "#22c55e",
		backgroundColor: "#1f2937",
	},
	row: {
		flexDirection: "row",
	},
	headerRow: {
		backgroundColor: "#1f2937",
		paddingVertical: 6,
		borderTopLeftRadius: 6,
		borderTopRightRadius: 6,
	},
	cell: {
		borderWidth: 1,
		borderColor: "#22c55e",
		paddingHorizontal: 8,
		paddingVertical: 6,
		color: "#fff",
		justifyContent: "center",
	},
	headerCell: {
		fontWeight: "bold",
		textAlign: "center",
	},
	col1: { flex: 1, alignItems: "center" }, // Selecionar
	col2: { flex: 3 }, // Risco
	col3: {
		flex: 3,
		borderWidth: 1,
		borderColor: "#22c55e",
		color: "#fff",
		justifyContent: "center",
	}, // Descrição do Risco
});
