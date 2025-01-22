import React, { useEffect, useRef } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { View, StyleSheet, Alert } from "react-native";
import Signature, { SignatureViewRef } from "react-native-signature-canvas";
import { getHtml } from "@/utils/formatHTML";
import { useEmpresa } from "@/hooks/EmpresaProvider";
import { useRouter } from "expo-router";

const SignatureScreen = () => {
	const ref = useRef<SignatureViewRef>(null);
	const empresa = useEmpresa();
	const router = useRouter();
	const handleSignature = async (signature: string) => {
		if (!signature) {
			Alert.alert("Erro", "Nenhuma assinatura foi capturada.");
			return;
		}
		try {
			// Gerar o HTML com a assinatura
			const htmlContent = getHtml(empresa)
				.replace(
					"$assinatura",
					`<img style="width: 100%; height: 100%;" src="${signature}"/>`
				)
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
			empresa.clear();
			router.dismissAll();
		} catch (error) {
			console.error("Erro ao salvar ou compartilhar o arquivo:", error);
			Alert.alert(
				"Erro",
				"Não foi possível salvar ou compartilhar o arquivo."
			);
		}
	};

	useEffect(() => {
		const lockOrientation = async () => {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.LANDSCAPE
			);
		};
		lockOrientation();

		// Retorna à orientação padrão ao sair
		return () => {
			ScreenOrientation.unlockAsync();
		};
	}, []);

	return (
		<View style={styles.container}>
			<Signature
				ref={ref}
				onOK={handleSignature}
				onEmpty={() =>
					Alert.alert("Atenção", "Nenhuma assinatura capturada.")
				}
				descriptionText="Assine aqui"
				clearText="Limpar"
				confirmText="Confirmar"
				webStyle={`
						.m-signature-pad {
							box-shadow: none;
							border: 2px solid red;
							margin: 0;
						}
					`}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
});

export default SignatureScreen;
