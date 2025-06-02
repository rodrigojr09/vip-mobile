import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { calculateIBUTG, calculateMediaIBUTG, calculateCalor } from "./calculo";

const TableComponent = ({ setMediaIBUTG, setCalor }: any) => {
  const tableHead = ["Horário", "Globo", "Seco", "Úmido", "IBUTG"];
  const [tableData, setTableData] = useState(
    Array.from({ length: 5 }, () => ["", "", "", "", ""])
  );
  const [permanencia, setPermanencia] = useState("");

  const handleInputChange = (text: string, rowIndex: number, colIndex: number) => {
    const newData = [...tableData];
    const updatedRow = [...newData[rowIndex]];
    updatedRow[colIndex] = text;

    if (colIndex === 3) {
      const Tg = updatedRow[1];
      const Tbu = updatedRow[3];
      updatedRow[4] = calculateIBUTG(Tbu, Tg);
    }

    newData[rowIndex] = updatedRow;
    setTableData(newData);
    setMediaIBUTG(calculateMediaIBUTG(newData));
    setCalor(
      calculateCalor(
        updatedRow[4],
        updatedRow[1],
        updatedRow[3],
        updatedRow[5] ?? "", 
        updatedRow[6] ?? ""
      )
    );
  };

  return (
    <View>
      <View style={styles.row}>
        {tableHead.map((header, index) => (
          <Text key={index} style={[styles.cell, styles.headerCell]}>{header}</Text>
        ))}
      </View>

      {tableData.map((rowData, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {rowData.map((cellData: any, cellIndex: number) => (
            <TextInput
              key={cellIndex}
              style={[styles.cell, styles.input]}
              value={cellData}
              editable={cellIndex !== 4} 
              onChangeText={(text) => handleInputChange(text, rowIndex, cellIndex)}
              placeholder="Digite..."
            />
          ))}
        </View>
      ))}

      <Text style={[styles.cell, styles.headerCell]}>Permanência</Text>
      <TextInput
        style={styles.largeInput}
        value={permanencia}
        onChangeText={setPermanencia}
        placeholder="Digite a permanência..."
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
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
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 5,
    textAlign: "center",
  },
  largeInput: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    textAlign: "center",
    minHeight: 100,
    marginTop: 10,
  },
});

export default TableComponent;
