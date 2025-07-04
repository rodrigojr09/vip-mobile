import { useRouter } from "expo-router";
import * as Device from "expo-device";
import React, { useRef, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Signature, { SignatureViewRef } from "react-native-signature-canvas";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";

const SignatureScreen = () => {
	const ref = useRef<SignatureViewRef>(null);
	const router = useRouter();
	const visita = useVisita();
	const [hasSigned, setHasSigned] = useState(false);

	const handleSignature = async (signature: string) => {
		if (!hasSigned) {
			Alert.alert("Atenção", "Você precisa assinar antes de confirmar.");
			return;
		}
		if (!signature) {
			Alert.alert("Erro", "Nenhuma assinatura foi capturada.");
			return;
		}
		try {
			router.push({
				pathname: "/VisitaTecnica/finalizado",
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
		ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.LANDSCAPE
		);
	}, []);

	const isTablet = Device.deviceType === Device.DeviceType.TABLET;

	return (
		<View style={styles.container}>
			<Signature
				ref={ref}
				onOK={handleSignature}
				onEmpty={() =>
					Alert.alert("Atenção", "Nenhuma assinatura capturada.")
				}
				onBegin={() => setHasSigned(true)} // <- Detecta início do desenho
				descriptionText={"Assinatura de: " + visita.responsavel}
				clearText="Limpar"
				confirmText="Confirmar"
				webStyle={`
					.m-signature-pad {
						box-shadow: none;
						border: 2px solid #00796b;
						margin: 0;
						height: ${isTablet ? "200%" : "100%"};
					}
				`}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#00a44f",
	},
});

export default SignatureScreen;
