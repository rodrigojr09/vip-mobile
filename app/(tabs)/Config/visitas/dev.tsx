import Container from "@/components/Container";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Page() {
	const [dados, setDados] = useState<{ key: string; value: any }[]>([]);
	const [id, setId] = useState("");

	async function storage() {
		const keys = await AsyncStorage.getAllKeys();
		const values = await AsyncStorage.multiGet(keys);

		const data = values
			.filter(
				(v) =>
					v[0] !== "@vip:empresas" &&
					v[0] !== "@vip:perguntas" &&
					v[0] !== "@vip:levantamentos" &&
					v[0] !== "@vip:eventos",
			)
			.map(([key, value]) => ({
				key,
				value: value ? JSON.parse(value) : null,
			}));

		return data;
	}

	useEffect(() => {
		storage().then((res) => setDados(res));
	}, []);
	return (
		<Container style={{ padding: 16 }} scroller>
			<View style={{ gap: 16 }}>
				{dados.map((d) => (
					<View key={d.key} style={{ gap: 8 }}>
						<Text style={{ fontWeight: "bold", color: "#c9d1d9" }}>
							{d.key}
						</Text>
						<Text style={{ color: "#c9d1d9" }}>
							{(d.value as any[]).map((v) => {
								if (v.id === id) return JSON.stringify({...v,empresas:null,perguntas:null}, null, 2);
								return (
									<Pressable key={v.id} onPress={() => setId(v.id)}>
										<Text style={{ color: "blue" }}>{v.id}</Text>
									</Pressable>
								);
							})}
						</Text>
					</View>
				))}
			</View>
		</Container>
	);
}
