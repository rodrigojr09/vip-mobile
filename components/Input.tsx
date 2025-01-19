import { StyleSheet, TextInput } from "react-native";

export default function Input({
	placeholder,
	value,
	onChange,
}: {
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
}) {
	return (
		<TextInput
			style={styles.input}
			placeholder={placeholder}
			placeholderTextColor="#ccc"
			value={value}
			onChangeText={onChange}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "green",
		borderRadius: 5,
		padding: 15,
		marginVertical: 10,
		fontSize: 18,
		width: "100%",
		color: "#FFF",
	},
});
