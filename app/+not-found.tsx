import {
	Stack,
	Link,
	useRouter,
	useNavigation,
	usePathname,
} from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Equipamentos from "./(tabs)/Levantamento/equipamentos";

export default function NotFoundScreen() {
	const pathname = usePathname();
	if (pathname === "/Levantamento/equipamentos") return <Equipamentos />;
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View style={styles.container}>
				<Text>The route "{pathname}" doesn't exist.</Text>

				<Link href="/" style={styles.link}>
					<Text>Go to home screen!</Text>
				</Link>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
});
