import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useVisita } from "@/hooks/VisitaTecnica/VisitaProvider";
import Button from "../Button";

export default function Sidebar({
	toggleSidebar,
	finalizar,
}: {
	toggleSidebar: () => void;
	finalizar: () => void;
}) {
	const { setores, removerSetor } = useVisita();
	const nav = useNavigationHistory();

	return (
		<View style={[styles.sidebar]}>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text style={styles.sidebarTitulo}>Setores Registrados</Text>
				<Pressable onPress={toggleSidebar}>
					<Text style={styles.fecharTexto}>✕ Fechar</Text>
				</Pressable>
			</View>
			<View style={styles.menuItens}>
				{setores.map((t) => (
					<View style={styles.item} key={t.id}>
						<Pressable
							onPress={() => {
								toggleSidebar();
								nav.push({
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

				<Button
					onPress={() => {
						toggleSidebar();
						nav.push("/Visita/Perguntas/Setor");
					}}
				>
					Novo Setor
				</Button>
				<Button
					onPress={() => {
						if (setores.length === 0)
							return alert(
								"Adicione pelo menos um setor antes de finalizar a visita.",
							);
						toggleSidebar();
						finalizar();
					}}
				>
					Ir para Perguntas Administrativas
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	sidebar: {
		position: "fixed",
		top: 0,
		bottom: 0,
		left: 0,
		width: "100%",
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
	/* Sera um grid de 3 colunas no expo */
	menuItens: {
		gap: 10,
		gridTemplateColumns: "repeat(3, 1fr)",
		//display: "grid",
		flexWrap: "wrap",
		flexDirection: "row",
	},
	item: {
		color: "#ccc",
		fontSize: 18,
		marginBottom: 10,
		width: "20%",
		backgroundColor: "#222",
		padding: 10,
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
