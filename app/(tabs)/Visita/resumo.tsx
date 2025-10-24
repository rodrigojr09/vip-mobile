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
	const [hasSigned, setHasSigned] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [bodyHeight, setBodyHeight] = useState("");

	if (!visita.empresa) {
		return (
			<View style={styles.center}>
				<Text>Carregando dados da empresa...</Text>
			</View>
		);
	}

	const handleSignature = async (signature: string) => {
		if (isSubmitting) return;
		if (!hasSigned) {
			Alert.alert("Atenção", "Você precisa assinar antes de confirmar.");
			return;
		}
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
			setIsSubmitting(false);
		}
	};

	return (
		<Container style={styles.container} scroller>
			{/* Conteúdo HTML da visita */}
			<Text>Altura: {bodyHeight}</Text>
			<WebView
				originWhitelist={["*"]}
				source={{ html: getHtmlVisita(visita) }}
				style={styles.webview}
				scrollEnabled={false}
				onMessage={(event) => {
					const newHeight = Number(event.nativeEvent.data);
					console.log("Height:", newHeight);
					setBodyHeight(newHeight.toString());
				}}
			/>

			<Signature
				ref={ref}
				onOK={handleSignature}
				onEmpty={() => Alert.alert("Atenção", "Nenhuma assinatura capturada.")}
				onBegin={() => setHasSigned(true)}
				descriptionText={`Assinatura de: ${visita.responsavel}`}
				clearText="Limpar"
				confirmText="Confirmar"
				webStyle={`
					.m-signature-pad {
						box-shadow: none;
						border: 2px solid #00796b;
						margin: 0;
						height: 20%;
					}
				`}
			/>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f0f0",
	},
	webview: {
		width: "100%",
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
