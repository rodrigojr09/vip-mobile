import { StyleSheet, View } from "react-native";
import type Acidente from "@/types/Acidente";
import Input from "../Input";

export default function Cat3({
	handleChange,
	cat,
}: {
	handleChange: (tag: string, value: any) => void;
	cat: Acidente["cat3"];
}) {
	return (
		<View style={styles.container}>
			<Input
				placeholder="Data do atestado"
				value={cat?.dataAtestado || ""}
				onChange={(text) => handleChange("cat3.dataAtestado", text)}
			/>

			<Input
				placeholder="Duração do tratamento"
				value={cat?.duracaoTratamento || ""}
				onChange={(text) => handleChange("cat3.duracaoTratamento", text)}
			/>

			<Input
				placeholder="Hora do atendimento"
				value={cat?.horaAtendimento || ""}
				onChange={(text) => handleChange("cat3.horaAtendimento", text)}
			/>

			<Input
				placeholder="Houve Internação (sim/não)"
				value={cat?.houveInternacao || ""}
				onChange={(text) => handleChange("cat3.houveInternacao", text)}
			/>

			<Input
				placeholder="Afastamento (dias)"
				value={cat?.afastar || ""}
				onChange={(text) => handleChange("cat3.afastar", text)}
			/>

			<Input
				placeholder="Natureza da lesão"
				value={cat?.naturezaLesao || ""}
				onChange={(text) => handleChange("cat3.naturezaLesao", text)}
			/>

			<Input
				placeholder="Médico (CRM)"
				value={cat?.medicoCRM || ""}
				onChange={(text) => handleChange("cat3.medicoCRM", text)}
			/>

			<Input
				placeholder="CID"
				value={cat?.cid || ""}
				onChange={(text) => handleChange("cat3.cid", text)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		padding: 20,
	},
	checkboxContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 10,
	},
	checkboxLabel: {
		marginLeft: 10,
	},
});
