import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

type SelectProps = {
	selected: string;
	onValueChange: (value: string) => void;
	options: { label: string; value: string }[];
	placeholder?: string;
};

export default function Select({
	selected,
	onValueChange,
	options,
	placeholder,
}: SelectProps) {
	return (
		<View style={styles.container}>
			<Picker
				selectedValue={selected || ""}
				onValueChange={onValueChange}
				style={styles.picker}
				mode="dropdown"
			>
				{/* Placeholder */}
				{placeholder && (
					<Picker.Item label={placeholder} value="" color="#999" />
				)}

				{/* Opções */}
				{options.map((opt) => (
					<Picker.Item key={opt.value} label={opt.label} value={opt.value} />
				))}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		overflow: "hidden",
		marginVertical: 5,
	},
	picker: {
		height: 50,
		width: "100%",
	},
});
