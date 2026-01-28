import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import { events } from "@/utils/API/Event";
import manager from "@/utils/Data/manager";

export default function Finalizado() {
	const nav = useNavigationHistory();
	const query = useSearchParams();
	const visita = useVisita();

	const [loading] = useState(false);
	const [tokens, setTokens] = useState<
		{ id: string; empresa: string; token: string }[]
	>([]);

	useEffect(() => {
		const agora = new Date();
		const hora = agora.getHours().toString().padStart(2, "0");
		const minutos = agora.getMinutes().toString().padStart(2, "0");

		(async () => {
			// Chamar addEvent para registrar finalização da visita
			try {
				const msg = `Finalização da visita - Empresa: ${
					visita.empresa?.razao_social || "N/D"
				}, Técnico: ${visita.tecnico || "N/D"}, Responsável: ${
					visita.responsavel || "N/D"
				}`;

				events.sendEvent(msg);
				events.endEvent();
			} catch (error) {
				console.warn("Erro ao adicionar evento de finalização:", error);
			}

			if (query.get("salvar") === "separado") {
				[
					{ id: visita.id, empresa: visita.empresa },
					...visita.inclusas,
				].forEach(async ({ id, empresa }) => {
					const res = await manager.visitas.create({
						...visita,
						id,
						empresa,
						inclusas: [],
						horaSaida: `${hora}:${minutos}`,
						assinatura: query.get("assinatura") as string,
					});
					await manager.visitas.salvar({
						empresa,
						inclusas: [],
						id,
						data: visita.data,
						tecnico: visita.tecnico,
						responsavel: visita.responsavel,
						perguntas: visita.perguntas,
						respostas: visita.respostas,
						horaEntrada: visita.horaEntrada,
						setores: visita.setores,
						assinatura: query.get("assinatura") as string,
						horaSaida: `${hora}:${minutos}`,
						empresas: [],
					});
					addToken(
						id,
						empresa?.razao_social || "N/D",
						res === "offline" ? "offline" : empresa?.token || "offline",
					);
				});
			} else {
				const res = await manager.visitas.create({
					...visita,
					horaSaida: `${hora}:${minutos}`,
					assinatura: query.get("assinatura") as string,
				});

				await manager.visitas.salvar({
					empresa: visita.empresa,
					inclusas: visita.inclusas,
					id: visita.id,
					data: visita.data,
					tecnico: visita.tecnico,
					responsavel: visita.responsavel,
					perguntas: visita.perguntas,
					respostas: visita.respostas,
					horaEntrada: visita.horaEntrada,
					setores: visita.setores,
					assinatura: query.get("assinatura") as string,
					horaSaida: `${hora}:${minutos}`,
					empresas: [],
				});

				addToken(
					visita.id,
					visita.empresa?.razao_social || "N/D",
					res === "offline" ? "offline" : visita.empresa?.token || "offline",
				);
			}
		})();
	}, []);

	function addToken(id: string, empresa: string, token: string) {
		if (token === "offline")
			Alert.alert(
				"Aviso",
				`A visita da empresa ${empresa} foi salva localmente e não possui token de acesso online.`,
			);
		setTokens((prev) => [...prev, { id, empresa, token }]);
	}

	if (loading) return <Loading />;

	if (!loading)
		return (
			<Container style={{ padding: 10 }}>
				<Button
					onPress={() => {
						visita.clear();
						nav.replace("/");
					}}
				>
					Ir para o Início
				</Button>

				{tokens
					.filter((token) => token.token !== "offline")
					.map((token) => (
						<Button
							key={token.token}
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
