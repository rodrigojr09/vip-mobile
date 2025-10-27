import { StyleSheet, View } from "react-native";
import type Acidente from "@/types/Acidente";
import Input from "../Input";

export default function Cat4({
	handleChange,
	cat,
}: {
	handleChange: (tag: string, value: string) => void;
	cat: Acidente["cat4"];
}) {
	return (
		<View style={styles.container}>
			<Input
				placeholder="Local do acidente"
				value={cat?.localAcidente || ""}
				onChange={(text) => handleChange("cat4.localAcidente", text)}
			/>

			<Input
				placeholder="Data do acidente"
				value={cat?.dataAcidente || ""}
				onChange={(text) => handleChange("cat4.dataAcidente", text)}
			/>

			<Input
				placeholder="Hora do acidente"
				value={cat?.horaAcidente || ""}
				onChange={(text) => handleChange("cat4.horaAcidente", text)}
			/>

			<Input
				placeholder="Horas trabalhadas até o acidente"
				value={cat?.horasTrabalhadas || ""}
				onChange={(text) => handleChange("cat4.horasTrabalhadas", text)}
			/>

			<Input
				placeholder="Cidade"
				value={cat?.cidade || ""}
				onChange={(text) => handleChange("cat4.cidade", text)}
			/>

			<Input
				placeholder="Bairro"
				value={cat?.bairro || ""}
				onChange={(text) => handleChange("cat4.bairro", text)}
			/>

			<Input
				placeholder="Rua"
				value={cat?.rua || ""}
				onChange={(text) => handleChange("cat4.rua", text)}
			/>

			<Input
				placeholder="Número"
				value={cat?.numero || ""}
				onChange={(text) => handleChange("cat4.numero", text)}
			/>

			<Input
				placeholder="Houve ocorrência policial?"
				value={cat?.houveOcorrencia || ""}
				onChange={(text) => handleChange("cat4.houveOcorrencia", text)}
			/>

			<Input
				placeholder="Houve morte?"
				value={cat?.houveMorte || ""}
				onChange={(text) => handleChange("cat4.houveMorte", text)}
			/>

			<Input
				placeholder="Parte do corpo atingida"
				value={cat?.parteAtingida || ""}
				onChange={(text) => handleChange("cat4.parteAtingida", text)}
			/>

			<Input
				placeholder="Lateralidade (esquerda/direita)"
				value={cat?.lateralidade || ""}
				onChange={(text) => handleChange("cat4.lateralidade", text)}
			/>

			<Input
				placeholder="Agente causador"
				value={cat?.agenteCausador || ""}
				onChange={(text) => handleChange("cat4.agenteCausador", text)}
			/>

			<Input
				placeholder="Ação"
				value={cat?.acao || ""}
				onChange={(text) => handleChange("cat4.acao", text)}
			/>

			<Input
				placeholder="Responsável pela análise"
				value={cat?.responsavel || ""}
				onChange={(text) => handleChange("cat4.responsavel", text)}
			/>

			<Input
				placeholder="Prazo para conclusão"
				value={cat?.prazo || ""}
				onChange={(text) => handleChange("cat4.prazo", text)}
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
