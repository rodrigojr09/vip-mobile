import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import {
	type FinalizedVisitLink,
	finalizeVisita,
} from "@/utils/services/visitaFinalization";

export default function Finalizado() {
	const nav = useNavigationHistory();
	const query = useSearchParams();
	const visita = useVisita();

	const [loading, setLoading] = useState(true);
	const [tokens, setTokens] = useState<FinalizedVisitLink[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const finalizedTokens = await finalizeVisita(
					visita,
					query.get("assinatura") || "",
					query.get("salvar") === "separado" ? "separado" : "junto",
				);

				for (const token of finalizedTokens) {
					if (token.token === "offline") {
						Alert.alert(
							"Aviso",
							`A visita da empresa ${token.empresa} foi salva localmente e nao possui token de acesso online.`,
						);
					}
				}

				setTokens(finalizedTokens);
			} catch (error) {
				console.warn("Erro ao finalizar visita:", error);
				Alert.alert(
					"Erro ao finalizar",
					"Nao foi possivel concluir a visita. Tente novamente.",
				);
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <Loading />;

	return (
		<Container style={{ padding: 10 }}>
			<Button
				onPress={() => {
					visita.clear();
					nav.replace("/");
				}}
			>
				Ir para o Inicio
			</Button>

			{tokens
				.filter((token) => token.token !== "offline")
				.map((token) => (
					<Button
						key={token.id}
						onPress={() => {
							Linking.openURL(
								`https://vip-admin.vercel.app/empresas/${token.token}/visitas/${token.id}`,
							);
						}}
					>
						{`Abrir Visita - (${token.empresa})`}
					</Button>
				))}
		</Container>
	);
}
