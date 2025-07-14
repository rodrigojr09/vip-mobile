import { router } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import Button from "../Button";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";

export default function Sidebar({
	toggleSidebar,
}: {
	toggleSidebar: () => void;
}) {
	const { setores, removerSetor } = useVisita();

	return (
		<View style={[styles.sidebar]}>
			<Text style={styles.sidebarTitulo}>Setores Registrados</Text>
			<Pressable onPress={toggleSidebar}>
				<Text style={styles.fecharTexto}>✕ Fechar</Text>
			</Pressable>
			<View style={styles.menuItens}>
				<View
					style={{
						marginBottom: 12,
						padding: 12,
						borderRadius: 12,
						backgroundColor: "#2a2a2a",
					}}
				>
					<Pressable
						onPress={() => {
							router.push({
								pathname: "/Visita/Perguntas/Administrativo",
							});
						}}
					>
						<Text
							style={[
								{
									color: "lime",
									textAlign: "center",
									width: "100%",
								},
							]}
						>
							Perguntas Administrativas
						</Text>
					</Pressable>
				</View>
				{setores.map((t) => (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginBottom: 12,
							padding: 12,
							borderRadius: 12,
							alignItems: "center",
							backgroundColor: "#2a2a2a",
						}}
						key={t.id}
					>
						<Pressable
							onPress={() => {
								router.push({
									pathname: "/Visita/Perguntas/Setor",
									params: { id: t.id },
								});
							}}
						>
							<Text style={[{ color: "lime" }]}>{t.nome}</Text>
						</Pressable>
						<Pressable onPress={() => removerSetor(t.id as string)}>
							<Text style={[{ color: "red" }]}>Remover</Text>
						</Pressable>
					</View>
				))}

				<Button onPress={() => router.push("/Visita/Perguntas/Setor")}>
					Novo Setor
				</Button>
				<Button
					onPress={() => {
						if (setores.length === 0)
							return alert(
								"Adicione pelo menos um setor antes de finalizar a visita."
							);
						router.push("/Visita/resumo");
					}}
				>
					Finalizar
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	sidebar: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		width: "75%",
		backgroundColor: "#111",
		padding: 20,
		zIndex: 20,
	},
	sidebarTitulo: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 20,
	},
	fecharTexto: {
		color: "#f55",
		fontSize: 16,
		marginBottom: 20,
	},
	menuItens: {
		gap: 10,
	},
	item: {
		color: "#ccc",
		fontSize: 18,
		marginBottom: 10,
	},
});
