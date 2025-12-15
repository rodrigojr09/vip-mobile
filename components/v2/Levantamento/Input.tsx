import { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import {
	FuncTypes,
	useLevantamento,
} from "@/hooks/v2/Levantamentos/Levantamento";
import type {
	EmpresaType,
	FuncaoType,
	SetorType,
	Types,
} from "@/types/Levantamento";

interface InputProps {
	placeholder: string;
	name: any;
	textarea?: boolean;
	returnKeyType?: string;
	onSubmitEditing: () => void;
	type: Types;
}

const Input = forwardRef<TextInput, InputProps>(
	({ placeholder, name, textarea, type }, ref) => {
		const levantamento = useLevantamento();
		const value =
			type === "EMPRESA"
				? (levantamento.empresa[name as keyof EmpresaType] as string)
				: type === "SETOR"
					? (levantamento.setor?.[name as keyof SetorType] as string)
					: (levantamento.funcao?.[name as keyof FuncaoType] as string);
		const onChange = (text: string) => {
			levantamento[FuncTypes[type]](name, text);
		};

		return (
			<TextInput
				ref={ref}
				style={[styles.input]}
				placeholder={placeholder}
				placeholderTextColor="#ccc"
				value={value as string}
				multiline={textarea}
				numberOfLines={textarea ? undefined : 1}
				onChangeText={onChange}
				textAlignVertical="top"
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
