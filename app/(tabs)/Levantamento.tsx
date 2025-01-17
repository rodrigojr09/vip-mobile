import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function Levantamento() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [assistantName, setAssistantName] = useState("");
  const handleCreateLevantamento = () => {
    if (!companyName.trim() || !assistantName.trim()) {
      Alert.alert("Atenção! preencha todos os campos");
    } else {
      Alert.alert("Levantamento criado!");
      router.push("/levantamento-resumo");
      setCompanyName("");
      setAssistantName("");
    }
  };
  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da empresa..."
        placeholderTextColor="#ccc"
        value={companyName}
        onChangeText={setCompanyName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quem está auxiliando o levantamento?"
        placeholderTextColor="#ccc"
        value={assistantName}
        onChangeText={setAssistantName}
      />
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateLevantamento}
      >
        <Text style={styles.buttonText}>Criar</Text>
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
    padding: 37,
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    color: "white",
    fontSize: 37,
    fontWeight: "bold",
    marginTop: 30,
    margin: -10,
  },
  body: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 25,
    paddingHorizontal: 40,
    marginVertical: 14,
    borderRadius: 10,
    width: "96%",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
  formContainer: {
    width: "90%",
    alignItems: "center",
    margin: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    fontSize: 18,
    width: "100%",
    color: "#000",
  },
  createButton: {
    backgroundColor: "green",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});
