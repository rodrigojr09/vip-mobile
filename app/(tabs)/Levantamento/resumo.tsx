import { StyleSheet, Text } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import VIPTabela from "@/components/VIPTabela";
import { useEmpresa } from "@/hooks/Levantamento/EmpresaProvider";
import { useNavigationHistory } from "@/hooks/Navigation";
import type { VIPFuncaoType } from "@/types/Levantamento/VIPFuncaoType";

export default function Resumo() {
	const empresa = useEmpresa();
	const nav = useNavigationHistory();
	return (
		<Container style={styles.container} scroller>
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
						'Funções': a.funcoes.map((b: VIPFuncaoType) => b.nome).join(", "),
					};
				})}
				onExcluir={(setor) => {
					empresa.setSetores(
						empresa.setores.filter((a) => a.id !== setor.id)
					);
				}}
				goTo={(item) => {
					nav.push({
						pathname: "/Levantamento/setor",
						params: {
							setor: item.id,
						},
					});
				}}
			/>

			<Button
				onPress={() => {
					nav.push("/Levantamento/setor");
				}}
			>
				Novo Setor
			</Button>

			<Button
				onPress={() => {
					nav.push("/Levantamento/rascunho");
				}}
			>
				Finalizar Levantamento
			</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: 20,
	},
	title: {
		marginVertical: 20,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#28A745",
	},
});
