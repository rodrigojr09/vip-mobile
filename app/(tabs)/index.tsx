import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";

export default function App() {
	const router = useRouter();
	const [isCreatingLevantamento, setIsCreatingLevantamento] = useState(false);
	const [medicaoInfo, setMedicaoInfo] = useState("");
	const [isCreatingMedicao, setIsCreatingMedicao] = useState(false);

	const handleCreateMedicao = () => {
		if (!medicaoInfo.trim()) {
			Alert.alert("Atenção!", "Preencha todos os campos");
		} else {
			Alert.alert("Sucesso!", "Medição de calor criada!");
			setIsCreatingMedicao(false);
			setMedicaoInfo("");
		}
	};

	/* return (
    
        {isCreatingLevantamento ? (
          <Text>Funcionalidade de levantamento ainda não implementada.</Text>
        ) : isCreatingMedicao ? (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Informe os dados da medição"
              placeholderTextColor="#ccc"
              value={medicaoInfo}
              onChangeText={setMedicaoInfo}
            />
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateMedicao}
            >
              <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
          </View>
        ) : (*/

	return (
		<View style={styles.formContainer}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.push("/Levantamento")}
			>
				<Text style={styles.buttonText}>Novo Levantamento</Text>
			</TouchableOpacity>

			<TouchableOpacity
				style={styles.button}
				onPress={() => setIsCreatingMedicao(true)}
			>
				<Text style={styles.buttonText}>Medição de Calor</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
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
	body: {
		flex: 1,
		alignItems: "center",
		marginTop: 20,
	},
	button: {
		backgroundColor: "green",
		paddingVertical: 20,
		paddingHorizontal: 40,
		marginVertical: 10,
		borderRadius: 8,
		width: "90%",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		textAlign: "center",
	},
	formContainer: {
		width: "100%",
		alignItems: "center",
	},
	input: {
		borderWidth: 1,
		borderColor: "green",
		borderRadius: 5,
		padding: 15,
		marginVertical: 10,
		fontSize: 16,
		width: "100%",
		color: "#000",
	},
	createButton: {
		backgroundColor: "green",
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 8,
		marginTop: 10,
		width: "100%",
		alignItems: "center",
	},
});
