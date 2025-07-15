import { VIPRespostaType } from "@/types/VisitaTecnica/VIPPerguntaType";
import { StyleSheet, TextInput } from "react-native";

const ObservacaoCampo = ({
	label,
	status,
	obs,
	onChange,
}: {
	label: string;
	status: VIPRespostaType["checked"];
	obs: string;
	onChange: (
		label: string,
		status: VIPRespostaType["checked"],
		obs: string
	) => void;
}) => (
	<TextInput
		style={styles.observationInput}
		placeholder={`${status === "Check" ? "Escreva aqui..." : "Observações (opcional)"}`}
		placeholderTextColor="#aaa"
		multiline
		value={obs}
		onChangeText={(value) => onChange(label, status, value)}
	/>
);

const styles = StyleSheet.create({
	observationInput: {
		marginTop: 16,
		backgroundColor: "#2a2a2a",
		color: "#fff",
		padding: 12,
		borderRadius: 12,
		fontSize: 16,
		minHeight: 60,
		textAlignVertical: "top",
	},
});

export default ObservacaoCampo;
