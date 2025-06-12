import { Resposta } from "@/app/(tabs)/VisitaTecnica/Visita";
import { Question } from "../questions";

interface Empresa {
	respostas: Resposta[];
	empresa: string;
	visitante: string;
	acompanhante: string;
	perguntas: Question[];
}

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


export function getHtmlVisita(empresa: Empresa) {
    console.log(empresa.respostas)
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
    </body>
    
    </html>
    `;
}
