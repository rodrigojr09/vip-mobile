import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFuncao } from "@/hooks/FuncaoProvider";
import RadioButton from "@/components/RadioButton";
import { useSetor } from "@/hooks/SetorProvider";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Setor() {
	const router = useRouter();
	const setor = useSetor();
	const funcao = useFuncao();

	return (
		<Container style={styles.formContainer}>
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
			<RadioButton
				placeholder="Fisico "
				value={funcao.Fisico.existe}
				setValue={funcao.Fisico.setExiste}
			/>
			<RadioButton
				placeholder="Quimico"
				value={funcao.Quimico.existe}
				setValue={funcao.Quimico.setExiste}
			/>
			<RadioButton
				placeholder="Biologico"
				value={funcao.Biologico.existe}
				setValue={funcao.Biologico.setExiste}
			/>
			<RadioButton
				placeholder="Ergonomico"
				value={funcao.Ergonomico.existe}
				setValue={funcao.Ergonomico.setExiste}
			/>
			<RadioButton
				placeholder="Acidente"
				value={funcao.Acidente.existe}
				setValue={funcao.Acidente.setExiste}
			/>

			<Button
				onPress={(e) => {
					setor.setFuncoes([...setor.funcoes, funcao]);
					funcao.clear();
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
		alignItems: "center",
		padding: 20,
	},
});
