import { useRef, useState } from "react";
import { Alert, View } from "react-native";
import Signature, {
	type SignatureViewRef,
} from "react-native-signature-canvas";

export default function Assinatura({
	onSubmit,
	assinante,
}: {
	onSubmit: (signature: string | null) => void;
	assinante: string;
}) {
	const ref = useRef<SignatureViewRef>(null);
	const [hasSigned, setHasSigned] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false); // <-- estado de controle

	const handleSignature = async (signature: string) => {
		if (isSubmitting) return; // <-- impede múltiplos cliques
		if (!hasSigned) {
			Alert.alert("Atenção", "Você precisa assinar antes de confirmar.");
			return onSubmit(null);
		}
		if (!signature) {
			Alert.alert("Erro", "Nenhuma assinatura foi capturada.");
			return onSubmit(null);
		}

		try {
			setIsSubmitting(true); // <-- trava o botão
			onSubmit(signature);
		} catch (error) {
			console.error("Erro ao salvar ou compartilhar o arquivo:", error);
			Alert.alert("Erro", "Não foi possível salvar ou compartilhar o arquivo.");
			onSubmit(null);
			setIsSubmitting(false); // <-- libera novamente em caso de erro
		}
	};
	return (
		<View style={{ flex: 1, height: 300 }}>
			<Signature
				ref={ref}
				onOK={handleSignature}
				onEmpty={() => Alert.alert("Atenção", "Nenhuma assinatura capturada.")}
				onBegin={() => setHasSigned(true)}
				descriptionText={`Assinatura de: ${assinante}`}
				clearText="Limpar"
				confirmText="Confirmar"
				webStyle={`
                    .m-signature-pad {
                        margin: 0;
                        width: 100%;
                        height: 88%;
                    }
                    .m-signature-pad--footer {
                        height: 10%;
                        ${isSubmitting ? "display: none;" : ""}
                    }
				`}
			/>
		</View>
	);
}
