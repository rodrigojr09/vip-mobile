import { forwardRef } from "react";
import {
	type StyleProp,
	StyleSheet,
	TextInput,
	type TextInputProps,
	type TextStyle,
} from "react-native";

interface InputProps {
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
	textarea?: boolean;
	lines?: number;
	style?: StyleProp<TextStyle>;
	editable?: boolean;
	keyboardType?: TextInputProps["keyboardType"];
	returnKeyType?: TextInputProps["returnKeyType"];
	onSubmitEditing?: () => void;
}

const Input = forwardRef<TextInput, InputProps>(
	(
		{
			placeholder,
			keyboardType,
			value,
			onChange,
			textarea,
			editable,
			style,
			returnKeyType,
			lines,
			onSubmitEditing,
		},
		ref,
	) => {
		return (
			<TextInput
				ref={ref}
				style={[styles.input, style]}
				placeholder={placeholder}
				placeholderTextColor="#ccc"
				value={value}
				multiline={textarea}
				numberOfLines={textarea ? undefined : lines}
				onChangeText={onChange}
				textAlignVertical="top"
				keyboardType={keyboardType || "default"}
				editable={editable !== false}
				returnKeyType={returnKeyType}
				onSubmitEditing={onSubmitEditing}
				blurOnSubmit={false} // Importante: não fechar o teclado ao apertar Next
			/>
		);
	},
);

const styles = StyleSheet.create({
	input: {
		borderWidth: 1,
		borderColor: "green",
		borderRadius: 5,
		padding: 15,
		marginVertical: 10,
		width: "100%",
		color: "#FFF",
	},
});

export default Input;
