import Button from "@/components/Button";
import Container from "@/components/Container";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
	const router = useRouter();

	return (
		<Container style={styles.container}>
			<Button onPress={(e) => router.push("/Levantamento")}>
				Novo Levantamento
			</Button>

			<Button onPress={(e) => router.push("/Visita")}>
				Visita Técnica
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
	header: {
		backgroundColor: "green",
		padding: 30,
		alignItems: "center",
		width: "100%",
	},
	headerText: {
		color: "white",
		fontSize: 32,
		fontWeight: "bold",
	},
});
