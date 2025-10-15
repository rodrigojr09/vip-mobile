import * as Device from "expo-device";
import { useRef } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Signature, {
	type SignatureViewRef,
} from "react-native-signature-canvas";
import { WebView } from "react-native-webview";
import { useEmpresa } from "@/hooks/Levantamento/EmpresaProvider";
import { useNavigationHistory } from "@/hooks/Navigation";
import { getHtml } from "@/utils/formatHTML";

export default function Rascunho() {
	const empresa = useEmpresa();
	const nav = useNavigationHistory();
	const ref = useRef<SignatureViewRef>(null);

	// Certifica-se de que os dados da empresa estão disponíveis antes de gerar o HTML
	if (!empresa) {
		return (
			<View style={styles.center}>
				<Text>Carregando dados da empresa...</Text>
			</View>
		);
	}

	const handleSignature = async (signature: string) => {
		if (!signature) {
			Alert.alert("Erro", "Nenhuma assinatura foi capturada.");
			return;
		}
		try {
			nav.push({
				pathname: "/Levantamento/finalizado",
				params: {
					assinatura: `<img style="width: 100%; height: 100%;" src="${signature}"/>`,
				},
			});
		} catch (error) {
			console.error("Erro ao salvar ou compartilhar o arquivo:", error);
			Alert.alert("Erro", "Não foi possível salvar ou compartilhar o arquivo.");
		}
	};

	const isTablet = Device.deviceType === Device.DeviceType.TABLET;

	const htmlContent = getHtml(empresa);

	return (
		<View style={styles.container}>
			<WebView
				originWhitelist={["*"]}
				source={{ html: htmlContent }}
				style={styles.webview}
				scrollEnabled={true}
			/>
			<Signature
				ref={ref}
				onOK={handleSignature}
				onEmpty={() => Alert.alert("Atenção", "Nenhuma assinatura capturada.")}
				descriptionText={`Assinatura de: ${empresa.responsavel}`}
				clearText="Limpar"
				confirmText="Confirmar"
				webStyle={`
						.m-signature-pad {
							box-shadow: none;
							border: 2px solid red;
							margin: 0;
                            height: ${isTablet ? 100 : 100}%;
						}
					`}
			/>
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
