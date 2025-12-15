import { StyleSheet, Text } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useNavigationHistory } from "@/hooks/Navigation";

export default function Config() {
	const nav = useNavigationHistory();

	return (
		<Container style={styles.container}>
			<Text style={styles.title}>Backup's</Text>
			<Button onPress={() => nav.push("/Config/levantamentos")}>
				Levantamentos Salvos
			</Button>

			<Button onPress={() => nav.push("/Config/visitas")}>
				Visitas Técnicas Salvas
			</Button>

			<Button onPress={() => nav.push("/Config/dev")}>
				Area de Desenvolvimento
			</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#22c55e",
	},
});
