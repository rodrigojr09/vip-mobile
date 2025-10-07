import * as FileSystem from "expo-file-system";
import { useNetworkState } from "expo-network";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useNavigationHistory } from "@/hooks/Navigation";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import Data from "@/utils/API/Data";

const VISITAS_DIR = `${FileSystem.documentDirectory}offline_visitas/`;

export default function App() {
	const nav = useNavigationHistory();
	const { isConnected, isInternetReachable } = useNetworkState();
	const [visitas, setVisitas] = useState<VIPVisitaType[]>([]);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		listarVisitas();
	}, []);

	async function listarVisitas() {
		try {
			const dirInfo = await FileSystem.getInfoAsync(VISITAS_DIR);
			if (!dirInfo.exists) {
				await FileSystem.makeDirectoryAsync(VISITAS_DIR);
				return;
			}

			const files = await FileSystem.readDirectoryAsync(VISITAS_DIR);

			const parsed = await Promise.all(
				files.map(async (file) => {
					try {
						const content = await FileSystem.readAsStringAsync(
							VISITAS_DIR + file,
						);
						return JSON.parse(content);
					} catch (error) {
						console.warn("Erro ao ler arquivo:", file, error);
						return null;
					}
				}),
			);

			setVisitas(parsed.filter(Boolean));
		} catch (err) {
			console.error("Erro ao listar visitas offline:", err);
		}
	}

	async function save() {
		if (isSaving) return;
		setIsSaving(true);

		try {
			const saves = await Promise.all(
				visitas.map(async (item) => {
					try {
						const file = await FileSystem.readAsStringAsync(
							`${VISITAS_DIR + item.id}.json`,
						);
						const res = await Data.createVisita(JSON.parse(file), false);
						if (res) {
							await FileSystem.deleteAsync(`${VISITAS_DIR + item.id}.json`);
							return 1;
						}
					} catch (e) {
						console.error("Erro ao salvar visita:", item.id, e);
					}
					return 0;
				}),
			);

			const saves2 = saves.filter((a) => a === 1).length;
			listarVisitas();
			Alert.alert("Sucesso", `Salvo o total de ${saves2} visita(s).`);
		} catch (err) {
			console.error("Erro ao salvar visitas:", err);
		} finally {
			setIsSaving(false);
		}
	}

	return (
		<Container style={styles.container}>
			<Button onPress={() => nav.push("/Levantamento")}>
				Novo Levantamento
			</Button>

			<Button onPress={() => nav.push("/Visita")}>Visita Técnica</Button>

			{isConnected === true &&
				isInternetReachable === true &&
				visitas.length > 0 && (
					<Button onPress={save} disabled={isSaving}>
						{isSaving ? "Salvando..." : `Salvar ${visitas.length} Visita(s)`}
					</Button>
				)}
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
});
