import { StyleSheet, Text, View } from "react-native";
import type Acidente from "@/types/Acidente";
import Input from "../Input";
import Select from "../Select";

export default function Cat7({
	handleChange,
	cat,
	relato,
}: {
	handleChange: (tag: string, value: string) => void;
	cat: Acidente["cat7"];
	relato: string;
}) {
	return (
		<View style={styles.container}>
			<Input
				placeholder="Nome do responsável pela empresa"
				value={cat?.responsavelEmpresa || ""}
				onChange={(text) => handleChange("cat7.responsavelEmpresa", text)}
			/>

			<Text
				style={{
					marginTop: 20,
					color: "#FFF",
					fontWeight: "bold",
					fontSize: 16,
					textAlign: "center",
				}}
			>
				Relato do Acidentado
			</Text>

			<Text
				lineBreakMode="middle"
				style={{ marginTop: 10, marginBottom: 20, color: "#FFF" }}
			>
				{relato}
			</Text>

			<Select
				selected={cat?.responsavelAceitacao || ""}
				onValueChange={(val) => handleChange("cat7.responsavelAceitacao", val)}
				placeholder="O responsável aceita o relato?"
				options={[
					{ label: "Sim", value: "Sim" },
					{ label: "Não", value: "Não" },
				]}
			/>
			{cat?.responsavelAceitacao === "Não" && (
				<Input
					placeholder="Descreva o motivo da não aceitação"
					value={cat?.responsavelAceitacaoDescricao || ""}
					onChange={(text) =>
						handleChange("cat7.responsavelAceitacaoDescricao", text)
					}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		padding: 20,
	},
	signatureBox: {
		height: 300,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		overflow: "hidden",
		marginTop: 20,
	},
});
