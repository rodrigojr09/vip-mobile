import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Resultado = ({ mediaIBUTG }:any) => {
  return (
    <View>
      <Text style={[styles.cell, styles.headerCell]}>Média IBUTG</Text>
      <Text style={[styles.cell]}>{mediaIBUTG}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    padding: 8,
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#ddd",
  },
});

export default Resultado;