import Button from "@/components/Button";
import Container from "@/components/Container";
import VIPTabela from "@/components/VIPTabela";
import { useEmpresa } from "@/hooks/EmpresaProvider";
import { VIPFuncaoType } from "@/types/VIPFuncaoType";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

export default function Resumo() {
	const empresa = useEmpresa();
	const router = useRouter();
	return (
		<Container style={styles.container}>
			{/* Título */}
			<Text style={styles.title}>Setores da Empresa: {empresa.nome}</Text>

			{/* Tabela */}
			<VIPTabela
				headers={["Nome", "Funções"]}
				valores={empresa.setores.map((a) => {
					return {
						id: a.id,
						Nome: a.nome,
						// prettier-ignore
						'Funções': a.funcoes.map((b:VIPFuncaoType) => b.nome).join(", "),
					};
				})}
				onExcluir={(setor) => {
					empresa.setSetores(
						empresa.setores.filter((a) => a.id !== setor.id)
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

			<Button
				onPress={(e) => {
					router.push("/Levantamento/finalizado");
				}}
			>
				Finalizar Levantamento
			</Button>
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
