import { Text, View } from "react-native";

export default function Loading() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text style={{ color: "white" }}>
				Estamos carregando, por favor aguarde...
			</Text>
		</View>
	);
}
