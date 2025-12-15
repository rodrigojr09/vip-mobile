import * as FileSystem from "expo-file-system/legacy";
import * as IntentLauncher from "expo-intent-launcher";
import Mime from "react-native-mime-types";

export async function abrirArquivo(caminhoArquivo: string) {
	const contentUri = await FileSystem.getContentUriAsync(caminhoArquivo);
	const mimeType = Mime.lookup(contentUri) || "*/*";

	try {
		await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
			data: contentUri,
			type: mimeType,
			flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
		});
	} catch (error) {
		console.error("Erro ao abrir o arquivo:", error);
	}
}
