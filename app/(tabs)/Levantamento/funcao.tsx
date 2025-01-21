import Container from "@/components/Container";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useFuncao } from "@/hooks/FuncaoProvider";
import RadioButton from "@/components/RadioButton";
import { useSetor } from "@/hooks/SetorProvider";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import VIPTabela from "@/components/VIPTabela";

export default function Funcao() {
	const router = useRouter();
	const setor = useSetor();
	const funcao = useFuncao();

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
				headers={["Risco", "Fonte"]}
				valores={[]}
				onExcluir={() => {}}
			/>
			<RadioButton
				placeholder="Fisico "
				value={funcao.Fisico.existe}
				setValue={funcao.Fisico.setExiste}
			/>
			{funcao.Fisico.existe && (
				<Button secundary onPress={() => {}}>
					Adicionar Fisico
				</Button>
			)}
			<RadioButton
				placeholder="Quimico"
				value={funcao.Quimico.existe}
				setValue={funcao.Quimico.setExiste}
			/>
			{funcao.Quimico.existe && (
				<Button secundary onPress={() => {}}>
					Adicionar Quimico
				</Button>
			)}
			<RadioButton
				placeholder="Biologico"
				value={funcao.Biologico.existe}
				setValue={funcao.Biologico.setExiste}
			/>
			{funcao.Biologico.existe && (
				<Button secundary onPress={() => {}}>
					Adicionar Biologico
				</Button>
			)}
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
		padding: 20,
	},
});
