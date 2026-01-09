import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Model from "@/components/Model";
import VIPTabela from "@/components/VIPTabela";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";

export default function Resumo() {
	const { setores, inclusas, removerSetor, empresa } = useVisita();
	const nav = useNavigationHistory();

	const [openModel, setOpenModel] = useState(false);
	function handleFinalizar() {
		if (inclusas.length) setOpenModel(true);
		else nav.push("/Visita/resumo");
	}

	return !openModel ? (
		<Container style={styles.container} scroller>
			{/* Título */}
			<View>
				<Text style={styles.title}>Setores da Empresa:</Text>

				<Text
					style={{
						textAlign: "center",
						marginBottom: 10,
						color: "#28A745",
					}}
				>
					{empresa?.razao_social}
				</Text>
				{inclusas.map((a) => (
					<Text
						key={a.id}
						style={{ textAlign: "center", marginBottom: 10, color: "#777" }}
					>
						Incluída: {a.empresa?.razao_social || "N/A"} (
						{a.empresa?.cnpj || "N/A"})
					</Text>
				))}
			</View>

			{/* Tabela */}
			<VIPTabela
				headers={["Nome"]}
				valores={setores.map((a) => {
					return {
						id: a.id,
						Nome: a.nome,
					};
				})}
				onExcluir={(setor) => {
					removerSetor(setor.id);
				}}
				goTo={(item) => {
					nav.push({
						pathname: "/Visita/Perguntas/Setor",
						params: {
							id: item.id,
						},
					});
				}}
			/>

			<Button
				onPress={() => {
					nav.push("/Visita/Perguntas/Setor");
				}}
			>
				Novo Setor
			</Button>

			<Button
				onPress={() => {
					nav.push("/Visita/Perguntas/Administrativo");
				}}
			>
				Ir para Perguntas Administrativas
			</Button>

			<Button onPress={() => handleFinalizar()}>Finalizar Visita</Button>
		</Container>
	) : (
		<Model setOpenModel={setOpenModel} />
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: 20,
	},
	title: {
		marginTop: 30,
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		color: "#28A745",
	},
});
