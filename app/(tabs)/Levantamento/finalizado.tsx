import React, { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert, BackHandler } from "react-native";
import Button from "@/components/Button";
import { useEmpresa } from "@/hooks/Levantamento/EmpresaProvider";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { getHtml } from "@/utils/formatHTML";
import Container from "@/components/Container";
import Data from "@/utils/API/Data";

export default function Finalizado() {
	const router = useRouter();
	const query = useSearchParams();
	const empresa = useEmpresa();

	useEffect(() => {
		(async () => {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP
			);

			// Mensagfem do evento
			const mensagem = `Finalização da visita - Empresa: ${empresa.nome}, Responsável: ${empresa.responsavel}`;

			try {
				Data.sendEvent(mensagem);
			} catch (error) {
				console.warn("Erro ao adicionar evento de finalização:", error);
			}
		})();
	}, []);

	async function handleDownload() {
		try {
			const htmlContent = getHtml(empresa)
				.replace("$assinatura", `${query.get("assinatura")}`)
				.replace("not-assinatura", "");

			const filePath = `${FileSystem.documentDirectory}Levantamento-${empresa.nome}.html`;

			await FileSystem.writeAsStringAsync(filePath, htmlContent, {
				encoding: FileSystem.EncodingType.UTF8,
			});

			await Sharing.shareAsync(filePath);

			console.log(
				"Arquivo gerado e compartilhado com sucesso:",
				filePath
			);
		} catch (error) {
			console.error("Erro ao salvar ou compartilhar o arquivo:", error);
			Alert.alert(
				"Erro",
				"Não foi possível salvar ou compartilhar o arquivo."
			);
		}
	}

	return (
		<Container style={{ padding: 10 }}>
			<Button
				onPress={() => {
					empresa.clear();
					router.replace("/");
				}}
			>
				Ir para o Início
			</Button>
			<Button onPress={handleDownload}>Baixar Levantamento</Button>
		</Container>
	);
}
