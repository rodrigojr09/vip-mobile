import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { useVisita } from "@/hooks/VisitaProvider";
import { getHtmlVisita } from "@/utils/Visita/formatHTML";

export default function Rascunho() {
	const visita = useVisita();
	const router = useRouter();

	// Certifica-se de que os dados da empresa estão disponíveis antes de gerar o HTML
	if (!visita) {
		return (
			<View style={styles.center}>
				<Text>Carregando dados da empresa...</Text>
			</View>
		);
	}

	const htmlContent = getHtmlVisita(visita);
	console.log(htmlContent);
	return (
		<View style={styles.container}>
			<WebView
				originWhitelist={["*"]}
				source={{ html: htmlContent }}
				style={styles.webview}
				scrollEnabled={true}
			/>
			<View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
				<Button
					onPress={(e) => {
						router.push("/VisitaTecnica/assinatura");
					}}
				>
					Assinar Documento
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f0f0",
	},
	webview: {
		flex: 1,
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
	},
});
