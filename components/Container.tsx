import type { ReactNode } from "react";
import {
	ScrollView,
	type StyleProp,
	StyleSheet,
	View,
	type ViewStyle,
} from "react-native";

interface ContainerProps {
	children: ReactNode | ReactNode[];
	style?: StyleProp<ViewStyle>;
	scroller?: boolean;
	avoidKeyboard?: boolean;
	scrollRef?: React.Ref<ScrollView>; // ⬅️ nova prop
	contentContainerStyle?: StyleProp<ViewStyle>; // ⬅️ novo
}

export default function Container({
	children,
	style,
	scroller,
	scrollRef,
	contentContainerStyle,
}: ContainerProps) {
	return scroller ? (
		<ScrollView
			ref={scrollRef}
			style={[defaultStyles.Container]}
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={[contentContainerStyle, style]} // ⬅️ sem flexGrow:1
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
		width: "100%",
		height: "100%",
		backgroundColor: "#0f172a",
	},
});
