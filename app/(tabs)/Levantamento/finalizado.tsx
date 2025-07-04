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

export default function Finalizado() {
	const router = useRouter();
	const query = useSearchParams();
	const empresa = useEmpresa();
	// Desabilitar o botão de voltar
	useEffect(() => {
		const backAction = () => {
			// Impede que a tela seja fechada com o botão de voltar

			return true; // Retorna true para impedir a ação de voltar
		};
		(async () => {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP
			);
		})();

		BackHandler.addEventListener("hardwareBackPress", backAction);
	}, []);
	async function handleDownload() {
		try {
			// Gerar o HTML com a assinatura
			const htmlContent = getHtml(empresa)
				.replace("$assinatura", `${query.get("assinatura")}`)
				.replace("not-assinatura", "");

			// Caminho para salvar o arquivo HTML
			const filePath = `${FileSystem.documentDirectory}Levantamento-${empresa.nome}.html`;

			// Salvar o arquivo
			await FileSystem.writeAsStringAsync(filePath, htmlContent, {
				encoding: FileSystem.EncodingType.UTF8,
			});

			// Compartilhar o arquivo salvo
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
