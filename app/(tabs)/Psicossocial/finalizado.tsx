import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useNavigationHistory } from "@/hooks/Navigation";
import * as Sharing from "expo-sharing";
import { getRelatorioPsicossocialHtml } from "@/utils/Psicossocial/formatHTML";
import * as Print from "expo-print";
import { usePsico } from "@/hooks/Psicossocial/PsicoProvider";
import manager from "@/utils/Data/manager";

async function generatePdfFromHtml(html: string) {
	const { uri } = await Print.printToFileAsync({
		html,
	});
	return uri;
}

export default function Finalizado() {
	const nav = useNavigationHistory();
	const psicossocial = usePsico();
	const [fileUri, setFileUri] = useState<string | null>(null);
	const [saveLocal, setSaveLocal] = useState(0);

	useEffect(() => {
		(async () => {
			try {
				manager.psicos.salvar(psicossocial).then((status) => {
					if (status) setSaveLocal(1);
					else setSaveLocal(2);
				});
				const htmlContent = getRelatorioPsicossocialHtml(psicossocial);

				// 🔥 AGORA GERA PDF (não HTML)
				const pdfUri = await generatePdfFromHtml(htmlContent);

				setFileUri(pdfUri);
			} catch (error) {
				console.error("Erro ao gerar PDF:", error);
				Alert.alert(
					"Erro ao gerar PDF",
					"Não foi possível gerar o relatório. Tente novamente.",
				);
			}
		})();
	}, []);

	async function handleShare() {
		if (!fileUri) {
			Alert.alert("Nenhum arquivo", "Nenhum relatório foi gerado ainda.");
			return;
		}

		await Sharing.shareAsync(fileUri);
	}

	return (
		<Container style={{ padding: 10 }}>
			<Button
				onPress={() => {
					psicossocial.clear();
					nav.replace("/");
				}}
			>
				Ir para o Início
			</Button>

			<Button onPress={handleShare}>Compartilhar PDF</Button>
			{saveLocal === 1 && <Text style={styles.textGreen}>Relatório salvo localmente</Text>}
			{saveLocal === 2 && (
				<Text style={styles.textRed}>Relatório não salvo localmente, favor compartilhar</Text>
			)}
		</Container>
	);
}

const styles = StyleSheet.create({
	textGreen: {
		color: "#22c55e",
	},
	textRed: {
		color: "#ef4444",
	},
});
