import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import Button from "@/components/Button";
import { useEmpresa } from "@/hooks/Levantamento/EmpresaProvider";
import { useNavigationHistory } from "@/hooks/Navigation";
import { getHtml } from "@/utils/formatHTML";

export default function Rascunho() {
	const empresa = useEmpresa();
	const nav = useNavigationHistory();

	// Certifica-se de que os dados da empresa estão disponíveis antes de gerar o HTML
	if (!empresa) {
		return (
			<View style={styles.center}>
				<Text>Carregando dados da empresa...</Text>
			</View>
		);
	}

	const htmlContent = getHtml(empresa);

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
					onPress={() => {
						nav.push("/Levantamento/assinatura");
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
