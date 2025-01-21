import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import VIPTabela from "@/components/VIPTabela";
import RadioButton from "@/components/RadioButton";
import { useSetor } from "@/hooks/SetorProvider";
import { useEmpresa } from "@/hooks/EmpresaProvider";
import { useRouter } from "expo-router";
import { Alert, StyleSheet } from "react-native";
import { useEffect } from "react";

export default function Setor() {
	const router = useRouter();

	const empresa = useEmpresa();
	const setor = useSetor();

	useEffect(() => {
		return () => {
			setor.clear();
		};
	}, []);

	const handleCreateSetor = () => {
		// Validações individuais para os campos
		if (!setor.nome.trim() || setor.nome.length > 4)
			return Alert.alert("Erro", "Nome do setor inválido!");
		if (!setor.largura.trim())
			return Alert.alert("Erro", "Largura do setor inválida!");
		if (!setor.comprimento.trim())
			return Alert.alert("Erro", "Comprimento do setor inválido!");
		if (!setor.peDireito.trim())
			return Alert.alert("Erro", "Pé direito do setor inválido!");
		if (!setor.piso.trim())
			return Alert.alert("Erro", "Piso do setor inválido!");
		if (!setor.estrutura.trim())
			return Alert.alert("Erro", "Estrutura do setor inválida!");
		if (!setor.forro.trim())
			return Alert.alert("Erro", "Forro do setor inválido!");
		if (!setor.iluminacao.natural.trim())
			return Alert.alert("Erro", "Iluminação natural do setor inválida!");
		if (!setor.iluminacao.artificial.trim())
			return Alert.alert("Erro","Iluminação artificial do setor inválida!"
			);
		if (!setor.ventilacao.natural.trim())
			return Alert.alert("Erro", "Ventilação natural do setor inválida!");
		if (!setor.ventilacao.artificial.trim())
			return Alert.alert("Erro","Ventilação artificial do setor inválida!"
			);
		if (!setor.me.trim())
			return Alert.alert("Erro", "Máquinas e equipamentos inválidos!");
		if (!setor.mce.trim())
			return Alert.alert(
				"Erro",
				"Medidas de controle existentes inválidas!"
			);
		if (!setor.mcr.trim())
			return Alert.alert(
				"Erro",
				"Medidas de controle recomendadas inválidas!"
			);
		if (setor.extintores === undefined)
			return Alert.alert("Erro", "Extintores do setor inválidos!");
		if (setor.rotaFuga === undefined)
			return Alert.alert("Erro", "Rota de fuga inválida!");
		if (setor.saidaEmergencia === undefined)
			return Alert.alert("Erro", "Saída de emergência inválida!");
		if (setor.sinalizacaoEmergencia === undefined)
			return Alert.alert("Erro", "Sinalização de emergência inválida!");

		// Confirmação se as funções estão vazias
		if (setor.funcoes.length === 0) {
			return Alert.alert(
				"Confirmação",
				"Realmente não existe nenhuma função no setor?",
				[
					{ text: "Cancelar", style: "cancel" },
					{
						text: "Confirmar",
						onPress: () => {
							// Adiciona o setor após confirmação
							empresa.setSetores([...empresa.setores, setor]);
							router.back();
						},
					},
				],
				{ cancelable: false }
			);
		}

		// Adiciona o setor diretamente se há funções
		empresa.setSetores([...empresa.setores, setor]);
		router.back();
	};

	return (
		<Container style={styles.formContainer} scroller>
			<Input
				placeholder="Digite o nome do setor..."
				value={setor.nome}
				onChange={setor.setNome}
			/>
			<Input
				placeholder="Digite a largura setor..."
				value={setor.largura}
				onChange={setor.setLargura}
			/>
			<Input
				placeholder="Digite o comprimento do setor..."
				value={setor.comprimento}
				onChange={setor.setComprimento}
			/>
			<Input
				placeholder="Digite o pé direito do setor..."
				value={setor.peDireito}
				onChange={setor.setPeDireito}
			/>
			<Input
				placeholder="Digite o piso do setor..."
				value={setor.piso}
				onChange={setor.setPiso}
			/>
			<Input
				placeholder="Digite a estrutura do setor..."
				value={setor.estrutura}
				onChange={setor.setEstrutura}
			/>
			<Input
				placeholder="Digite o forro do setor..."
				value={setor.forro}
				onChange={setor.setForro}
			/>
			<Input
				placeholder="Digite a iluminção natural do setor..."
				value={setor.iluminacao.natural}
				onChange={setor.iluminacao.setNatural}
			/>
			<Input
				placeholder="Digite a iluminação artificial do setor..."
				value={setor.iluminacao.artificial}
				onChange={setor.iluminacao.setArtificial}
			/>
			<Input
				placeholder="Digite a ventilação natural do setor..."
				value={setor.ventilacao.natural}
				onChange={setor.ventilacao.setNatural}
			/>
			<Input
				placeholder="Digite a ventilação artificial do setor..."
				value={setor.ventilacao.artificial}
				onChange={setor.ventilacao.setArtificial}
			/>
			<Input
				placeholder="Digite as maquinas e equipamentos presente setor"
				value={setor.me}
				textarea={true}
				onChange={setor.setMe}
			/>
			<Input
				placeholder="Digite as medidas de controle existentes no setor"
				value={setor.mce}
				textarea={true}
				onChange={setor.setMce}
			/>
			<Input
				placeholder="Digite as medidas de controle recomendadas para o setor"
				value={setor.mcr}
				textarea={true}
				onChange={setor.setMcr}
			/>

			<RadioButton
				placeholder="Possui Extintores no setor?"
				value={setor.extintores}
				setValue={setor.setExtintores}
			/>
			<RadioButton
				placeholder="Possui Rota de fuga no setor?"
				value={setor.rotaFuga}
				setValue={setor.setRotaFuga}
			/>
			<RadioButton
				placeholder="Possui Saída de Emergencia no setor?"
				value={setor.saidaEmergencia}
				setValue={setor.setSaidaEmergencia}
			/>
			<RadioButton
				placeholder="Possui iluminação/Sinalização de emergência no setor?"
				value={setor.sinalizacaoEmergencia}
				setValue={setor.setSinalizacaoEmergencia}
			/>

			<VIPTabela
				headers={["Função", "Descrição", "Riscos"]}
				valores={setor.funcoes.map((a) => {
					return {
						id: a.id,
						// prettier-ignore
						"Função": a.nome,
						// prettier-ignore
						"Descrição": a.description,
						// prettier-ignore
						Riscos: [
								a.Acidente.existe && "Acidente",
								a.Quimico.existe && "Quimico",
								a.Biologico.existe && "Biologico",
								a.Fisico.existe && "Fisico",
								a.Ergonomico.existe && "Ergonomico",
							].filter(Boolean).length === 0 ? "Nenhum risco encontrado." : [
								a.Acidente.existe && "Acidente",
								a.Quimico.existe && "Quimico",
								a.Biologico.existe && "Biologico",
								a.Fisico.existe && "Fisico",
								a.Ergonomico.existe && "Ergonomico",
							]
								.filter(Boolean)
								.join(", "),
					};
				})}
				onExcluir={(item) =>
					setor.setFuncoes(
						setor.funcoes.filter((a) => a.id !== item.id)
					)
				}
			/>
			<Button
				onPress={(e) => {
					router.push("/Levantamento/funcao");
				}}
			>
				Adicionar Função
			</Button>
			<Button
				onPress={(e) => {
					handleCreateSetor();
				}}
			>
				Criar
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
