import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [isCreatingLevantamento, setIsCreatingLevantamento] = useState(false);
  const [isCreatingMedicao, setIsCreatingMedicao] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [assistantName, setAssistantName] = useState('');
  const [medicaoInfo, setMedicaoInfo] = useState('');

  const handleCreateLevantamento = () => {
    if (!companyName.trim() || !assistantName.trim()) {
      Alert.alert('Burro Burro coloque algum nome burro burro');
    } else {
      Alert.alert('Levantamento criado!');
      setIsCreatingLevantamento(false);
      setCompanyName('');
      setAssistantName('');
    }
  };

  const handleCreateMedicao = () => {
    if (!medicaoInfo.trim()) {
      Alert.alert('Burro Burro coloque algum nome burro burro');
    } else {
      Alert.alert('Medição de calor criada!');
      setIsCreatingMedicao(false);
      setMedicaoInfo('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Vip Mobile</Text>
      </View>

      <View style={styles.body}>
        {isCreatingLevantamento ? (
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
            <TouchableOpacity style={styles.createButton} onPress={handleCreateLevantamento}>
              <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
          </View>
        ) : isCreatingMedicao ? (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder='rodrigooo mim ajuda'
              placeholderTextColor="#ccc"
              value={medicaoInfo}
              onChangeText={setMedicaoInfo}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreateMedicao}>
              <Text style={styles.buttonText}>Criar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={() => setIsCreatingLevantamento(true)}>
              <Text style={styles.buttonText}>Novo Levantamento</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setIsCreatingMedicao(true)}>
              <Text style={styles.buttonText}>Medição de Calor</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'green',
    padding: 37,
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 37,
    fontWeight: 'bold',
    marginTop: 30,
    margin: -10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    marginTop: 30,
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 25,
    paddingHorizontal: 40,
    marginVertical: 14,
    borderRadius: 10,
    width: '96%',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  formContainer: {
    width: '90%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    fontSize: 18,
    width: '100%',
    color: '#000',
  },
  createButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});

