import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { v4 as uuidv4 } from "uuid";
import Input from "../Input";
import Select from "../Select";
import "react-native-get-random-values";
import { useState } from "react";
import type Acidente from "@/types/Acidente";

export default function Cat1({
	handleChange,
	cat,
	relato,
}: {
	handleChange: (tag: string, value: string | any) => void;
	cat: Acidente["cat8"];
	relato: string;
}) {
	const testemunhos = cat?.testemunhos || [
		{
			id: uuidv4(),
			nome: "",
			aceitacao: "",
			aceitacaoDescricao: "",
		},
	];
	const [testemunha, setTestemunha] = useState(testemunhos[0].id);

	const handleUpdate = (index: number, field: string, value: string) => {
		const updated = [...testemunhos];
		updated[index] = { ...updated[index], [field]: value };
		handleChange("cat8.testemunhos", updated);
	};

	const addTestemunha = () => {
		const id = uuidv4();
		const updated = [
			...testemunhos,
			{
				id,
				nome: "",
				aceitacao: "",
				aceitacaoDescricao: "",
			},
		];
		setTestemunha(id);
		handleChange("cat8.testemunhos", updated);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Testemunhas</Text>

			{testemunhos.map((t, index) => (
				<View key={t.id} style={styles.block}>
					<TouchableOpacity onPress={() => setTestemunha(t.id)}>
						<Text style={styles.subtitle}>Testemunha {index + 1}</Text>
					</TouchableOpacity>

					{testemunha === t.id && (
						<View>
							<Input
								placeholder="Nome da testemunha"
								value={t.nome || ""}
								onChange={(text) => handleUpdate(index, "nome", text)}
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
								selected={t.aceitacao || ""}
								onValueChange={(val) => handleUpdate(index, "aceitacao", val)}
								placeholder="Aceita o relato?"
								options={[
									{ label: "Sim", value: "Sim" },
									{ label: "Não", value: "Não" },
								]}
							/>

							{t.aceitacao === "Não" && (
								<Input
									placeholder="Descreva o motivo da não aceitação"
									value={t.aceitacaoDescricao || ""}
									onChange={(text) =>
										handleUpdate(index, "aceitacaoDescricao", text)
									}
								/>
							)}
						</View>
					)}
				</View>
			))}

			<TouchableOpacity style={styles.addButton} onPress={addTestemunha}>
				<Text style={styles.addButtonText}>+ Adicionar Testemunha</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		textAlign: "center",
		color: "#007bff",
		marginBottom: 10,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 10,
		color: "#007bff",
	},
	block: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 15,
		marginBottom: 20,
	},
	signatureBox: {
		height: 250,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		overflow: "hidden",
		marginTop: 10,
	},
	addButton: {
		backgroundColor: "#007bff",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 10,
	},
	addButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
