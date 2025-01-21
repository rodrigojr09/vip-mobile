import { StyleSheet, TextInput } from "react-native";

export default function Input({
	placeholder,
	value,
	onChange,textarea
}: {
	placeholder: string;
	value: string;
	textarea?: boolean;
	onChange: (value: string) => void;
}) {
	return (
		<TextInput
			style={styles.input}
			placeholder={placeholder}
			placeholderTextColor="#ccc"
			value={value}
			multiline={textarea ? true : false}
			onChangeText={onChange}
			textAlignVertical="top"
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
