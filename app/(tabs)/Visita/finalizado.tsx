import * as FileSystem from "expo-file-system/legacy";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Loading from "@/components/Loading";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import { events } from "@/utils/API/Event";
import { abrirArquivo } from "@/utils/abrirArquivo";
import manager from "@/utils/Data/manager";
import { getHtmlVisita } from "@/utils/Visita/formatHTML";

export default function Finalizado() {
	const nav = useNavigationHistory();
	const query = useSearchParams();
	const visita = useVisita();

	const [loading] = useState(false);
	const [token, setToken] = useState<string | null>(null);

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

			const res = await manager.visitas.create({
				...visita,
				horaSaida: `${hora}:${minutos}`,
				assinatura: query.get("assinatura") as string,
			});

			await manager.visitas.salvar({
				empresa: visita.empresa,
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
			} as any);

			if (res === "offline") {
				Alert.alert("Salvo offline!");
				setToken("offline");
			} else {
				setToken(visita.empresa?.token || "offline");
			}
		})();
	}, []);
	async function handleDownload() {
		try {
			// Gera o HTML com assinatura substituída
			const htmlContent = getHtmlVisita(visita)
				.replace("$assinatura", `${query.get("assinatura")}`)
				.replace("not-assinatura", "");

			// Pasta onde o arquivo será salvo
			const dir = `${FileSystem.documentDirectory}html`;

			// Garante que o diretório existe
			const dirInfo = await FileSystem.getInfoAsync(dir);
			if (!dirInfo.exists) {
				await FileSystem.makeDirectoryAsync(dir, {
					intermediates: true,
				});
			}

			// Gera nome de arquivo limpo
			const nomeArquivo = `${visita.empresa?.cnpj.replace(
				/\D/g,
				"",
			)}-${visita.data.replaceAll("/", "-")}.html`;

			const caminhoCompleto = `${dir}/${nomeArquivo}`;

			await FileSystem.writeAsStringAsync(caminhoCompleto, htmlContent);
			console.log(`✅ Arquivo salvo localmente em: ${caminhoCompleto}`);

			Alert.alert("Sucesso", "Arquivo salvo com sucesso!");
			await abrirArquivo(caminhoCompleto);
		} catch (error: any) {
			console.error("❌ Erro ao salvar o arquivo:", error);
			Alert.alert("Erro", "Não foi possível salvar ou compartilhar o arquivo.");
		}
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

				<Button onPress={handleDownload}>Baixar Visita</Button>
				{token && token !== "offline" && (
					<Button
						onPress={() => {
							Linking.openURL(
								`https://vip-admin.vercel.app/empresas/${token}/visitas/${visita.id}`,
							);
						}}
					>
						Abrir Link
					</Button>
				)}
			</Container>
		);
}
