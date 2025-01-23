import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFuncao } from "@/hooks/FuncaoProvider";
import { useSetor } from "@/hooks/SetorProvider";
import { useRouter } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import VIPTabela from "@/components/VIPTabela";
import RiscoForm from "@/components/RiscoForm";
import { useEffect } from "react";

export default function Funcao() {
	const router = useRouter();
	const setor = useSetor();
	const funcao = useFuncao();

	useEffect(() => {
		return () => {
			funcao.clear();
		};
	}, []);
	console.log(funcao.id);
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
			/>
			<Input
				placeholder="Digite a descrição da função"
				value={funcao.description}
				onChange={funcao.setDescription}
			/>
			<Input
				placeholder="Digite os funcionarios da função"
				value={funcao.funcionarios}
				onChange={funcao.setFuncionarios}
			/>
			<Input
				placeholder="Digite o LUX da função"
				value={funcao.lux}
				onChange={funcao.setLux}
			/>
			<VIPTabela
				headers={["Risco", "Fonte", "Tipo"]}
				valores={[
					...funcao.Fisico.riscos.map((a) => {
						return {
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Fisico",
						};
					}),
					...funcao.Quimico.riscos.map((a) => {
						return {
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Quimico",
						};
					}),
					...funcao.Biologico.riscos.map((a) => {
						return {
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Biologico",
						};
					}),
					...funcao.Ergonomico.riscos.map((a) => {
						return {
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Ergonomico",
						};
					}),
					...funcao.Acidente.riscos.map((a) => {
						return {
							Risco: a.risco,
							Fonte: a.fonteGeradora,
							Tipo: "Acidente",
						};
					}),
				]}
				onExcluir={() => {}}
			/>

			<RiscoForm risco="Fisico" />
			<RiscoForm risco="Quimico" />
			<RiscoForm risco="Biologico" />
			<RiscoForm risco="Ergonomico" />
			<RiscoForm risco="Acidente" />

			<Button
				onPress={(e) => {
					handleCreateFuncao();
				}}
			>
				Adicionar
			</Button>
		</Container>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		width: "100%",
		paddingHorizontal: 20,
	},
});
