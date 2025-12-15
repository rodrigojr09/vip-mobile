import { Alert, StyleSheet } from "react-native";
import { v4 as uuidv4 } from "uuid";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useNavigationHistory } from "@/hooks/Navigation";
import { events } from "@/utils/API/Event";
import "react-native-get-random-values";
import { Form } from "@/components/v2/Levantamento/Form";
import { useLevantamento } from "@/hooks/v2/Levantamentos/Levantamento";

const inputs = [
	{ placeholder: "Digite o nome da empresa...", name: "nome" },
	{ placeholder: "Quem está auxiliando o levantamento?", name: "responsavel" },
];

export default function Levantamento() {
	const nav = useNavigationHistory();
	const levantamento = useLevantamento();

	const handleCreateLevantamento = async () => {
		if (
			!levantamento.empresa.nome.trim() ||
			!levantamento.empresa.responsavel.trim()
		) {
			Alert.alert("Atenção! preencha todos os campos");
		} else {
			// Mensagem personalizada para o evento
			const mensagem = `Levantamento criado - Empresa: ${levantamento.empresa.nome}, Responsável: ${levantamento.empresa.responsavel}`;

			try {
				levantamento.atualizarEmpresa("id", uuidv4());
				events.sendEvent(mensagem);
				events.startEvent("levantamento");
			} catch (error) {
				console.warn("Erro ao adicionar evento de levantamento:", error);
			}

			nav.push("/Levantamento/resumo");
		}
	};

	return (
		<Container style={styles.formContainer}>
			<Form
				campos={inputs}
				onSubmit={handleCreateLevantamento}
				type={"EMPRESA"}
			/>
			<Button onPress={handleCreateLevantamento}>Criar</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		alignItems: "center",
		padding: 20,
	},
});
