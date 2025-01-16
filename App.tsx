import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Vip Mobile</Text>
      </View>

      {/* Botões */}
      <View style={styles.body}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Novo Levantamento </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}> Medição de Calor </Text>
        </TouchableOpacity>
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
    fontSize: 34,
    fontWeight: 'bold',
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
});
