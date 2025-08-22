import { useNavigationHistory } from "@/hooks/Navigation";
import * as Device from "expo-device";
import React, { useEffect, useRef, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { Alert, StyleSheet, View } from "react-native";
import Signature, { SignatureViewRef } from "react-native-signature-canvas";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import Button from "@/components/Button";

const SignatureScreen = () => {
	const ref = useRef<SignatureViewRef>(null);
	const nav = useNavigationHistory();
	const visita = useVisita();
	const [hasSigned, setHasSigned] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false); // <-- estado de controle

	useEffect(() => {
		const lockOrientation = async () => {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.LANDSCAPE
			);
		};
		lockOrientation();
	}, []);

	const handleSignature = async (signature: string) => {
		if (isSubmitting) return; // <-- impede múltiplos cliques
		if (!hasSigned) {
			Alert.alert("Atenção", "Você precisa assinar antes de confirmar.");
			return;
		}
		if (!signature) {
			Alert.alert("Erro", "Nenhuma assinatura foi capturada.");
			return;
		}

		try {
			setIsSubmitting(true); // <-- trava o botão
			nav.push({
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
			setIsSubmitting(false); // <-- libera novamente em caso de erro
		}
	};

	const isTablet = Device.deviceType === Device.DeviceType.TABLET;

	return (
		<View style={styles.container}>
			<Signature
				ref={ref}
				onOK={handleSignature}
				onEmpty={() =>
					Alert.alert("Atenção", "Nenhuma assinatura capturada.")
				}
				onBegin={() => setHasSigned(true)}
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
			{__DEV__ && <Button onPress={() => nav.back()}>Voltar</Button>}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		backgroundColor: "#00a44f",
	},
});

export default SignatureScreen;
