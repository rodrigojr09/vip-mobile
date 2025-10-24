import { StyleSheet, View } from "react-native";
import Input from "../Input";
import Acidente from "@/types/Acidente";

export default function Cat1({
	handleChange,
	cat,
}: {
	handleChange: (tag: string, value: string) => void;
	cat: Acidente["cat9"];
}) {
	return (
		<View style={styles.container}>
			<Input
				placeholder="Digite o nome da empresa"
				value={cat?.empresa || ""}
				onChange={(text) => handleChange("cat1.empresa", text)}
			/>

			<Input
				placeholder="Digite o CNPJ"
				value={cat?.cnpj || ""}
				onChange={(text) => handleChange("cat1.cnpj", text)}
			/>

			<Input
				placeholder="Digite a data"
				value={cat?.dataAnalise || ""}
				onChange={(text) => handleChange("cat1.dataAnalise", text)}
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
