import { ReactNode } from "react";
import {
	StyleSheet,
	View,
	ScrollView,
	ViewStyle,
	StyleProp,
} from "react-native";

interface ContainerProps {
	children: ReactNode | ReactNode[];
	style?: StyleProp<ViewStyle>;
	scroller?: boolean;
}

export default function Container({
	children,
	style,
	scroller,
}: ContainerProps) {
	return scroller ? (
        <ScrollView
            nestedScrollEnabled
			style={[defaultStyles.Container]}
			contentContainerStyle={[{ flexGrow: 1 }, style]}
		>
			{children}
		</ScrollView>
	) : (
		<View style={[defaultStyles.Container, style]}>{children}</View>
	);
}

const defaultStyles = StyleSheet.create({
	Container: {
        flex: 1,
		backgroundColor: "#0f172a",
	},
});
