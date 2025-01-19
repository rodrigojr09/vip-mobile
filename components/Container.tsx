import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export default function Container({
	children,
	style,
}: {
	children: ReactNode | ReactNode[];
	style: any;
}) {
	return (
		<View style={{ ...defaultStyles.Container, ...style }}>
			{children}
		</View>
	);
}

const defaultStyles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: "#0f172a",
	},
});
