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
		padding: 18,
		alignItems: "center",
		width: "100%",
	},
	headerText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
});
