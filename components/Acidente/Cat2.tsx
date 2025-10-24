import { StyleSheet, View } from "react-native";
import Input from "@/components/Input";
import Select from "@/components/Select"; // se tiver um select customizado, senão trocamos por Input
import type Acidente from "@/types/Acidente";

export default function Cat2({
	handleChange,
	cat,
}: {
	handleChange: (tag: string, value: string) => void;
	cat: Acidente["cat2"];
}) {
	return (
		<View style={styles.container}>
			<Input
				placeholder="Nome do colaborador"
				value={cat?.colaborador || ""}
				onChange={(text) => handleChange("cat2.colaborador", text)}
			/>

			<Input
				placeholder="Idade"
				value={cat?.idade || ""}
				onChange={(text) => handleChange("cat2.idade", text)}
				keyboardType="numeric"
			/>

			<Input
				placeholder="Endereço"
				value={cat?.endereco || ""}
				onChange={(text) => handleChange("cat2.endereco", text)}
			/>

			<Input
				placeholder="CEP"
				value={cat?.cep || ""}
				onChange={(text) => handleChange("cat2.cep", text)}
				keyboardType="numeric"
			/>

			<Input
				placeholder="Telefone"
				value={cat?.telefone || ""}
				onChange={(text) => handleChange("cat2.telefone", text)}
				keyboardType="phone-pad"
			/>

			<Input
				placeholder="Grau de instrução"
				value={cat?.grauInstrucao || ""}
				onChange={(text) => handleChange("cat2.grauInstrucao", text)}
			/>

			{/* Select para estado civil */}
			<Select
				placeholder="Estado civil"
				selected={cat?.estadoCivil || ""}
				onValueChange={(value) => handleChange("cat2.estadoCivil", value)}
				options={[
					{ label: "Solteiro", value: "Solteiro" },
					{ label: "Casado", value: "Casado" },
					{ label: "Divorciado", value: "Divorciado" },
					{ label: "Viúvo", value: "Viuvo" },
				]}
			/>

			<Input
				placeholder="CPF"
				value={cat?.cpf || ""}
				onChange={(text) => handleChange("cat2.cpf", text)}
				keyboardType="numeric"
			/>

			<Input
				placeholder="Função"
				value={cat?.funcao || ""}
				onChange={(text) => handleChange("cat2.funcao", text)}
			/>

			<Input
				placeholder="CBO"
				value={cat?.cbo || ""}
				onChange={(text) => handleChange("cat2.cbo", text)}
			/>

			<Input
				placeholder="Setor"
				value={cat?.setor || ""}
				onChange={(text) => handleChange("cat2.setor", text)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		padding: 20,
		gap: 10,
	},
});
