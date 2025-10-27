import { StyleSheet } from "react-native";
import Button from "@/components/Button";
import Container from "@/components/Container";
import { useNavigationHistory } from "@/hooks/Navigation";

export default function Config() {
    const nav = useNavigationHistory();

    return (
        <Container style={styles.container}>
            <Button onPress={() => nav.push("/Config/levantamentos")}>
                Levantamentos
            </Button>

            <Button onPress={() => nav.push("/Config/visitas")}>Visitas Técnicas</Button>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
    },
});
