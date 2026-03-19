import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";

export async function writeHtmlReport(
	fileName: string,
	htmlContent: string,
): Promise<string> {
	const filePath = `${FileSystem.documentDirectory}${fileName}`;

	await FileSystem.writeAsStringAsync(filePath, htmlContent, {
		encoding: FileSystem.EncodingType.UTF8,
	});

	return filePath;
}

export async function shareReport(fileUri: string) {
	return Sharing.shareAsync(fileUri);
}
