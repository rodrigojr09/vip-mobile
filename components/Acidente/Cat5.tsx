import { StyleSheet, View } from "react-native";
import type Acidente from "@/types/Acidente";
import Input from "../Input";

export default function Cat1({
	handleChange,
	cat,
}: {
	handleChange: (tag: string, value: string) => void;
	cat: Acidente["cat5"];
}) {
	return (
		<View style={styles.container}>
			<Input
				placeholder="Descrição do acidente"
				value={cat?.descricaoAcidente || ""}
				onChange={(text) => handleChange("cat5.descricaoAcidente", text)}
				textarea
				lines={4}
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
});
