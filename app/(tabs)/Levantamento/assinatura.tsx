import React, { useEffect, useRef } from "react";
import * as Device from "expo-device";
import * as ScreenOrientation from "expo-screen-orientation";
import { View, StyleSheet, Alert } from "react-native";
import Signature, { SignatureViewRef } from "react-native-signature-canvas";
import { useEmpresa } from "@/hooks/Levantamento/EmpresaProvider";
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

	const isTablet = Device.deviceType === Device.DeviceType.TABLET;

	return (
		<View style={styles.container}>
			<Signature
				ref={ref}
				onOK={handleSignature}
				onEmpty={() =>
					Alert.alert("Atenção", "Nenhuma assinatura capturada.")
				}
				descriptionText={"Assinatura de: " + empresa.responsavel}
				clearText="Limpar"
				confirmText="Confirmar"
				webStyle={`
						.m-signature-pad {
							box-shadow: none;
							border: 2px solid red;
							margin: 0;
                            height: ${isTablet ? 200 : 100}%;
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
