import Button from "@/components/Button";
import * as FileSystem from "expo-file-system";
import Container from "@/components/Container";
import { useRouter } from "expo-router";
import React, { use, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { NovaVisita } from "@/utils/API/Empresas";
import { getNetworkStateAsync, useNetworkState } from "expo-network";
import { Visita } from "@/types/VIPVisitaType";

export default function App() {
	const router = useRouter();
	const { isConnected, isInternetReachable } = useNetworkState();
	const [visitas, setVisitas] = React.useState<Visita[]>([]);

	async function listarVisitas() {
		try {
			if (
				!(
					await FileSystem.getInfoAsync(
						`${FileSystem.documentDirectory}offline_visitas`
					)
				).exists
			)
				return FileSystem.makeDirectoryAsync(
					`${FileSystem.documentDirectory}offline_visitas`
				);
			const data2 = await FileSystem.readDirectoryAsync(
				FileSystem.documentDirectory + "offline_visitas"
			);

			setVisitas(
				await Promise.all(
					data2.map(async (file) => {
						return JSON.parse(
							await FileSystem.readAsStringAsync(
								FileSystem.documentDirectory +
									"offline_visitas/" +
									file
							)
						);
					})
				)
			);
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		listarVisitas();
	}, []);

	async function save() {
		try {
			const saves = await Promise.all(
				visitas.map(async (item) => {
					const file = await FileSystem.readAsStringAsync(
						FileSystem.documentDirectory +
							"offline_visitas/" +
							item.id +
							".json"
					);
					const res = await NovaVisita(JSON.parse(file), false);
					console.log(res);
					if (res) {
						await FileSystem.deleteAsync(
							FileSystem.documentDirectory +
								"offline_visitas/" +
								item.id +
								".json"
						);
						return 1;
					}
					return 0;
				})
			);

			const saves2 = saves.filter((a) => a === 1).length;
			listarVisitas();
			Alert.alert("Salvo o total de " + saves2 + " visita(s).");
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<Container style={styles.container}>
			<Button onPress={(e) => router.push("/Levantamento")}>
				Novo Levantamento
			</Button>

			<Button onPress={(e) => router.push("/VisitaTecnica")}>
				Visita Técnica
            </Button>
            
            <Button onPress={(e) => router.push("/Visita")}>
                Visita (Teste)
            </Button>

			{isConnected && isInternetReachable && visitas.length > 0 && (
				<Button onPress={(e) => save()}>
					{`Salvar ${visitas.length} Visita(s)`}
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
	header: {
		backgroundColor: "green",
		padding: 30,
		alignItems: "center",
		width: "100%",
	},
	headerText: {
		color: "white",
		fontSize: 32,
		fontWeight: "bold",
	},
});
