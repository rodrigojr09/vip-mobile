import {
	GestureResponderEvent,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";

export default function Button({
	onPress,
	children,
	disabled = false,
	secundary,
}: {
	onPress: (e: GestureResponderEvent) => void;
	children: string;
	secundary?: boolean;
	disabled?: boolean;
}) {
	return (
		<TouchableOpacity
			style={{
				...styles.button,
                backgroundColor: secundary ? "#0069ad" : "green",
                ...(disabled ? styles.buttonDisabled : {}),
			}}
			disabled={disabled}
			onPress={onPress}
		>
			<Text
				style={{
					...styles.buttonText,
					color: secundary ? "black" : "white",
				}}
			>
				{children}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 18,
		marginVertical: 10,
		borderRadius: 10,
		width: "100%",
	},
	buttonText: {
		fontSize: 18,
		textAlign: "center",
    },
    buttonDisabled: {
        opacity: 0.5,
    }
});
