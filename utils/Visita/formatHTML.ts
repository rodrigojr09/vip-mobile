import { Question, Resposta, VIPVisitaType } from "@/types/VIPVisitaType";

function getRespostaHtml(pergunta?: Question, respostas?: Resposta[]): string {
	const respostas2 = respostas?.filter((a) =>
		pergunta?.perguntas.includes(a.pergunta)
	);
	if (respostas2?.length === 0 || !pergunta) return "";

	return (
		`<div class="card"><h3 class="text-center font-bold">${pergunta.label}</h3>` +
		respostas2
			?.map((resposta) => {
				return `
            
                <p class="question">${resposta.pergunta}</p>
                <p class="answer">Resposta: ${resposta.value}</p>
                ${
					resposta.observation
						? `<p class="observacoes">Observação: ${resposta.observation}</p>`
						: ""
				}
            `;
			})
			.join("") +
		`</div>`
	);
}

const assinaturaHtml = `
    <div class="p-2 h-screen">
        <div class="border border-black p-2 h-full">
            <h1 class="font-bold text-2xl my-2 text-center">
                Visita Técnica - $empresa.nome<br>
                Visita feita no dia $data
            </h1>
            <div class="max-w-[90vw] mb-[20vh] break-words mx-auto">
                <p>Este inventário de riscos e levantamento de dados foi realizado por profissional técnico em segurança do trabalho da empresa Vip Engenharia de Segurança e Medicina do Trabalho, com o auxílio de $responsavel.</p>
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
	return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Relatório de Visita Técnica</title>
</head>
 <style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(to right, #e0f7fa, #fefefe);
    color: #333;
    padding: 30px 20px;
  }

  .h-screen {
    min-height: 100vh;
    page-break-after: always; /* também cobre @media print */
  }

  .p-2 {
    padding: 0.5rem;
  }

  .border {
    border: 1px solid black;
  }

  .border-b {
    border-bottom: 1px solid black;
  }

  .font-bold {
    font-weight: bold;
  }

  .text-center {
    text-align: center;
  }

  .text-2xl {
    font-size: 1.5rem;
  }

  .my-2 {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .mb-[20vh] {
    margin-bottom: 20vh;
  }

  .break-words {
    word-wrap: break-word;
  }

  .max-w-[90vw] {
    max-width: 90vw;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .not-assinatura {
    display: none;
  }

  .container {
    background: #ffffff;
    border-radius: 15px;
    padding: 40px;
    max-width: 1000px;
    margin: auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  h1 {
    text-align: center;
    color: #00796b;
    margin-bottom: 30px;
    font-size: 2.2em;
  }

  .info {
    background-color: #f0f4f8;
    border-left: 6px solid #00796b;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 40px;
  }

  .info p {
    font-size: 1.1em;
    margin-bottom: 10px;
  }

  .card {
    border: 1px solid #d0d7de;
    border-radius: 12px;
    padding: 25px;
    background: #fafafa;
    margin-bottom: 30px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    transition: 0.3s;
  }

  .card:hover {
    box-shadow: 0 6px 18px rgba(0,0,0,0.1);
  }

  .question {
    color: #1a1a1a;
    font-size: 1.15em;
    font-weight: 700;
    margin-top: 15px;
  }

  .answer {
    color: #555;
    font-weight: normal;
    font-size: 0.95em;
  }

  .observacoes {
    font-style: italic;
    color: #ff0000;
  }

  @media (max-width: 600px) {
    .container {
      padding: 20px;
    }

    h1 {
      font-size: 1.5em;
    }
  }
</style>

<body>

  <div class="container">
    <h1>Relatório de Visita Técnica</h1>

    <div class="info">
      <p><strong>Empresa Visitada:</strong> ${empresa.empresa?.razao_social}</p>
      <p><strong>Técnico Responsável pela Visita:</strong> ${empresa.visitante}</p>
      <p><strong>Responsável pela Empresa:</strong> ${empresa.acompanhante}</p>
      <p><strong>Data:</strong> ${empresa.data}</p>
    </div>

    ${empresa.perguntas
		.map((pergunta) => getRespostaHtml(pergunta, empresa.respostas))
		.join("")}

    ${assinaturaHtml
		.replaceAll("$responsavel", empresa.acompanhante)
		.replaceAll(
			"$empresa.nome",
			empresa.empresa?.razao_social ||
				empresa.empresa?.nome_fantasia ||
				""
		)
		.replaceAll("$data", empresa.data)}

  </div>
</body>
</html>

    `;
}
