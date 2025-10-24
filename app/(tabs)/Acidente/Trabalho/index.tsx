import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Cat1 from "@/components/Acidente/Cat1";
import Cat2 from "@/components/Acidente/Cat2";
import Cat3 from "@/components/Acidente/Cat3";
import Cat4 from "@/components/Acidente/Cat4";
import Cat5 from "@/components/Acidente/Cat5";
import Cat6 from "@/components/Acidente/Cat6";
import Cat7 from "@/components/Acidente/Cat7";
import Cat8 from "@/components/Acidente/Cat8";
import Cat9 from "@/components/Acidente/Cat9";
import Container from "@/components/Container";
import type Acidente from "@/types/Acidente";

export default function Trabalho() {
	const [cat, setCat] = useState<Acidente>({
		cat1: {},
		cat2: {},
		cat3: {},
		cat4: {},
		cat5: {},
		cat6: {},
		cat7: {},
		cat8: {},
		cat9: {},
	});
	const [openSection, setOpenSection] = useState<number | null>(1);

	function handleChange(tag: string, value: any) {
		setCat((prev) => {
			const keys = tag.split(".");
			const newCat = structuredClone(prev);
			let obj: any = newCat;
			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i];
				obj[key] ??= {};
				obj = obj[key];
			}
			obj[keys.at(-1)!] = value;
			return newCat;
		});
	}

	const steps = [
		{
			id: 1,
			titulo: "Informações da Empresa",
			component: <Cat1 cat={cat.cat1} handleChange={handleChange} />,
		},
		{
			id: 2,
			titulo: "Dados Pessoais",
			component: <Cat2 cat={cat.cat2} handleChange={handleChange} />,
		},
		{
			id: 3,
			titulo: "Dados do Atestado",
			component: <Cat3 cat={cat.cat3} handleChange={handleChange} />,
		},
		{
			id: 4,
			titulo: "Dados do Acidente",
			component: <Cat4 cat={cat.cat4} handleChange={handleChange} />,
		},
		{
			id: 5,
			titulo: "Descrição do Acidente",
			component: <Cat5 cat={cat.cat5} handleChange={handleChange} />,
		},
		{
			id: 6,
			titulo: "Fatores de Risco",
			component: <Cat6 cat={cat.cat6} handleChange={handleChange} />,
		},
		{
			id: 7,
			titulo: "Responsavel pela Empresa",
			component: <Cat7 cat={cat.cat7} handleChange={handleChange} />,
		},
		{
			id: 8,
			titulo: "Testemunhas",
			component: <Cat8 cat={cat.cat8} handleChange={handleChange} />,
		},
		{
			id: 9,
			titulo: "Imagens",
			component: <Cat9 cat={cat.cat9} handleChange={handleChange} />,
		},
	];

	return (
		<Container scroller style={{ padding: 20 }}>
			{steps.map((step) => (
				<View key={step.id} style={styles.section}>
					<TouchableOpacity
						style={[
							styles.header,
							openSection === step.id && styles.headerActive,
						]}
						onPress={() =>
							setOpenSection(openSection === step.id ? null : step.id)
						}
					>
						<Text style={styles.headerText}>{step.titulo}</Text>
						<Text style={styles.arrow}>
							{openSection === step.id ? "▲" : "▼"}
						</Text>
					</TouchableOpacity>

					{openSection === step.id && (
						<View style={styles.content}>{step.component}</View>
					)}
				</View>
			))}
		</Container>
	);
}

const styles = StyleSheet.create({
	section: {
		marginBottom: 14,
		backgroundColor: "rgba(255,255,255,0.05)",
		borderRadius: 12,
		overflow: "hidden",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 16,
		backgroundColor: "rgba(255,255,255,0.1)",
	},
	headerActive: {
		backgroundColor: "rgba(255,255,255,0.2)",
	},
	headerText: {
		fontSize: 18,
		fontWeight: "600",
		color: "#fff",
	},
	arrow: {
		color: "#fff",
		fontSize: 18,
	},
	content: {
		padding: 16,
	},
});
