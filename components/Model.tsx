import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { useNavigationHistory } from "@/hooks/Navigation";
import Button from "./Button";

export default function Model({
	setOpenModel,
}: {
	setOpenModel: (openModel: boolean) => void;
}) {
	const nav = useNavigationHistory();

	return (
		<View
			style={{
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0,0,0,0.4)",
				position: "absolute",
				zIndex: 9999,
			}}
		>
			<View
				style={{
					padding: 20,
					gap: 20,
					backgroundColor: "#1f1f1f",
					flex: 1,
				}}
			>
				<Pressable
					style={{ alignSelf: "flex-end" }}
					onPress={() => setOpenModel(false)}
				>
					<Ionicons name="close" size={24} color="red" />
				</Pressable>

				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
						color: "#fff",
						textAlign: "center",
					}}
				>
					Finalizar Visita
				</Text>
				{[
					{
						title: "Salvar relatório conjunto",
						onPress: () =>
							nav.push({
								pathname: "/Visita/resumo",
								params: { salvar: "junto" },
							}),
					},
					{
						title: "Salvar relatório por empresa",
						onPress: () =>
							nav.push({
								pathname: "/Visita/resumo",
								params: { salvar: "separado" },
							}),
					},
				].map((item, i) => (
					<Button
						key={`${item.title}-${i}`}
						onPress={item.onPress || (() => {})}
					>
						{item.title || "Item"}
					</Button>
				))}
			</View>
		</View>
	);
}
