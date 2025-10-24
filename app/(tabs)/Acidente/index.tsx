import { StyleSheet, Text, View } from "react-native";
import Container from "@/components/Container";
import { useState } from "react";
import Button from "@/components/Button";
import { useNavigationHistory } from "@/hooks/Navigation";

export default function Acidente() {
	const nav = useNavigationHistory();
	return (
		<Container style={{ alignItems: "center" }}>
			<View style={styles.container}>
				<Button
					onPress={() => {
						nav.push("/Acidente/Trabalho");
					}}
				>
					Acidente de Trabalho
				</Button>
				<Button disabled onPress={() => {}}>
					Acidente de Trajeto
				</Button>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "90%",
		paddingVertical: "5%",
		alignItems: "center",
		//justifyContent: "center",
	},
});
