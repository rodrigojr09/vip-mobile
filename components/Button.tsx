import {
	GestureResponderEvent,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";

export default function Button({
	onPress,
	children,
}: {
	onPress: (e: GestureResponderEvent) => void;
	children: string;
}) {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.buttonText}>{children}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "green",
		padding: 18,
		marginVertical: 10,
		borderRadius: 10,
		width: "100%",
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		textAlign: "center",
	},
});
