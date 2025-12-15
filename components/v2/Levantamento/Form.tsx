import { useRef } from "react";
import type { TextInput } from "react-native";
import type { Types } from "@/types/Levantamento";
import Input from "./Input";

interface Campo {
	name: string;
	placeholder: string;
}

interface FormProps {
	campos: Campo[];
	onSubmit: () => void;
	type: Types;
}

export function Form({ campos, onSubmit, type }: FormProps) {
	const refs = useRef<TextInput[]>([]);

	const focarProximo = (index: number) => {
		if (index + 1 < campos.length) {
			refs.current[index + 1]?.focus();
		} else onSubmit();
	};

	return campos.map((campo, index) => (
		<Input
			key={campo.name}
			placeholder={campo.placeholder}
			name={campo.name}
			ref={(ref) => {
				if (ref) refs.current[index] = ref;
			}}
			type={type}
			returnKeyType={index === campos.length - 1 ? "done" : "next"}
			onSubmitEditing={() => focarProximo(index)}
		/>
	));
}
