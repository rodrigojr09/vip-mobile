import Button from "@/components/Button";
import Container from "@/components/Container";
import Tabela from "@/components/Tabela";
import VIPTabela from "@/components/VIPTabela";
import {
	useLevantamento,
	VIPFuncao,
	VIPSetor,
} from "@/hooks/LevantamentoProvider";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Resumo() {
	const levantamento = useLevantamento();
	const router = useRouter();
	return (
		<Container style={styles.container}>
			{/* Título */}
			<Text style={styles.title}>
				Setores da Empresa: {levantamento.nome}
			</Text>

			{/* Tabela */}
			<VIPTabela
				headers={["Nome", "Funções"]}
				valores={levantamento.setores.map((a) => {
					return {
						id: a.id,
						Nome: a.nome,
						// prettier-ignore
						'Funções': a.funcoes.map((b) => b.nome).join(", "),
					};
				})}
				onExcluir={(setor) => {
					levantamento.setSetores(
						levantamento.setores.filter(
							(a) => a.id !== setor.id
						)
					);
				}}
			/>
			{/* */}

			<Button
				onPress={(e) => {
					router.push("/Levantamento/setor");
				}}
			>
				Novo Setor
			</Button>

			<Button onPress={(e) => {}}>Finalizar Levantamento</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 30,
		paddingHorizontal: 10,
	},
	title: {
		marginVertical: 20,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#28A745",
	},
});
