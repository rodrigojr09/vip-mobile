import { Question, Resposta, VIPVisitaType } from "@/types/VIPVisitaType";

function getRespostaHtml(pergunta?: Question, respostas?: Resposta[]): string {
	const resposta = respostas?.find((a) => a.pergunta == pergunta?.label);

	if (!resposta || !pergunta) return "";

	let next: Question | undefined;

	if (pergunta.subquest && resposta.value !== "N/A") {
		if (resposta.value === "Sim") {
			next = pergunta.subquest.true;
		} else if (resposta.value === "Não") {
			next = pergunta.subquest.false;
		}
	}

	return `
    <div class="pergunta">
        <p class="label">
            ${pergunta.label}
            <span class="status-${resposta.value}">${resposta.value}</span>
        </p>
        ${
			// Se tem observation ou é N/A, mostra só isso. Senão, tenta renderizar próxima.
			resposta.observation || resposta.value === "N/A"
				? `<p>${resposta.observation || ""}</p>`
				: next
				? getRespostaHtml(next, respostas)
				: ""
		}
    </div>`;
}

const assinaturaHtml = `
    <div class="p-2 h-screen">
        <div class="border border-black p-2 h-full">
            <h1 class="font-bold text-2xl my-2 text-center">
                Levantamento - $empresa.nome<br>
                Levantamento feito no dia $data
            </h1>
            <div class="max-w-[90vw] mb-[20vh] break-words mx-auto">
                <p>Este inventário de riscos e levantamento de dados foi realizado por profissional técnico em segurança do trabalho da empresa Vip Engenharia de Segurança e Medicina do Trabalho, com meu auxílio. Foram levantados o total de $setores.length setores e $atividades.length funções.</p>
                <p>Confirmo que fui designado como responsável por informar todos os dados necessários para a elaboração da documentação de Saude e Segurança do Trabalho da empresa "$empresa.nome".</p>
                <p>Declaro que, após verificar e confirmar a veracidade dos dados apresentados, aposto abaixo minha assinatura legível.</p>
            </div>
            <div class="max-w-[90vw] mx-auto text-center not-assinatura">
                $assinatura
                <div class="border-b border-black mx-auto max-w-[90vw]"></div>
                $responsavel
            </div>
        </div>
    </div>
`;

export function getHtmlVisita(empresa: VIPVisitaType) {
	console.log(empresa.respostas);
	return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    
    <head>
        <meta charset="UTF-8">
        <title>Checklist Final</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #fff;
                color: #000;
                padding: 20px;
            }
    
            .pergunta {
                border: 1px solid #ccc;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 16px;
            }   
    
            .label {
                font-size: 18px;
                margin-bottom: 8px;
                font-weight: bold;
            }
    
            .respostas {
                font-size: 16px;
            }
    
            .marcado {
                color: green;
            }
            .status-Sim{
                color: green;
            }
            .status-Não {
                color: red;
            }
            .status-N/A {
                color: gray;
            }
        </style>
    </head>
    
    <body>
        <h1>Checklist da Visita</h1>
        ${empresa.perguntas
			.map((a) => getRespostaHtml(a, empresa.respostas))
			.join("<br/>")}
        ${assinaturaHtml}
    </body>
    
    </html>
    `;
}
