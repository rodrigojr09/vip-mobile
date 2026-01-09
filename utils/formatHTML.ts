import type { VIPEmpresaType } from "@/types/Levantamento/VIPEmpresaType";
import type { VIPFuncaoType } from "@/types/Levantamento/VIPFuncaoType";
import type { VIPRiscoType } from "@/types/Levantamento/VIPRiscoType";
import type { VIPSetorType } from "@/types/Levantamento/VIPSetorType";

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
                        <p>Comprimento: <span class="font-normal">${setor.comprimento
            } M</span></p>
                        <p>Largura: <span class="font-normal">${setor.largura
            } M</span></p>
                        <p>Área: <span class="font-normal">${Number(setor.comprimento.replace(",", ".")) *
            Number(setor.largura.replace(",", "."))
            } M²</span></p>
                        <p>Pé Direito: <span class="font-normal">${setor.peDireito
            } M</span></p>
                         <p>Iluminamento(LUX): <span class="font-normal">${setor.lux
            }</span></p>
                    </div>
                </div>
                <div class="font-bold flex h-min border border-black">
                    <div class="w-[20%] border-r flex items-center justify-center border-black p-2">Ambiente:</div>
                    <div class="w-[80%] p-2">
                        <p>Piso: <span class="font-normal">${setor.piso
            }</span></p>
                        <p>Estrutura: <span class="font-normal">${setor.estrutura
            }</span></p>
                        <p>Forro: <span class="font-normal">${setor.forro
            }</span></p>
                        <p>Iluminação Natural: <span class="font-normal">${setor.iluminacao.natural
            }</span></p>
                        <p>Iluminação Artificial: <span class="font-normal">${setor.iluminacao.artificial
            }</span></p>
                        <p>Ventilação Natural: <span class="font-normal">${setor.ventilacao.natural
            }</span></p>
                        <p>Ventilação Artificial: <span class="font-normal">${setor.ventilacao.artificial
            }</span></p>
                        <p>Máquinas e Equipamentos - LUX: <span class="font-normal">${setor.me.replaceAll(
                "\n",
                "<br/>",
            )}</span></p>
                        <p>Medidas de Controle Existentes: <span class="font-normal">${setor.mce.replaceAll(
                "\n",
                "<br/>",
            )}</span></p>
                        <p>Medidas de Controle Recomendadas: <span class="font-normal">${setor.mcr.replaceAll(
                "\n",
                "<br/>",
            )}</span></p>
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
					<div class="text-center w-full border-y border-black">Função: <span class="font-normal">${funcao.nome
            }</span></div>
					<div class="text-center w-full border-b border-black">Descrição: <span class="font-normal">${funcao.description
            }</span></div>
					<div class="text-center w-full border-b border-black">Funcionarios: <span class="font-normal">${funcao.funcionarios
            }</span></div>
					${getRiscoHtml(funcao.riscos).join("")}
				</div>`;
    });
}

function getRiscoHtml(riscos: VIPRiscoType[]) {
    return riscos.map((risco) => {
        return `<div class="w-full flex border-b border-black">
						<div class="w-1/3 border-r flex items-center justify-center border-black p-2">${risco.risco
            }</div>
						<div class="w-2/3 p-2">
							<p>Descricão: <span class="font-normal">${risco.fonteGeradora}</span></p>
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
            String(empresa.setores.reduce((sum, setor) => sum + setor.funcoes.length, 0) ||
                0),
        )
        .replaceAll("$setores.length", String(empresa.setores.length))
        .replaceAll("$responsavel", empresa.responsavel)
        .replaceAll("$data", empresa.data);
}
