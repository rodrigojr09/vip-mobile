import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useEmpresa } from "@/hooks/Levantamento/EmpresaProvider";
import { useNavigationHistory } from "@/hooks/Navigation";
import { finalizeLevantamento } from "@/utils/services/levantamentoFinalization";
import { shareReport } from "@/utils/services/reportFile";

export default function Finalizado() {
	const nav = useNavigationHistory();
	const query = useSearchParams();
	const empresa = useEmpresa();
	const [fileUri, setFileUri] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				const result = await finalizeLevantamento(
					empresa,
					query.get("assinatura") || "",
				);
				setFileUri(result.fileUri);
			} catch (error) {
				console.error("Erro ao gerar e salvar levantamento:", error);
				Alert.alert(
					"Erro ao salvar",
					"Nao foi possivel salvar o levantamento. Tente novamente.",
				);
			}
		})();
	}, []);

	async function handleShare() {
		if (!fileUri) {
			Alert.alert("Nenhum arquivo", "Nenhum levantamento foi salvo ainda.");
			return;
		}

		await shareReport(fileUri);
	}

	return (
		<Container style={{ padding: 10 }}>
			<Button
				onPress={() => {
					empresa.clear();
					nav.replace("/");
				}}
			>
				Ir para o Inicio
			</Button>

			<Button onPress={handleShare}>Compartilhar Arquivo</Button>
		</Container>
	);
}
