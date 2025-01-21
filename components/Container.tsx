import { ReactNode } from "react";
import { StyleSheet, View, ScrollView, ViewStyle } from "react-native";

interface ContainerProps {
	children: ReactNode | ReactNode[];
	style?: ViewStyle; // Tipagem correta para o estilo
	scroller?: boolean; // Indica se deve usar ScrollView
}

export default function Container({
	children,
	style,
	scroller,
}: ContainerProps) {
	return scroller ? (
		<ScrollView style={[defaultStyles.Container, style]}>
			{children}
		</ScrollView>
	) : (
		<View style={[defaultStyles.Container, style]}>{children}</View>
	);
}

const defaultStyles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: "#0f172a", // Cor de fundo padrão
	},
});
