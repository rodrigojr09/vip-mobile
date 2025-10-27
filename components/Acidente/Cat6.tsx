import { StyleSheet, View } from "react-native";
import type Acidente from "@/types/Acidente";
import Input from "../Input";
import Select from "../Select"; // 👈 importando o novo componente

export default function Cat1({
	handleChange,
	cat,
}: {
	handleChange: (tag: string, value: string) => void;
	cat: Acidente["cat6"];
}) {
	return (
		<View style={styles.container}>
			<Input
				placeholder="Atividade executada"
				value={cat?.atividadeExecutada || ""}
				onChange={(text) => handleChange("cat6.atividadeExecutada", text)}
			/>

			<Select
				selected={cat?.periodicidade || ""}
				onValueChange={(val) => handleChange("cat6.periodicidade", val)}
				placeholder="Selecione a periodicidade"
				options={[
					{ label: "Habitual Permanente", value: "Habitual Permanente" },
					{ label: "Habitual Intermitente", value: "Habitual Intermitente" },
					{ label: "Ocasional Permanente", value: "Ocasional Permanente" },
					{ label: "Ocasional Intermitente", value: "Ocasional Intermitente" },
					{ label: "Eventual Permanente", value: "Eventual Permanente" },
					{ label: "Eventual", value: "Eventual" },
				]}
			/>

			<Select
				selected={cat?.recebeuTreiamento || ""}
				onValueChange={(val) => handleChange("cat6.recebeuTreiamento", val)}
				placeholder="Recebeu treinamento?"
				options={[
					{ label: "Suficiente", value: "Suficiente" },
					{ label: "Insuficiente", value: "Insuficiente" },
					{ label: "Não Recebeu", value: "Não Recebeu" },
				]}
			/>

			<Select
				selected={cat?.utilizouEPI || ""}
				onValueChange={(val) => handleChange("cat6.utilizouEPI", val)}
				placeholder="Utilizou EPI?"
				options={[
					{ label: "Sim", value: "Sim" },
					{ label: "Não", value: "Não" },
				]}
			/>

			<Input
				placeholder="Descreva a utilização do EPI"
				value={cat?.utilizouEPIDescricao || ""}
				onChange={(text) => handleChange("cat6.utilizouEPIDescricao", text)}
			/>

			<Select
				selected={cat?.epiEficaz || ""}
				onValueChange={(val) => handleChange("cat6.epiEficaz", val)}
				placeholder="O EPI era eficaz?"
				options={[
					{ label: "Sim", value: "Sim" },
					{ label: "Não", value: "Não" },
				]}
			/>

			<Input
				placeholder="Descreva a eficácia do EPI"
				value={cat?.epiEficazDescricao || ""}
				onChange={(text) => handleChange("cat6.epiEficazDescricao", text)}
			/>

			<Select
				selected={cat?.ferramentas || ""}
				onValueChange={(val) => handleChange("cat6.ferramentas", val)}
				placeholder="As ferramentas estavam adequadas?"
				options={[
					{ label: "Sim", value: "Sim" },
					{ label: "Não", value: "Não" },
				]}
			/>

			<Input
				placeholder="Descreva as condições das ferramentas"
				value={cat?.ferramentasDescricao || ""}
				onChange={(text) => handleChange("cat6.ferramentasDescricao", text)}
			/>

			<Select
				selected={cat?.ambiente || ""}
				onValueChange={(val) => handleChange("cat6.ambiente", val)}
				placeholder="O ambiente estava adequado?"
				options={[
					{ label: "Sim", value: "Sim" },
					{ label: "Não", value: "Não" },
				]}
			/>

			<Input
				placeholder="Descreva as condições do ambiente"
				value={cat?.ambienteDescricao || ""}
				onChange={(text) => handleChange("cat6.ambienteDescricao", text)}
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
