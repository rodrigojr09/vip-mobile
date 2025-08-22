import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import VIPTabela from "@/components/VIPTabela";
import RadioButton from "@/components/RadioButton";
import { useSetor } from "@/hooks/Levantamento/SetorProvider";
import { useEmpresa } from "@/hooks/Levantamento/EmpresaProvider";
import { useNavigationHistory } from "@/hooks/Navigation";
import { useLocalSearchParams } from "expo-router";
import { Alert, StyleSheet, TextInput } from "react-native";
import { useEffect, useRef } from "react";

export default function Setor() {
	const nav = useNavigationHistory();
	const params = useLocalSearchParams();
	const empresa = useEmpresa();
	const setor = useSetor();

	const campos = 12;
	const refs = useRef<TextInput[]>([]);
	const focarProximo = (index: number) => {
		if (index + 1 <= campos) {
			refs.current[index + 1]?.focus();
		}
	};

	useEffect(() => {
		if (params.setor) {
			const hasSetor = empresa.setores.find(
				(a) => a.id === (params.setor as string)
			);
			if (hasSetor) setor.load(hasSetor);
		}
		return () => {
			setor.clear();
		};
	}, []);

	const handleCreateSetor = () => {
		// Validações individuais para os campos
		if (!setor.nome.trim())
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
			return Alert.alert(
				"Erro",
				"Iluminação artificial do setor inválida!"
			);
		if (!setor.ventilacao.natural.trim())
			return Alert.alert("Erro", "Ventilação natural do setor inválida!");
		if (!setor.ventilacao.artificial.trim())
			return Alert.alert(
				"Erro",
				"Ventilação artificial do setor inválida!"
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
							nav.back();
						},
					},
				],
				{ cancelable: false }
			);
		}

		// Adiciona o setor diretamente se há funções
		empresa.setSetores([...empresa.setores, setor]);
		nav.back();
	};

	return (
		<Container style={styles.formContainer} scroller>
			<Input
				placeholder="Digite o nome do setor..."
				value={setor.nome}
				onChange={setor.setNome}
				ref={(ref) => {
					if (ref) refs.current[0] = ref;
				}}
				returnKeyType={0 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(0)}
			/>
			{
				//Lux
			}
			<Input
				placeholder="Digite o lux do setor..."
				value={setor.lux}
				onChange={setor.setLux}
				ref={(ref) => {
					if (ref) refs.current[1] = ref;
				}}
				returnKeyType={1 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(1)}
			/>
			<Input
				placeholder="Digite a largura setor..."
				value={setor.largura}
				onChange={setor.setLargura}
				ref={(ref) => {
					if (ref) refs.current[2] = ref;
				}}
				returnKeyType={2 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(2)}
			/>
			<Input
				placeholder="Digite o comprimento do setor..."
				value={setor.comprimento}
				onChange={setor.setComprimento}
				ref={(ref) => {
					if (ref) refs.current[3] = ref;
				}}
				returnKeyType={3 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(3)}
			/>
			<Input
				placeholder="Digite o pé direito do setor..."
				value={setor.peDireito}
				onChange={setor.setPeDireito}
				ref={(ref) => {
					if (ref) refs.current[4] = ref;
				}}
				returnKeyType={4 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(4)}
			/>
			<Input
				placeholder="Digite o piso do setor..."
				value={setor.piso}
				onChange={setor.setPiso}
				ref={(ref) => {
					if (ref) refs.current[5] = ref;
				}}
				returnKeyType={5 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(5)}
			/>
			<Input
				placeholder="Digite a estrutura do setor..."
				value={setor.estrutura}
				onChange={setor.setEstrutura}
				ref={(ref) => {
					if (ref) refs.current[6] = ref;
				}}
				returnKeyType={6 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(6)}
			/>
			<Input
				placeholder="Digite o forro do setor..."
				value={setor.forro}
				onChange={setor.setForro}
				ref={(ref) => {
					if (ref) refs.current[7] = ref;
				}}
				returnKeyType={7 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(7)}
			/>
			<Input
				placeholder="Digite a iluminção natural do setor..."
				value={setor.iluminacao.natural}
				onChange={setor.iluminacao.setNatural}
				ref={(ref) => {
					if (ref) refs.current[8] = ref;
				}}
				returnKeyType={8 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(8)}
			/>
			<Input
				placeholder="Digite a iluminação artificial do setor..."
				value={setor.iluminacao.artificial}
				onChange={setor.iluminacao.setArtificial}
				ref={(ref) => {
					if (ref) refs.current[9] = ref;
				}}
				returnKeyType={9 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(9)}
			/>
			<Input
				placeholder="Digite a ventilação natural do setor..."
				value={setor.ventilacao.natural}
				onChange={setor.ventilacao.setNatural}
				ref={(ref) => {
					if (ref) refs.current[10] = ref;
				}}
				returnKeyType={10 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(10)}
			/>
			<Input
				placeholder="Digite a ventilação artificial do setor..."
				value={setor.ventilacao.artificial}
				onChange={setor.ventilacao.setArtificial}
				ref={(ref) => {
					if (ref) refs.current[11] = ref;
				}}
				returnKeyType={11 === campos - 1 ? "done" : "next"}
				onSubmitEditing={() => focarProximo(11)}
			/>
			<Input
				placeholder="Digite as maquinas e equipamentos presente setor"
				value={setor.me}
				textarea={true}
				ref={(ref) => {
					if (ref) refs.current[12] = ref;
				}}
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
						"Riscos": `${a.riscos.length}`,
					};
				})}
				onExcluir={(item) =>
					setor.setFuncoes(
						setor.funcoes.filter((a) => a.id !== item.id)
					)
				}
				goTo={(item) => {
					nav.push({
						pathname: "/Levantamento/funcao",
						params: {
							funcao: item.id,
						},
					});
				}}
			/>
			<Button
				onPress={(e) => {
					nav.push("/Levantamento/funcao");
				}}
			>
				Adicionar Função
			</Button>
			{!params.setor && (
				<Button
					onPress={(e) => {
						handleCreateSetor();
					}}
				>
					Criar
				</Button>
			)}
			{params.setor && (
				<Button
					onPress={(e) => {
						// Validações individuais para os campos
						if (!setor.nome.trim())
							return Alert.alert(
								"Erro",
								"Nome do setor inválido!"
							);
						if (!setor.largura.trim())
							return Alert.alert(
								"Erro",
								"Largura do setor inválida!"
							);
						if (!setor.comprimento.trim())
							return Alert.alert(
								"Erro",
								"Comprimento do setor inválido!"
							);
						if (!setor.peDireito.trim())
							return Alert.alert(
								"Erro",
								"Pé direito do setor inválido!"
							);
						if (!setor.piso.trim())
							return Alert.alert(
								"Erro",
								"Piso do setor inválido!"
							);
						if (!setor.estrutura.trim())
							return Alert.alert(
								"Erro",
								"Estrutura do setor inválida!"
							);
						if (!setor.forro.trim())
							return Alert.alert(
								"Erro",
								"Forro do setor inválido!"
							);
						if (!setor.iluminacao.natural.trim())
							return Alert.alert(
								"Erro",
								"Iluminação natural do setor inválida!"
							);
						if (!setor.iluminacao.artificial.trim())
							return Alert.alert(
								"Erro",
								"Iluminação artificial do setor inválida!"
							);
						if (!setor.ventilacao.natural.trim())
							return Alert.alert(
								"Erro",
								"Ventilação natural do setor inválida!"
							);
						if (!setor.ventilacao.artificial.trim())
							return Alert.alert(
								"Erro",
								"Ventilação artificial do setor inválida!"
							);
						if (!setor.me.trim())
							return Alert.alert(
								"Erro",
								"Máquinas e equipamentos inválidos!"
							);
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
											empresa.setSetores(
												empresa.setores.map((a) => {
													if (a.id !== params.setor)
														return a;
													return setor;
												})
											);
											nav.back();
										},
									},
								],
								{ cancelable: false }
							);
						}

						// Adiciona o setor diretamente se há funções
						empresa.setSetores(
							empresa.setores.map((a) => {
								if (a.id !== params.setor) return a;
								return setor;
							})
						);
						nav.back();
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
