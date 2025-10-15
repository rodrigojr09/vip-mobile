import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RadioButton({
	placeholder,
	value,
	setValue,
}: {
	placeholder: string;
	value?: boolean;
	setValue: (value: boolean) => void;
}) {
	return (
		<View style={styles.container}>
			<Text
				style={{
					...styles.title,
					color: `${value === undefined ? "red" : "white"}`,
				}}
			>
				{" "}
				{placeholder}{" "}
			</Text>
			<View style={styles.optionContainer}>
				<TouchableOpacity
					style={styles.option}
					onPress={() => setValue(true)}
				>
					<View style={styles.radioCircle}>
						{value === true && <View style={styles.radioDot} />}
					</View>
					<Text style={styles.optionText}>Sim</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.option}
					onPress={() => setValue(false)}
				>
					<View style={styles.radioCircle}>
						{value === false && <View style={styles.radioDot} />}
					</View>
					<Text style={styles.optionText}>Não</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 18,
		marginBottom: 20,
	},
	optionContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
	option: {
		flexDirection: "row",
		alignItems: "center",
	},
	radioCircle: {
		height: 24,
		width: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#4CAF50",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 10,
	},
	radioDot: {
		height: 12,
		width: 12,
		borderRadius: 6,
		backgroundColor: "#4CAF50",
	},
	optionText: {
		fontSize: 16,
		color: "#fff"
	},
	result: {
		marginTop: 20,
		fontSize: 16,
		fontWeight: "bold",
	},
});
