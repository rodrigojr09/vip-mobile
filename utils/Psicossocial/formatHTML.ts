import PsicossocialType from "@/types/Psicossocial/PsicossocialType";

export function getRelatorioPsicossocialHtml(psicossocial: PsicossocialType) {
    function getDesc() {
        if (psicossocial.orientacao === 1) {
            if (psicossocial.autorizado === 1)
                return "A empresa foi devidamente orientada quanto à necessidade e obrigatoriedade da avaliação dos riscos psicossociais, tendo autorizado a realização da avaliação preliminar.";

            if (psicossocial.autorizado === 2)
                return "A empresa foi devidamente orientada quanto à necessidade e obrigatoriedade da avaliação dos riscos psicossociais, porém optou por não autorizar a realização da avaliação preliminar.";
        }

        else if (psicossocial.orientacao === 2) {
            if (psicossocial.autorizado === 1)
                return "A empresa não recebeu orientação prévia quanto à necessidade e obrigatoriedade da avaliação dos riscos psicossociais, contudo autorizou a realização da avaliação preliminar.";

            if (psicossocial.autorizado === 2)
                return "A empresa não recebeu orientação prévia quanto à necessidade e obrigatoriedade da avaliação dos riscos psicossociais e não autorizou a realização da avaliação preliminar.";
        }

        return "Não foi possível determinar as condições de orientação e autorização relacionadas à avaliação dos riscos psicossociais.";
    }

    function getStatusClass() {
        if (psicossocial.autorizado === 1) return "psico-ok";
        if (psicossocial.autorizado === 2) return "psico-alerta";
        return "psico-neutro";
    }

    function getStatusLabel() {
        if (psicossocial.autorizado === 1) return "AVALIAÇÃO AUTORIZADA";
        if (psicossocial.autorizado === 2) return "AVALIAÇÃO NÃO AUTORIZADA";
        return "STATUS NÃO INFORMADO";
    }

    const dataAtual = new Date().toLocaleDateString("pt-BR");

    const empresas = [
        psicossocial.empresa,
        ...(psicossocial.inclusas || [])
    ].filter(Boolean);

    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">

<style>
@page {
    size: A4;
    margin: 20mm;
}

body {
    font-family: Arial, sans-serif;
    color: #000;
    font-size: 12px;
    background-color: #fff;
}

/* CONTAINER */
.container {
    width: 70%;
    margin: 3rem auto;
}

/* HEADER */
.titulo {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}

.subtitulo {
    text-align: center;
    font-size: 12px;
    margin-bottom: 20px;
}

/* INFO */
.info {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 15px;
}

.empresas {
    margin: 5px 0 10px 15px;
}

/* BLOCO */
.psico-box {
    border-left: 6px solid;
    padding: 12px;
    margin-top: 10px;
    page-break-inside: avoid;
}

.psico-ok {
    border-color: #4caf50;
}

.psico-alerta {
    border-color: #ff9800;
}

.psico-neutro {
    border-color: #999;
}

/* TEXTO */
.status {
    font-weight: bold;
    margin-bottom: 8px;
}

.descricao {
    line-height: 1.5;
}

.observacao {
    margin-top: 10px;
    padding: 8px;
    border: 1px dashed #999;
}

/* ASSINATURA */
.assinatura {
    margin-top: 40px;
    text-align: center;
    page-break-inside: avoid;
}

.assinatura-img {
    max-width: 200px;
    max-height: 100px;
    margin-bottom: 5px;
}

.linha {
    border-top: 1px solid #000;
    width: 60%;
    margin: 5px auto;
}

.nome {
    margin-top: 5px;
}

/* RODAPÉ */
.rodape {
    margin-top: 30px;
    font-size: 10px;
    text-align: center;
}
</style>
</head>

<body>
<div class="container">

    <div class="titulo">RELATÓRIO DE AVALIAÇÃO PSICOSSOCIAL</div>
    <div class="subtitulo">Documento técnico de Saúde e Segurança do Trabalho</div>

    <div class="info">
        <strong>Empresas Avaliadas:</strong>
        <ul class="empresas">
            ${empresas.map(e => `<li>${e?.razao_social} (${e?.cnpj})</li>`).join("")}
        </ul>

        <p><strong>Técnico Responsável:</strong> ${psicossocial.tecnico || "-"}</p>
        <p><strong>Responsável pela Empresa:</strong> ${psicossocial.responsavel || "-"}</p>
        <p><strong>Data:</strong> ${dataAtual}</p>
    </div>

    <div class="psico-box ${getStatusClass()}">
        <div class="status">${getStatusLabel()}</div>
        <div class="descricao">${getDesc()}</div>

        ${psicossocial.observacao
            ? `<div class="observacao"><strong>Observação:</strong> ${psicossocial.observacao}</div>`
            : ""
        }
    </div>

    ${psicossocial.assinatura ? `
    <div class="assinatura">
        <img src="${psicossocial.assinatura}" class="assinatura-img" />
        <div class="linha"></div>
        <div class="nome">${psicossocial.responsavel || ""}</div>
        <div>Responsável pela empresa</div>
    </div>
    ` : ""}

    <div class="rodape">
        Documento gerado para registro das condições relacionadas aos riscos psicossociais no ambiente de trabalho.
    </div>

</div>
</body>
</html>`;
}