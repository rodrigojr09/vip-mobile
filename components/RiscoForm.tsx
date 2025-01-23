import RadioButton from "./RadioButton";
import Button from "./Button";
import { useFuncao } from "@/hooks/FuncaoProvider";
import { useRouter } from "expo-router";

export default function RiscoForm({
	risco,
}: {
	risco: "Fisico" | "Quimico" | "Biologico" | "Ergonomico" | "Acidente";
}) {
	const funcao = useFuncao();
	const router = useRouter();
	return (
		<>
			<RadioButton
				placeholder={`Possui risco ${risco}?`}
				value={funcao[risco].existe}
				setValue={funcao[risco].setExiste}
			/>
			{funcao[risco].existe && (
				<Button
					secundary
					onPress={() => {
						router.push({
							pathname: "/Levantamento/risco",
							params: { tipo: risco },
						});
					}}
				>
					{`Adicionar ${risco}`}
				</Button>
			)}
		</>
	);
}
