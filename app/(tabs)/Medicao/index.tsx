import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import TableComponent from "./tabela";
import Resultado from "./resultado";

export default function Medicao() {
  const [mediaIBUTG, setMediaIBUTG] = useState("");
  const [calor, setCalor] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medição de Calor</Text>
      <TableComponent setMediaIBUTG={setMediaIBUTG} setCalor={setCalor} />
      <Button title="Resultado" onPress={() => setMostrarResultado(true)} />
      {mostrarResultado && <Resultado mediaIBUTG={mediaIBUTG} calor={calor} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});