import { StyleSheet } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useNavigationHistory } from "@/hooks/Navigation";

export default function App() {
	const nav = useNavigationHistory();

	return (
		<Container style={styles.container}>
			<Button onPress={() => nav.push("/Levantamento")}>
				Novo Levantamento
			</Button>

			<Button onPress={() => nav.push("/Visita")}>Visita Técnica</Button>

			<Button onPress={() => nav.push("/Acidente")}>Acidente</Button>

			<Button secundary onPress={() => nav.push("/Config")}>
				Configuração
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
});
