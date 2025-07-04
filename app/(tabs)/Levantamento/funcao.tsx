import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFuncao } from "@/hooks/Levantamento/FuncaoProvider";
import { useSetor } from "@/hooks/Levantamento/SetorProvider";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, StyleSheet, TextInput } from "react-native";
import VIPTabela from "@/components/VIPTabela";
import RiscoForm from "@/components/RiscoForm";
import { useEffect, useRef } from "react";

export default function Funcao() {
	const router = useRouter();
	const setor = useSetor();
	const funcao = useFuncao();
	const params = useLocalSearchParams();

	const campos = 4;
	const refs = useRef<TextInput[]>([]);
	const focarProximo = (index: number) => {
		if (index + 1 < campos) {
			refs.current[index + 1]?.focus();
		} else {
			refs.current[index].blur();
		}
	};

	useEffect(() => {
		if (params.funcao) {
			const hasFuncao = setor.funcoes.find(
				(a) => a.id === (params.funcao as string)
			);
			if (hasFuncao) funcao.load(hasFuncao);
		}
		return () => {
			funcao.clear();
		};
	}, []);
	const handleCreateFuncao = () => {
		if (!funcao.nome.trim()) return Alert.alert("Digite o nome da função");
		if (!funcao.description.trim())
			return Alert.alert("Digite a descrição da função");
		if (!funcao.funcionarios.trim())
			return Alert.alert("Digite o nome dos funcionarios da função");
		if (!funcao.lux.trim()) return Alert.alert("Digite o LUX da função");
		if (funcao.Acidente.existe === undefined)
			return Alert.alert("Digite se existe risco de Acidente na função");
		if (funcao.Ergonomico.existe === undefined)
			return Alert.alert(
				"Digite se existe risco de Ergonomico na função"
			);
		if (funcao.Biologico.existe === undefined)
			return Alert.alert("Digite se existe risco de Biologico na função");
		if (funcao.Quimico.existe === undefined)
			return Alert.alert("Digite se existe risco de Quimico na função");
		if (funcao.Fisico.existe === undefined)
			return Alert.alert("Digite se existe risco de Fisico na função");
		//Se tudo tiver ok
		setor.setFuncoes([...setor.funcoes, funcao]);
		router.back();
	};

	return (
		<Container style={styles.formContainer} scroller>
			<Input
				placeholder="Digite o nome da função"
				value={funcao.nome}
				onChange={funcao.setNome}
				ref={(ref) => {
					if (ref) refs.current[0] = ref;
				}}
				returnKeyType={0 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(0)}
			/>
			<Input
				placeholder="Digite a descrição da função"
				value={funcao.description}
				onChange={funcao.setDescription}
				ref={(ref) => {
					if (ref) refs.current[1] = ref;
				}}
				returnKeyType={1 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(1)}
			/>
			<Input
				placeholder="Digite os funcionarios da função"
				value={funcao.funcionarios}
				onChange={funcao.setFuncionarios}
				ref={(ref) => {
					if (ref) refs.current[2] = ref;
				}}
				returnKeyType={2 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(2)}
			/>
			<Input
				placeholder="Digite o LUX da função"
				value={funcao.lux}
				onChange={funcao.setLux}
				ref={(ref) => {
					if (ref) refs.current[3] = ref;
				}}
				returnKeyType={3 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(3)}
			/>
			<VIPTabela
				headers={["Risco", "Fonte", "Tipo"]}
				valores={[
					...funcao.Fisico.riscos.map((a) => {
						return {
							id: a.id,
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Fisico",
						};
					}),
					...funcao.Quimico.riscos.map((a) => {
						return {
							id: a.id,
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Quimico",
						};
					}),
					...funcao.Biologico.riscos.map((a) => {
						return {
							id: a.id,
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Biologico",
						};
					}),
					...funcao.Ergonomico.riscos.map((a) => {
						return {
							id: a.id,
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Ergonomico",
						};
					}),
					...funcao.Acidente.riscos.map((a) => {
						return {
							id: a.id,
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Acidente",
						};
					}),
				]}
				onExcluir={(item: {
					Risco: string;
					Fonte: string;
					Tipo:
						| "Acidente"
						| "Ergonomico"
						| "Biologico"
						| "Quimico"
						| "Fisico";
					id: string;
				}) => {
					const riscos = funcao[item.Tipo].riscos;
					funcao[item.Tipo].setRiscos(
						riscos.filter((a) => a.id !== item.id)
					);
				}}
				goTo={(item) => {
					router.push({
						pathname: "/Levantamento/risco",
						params: {
							risco: item.Tipo,
							id: item.id,
						},
					});
				}}
			/>

			<RiscoForm risco="Fisico" />
			<RiscoForm risco="Quimico" />
			<RiscoForm risco="Biologico" />
			<RiscoForm risco="Ergonomico" />
			<RiscoForm risco="Acidente" />

			{!params.funcao && (
				<Button
					onPress={(e) => {
						handleCreateFuncao();
					}}
				>
					Adicionar
				</Button>
			)}
			{params.funcao && (
				<Button
					onPress={(e) => {
						if (!funcao.nome.trim())
							return Alert.alert("Digite o nome da função");
						if (!funcao.description.trim())
							return Alert.alert("Digite a descrição da função");
						if (!funcao.funcionarios.trim())
							return Alert.alert(
								"Digite o nome dos funcionarios da função"
							);
						if (!funcao.lux.trim())
							return Alert.alert("Digite o LUX da função");
						if (funcao.Acidente.existe === undefined)
							return Alert.alert(
								"Digite se existe risco de Acidente na função"
							);
						if (funcao.Ergonomico.existe === undefined)
							return Alert.alert(
								"Digite se existe risco de Ergonomico na função"
							);
						if (funcao.Biologico.existe === undefined)
							return Alert.alert(
								"Digite se existe risco de Biologico na função"
							);
						if (funcao.Quimico.existe === undefined)
							return Alert.alert(
								"Digite se existe risco de Quimico na função"
							);
						if (funcao.Fisico.existe === undefined)
							return Alert.alert(
								"Digite se existe risco de Fisico na função"
							);
						//Se tudo tiver ok
						setor.setFuncoes(
							setor.funcoes.map((a) => {
								if (a.id !== params.funcao) return a;
								return funcao;
							})
						);
						router.back();
					}}
				>
					Atualizar
				</Button>
			)}
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
});
