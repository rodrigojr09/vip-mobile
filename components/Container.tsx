import { ReactNode } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

export default function Container({
	children,
	style,
	scroller,
}: {
	children: ReactNode | ReactNode[];
	style: any;
	scroller?: boolean;
}) {
	return (
		<>
			{!scroller && (
				<View style={{ ...defaultStyles.Container, ...style }}>
					{children}
				</View>
			)}
			{scroller && (
				<ScrollView style={{ ...defaultStyles.Container, ...style }}>
					{children}
				</ScrollView>
			)}
		</>
	);
}

const defaultStyles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: "#0f172a",
	},
});
