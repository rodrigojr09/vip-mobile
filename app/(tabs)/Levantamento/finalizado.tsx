import * as FileSystem from "expo-file-system/legacy";
import { useSearchParams } from "expo-router/build/hooks";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useEmpresa } from "@/hooks/Levantamento/EmpresaProvider";
import { useNavigationHistory } from "@/hooks/Navigation";
import { events } from "@/utils/API/Event";
import Levantamento from "@/utils/Data/LevanamentoData";
import { getHtml } from "@/utils/formatHTML";

export default function Finalizado() {
	const nav = useNavigationHistory();
	const query = useSearchParams();
	const empresa = useEmpresa();
	const [fileUri, setFileUri] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			try {
				await ScreenOrientation.lockAsync(
					ScreenOrientation.OrientationLock.PORTRAIT_UP,
				);
				console.log("📱 Orientação travada para retrato.");

				const mensagem = `Finalização da visita - Empresa: ${empresa.nome}, Responsável: ${empresa.responsavel}`;
				events.sendEvent(mensagem);
				events.endEvent();
				console.log("✅ Evento de finalização registrado.");

				// Gera conteúdo HTML
				const htmlContent = getHtml(empresa)
					.replace("$assinatura", `${query.get("assinatura")}`)
					.replace("not-assinatura", "");

				// Caminho interno
				const fileName = `Levantamento-${empresa.nome}.html`;
				const filePath = `${FileSystem.documentDirectory}${fileName}`;

				// Salva o arquivo internamente
				await FileSystem.writeAsStringAsync(filePath, htmlContent, {
					encoding: FileSystem.EncodingType.UTF8,
				});

				setFileUri(filePath);
				console.log(empresa);
				Levantamento.salvar({
					empresa: {
						...empresa,
						assinatura: query.get("assinatura") || "",
					},
				});
				console.log("✅ Arquivo salvo internamente em:", filePath);
			} catch (error) {
				console.error("❌ Erro ao gerar e salvar levantamento:", error);
				Alert.alert(
					"Erro ao salvar",
					"Não foi possível salvar o levantamento. Tente novamente.",
				);
			}
		})();
	}, []);

	async function shareFile() {
		if (!fileUri) {
			Alert.alert("Nenhum arquivo", "Nenhum levantamento foi salvo ainda.");
			return;
		} else {
			Sharing.shareAsync(fileUri);
		}
	}

	return (
		<Container style={{ padding: 10 }}>
			<Button
				onPress={() => {
					empresa.clear();
					nav.replace("/");
				}}
			>
				Ir para o Início
			</Button>

			<Button
				onPress={() => {
					if (fileUri) {
						shareFile();
					} else {
						Alert.alert(
							"Nenhum Arquivo",
							"Nenhum levantamento foi salvo ainda.",
						);
					}
				}}
			>
				Compartilhar Arquivo
			</Button>
		</Container>
	);
}
