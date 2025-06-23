import { fetchQuests, getQuests } from "@/utils/API/Quests";
import { Stack, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Layout() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchQuests().then(async () => {
            setLoading(false);
        });
	}, []);
	return (
		<View style={styles.container}>
			{/* Header */}
			{!pathname.endsWith("assinatura") && (
				<View style={styles.header}>
					<Text style={styles.headerText}>Vip Mobile</Text>
				</View>
			)}

			{/* Conteúdo da aplicação */}
			{!loading ? (
				<View style={styles.content}>
					<Stack
						screenOptions={{
							headerShown: false,
						}}
					/>
				</View>
			) : (
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
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 30,
		color: "white",
		backgroundColor: "#0f172a", // Cor slate-900
	},
	header: {
		backgroundColor: "green",
		padding: 18,
		alignItems: "center",
		width: "100%",
	},
	headerText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	content: {
		flex: 1,
		backgroundColor: "#0f172a", // Mesma cor de fundo para consistência
	},
});
