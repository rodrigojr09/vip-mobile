import Button from "@/components/Button";
import Container from "@/components/Container";
import { useVisita } from "@/hooks/VisitaProvider";
import { Empresa, Question, Resposta } from "@/types/VIPVisitaType";
import { getEmpresas } from "@/utils/API/Empresas";
import { useRouter } from "expo-router";
import React, { useState, useEffect, JSX } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TextInput,
    Alert,
    FlatList,
} from "react-native";

const ObservacaoCampo = ({
    label,
    status,
    initialValue,
    onChange,
}: {
    label: string;
    status: Resposta["value"];
    initialValue?: string;
    onChange: (label: string, status: Resposta["value"], obs: string) => void;
}) => {
    const [text, setText] = useState(initialValue || "");

    useEffect(() => {
        setText(initialValue || "");
    }, [initialValue]);

    return (
        <TextInput
            style={styles.observationInput}
            placeholder="Observações (opcional)"
            placeholderTextColor="#aaa"
            multiline
            value={text}
            onChangeText={(value) => {
                setText(value);
                onChange(label, status, value);
            }}
        />
    );
};

export default function Visita() {
    const {
        empresa,
        acompanhante,
        visitante,
        perguntas,
        respostas,
        setRespostas,
        setAcompanhante,
        setVisitante,
        setEmpresa,
        empresas,
        clear,
        data,
        setPerguntas,
    } = useVisita();
    const router = useRouter();
    const [search, setSearch] = useState("");

    function setStatus(pergunta: string, status: Resposta["value"]) {
        setRespostas((prev) =>
            prev
                .map((r) =>
                    r.pergunta === pergunta
                        ? { ...r, value: r.value === status ? null : status }
                        : r
                )
                .concat(
                    prev.some((r) => r.pergunta === pergunta)
                        ? []
                        : [{ pergunta, value: status }]
                )
        );
    }

    function setObs(pergunta: string, status: Resposta["value"], obs: string) {
        setRespostas((prev) => {
            const existing = prev.find((r) => r.pergunta === pergunta);
            if (existing) {
                return prev.map((r) =>
                    r.pergunta === pergunta ? { ...r, observation: obs } : r
                );
            }
            return [
                ...prev,
                { pergunta, value: status || null, observation: obs },
            ];
        });
    }

    const renderQuestion = ({ label, subquest }: Question): JSX.Element => {
        const status = respostas.find((r) => r.pergunta === label)?.value;

        return (
            <View key={label} style={styles.questionBlock}>
                <Text style={styles.questionText}>{label}</Text>

                <View style={styles.buttonGroup}>
                    {["Sim", "Não", "NA"].map((key) => {
                        const isSelected = status === key;
                        return (
                            <TouchableOpacity
                                key={label + key}
                                style={[
                                    styles.choiceButton,
                                    isSelected &&
                                        (status === "Sim"
                                            ? styles.choiceButtonSelectedGreen
                                            : status === "Não"
                                            ? styles.choiceButtonSelectedRed
                                            : styles.choiceButtonSelectedGray),
                                ]}
                                onPress={() =>
                                    setStatus(label, key as Resposta["value"])
                                }
                            >
                                <Text style={styles.choiceLabel}>{key}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {subquest &&
                    status &&
                    status !== "NA" &&
                    subquest[status === "Sim" ? "true" : "false"] &&
                    renderQuestion(
                        subquest[status === "Sim" ? "true" : "false"]
                    )}

                {status && (status === "NA" || !subquest) && (
                    <ObservacaoCampo
                        label={label}
                        status={status}
                        initialValue={
                            respostas.find((r) => r.pergunta === label)
                                ?.observation
                        }
                        onChange={setObs}
                    />
                )}
            </View>
        );
    };

    function handleSave() {
        if (empresa === null)
            return Alert.alert(
                "Atenção! O nome da empresa precisa ser preenchido"
            );
        if (visitante.trim().length === 0)
            return Alert.alert(
                "Atenção! O nome do técnico precisa ser preenchido"
            );
        if (acompanhante.trim().length === 0)
            return Alert.alert(
                "Atenção! O nome do cliente responsável precisa ser preenchido"
            );
        if (
            perguntas.filter(
                (a) =>
                    !respostas.find((r) => r.pergunta === a.label) ||
                    respostas.find((r) => r.pergunta === a.label)?.value ===
                        null
            ).length > 0
        )
            return Alert.alert("Atenção! Preencha todas as perguntas.");
        router.push({ pathname: "/Visita/resumo" });
    }

    function filter(empresa: Empresa) {
        return (
            empresa.nome_fantasia
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            empresa.razao_social.toLowerCase().includes(search.toLowerCase()) ||
            empresa.cnpj.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <Container style={styles.formContainer} scroller>
            <View style={styles.headerTable}>
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome da empresa"
                        placeholderTextColor="#aaa"
                        value={search}
                        onChangeText={(e) => setSearch(e)}
                    />
                </View>
                {empresas.filter(filter).length > 0 && (
                    <FlatList
                        style={styles.suggestionsList}
                        data={empresas.filter(filter)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.suggestionItem}
                                //onPress={() => handleSelect(item.id)}
                            >
                                <Text style={styles.suggestionText}>
                                    {item.razao_social}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do Técnico"
                        placeholderTextColor="#aaa"
                        value={visitante}
                        onChangeText={setVisitante}
                    />
                </View>
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        placeholder="Responsável (Cliente)"
                        placeholderTextColor="#aaa"
                        value={acompanhante}
                        onChangeText={setAcompanhante}
                    />
                </View>
            </View>

            {perguntas.map((p) => renderQuestion(p))}

            <Button onPress={handleSave}>Salvar</Button>
        </Container>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
        paddingHorizontal: 20,
    },
    container: {
        padding: 16,
        backgroundColor: "#121212",
    },
    headerTable: {
        marginBottom: 32,
        padding: 20,
        borderRadius: 16,
        backgroundColor: "#1f1f1f",
        elevation: 3,
    },
    row: {
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        marginBottom: 12,
    },
    input: {
        flex: 1,
        backgroundColor: "#2a2a2a",
        color: "#fff",
        padding: 10,
        width: "100%",
        borderRadius: 8,
        fontSize: 16,
    },
    questionBlock: {
        marginBottom: 32,
        padding: 20,
        borderRadius: 16,
        backgroundColor: "#1f1f1f",
        elevation: 3,
    },
    questionText: {
        fontSize: 20,
        color: "#ffffff",
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    choiceButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2e2e2e",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        elevation: 2,
    },
    choiceButtonSelectedGreen: {
        backgroundColor: "#4caf50",
    },
    choiceButtonSelectedRed: {
        backgroundColor: "#f44336",
    },
    choiceButtonSelectedGray: {
        backgroundColor: "#9e9e9e",
    },
    choiceLabel: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    observationInput: {
        marginTop: 16,
        backgroundColor: "#2a2a2a",
        color: "#fff",
        padding: 12,
        borderRadius: 12,
        fontSize: 16,
        minHeight: 60,
        textAlignVertical: "top",
    },
    resultItem: {
        padding: 10,
        backgroundColor: "#f0f0f0",
        marginBottom: 8,
        borderRadius: 6,
    },
    noResults: {
        marginTop: 10,
        color: "#888",
        fontStyle: "italic",
    },
    suggestionsList: {
        marginTop: 5,
        maxHeight: 200, // Limita o tamanho da lista
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 1,
    },
    suggestionItem: {
        padding: 15,
        marginVertical: 2,
        borderRadius: 10,
        borderColor: "white",
        borderWidth: 1,
    },
    suggestionText: {
        fontSize: 16,
        color: "white",
    },
});
