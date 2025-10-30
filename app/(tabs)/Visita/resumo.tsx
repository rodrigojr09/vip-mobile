import { useRef, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Signature, {
	type SignatureViewRef,
} from "react-native-signature-canvas";
import { WebView } from "react-native-webview";
import Container from "@/components/Container";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import { getHtmlVisita } from "@/utils/Visita/formatHTML";

export default function Rascunho() {
	const visita = useVisita();
	const nav = useNavigationHistory();
	const ref = useRef<SignatureViewRef>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [webHeight, setWebHeight] = useState<number>(0);

	if (!visita.empresa) {
		return (
			<View style={styles.center}>
				<Text>Carregando dados da empresa...</Text>
			</View>
		);
	}

	const handleSignature = async (signature: string) => {
		if (isSubmitting) return;
		if (!signature) {
			Alert.alert("Erro", "Nenhuma assinatura foi capturada.");
			return;
		}

		try {
			setIsSubmitting(true);
			nav.push({
				pathname: "/Visita/finalizado",
				params: {
					assinatura: `<img style="width: 100%; height: 100%;" src="${signature}"/>`,
				},
			});
		} catch (error) {
			console.error("Erro ao salvar ou compartilhar o arquivo:", error);
			Alert.alert("Erro", "Não foi possível salvar ou compartilhar o arquivo.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const injectedHeightJS = `
        (function() {
            function getHeight() {
                return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            }
            function sendHeight() {
                try {
                    window.ReactNativeWebView.postMessage(String(getHeight()));
                } catch(e) {}
            }
            sendHeight();
            if (window.ResizeObserver) {
                new ResizeObserver(sendHeight).observe(document.body);
            } else {
                var mo = new MutationObserver(sendHeight);
                mo.observe(document.body, { childList: true, subtree: true, attributes: true, characterData: true });
                window.addEventListener('load', sendHeight);
                window.addEventListener('resize', sendHeight);
            }
            true;
        })();
    `;

	return (
		<Container style={styles.container} scroller>
			<View style={styles.webviewWrapper}>
				<WebView
					source={{
						html: getHtmlVisita(visita),
					}}
					style={[styles.webview, { height: webHeight || 1 }]}
					scrollEnabled={false} // deixa o Container fazer o scroll
					bounces={false}
					nestedScrollEnabled={false}
					javaScriptEnabled={true}
					originWhitelist={["*"]}
					injectedJavaScript={injectedHeightJS}
					onMessage={(event) => {
						const data = event.nativeEvent.data;
						const h = parseInt(String(data), 10);
						if (!Number.isNaN(h) && h > 0) {
							setWebHeight(h);
						}
					}}
				/>
			</View>

			<View style={styles.signatureWrapper}>
				<Signature
					ref={ref}
					onOK={handleSignature}
					onEmpty={() =>
						Alert.alert("Atenção", "Nenhuma assinatura capturada.")
					}
					descriptionText={`Assinatura de: ${visita.responsavel}`}
					clearText="Limpar"
					confirmText={isSubmitting ? "Enviando..." : "Confirmar"}
					webStyle={`
                        .m-signature-pad--footer {
                            background-color: transparent;
                        }
                        body {
                            background-color: transparent;
                        }
                        .m-signature-pad {
                            height: 80%;
                            width: 100%;
                            background-color: transparent;
                            margin: 0px;
                        }
                    `}
					style={styles.signature}
				/>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		height: "100%",
		width: "100%",
	},
	webviewWrapper: {
		flex: 1,
	},
	webview: {
		backgroundColor: "transparent",
	},
	signatureWrapper: {
		height: 400,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderTopColor: "#ddd",
	},
	signature: {
		flex: 1,
		backgroundColor: "transparent",
	},
	center: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
	},
});
