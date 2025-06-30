import { useRouter } from "expo-router";
import * as Device from "expo-device";
import React, { useRef, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import Signature, { SignatureViewRef } from "react-native-signature-canvas";
import Button from "@/components/Button";
import { useVisita } from "@/hooks/VisitaProvider";

const SignatureScreen = () => {
	const ref = useRef<SignatureViewRef>(null);
	const router = useRouter();
	const { acompanhante } = useVisita();
	const handleSignature = async (signature: string) => {
		if (!signature) {
			Alert.alert("Erro", "Nenhuma assinatura foi capturada.");
			return;
		}
		try {
			router.push({
				pathname: "/Visita/finalizado",
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
				descriptionText={"Assinatura de: " + acompanhante}
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
			<Button onPress={() => router.back()} secundary>
				Voltar
			</Button>
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
