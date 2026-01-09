import {
	type GestureResponderEvent,
	Text,
	TouchableOpacity,
} from "react-native";

export default function Button({
	onPress,
	children,
	styles,
	disabled = false,
	secundary,
}: {
	styles?: any;
	onPress: (e: GestureResponderEvent) => void;
	children: string;
	secundary?: boolean;
	disabled?: boolean;
}) {
	return (
		<TouchableOpacity
			style={[
				{
					padding: styles?.padding || 18,
					marginVertical: styles?.marginVertical || 10,
					borderRadius: styles?.borderRadius || 10,
					width: styles?.width || "100%",
					backgroundColor: secundary ? "#0069ad" : "green",
					opacity: disabled ? 0.5 : 1,
                    ...styles,
				},
			]}
			disabled={disabled}
			onPress={onPress}
		>
			<Text
				style={[
					{
						fontSize: 18,
						textAlign: "center",
						color: "white",
					},
				]}
			>
				{children}
			</Text>
		</TouchableOpacity>
	);
}
