import React, { useEffect } from "react";
import * as Print from "expo-print";
import * as ScreenOrientation from "expo-screen-orientation";
import { Alert, BackHandler } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import Container from "@/components/Container";
import { useVisita } from "@/hooks/VisitaProvider";
import { getHtmlVisita } from "@/utils/Visita/formatHTML";
import { abrirArquivo } from "@/utils/abrirArquivo";

export default function Finalizado() {
	const router = useRouter();
	const query = useSearchParams();
	const visita = useVisita();

	useEffect(() => {
		const backAction = () => {
			return true;
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
			const htmlContent = getHtmlVisita(visita)
				.replace("$assinatura", `${query.get("assinatura")}`)
				.replace("not-assinatura", "");

			// Caminho para salvar o arquivo HTML
			const filePath = `${visita.empresa}.pdf`;

			// Salvar o arquivo
			const data = await Print.printToFileAsync({
				html: htmlContent,
				base64: true,
				textZoom: 100,
				margins: {
					top: 20,
					left: 0,
					right: 0,
					bottom: 20,
				},
				useMarkupFormatter: true,
			});

			// Compartilhar o arquivo salvo
			abrirArquivo(data.uri);
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
					visita.clear();
					router.replace("/");
				}}
			>
				Ir para o Início
			</Button>
			<Button onPress={handleDownload}>Baixar Levantamento</Button>
		</Container>
	);
}
