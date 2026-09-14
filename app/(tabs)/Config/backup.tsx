import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";

const VIP_KEY_PREFIX = "@vip:";
const BACKUP_FILE_NAME = "backup-vip-mobile.json";
const PACKAGE_NAME = "mobile.vipsst.com.br";

type BackupFile = {
	version: number;
	exportedAt: string;
	packageName: string;
	keys: string[];
	data: Record<string, string | null>;
};

function confirmOverwrite(keys: string[]) {
	return new Promise<boolean>((resolve) => {
		if (keys.length === 0) {
			resolve(true);
			return;
		}

		const visibleKeys = keys.slice(0, 20);
		const hiddenCount = keys.length - visibleKeys.length;
		Alert.alert(
			"Confirmar restauracao",
			`O backup vai sobrescrever ${keys.length} chave(s) existente(s):\n\n${visibleKeys.join("\n")}${
				hiddenCount > 0 ? `\n...e mais ${hiddenCount}` : ""
			}`,
			[
				{ text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
				{
					text: "Sobrescrever",
					style: "destructive",
					onPress: () => resolve(true),
				},
			],
		);
	});
}

export default function BackupScreen() {
	const [keys, setKeys] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);

	const getVipKeys = async () => {
		const allKeys = await AsyncStorage.getAllKeys();
		return allKeys.filter((key) => key.startsWith(VIP_KEY_PREFIX)).sort();
	};

	const handleShowKeys = async () => {
		try {
			const vipKeys = await getVipKeys();
			console.log("Chaves @vip: salvas:", vipKeys);
			setKeys(vipKeys);
			Alert.alert("Chaves encontradas", `${vipKeys.length} chave(s) @vip:.`);
		} catch (error) {
			console.error("Erro ao listar chaves @vip:", error);
			Alert.alert("Erro", "Nao foi possivel listar as chaves salvas.");
		}
	};

	const handleExport = async () => {
		if (loading) return;
		setLoading(true);

		try {
			const vipKeys = await getVipKeys();
			const values = await AsyncStorage.multiGet(vipKeys);
			const data = Object.fromEntries(values);
			const backup: BackupFile = {
				version: 1,
				exportedAt: new Date().toISOString(),
				packageName: PACKAGE_NAME,
				keys: vipKeys,
				data,
			};

			const backupFile = new File(Paths.document, BACKUP_FILE_NAME);
			if (!backupFile.exists) {
				backupFile.create({ intermediates: true });
			}
			backupFile.write(JSON.stringify(backup, null, 2), { encoding: "utf8" });

			if (!(await Sharing.isAvailableAsync())) {
				Alert.alert("Backup gerado", `Arquivo salvo em: ${backupFile.uri}`);
				return;
			}

			await Sharing.shareAsync(backupFile.uri, {
				mimeType: "application/json",
				dialogTitle: "Exportar backup VIP Mobile",
				UTI: "public.json",
			});
		} catch (error) {
			console.error("Erro ao exportar backup:", error);
			Alert.alert("Erro", "Nao foi possivel exportar o backup.");
		} finally {
			setLoading(false);
		}
	};

	const handleRestore = async () => {
		if (loading) return;
		setLoading(true);

		try {
			const result = await DocumentPicker.getDocumentAsync({
				type: "application/json",
				copyToCacheDirectory: true,
				multiple: false,
			});

			if (result.canceled) return;

			const file = result.assets[0];
			const content = await new File(file.uri).text();
			const backup = JSON.parse(content) as Partial<BackupFile>;

			if (!backup.data || typeof backup.data !== "object") {
				Alert.alert(
					"Backup invalido",
					"O arquivo nao possui dados para restaurar.",
				);
				return;
			}

			const entries = Object.entries(backup.data).filter(
				(entry): entry is [string, string] =>
					entry[0].startsWith(VIP_KEY_PREFIX) && typeof entry[1] === "string",
			);

			if (entries.length === 0) {
				Alert.alert(
					"Backup vazio",
					"Nenhuma chave @vip: valida foi encontrada.",
				);
				return;
			}

			const currentKeys = await getVipKeys();
			const existingKeys = entries
				.map(([key]) => key)
				.filter((key) => currentKeys.includes(key));
			const confirmed = await confirmOverwrite(existingKeys);

			if (!confirmed) return;

			await AsyncStorage.multiSet(entries);
			setKeys(await getVipKeys());
			Alert.alert("Restaurado", `${entries.length} chave(s) restaurada(s).`);
		} catch (error) {
			console.error("Erro ao restaurar backup:", error);
			Alert.alert("Erro", "Nao foi possivel restaurar o backup.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container scroller contentContainerStyle={styles.container}>
			<Text style={styles.title}>Backup offline</Text>
			<Text style={styles.description}>
				Tela temporaria para exportar e restaurar dados @vip: do AsyncStorage.
			</Text>

			<Button onPress={handleExport} disabled={loading}>
				Exportar backup
			</Button>
			<Button onPress={handleRestore} disabled={loading} secundary>
				Restaurar backup
			</Button>
			<Button onPress={handleShowKeys} disabled={loading} secundary>
				Ver chaves salvas
			</Button>

			<View style={styles.keysBox}>
				<Text style={styles.keysTitle}>Chaves @vip:</Text>
				{keys.length === 0 ? (
					<Text style={styles.keyText}>Nenhuma chave listada.</Text>
				) : (
					keys.map((key) => (
						<Text key={key} style={styles.keyText}>
							{key}
						</Text>
					))
				)}
			</View>

			{/* Chamada temporaria sugerida:
			    adicione um botao em app/(tabs)/Config/index.tsx usando nav.push("/backup").
			    Remova esta rota depois de concluir a migracao dos dados. */}
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		padding: 20,
	},
	title: {
		color: "#22c55e",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 10,
	},
	description: {
		color: "white",
		fontSize: 14,
		marginBottom: 20,
		textAlign: "center",
	},
	keysBox: {
		marginTop: 24,
		width: "100%",
	},
	keysTitle: {
		color: "#22c55e",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
	},
	keyText: {
		color: "white",
		fontSize: 14,
		marginBottom: 6,
	},
});
