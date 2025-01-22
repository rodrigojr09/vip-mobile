import { VIPEmpresaType } from "@/types/VIPEmpresaType";
import { VIPFuncaoType } from "@/types/VIPFuncaoType";
import { VIPRiscoType } from "@/types/VIPRiscoType";
import { VIPSetorType } from "@/types/VIPSetorType";

const assinaturaHtml = `
    <div class="p-2 h-screen">
        <div class="border border-black p-2 h-full">
            <h1 class="font-bold text-2xl my-2 text-center">
                Levantamento - $empresa.nome
            </h1>
            <div class="max-w-[90vw] mb-[20vh] break-words mx-auto">
                <p>Este inventário de riscos e levantamento de dados foi realizado por profissional técnico em segurança do trabalho da empresa Vip Engenharia de Segurança e Medicina do Trabalho, com meu auxílio. Foram levantados o total de $setores.length setores e $atividades.length funções.</p>
                <p>Confirmo que fui designado como responsável por informar todos os dados necessários para a elaboração da documentação de Saude e Segurança do Trabalho da empresa "$empresa.nome".</p>
                <p>Após conferencia de todos os dados favor assinar com nome legível abaixo.</p>
            </div>
            <div class="max-w-[90vw] mx-auto text-center not-assinatura">
                $assinatura
                <div class="border-b border-black mx-auto max-w-[90vw]"></div>
                $responsavel
            </div>
        </div>
    </div>
`;

function getSetorHtml(setores: VIPSetorType[]) {
	return setores.map((setor) => {
		return `<div class="p-2 min-h-screen">
        <div class="border border-black p-4 h-full">
            <h1 class="font-bold text-2xl text-center">
                ${setor.nome}
            </h1>
            <div class="max-w-[90vw] break-words mt-4 mx-auto">
                <div class="font-bold flex h-min border-x border-t border-black">
                    <div class="w-[20%] border-r flex items-center justify-center border-black p-2">Medições:</div>
                    <div class="w-[80%] p-2">
                        <p>Comprimento: <span class="font-normal">${
							setor.comprimento
						} M</span></p>
                        <p>Largura: <span class="font-normal">${
							setor.largura
						} M</span></p>
                        <p>Área: <span class="font-normal">${
							Number(setor.comprimento.replace(",", ".")) *
							Number(setor.largura.replace(",", "."))
						} M²</span></p>
                        <p>Pé Direito: <span class="font-normal">${
							setor.peDireito
						} M</span></p>
                    </div>
                </div>
                <div class="font-bold flex h-min border border-black">
                    <div class="w-[20%] border-r flex items-center justify-center border-black p-2">Ambiente:</div>
                    <div class="w-[80%] p-2">
                        <p>Piso: <span class="font-normal">${
							setor.piso
						}</span></p>
                        <p>Estrutura: <span class="font-normal">${
							setor.estrutura
						}</span></p>
                        <p>Forro: <span class="font-normal">${
							setor.forro
						}</span></p>
                        <p>Iluminação Natural: <span class="font-normal">${
							setor.iluminacao.natural
						}</span></p>
                        <p>Iluminação Artificial: <span class="font-normal">${
							setor.iluminacao.artificial
						}</span></p>
                        <p>Ventilação Natural: <span class="font-normal">${
							setor.ventilacao.natural
						}</span></p>
                        <p>Ventilação Artificial: <span class="font-normal">${
							setor.ventilacao.artificial
						}</span></p>
                        <p>Máquinas e Equipamentos - LUX: <span class="font-normal">${setor.me.replaceAll(
							"\n",
							"<br/>"
						)}</span></p>
                        <p>Medidas de Controle Existentes: <span class="font-normal">${setor.mce.replaceAll(
							"\n",
							"<br/>"
						)}</span></p>
                        <p>Medidas de Controle Recomendadas: <span class="font-normal">${setor.mcr.replaceAll(
							"\n",
							"<br/>"
						)}</span></p>
                        <p>
                            <span class="font-normal">${
								setor.extintores ? "Existe" : "Não existe"
							}</span> Extintores no setor.
                        </p>
                        <p>
                            <span class="font-normal">${
								setor.rotaFuga ? "Existe" : "Não existe"
							}</span> Rota de fuga no setor.
                        </p>
                        <p>
                            <span class="font-normal">${
								setor.saidaEmergencia ? "Existe" : "Não existe"
							}</span> Saida de Emergencia no setor.
                        </p>
                        <p>
                            <span class="font-normal">${
								setor.sinalizacaoEmergencia
									? "Existe"
									: "Não existe"
							}</span> Iluminção/Sinalização de Emergencia no setor.
                        </p>
                    </div>
                </div>
				${getFuncaoHtml(setor.funcoes).join("")}
            </div>
        </div>
    </div>`;
	});
}

function getFuncaoHtml(funcoes: VIPFuncaoType[]) {
	return funcoes.map((funcao) => {
		return `<div class="font-bold flex flex-col h-min border-x mt-5 border-black">
					<div class="text-center w-full border-y border-black">Função: <span class="font-normal">${
						funcao.nome
					}</span></div>
					<div class="text-center w-full border-b border-black">Descrição: <span class="font-normal">${
						funcao.description
					}</span></div>
					<div class="text-center w-full border-b border-black">Funcionarios: <span class="font-normal">${
						funcao.funcionarios
					}</span></div>
					<div class="text-center w-full border-b border-black">LUX: <span class="font-normal">${
						funcao.lux
					}</span></div>
					${getRiscoHtml(funcao["Fisico"].riscos, "Fisico").join("")}
                    ${getRiscoHtml(funcao["Quimico"].riscos, "Quimico").join(
						""
					)}
                    ${getRiscoHtml(
						funcao["Biologico"].riscos,
						"Biologico"
					).join("")}
                    ${getRiscoHtml(
						funcao["Ergonomico"].riscos,
						"Ergonomico"
					).join("")}
                    ${getRiscoHtml(funcao["Acidente"].riscos, "Acidente").join(
						""
					)}
				</div>`;
	});
}

function getRiscoHtml(
	riscos: VIPRiscoType[],
	tipo: "Acidente" | "Ergonomico" | "Biologico" | "Quimico" | "Fisico"
) {
	return riscos.map((risco) => {
		return `<div class="w-full flex border-b border-black">
						<div class="w-1/3 border-r flex items-center justify-center border-black p-2">${tipo} / ${
			risco.risco
		}</div>
						<div class="w-2/3 p-2">
							<p>Exposição: <span class="font-normal">${risco.exposicao}</span></p>
							<p>Fonte Geradora: <span class="font-normal">${risco.fonteGeradora}</span></p>
							${
								risco.possuiEpi
									? `<p>EPIs Existentes: <span class="font-normal">${risco.epis.existentes
											.map(
												(a, i) =>
													`${i + 1}. ${
														a.nome
													}(Trocar a cada ${
														a.periodicidade.tempo
													} ${a.periodicidade.tipo})`
											)
											.join("<br/>")}</span></p>`
									: "<p>Não possui EPIs.</p>"
							}
							${
								risco.recomendarEpi
									? `<p>EPIs Recomendados: <span class="font-normal">${risco.epis.recomendados
											.map(
												(a, i) =>
													`${i + 1}. ${
														a.nome
													}(Trocar a cada ${
														a.periodicidade.tempo
													} ${a.periodicidade.tipo})`
											)
											.join("<br/>")}</span></p>`
									: "<p>Não foram recomendados EPIs.</p>"
							}
						</div>
					</div>`;
	});
}
export function getHtml(empresa: VIPEmpresaType) {
	return `
    <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Levantamento - ${empresa.nome}</title>
    <style>
        body {
            background-color: white;
            color: black;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .h-screen {
            min-height: 100vh;
        }
        .p-2 {
            padding: 0.5rem;
        }
        .p-4 {
            padding: 1rem;
        }
        .border {
            border: 1px solid black;
        }
        .border-b {
            border-bottom: 1px solid black;
        }
        .border-x {
            border-left: 1px solid black;
            border-right: 1px solid black;
        }
        .border-t {
            border-top: 1px solid black;
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
        .mt-4 {
            margin-top: 1rem;
        }
        .mt-5 {
            margin-top: 1.25rem;
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
        .w-full {
            width: 100%;
        }
        .w-[20%] {
            width: 20%;
        }
        .w-[80%] {
            width: 80%;
        }
        .w-1/3 {
            width: 33.333%;
        }
        .w-2/3 {
            width: 66.666%;
        }
        .flex {
            display: flex;
        }
        .flex-col {
            flex-direction: column;
        }
        .items-center {
            align-items: center;
        }
        .justify-center {
            justify-content: center;
        }
        .min-h-screen {
            min-height: 100vh;
        }
        .h-min {
            height: min-content;
        }
        @media print {
            .h-screen {
                page-break-after: always;
            }
        }
        .not-assinatura{
            display: none;
        }
    </style>
</head>
<body>
${getSetorHtml(empresa.setores).join("")}
${assinaturaHtml}
</body>
</html>
`
		.replaceAll("$empresa.nome", empresa.nome)
		.replaceAll(
			"$atividades.length",
			eval(empresa.setores.map((a) => a.funcoes.length).join("+")) || 0
		)
		.replaceAll("$setores.length", String(empresa.setores.length))
		.replaceAll("$responsavel", empresa.responsavel);
}
