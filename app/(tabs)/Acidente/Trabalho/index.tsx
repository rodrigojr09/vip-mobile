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
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useAcidente } from "@/hooks/Acidente/AcidenteProvider";
import { useNavigationHistory } from "@/hooks/Navigation";

export default function Trabalho() {
	const nav = useNavigationHistory();
	const { acidente, setAcidente } = useAcidente();
	const [openSection, setOpenSection] = useState<number | null>(1);

	function handleChange(tag: string, value: any) {
		setAcidente((prev) => {
			const keys = tag.split(".");
			const newCat = structuredClone(prev);
			let obj: any = newCat;
			for (let i = 0; i < keys.length - 1; i++) {
				const key = keys[i];
				obj[key] ??= {};
				obj = obj[key];
			}
			const lastKey = keys[keys.length - 1];
			if (lastKey === undefined) return newCat;
			obj[lastKey] = value;
			return newCat;
		});
	}

	const steps = [
		{
			id: 1,
			titulo: "Informações da Empresa",
			component: <Cat1 cat={acidente.cat1} handleChange={handleChange} />,
		},
		{
			id: 2,
			titulo: "Dados Pessoais",
			component: <Cat2 cat={acidente.cat2} handleChange={handleChange} />,
		},
		{
			id: 3,
			titulo: "Dados do Atestado",
			component: <Cat3 cat={acidente.cat3} handleChange={handleChange} />,
		},
		{
			id: 4,
			titulo: "Dados do Acidente",
			component: <Cat4 cat={acidente.cat4} handleChange={handleChange} />,
		},
		{
			id: 5,
			titulo: "Descrição do Acidente",
			component: <Cat5 cat={acidente.cat5} handleChange={handleChange} />,
		},
		{
			id: 6,
			titulo: "Fatores de Risco",
			component: <Cat6 cat={acidente.cat6} handleChange={handleChange} />,
		},
		{
			id: 7,
			titulo: "Responsavel pela Empresa",
			component: (
				<Cat7
					cat={acidente.cat7}
					handleChange={handleChange}
					relato={acidente.cat5?.descricaoAcidente || "Não houve relato"}
				/>
			),
		},
		{
			id: 8,
			titulo: "Testemunhas",
			component: (
				<Cat8
					cat={acidente.cat8}
					handleChange={handleChange}
					relato={acidente.cat5?.descricaoAcidente || "Não houve relato"}
				/>
			),
		},
		{
			id: 9,
			titulo: "Imagens",
			component: <Cat9 cat={acidente.cat9} handleChange={handleChange} />,
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
			<Button
				onPress={() => {
					nav.push("/Acidente/Trabalho/assinaturas");
				}}
			>
				Coletar Assinaturas
			</Button>
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
