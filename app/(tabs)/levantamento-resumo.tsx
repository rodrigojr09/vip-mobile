import { useRouter } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default function LevantamentoResumo() {
  return (
    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.title}>Setores da Empresa</Text>

      {/* Tabela */}
      <View style={styles.table}>
        {/* Cabeçalho da Tabela */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerColumn, { flex: 1 }]}>Setor</Text>
          <Text style={[styles.headerColumn, { flex: 1, textAlign: "right" }]}>
            Funções
          </Text>
        </View>
        <View style={styles.spacer} />

        {/* Linhas */}
        <TouchableOpacity
          style={styles.row}
          accessibilityLabel="Adicionar um novo setor à empresa"
        >
          <Text style={styles.rowText}>Novo Setor</Text>
        </TouchableOpacity>
        
        {/* Espaçamento entre as linhas */}
        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.row}
          accessibilityLabel="Finalizar o levantamento dos setores"
        >
          <Text style={styles.rowText}>Finalizar Levantamento</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C1C2E", // Fundo escuro
    paddingTop: 30,
  },
  header: {
    backgroundColor: "#28A745", // Verde
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#FFFFFF",
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    marginVertical: 20,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#28A745",
  },
  table: {
    marginHorizontal: 15,
    marginTop: 20,
    borderWidth: 1,
    padding:10,
    borderColor: "#FFFFFF",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#2C2C3E",
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  headerColumn: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1, // Ajusta as colunas para dividir o espaço igualmente
  },
  row: {
    backgroundColor: "#28A745",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 1,
  },
  rowText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  spacer: {
    height: 10, // Altura do espaçamento entre as linhas
  },
});
