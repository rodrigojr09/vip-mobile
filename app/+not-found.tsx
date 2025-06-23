import { Stack, Link, useRouter, useNavigation } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
	const router = useNavigation();
	return (
		<>
			<Stack.Screen options={{ title: "Oops!" }} />
			<View style={styles.container}>
				<Text>
					The route "{router.getId()}"
					doesn't exist.
				</Text>
				{router.getState()?.history?.join("\n")}
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
