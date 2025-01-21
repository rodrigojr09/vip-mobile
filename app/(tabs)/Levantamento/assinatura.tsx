import React, { useEffect, useRef } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { View, StyleSheet } from "react-native";
import Signature, { SignatureViewRef } from "react-native-signature-canvas";

const SignatureScreen = () => {
	const ref = useRef<SignatureViewRef>(null);

	const handleSignature = (signature: any) => {
		console.log("Signature:", signature); // Base64 da imagem da assinatura
	};

	const handleClear = () => {
		ref.current?.clearSignature();
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

	const handleConfirm = () => {
		ref.current?.readSignature();
	};

	return (
		<View style={styles.container}>
			<Signature
				ref={ref}
				onOK={handleSignature}
				onEmpty={() => console.log("Nenhuma assinatura")}
				descriptionText="Assine aqui"
				clearText="Limpar"
				confirmText="Confirmar"
				webStyle={
					".m-signature-pad { box-shadow: none; border: 2px solid red; margin: 0; }"
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		backgroundColor: "#fff",
	},
});

export default SignatureScreen;
