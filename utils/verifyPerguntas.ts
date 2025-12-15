import type { PerguntaType, RespostaType } from "@/types/Visita";

type CheckedType = RespostaType["checked"];
export function verifyPerguntas(
	perguntas: PerguntaType[],
	respostas: RespostaType[],
	statusPai?: CheckedType,
): boolean {
	for (const pergunta of perguntas) {
		// Verifica se a pergunta deve ser exibida com base no `when`
		if (
			pergunta.when &&
			pergunta.when.toLowerCase() !== String(statusPai).toLowerCase()
		) {
			continue; // não é visível, então pula
		}

		// Ignora perguntas do tipo "check" e "info"
		if (pergunta.type === "check" || pergunta.type === "info") {
			continue; // não bloqueiam, ignorar
		}

		// Verifica se a pergunta está respondida
		const resposta = respostas.find((r) => r.pergunta === pergunta.pergunta);

		if (!resposta || resposta.checked == null) {
			if (pergunta.type !== "text")
				return true; // não respondida e obrigatória
			else if (
				!resposta ||
				(resposta?.observation && resposta?.observation?.trim() === "")
			)
				return true;
			continue;
		}

		// Verifica subperguntas, se existirem
		if (pergunta.subpergunta?.length) {
			const naoRespondidas = verifyPerguntas(
				pergunta.subpergunta,
				respostas,
				resposta.checked,
			);
			if (naoRespondidas) return true;
		}
	}

	return false; // todas visíveis foram respondidas
}
