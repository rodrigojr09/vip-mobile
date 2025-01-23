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
			ScreenOrientation.unlockAsync();
			router.push({
				pathname: "/Levantamento/finalizado",
				params: {
					assinatura: `<img style="width: 100%; height: 100%;" src="${signature}"/>`,
				},
			});
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
		backgroundColor: "#00a44ff",
	},
});

export default SignatureScreen;
