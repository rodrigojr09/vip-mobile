import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFuncao } from "@/hooks/FuncaoProvider";
import RadioButton from "@/components/RadioButton";
import { useSetor } from "@/hooks/SetorProvider";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
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
					setor.setFuncoes([...setor.funcoes, funcao]);
					router.back();
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
