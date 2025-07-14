import {
	VIPPerguntaType,
	VIPRespostaType,
} from "@/types/VisitaTecnica/VIPPerguntaType";
import { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";

function getRespostaHtml(
	pergunta: VIPPerguntaType,
	respostas: VIPRespostaType[]
): string {
	const resposta = respostas.find((r) => r.pergunta === pergunta.pergunta);
	if (!resposta && pergunta.type !== "info") return "";
	const checks = pergunta.subpergunta?.filter(
		(s) => s.type === "check" && !s.when
	);
	const condicionais = pergunta.subpergunta?.filter(
		(s) =>
			s.type !== "check" &&
			s.when?.toLowerCase() === resposta?.checked?.toLowerCase()
	);

	return `
			<div class="resposta-bloco">
				<h3 class="pergunta-titulo">${pergunta.pergunta}</h3>
				${
					pergunta.type !== "info"
						? `<p class="resposta-texto">Resposta: ${
								resposta?.checked || "Não informado"
						  }</p>`
						: ""
				}
				${
					resposta?.observation
						? `<p class="resposta-observacao">Observação: ${resposta.observation}</p>`
						: ""
				}
				${
					condicionais && condicionais.length > 0
						? condicionais
								?.map((sub) => getRespostaHtml(sub, respostas))
								.join("")
						: ""
				}
                ${
					checks && checks.length > 0
						? checks
								?.filter(
									(s) =>
										respostas.find(
											(a) => a.pergunta === s.pergunta
										)?.checked === "Check"
								)
								.map(
									(sub) =>
										`<p class="resposta-check">- ${sub.pergunta}</p>`
								)
								.join("")
						: ""
				}
			</div>
	`;
}

const assinaturaHtml = `
	<div class="assinatura-container">
		<div class="assinatura-bloco">
			<h1 class="titulo-assinatura">
				Visita Técnica - $empresa_nome<br />
				Visita feita no dia $data
			</h1>
			<div class="assinatura-texto">
				<p>
					Este inventário de riscos e levantamento de dados foi realizado por
					profissional técnico em segurança do trabalho da empresa Vip Engenharia
					de Segurança e Medicina do Trabalho, com o auxílio de $responsavel.
				</p>
				<p>
					Confirmo que fui designado como responsável por informar todos os dados
					necessários para a elaboração da documentação de Saúde e Segurança do
					Trabalho da empresa "$empresa_nome".
				</p>
				<p>
					Declaro que, após verificar e confirmar a veracidade dos dados
					apresentados, aposto abaixo minha assinatura legível.
				</p>
			</div>
			<div class="assinatura-final not-assinatura">
				$assinatura
				<div class="linha-assinatura"></div>
				$responsavel
			</div>
		</div>
	</div>
`;

export function getHtmlVisita(visita: VIPVisitaType) {
	return `<!DOCTYPE html>
	<html lang="pt-BR">
		<head>
			<meta charset="UTF-8" />
			<title>Relatório de Visita Técnica</title>
			<style>
				* {
					box-sizing: border-box;
					margin: 0;
					padding: 0;
				}

				body {
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
					background: #f4f6f8;
					color: #333;
					padding: 30px 20px;
				}

				.container {
					background: #ffffff;
					border-radius: 10px;
					padding: 40px;
					max-width: 960px;
					margin: auto;
					box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
				}

				.titulo-principal {
					text-align: center;
					color: #00796b;
					margin-bottom: 30px;
					font-size: 2rem;
				}

				.info {
					background-color: #eef6f9;
					border-left: 6px solid #00796b;
					padding: 20px;
					border-radius: 10px;
					margin-bottom: 30px;
				}

				.card,
				.card-setor {
					border: 1px solid #d0d7de;
					border-radius: 12px;
					padding: 25px;
					margin-bottom: 25px;
					box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
				}

				.card {
					background: #fafafa;
				}

				.card-setor {
					background: #e8f0f2;
				}

				.pergunta-titulo {
					font-size: 1.1rem;
					color: #333;
					margin-bottom: 8px;
				}

				.resposta-texto {
					color: #00695c;
					font-weight: 500;
					margin-bottom: 4px;
				}

				.resposta-observacao {
					font-style: italic;
					color: #d32f2f;
				}

				.resposta-check {
					margin-left: 16px;
					color: #555;
				}

				.titulo-setor {
					text-align: center;
					color: #00796b;
					margin-bottom: 20px;
					font-size: 1.5rem;
					font-weight: bold;
				}

				.assinatura-container {
					padding: 20px;
					min-height: 100vh;
				}

				.assinatura-bloco {
					border: 1px solid #000;
					padding: 20px;
					height: 100%;
				}

				.titulo-assinatura {
					font-size: 1.5rem;
					margin: 10px 0;
					text-align: center;
					font-weight: bold;
				}

				.assinatura-texto {
					margin: 20px auto;
					max-width: 90vw;
					word-wrap: break-word;
				}

				.assinatura-final {
					max-width: 90vw;
					margin: auto;
					text-align: center;
				}

                .not-assinatura {
                    display: none;
                }

				.linha-assinatura {
					border-bottom: 1px solid black;
					margin: auto;
					max-width: 90vw;
				}
			</style>
		</head>
		<body>
			<div class="container">
				<h1 class="titulo-principal">Relatório de Visita Técnica</h1>
				<div class="info">
					<p><strong>Empresa Visitada:</strong> ${
						visita.empresa?.razao_social || "Não informado"
					}</p>
					<p><strong>Técnico Responsável:</strong> ${
						visita.tecnico || "Não informado"
					}</p>
					<p><strong>Data:</strong> ${visita.data}</p>
					
					<p><strong>Responsável pela Empresa:</strong> ${
						visita.responsavel || "Não informado"
					}</p>
				</div>

				${visita.perguntas.adm
					.map(
						(pergunta) =>
							`<div class="card">${getRespostaHtml(
								pergunta,
								visita.respostas
							)}</div>`
					)
					.join("")}

				${visita.setores
					.map(
						(setor) => `
                            <div class="card-setor">
                                <h2 class="titulo-setor">${setor.nome}</h2>
                                ${setor.perguntas
									.map(
										(pergunta) =>
											`<div class="card">${getRespostaHtml(
												pergunta,
												setor.respostas
											)}</div>`
									)
									.join("")}
                            </div>
					`
					)
					.join("")}

				${assinaturaHtml
					.replaceAll("$responsavel", visita.responsavel)
					.replaceAll(
						"$empresa_nome",
						visita.empresa?.razao_social || ""
					)
					.replaceAll("$data", visita.data)}
			</div>
		</body>
	</html>`;
}
