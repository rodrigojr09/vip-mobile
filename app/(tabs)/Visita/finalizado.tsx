import React, { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ScreenOrientation from "expo-screen-orientation";
import { Alert, BackHandler, Linking } from "react-native";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import Container from "@/components/Container";
import { useVisita } from "@/hooks/VisitaProvider";
import { getHtmlVisita } from "@/utils/Visita/formatHTML";
import { abrirArquivo } from "@/utils/abrirArquivo";
import { NovaVisita } from "@/utils/API/Empresas";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import base_url from "@/utils/API/base_url";

export default function Finalizado() {
	const router = useRouter();
	const query = useSearchParams();
	const visita = useVisita();
	const [token, setToken] = React.useState<string | null>(null);

	useEffect(() => {
		const backAction = () => {
			return true;
		};

		(async () => {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP
			);
			const res = await NovaVisita({
				id: uuidv4(),
				data: visita.data,
				empresaId: visita.empresa?.id || "",
				acompanhante: visita.acompanhante,
				perguntas: visita.perguntas,
				respostas: visita.respostas,
				visitante: visita.visitante,
				assinatura: query.get("assinatura") as string,
			},true);
            if (res === "offline") {
                Alert.alert("Salvo offline!")
				setToken("offline");
			} else {
				setToken(visita.empresa?.token || null);
			}
		})();

		BackHandler.addEventListener("hardwareBackPress", backAction);
	}, []);
	async function handleDownload() {
		try {
			// Gera o HTML com assinatura substituída
			const htmlContent = getHtmlVisita(visita)
				.replace("$assinatura", `${query.get("assinatura")}`)
				.replace("not-assinatura", "");

			// Pasta onde o arquivo será salvo
			const dir = `${FileSystem.documentDirectory}html`;

			// Garante que o diretório existe
			const dirInfo = await FileSystem.getInfoAsync(dir);
			if (!dirInfo.exists) {
				await FileSystem.makeDirectoryAsync(dir, {
					intermediates: true,
				});
			}

			// Gera nome de arquivo limpo
			const nomeArquivo = `${visita.empresa?.cnpj.replace(
				/\D/g,
				""
			)}-${visita.data.replaceAll("/", "-")}.html`;

			const caminhoCompleto = `${dir}/${nomeArquivo}`;

			await FileSystem.writeAsStringAsync(caminhoCompleto, htmlContent);
			console.log(`✅ Arquivo salvo localmente em: ${caminhoCompleto}`);

			Alert.alert("Sucesso", "Arquivo salvo com sucesso!");
			await abrirArquivo(caminhoCompleto);

		} catch (error: any) {
			console.error("❌ Erro ao salvar o arquivo:", error);
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
			{token && token !== "offline" && (
				<Button
					onPress={() => {
						Linking.openURL(`${base_url}/empresas/${token}`);
					}}
				>
					Abrir Link
				</Button>
			)}
		</Container>
	);
}
