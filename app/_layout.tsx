import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Layout() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Vip Mobile</Text>
      </View>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
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
    width: "90%",
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
