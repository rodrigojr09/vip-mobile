import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import VIPTabela from "@/components/VIPTabela";
import RadioButton from "@/components/RadioButton";
import { useSetor } from "@/hooks/SetorProvider";
import { useEmpresa } from "@/hooks/EmpresaProvider";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Setor() {
	const router = useRouter();

	const empresa = useEmpresa();
	const setor = useSetor();
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
					empresa.setSetores([...empresa.setores, setor]);
					setor.clear();
					router.back();
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
		padding: 20,
	},
});
