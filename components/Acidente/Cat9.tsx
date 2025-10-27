import * as ImagePicker from "expo-image-picker";
import {
	Alert,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import type Acidente from "@/types/Acidente";

export default function Cat9({
	handleChange,
	cat,
}: {
	handleChange: (tag: string, value: string[]) => void;
	cat: Acidente["cat9"];
}) {
	const handleTakePhoto = async () => {
		// Solicita permissão da câmera
		const { status } = await ImagePicker.requestCameraPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Permissão negada", "É necessário permitir acesso à câmera.");
			return;
		}

		// Abre a câmera com retorno em base64
		const result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: false,
			quality: 0.6,
			base64: true, // <-- importante!
		});

		// Se o usuário tirou uma foto
		if (!result.canceled && result.assets.length > 0) {
			const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
			const updatedImages = [...(cat?.images || []), base64Img];
			handleChange("cat9.images", updatedImages);
		}
	};

	const handleRemoveImage = (index: number) => {
		const updatedImages = (cat?.images || []).filter((_, i) => i !== index);
		handleChange("cat9.images", updatedImages);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Fotos do Acidente</Text>

			<ScrollView horizontal showsHorizontalScrollIndicator={false}>
				<View style={styles.imageList}>
					{cat?.images?.map((uri, index) => (
						<View key={uri} style={styles.imageWrapper}>
							<Image source={{ uri }} style={styles.image} />
							<TouchableOpacity
								style={styles.removeButton}
								onPress={() => handleRemoveImage(index)}
							>
								<Text style={styles.removeText}>×</Text>
							</TouchableOpacity>
						</View>
					))}

					{/* Botão da câmera */}
					<TouchableOpacity style={styles.addButton} onPress={handleTakePhoto}>
						<Text style={styles.addText}>📷</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		padding: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 10,
		color: "#fff",
	},
	imageList: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	imageWrapper: {
		position: "relative",
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 10,
	},
	removeButton: {
		position: "absolute",
		top: -6,
		right: -6,
		backgroundColor: "rgba(0,0,0,0.6)",
		borderRadius: 10,
		paddingHorizontal: 6,
		paddingVertical: 2,
	},
	removeText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 16,
	},
	addButton: {
		width: 100,
		height: 100,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#999",
		justifyContent: "center",
		alignItems: "center",
	},
	addText: {
		fontSize: 28,
		color: "#999",
	},
});
