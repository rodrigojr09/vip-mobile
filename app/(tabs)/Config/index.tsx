import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useNavigationHistory } from "@/hooks/Navigation";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import manager from "@/utils/Data/manager";
import { events } from "@/utils/API/Event";

export default function Config() {
	const nav = useNavigationHistory();

	const [nome, setNome] = useState("");
	const [syncing, setSyncing] = useState(false);

	useEffect(() => {
		manager.eventos.getDevice().then((deviceName) => {
			if (deviceName) setNome(deviceName);
		});
	}, []);

	const handleSync = async () => {
		if (syncing) return;
		setSyncing(true);
		try {
			events.startEvent("sync");
			await events.sendEvent("Sincronizando os dados...");
			await manager.visitas.init();
			await events.syncOfflineEventos();
			await events.sendEvent("Dados sincronizados!");
			Alert.alert("Sincronizado", "Dados atualizados com sucesso.");
		} catch (error) {
			await events.sendEvent(
				`Falha ao sincronizar: ${error instanceof Error ? error.message : "erro desconhecido"}`,
			);
			Alert.alert("Erro", "Falha ao sincronizar os dados.");
		} finally {
			events.endEvent();
			setSyncing(false);
		}
	};

	return (
		<Container style={styles.container}>
			<Text style={styles.title}>Sistema</Text>
			<Button onPress={handleSync} disabled={syncing}>
				{syncing ? "Sincronizando..." : "Puxar informacoes do sistema"}
			</Button>

			<Text style={styles.title}>Backup's</Text>
			<Button onPress={() => nav.push("/Config/levantamentos")}>
				Levantamentos Salvos
			</Button>

			<Button onPress={() => nav.push("/Config/visitas")}>
				Visitas Técnicas Salvas
			</Button>
			<View style={{ marginTop: 40, width: "100%", gap: 10 }}>
				<Text style={styles.title}>Nome do Dispositivo</Text>
				<Input
					style={{ width: "100%" }}
					value={nome}
					onChange={setNome}
					placeholder="Nome do Dispositivo"
				/>
				<Button
					onPress={() => {
						manager.eventos.setDevice(nome).then(() => {
							Alert.alert("Salvo!", "Nome salvo com sucesso!");
						});
					}}
				>
					Salvar Nome
				</Button>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#22c55e",
	},
});
