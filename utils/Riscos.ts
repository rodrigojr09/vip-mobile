export interface RiscoDataType {
    _id: any;
    tipo: string;
    risco: string;
}

export const riscos = [
    "Ruído",
    "Vibração",
    "Calor",
    "Rad. Ionizantes",
    "Rad. Não Ionizantes",
    "Vibrações",
    "Frio",
    "Umidade",
    "Risco Químico",
    "Risco Biológico",
    "Risco de Acidente",
    "Risco Ergonômico",
];

export function getRiscos(): RiscoDataType[] {
    return [
        {
            _id: { oid: "664788064e9b94949c471c39" },
            tipo: "Acidente",
            risco: "Abrasões",
        },
        {
            _id: { oid: "664788064e9b94949c471c3a" },
            tipo: "Acidente",
            risco: "Acidente com ferramentas, queda de mesmo nível",
        },
        {
            _id: { oid: "664788064e9b94949c471c3b" },
            tipo: "Acidente",
            risco: "Acidente de trânsito",
        },
        {
            _id: { oid: "664788064e9b94949c471c3c" },
            tipo: "Acidente",
            risco: "Acidente por contato em componentes de transmissão de força de máquinas",
        },
        {
            _id: { oid: "664788064e9b94949c471c3d" },
            tipo: "Acidente",
            risco: "Acidente trânsito de empilhadeira",
        },
        {
            _id: { oid: "664788064e9b94949c471c3e" },
            tipo: "Acidente",
            risco: "Acidentes causados por Iluminamento inadequado",
        },
        {
            _id: { oid: "664788064e9b94949c471c3f" },
            tipo: "Acidente",
            risco: "Acidentes provocado por objetos (ferramentas) perfuro-cortantes em atividade de eletricista",
        },
        {
            _id: { oid: "664788064e9b94949c471c40" },
            tipo: "Acidente",
            risco: "Afogamento",
        },
        {
            _id: { oid: "664788064e9b94949c471c41" },
            tipo: "Acidente",
            risco: "Ambientes com risco de afogamento",
        },
        {
            _id: { oid: "664788064e9b94949c471c42" },
            tipo: "Acidente",
            risco: "Ambientes com risco de engolfamento",
        },
        {
            _id: { oid: "664788064e9b94949c471c43" },
            tipo: "Acidente",
            risco: "Ambientes com risco de soterramento",
        },
        {
            _id: { oid: "664788064e9b94949c471c44" },
            tipo: "Acidente",
            risco: "Animais domésticos",
        },
        {
            _id: { oid: "664788064e9b94949c471c45" },
            tipo: "Acidente",
            risco: "Animais peçonhentos",
        },
        {
            _id: { oid: "664788064e9b94949c471c46" },
            tipo: "Acidente",
            risco: "Animais selvagens",
        },
        {
            _id: { oid: "664788064e9b94949c471c47" },
            tipo: "Acidente",
            risco: "Áreas classificadas",
        },
        {
            _id: { oid: "664788064e9b94949c471c48" },
            tipo: "Acidente",
            risco: "Áreas de movimentação de materiais sem demarcação",
        },
        {
            _id: { oid: "664788064e9b94949c471c49" },
            tipo: "Acidente",
            risco: "Áreas de trânsito de pedestres sem demarcação",
        },
        {
            _id: { oid: "664788064e9b94949c471c4a" },
            tipo: "Acidente",
            risco: "Áreas de trânsito de veículos sem demarcação",
        },
        {
            _id: { oid: "664788064e9b94949c471c4b" },
            tipo: "Acidente",
            risco: "Armazenamento inadequado",
        },
        {
            _id: { oid: "664788064e9b94949c471c4c" },
            tipo: "Acidente",
            risco: "Arranjo físico deficiente ou inadequado",
        },
        {
            _id: { oid: "664788064e9b94949c471c4d" },
            tipo: "Acidente",
            risco: "Atropelamento",
        },
        {
            _id: { oid: "664788064e9b94949c471c4e" },
            tipo: "Acidente",
            risco: "Cavaco nos olhos",
        },
        {
            _id: { oid: "664788064e9b94949c471c4f" },
            tipo: "Acidente",
            risco: "Choque elétrico",
        },
        {
            _id: { oid: "664788064e9b94949c471c50" },
            tipo: "Acidente",
            risco: "Colisão",
        },
        {
            _id: { oid: "664788064e9b94949c471c51" },
            tipo: "Acidente",
            risco: "Colisões de veículos",
        },
        {
            _id: { oid: "664788064e9b94949c471c52" },
            tipo: "Acidente",
            risco: "Condições ou procedimentos que possam provocar contato com eletricidade",
        },
        {
            _id: { oid: "664788064e9b94949c471c53" },
            tipo: "Acidente",
            risco: "Condução de veículos de qualquer natureza em vias públicas",
        },
        {
            _id: { oid: "664788064e9b94949c471c54" },
            tipo: "Acidente",
            risco: "Contato com ferramentas e materiais causadores de cortes e lacerações",
        },
        {
            _id: { oid: "664788064e9b94949c471c55" },
            tipo: "Acidente",
            risco: "Contato com pontos de operação das máquinas que utilizam serra (circular e/ou fita) para efetuar cortes",
        },
        {
            _id: { oid: "664788064e9b94949c471c56" },
            tipo: "Acidente",
            risco: "Contato com superfícies quentes",
        },
        {
            _id: { oid: "664788064e9b94949c471c57" },
            tipo: "Acidente",
            risco: "Contusão por levantamento manual de peso",
        },
        {
            _id: { oid: "664788064e9b94949c471c58" },
            tipo: "Acidente",
            risco: "Contusões e fraturas",
        },
        {
            _id: { oid: "664788064e9b94949c471c59" },
            tipo: "Acidente",
            risco: "Contusões, fraturas e esmagamento",
        },
        {
            _id: { oid: "664788064e9b94949c471c5a" },
            tipo: "Acidente",
            risco: "Correias de máquinas sem proteção",
        },
        {
            _id: { oid: "664788064e9b94949c471c5b" },
            tipo: "Acidente",
            risco: "Corte nos membros superiores por manuseio de facas e máquinas para corte",
        },
        {
            _id: { oid: "664788064e9b94949c471c5c" },
            tipo: "Acidente",
            risco: "Corte nos membros superiores por manuseio de facas",
        },
        {
            _id: { oid: "664788064e9b94949c471c5d" },
            tipo: "Acidente",
            risco: "Corte por projeção de cacos de vidro por manipulação inadequada de garrafas com conteúdo sob pressão",
        },
        {
            _id: { oid: "664788064e9b94949c471c5e" },
            tipo: "Acidente",
            risco: "Corte por projeção de cacos de vidro por manipulação inadequada",
        },
        {
            _id: { oid: "664788064e9b94949c471c5f" },
            tipo: "Acidente",
            risco: "Corte por queda de objetos perfuro-cortantes",
        },
        {
            _id: { oid: "664788064e9b94949c471c60" },
            tipo: "Acidente",
            risco: "Corte/perfuração por manuseio inadequado de agulhas e/ou seringas",
        },
        {
            _id: { oid: "664788064e9b94949c471c61" },
            tipo: "Acidente",
            risco: "Cortes",
        },
        {
            _id: { oid: "664788064e9b94949c471c62" },
            tipo: "Acidente",
            risco: "Cortes e perfurações",
        },
        {
            _id: { oid: "664788064e9b94949c471c63" },
            tipo: "Acidente",
            risco: "Cortes, contusões e fraturas",
        },
        {
            _id: { oid: "664788064e9b94949c471c64" },
            tipo: "Acidente",
            risco: "Cortes, contusões, fraturas ou perfurações",
        },
        {
            _id: { oid: "664788064e9b94949c471c65" },
            tipo: "Acidente",
            risco: "Cortes, fraturas e/ou perfurações",
        },
        {
            _id: { oid: "664788064e9b94949c471c66" },
            tipo: "Acidente",
            risco: "Danos físicos",
        },
        {
            _id: { oid: "664788064e9b94949c471c67" },
            tipo: "Acidente",
            risco: "Decorrente da própria atividade laboral",
        },
        {
            _id: { oid: "664788064e9b94949c471c68" },
            tipo: "Acidente",
            risco: "Diferença de nível maior que dois metros",
        },
        {
            _id: { oid: "664788064e9b94949c471c69" },
            tipo: "Acidente",
            risco: "Diferença de nível menor ou igual a dois metros",
        },
        {
            _id: { oid: "664788064e9b94949c471c6a" },
            tipo: "Acidente",
            risco: "Eletricidade",
        },
        {
            _id: { oid: "664788064e9b94949c471c6b" },
            tipo: "Acidente",
            risco: "Emborcamento",
        },
        {
            _id: { oid: "664788064e9b94949c471c6c" },
            tipo: "Acidente",
            risco: "Escadas e rampas inadequadas",
        },
        {
            _id: { oid: "664788064e9b94949c471c6d" },
            tipo: "Acidente",
            risco: "Esmagamento",
        },
        {
            _id: { oid: "664788064e9b94949c471c6e" },
            tipo: "Acidente",
            risco: "Esmagamentos, coices, cabeçadas ou chifradas",
        },
        {
            _id: { oid: "664788064e9b94949c471c6f" },
            tipo: "Acidente",
            risco: "Espaço confinado",
        },
        {
            _id: { oid: "664788064e9b94949c471c70" },
            tipo: "Acidente",
            risco: "Explosão",
        },
        {
            _id: { oid: "664788064e9b94949c471c71" },
            tipo: "Acidente",
            risco: "Explosão de caldeira",
        },
        {
            _id: { oid: "664788064e9b94949c471c72" },
            tipo: "Acidente",
            risco: "Falta de atenção e cautela ao atracar a embarcação",
        },
        {
            _id: { oid: "664788064e9b94949c471c73" },
            tipo: "Acidente",
            risco: "Ferramentas inadequadas",
        },
        {
            _id: { oid: "664788064e9b94949c471c74" },
            tipo: "Acidente",
            risco: "Ferramentas necessitando de ajustes e manutenção",
        },
        {
            _id: { oid: "664788064e9b94949c471c75" },
            tipo: "Acidente",
            risco: "Ferroada de abelha",
        },
        {
            _id: { oid: "664788064e9b94949c471c76" },
            tipo: "Acidente",
            risco: "Frequente execução de movimentos repetitivos",
        },
        {
            _id: { oid: "664788064e9b94949c471c77" },
            tipo: "Acidente",
            risco: "Fundição",
        },
        {
            _id: { oid: "664788064e9b94949c471c78" },
            tipo: "Acidente",
            risco: "Iluminação diurna inadequada",
        },
        {
            _id: { oid: "664788064e9b94949c471c79" },
            tipo: "Acidente",
            risco: "Iluminação noturna inadequada",
        },
        {
            _id: { oid: "664788064e9b94949c471c7a" },
            tipo: "Acidente",
            risco: "Incêndio e/ou explosão",
        },
        {
            _id: { oid: "664788064e9b94949c471c7b" },
            tipo: "Acidente",
            risco: "Inflamável",
        },
        {
            _id: { oid: "664788064e9b94949c471c7c" },
            tipo: "Acidente",
            risco: "Instalação, testes e manutenção de máquinas e equipamentos",
        },
        {
            _id: { oid: "664788064e9b94949c471c7d" },
            tipo: "Acidente",
            risco: "Intempéries",
        },
        {
            _id: { oid: "664788064e9b94949c471c7e" },
            tipo: "Acidente",
            risco: "Intoxicação por produtos químicos",
        },
        {
            _id: { oid: "664788064e9b94949c471c7f" },
            tipo: "Acidente",
            risco: "Intoxicações",
        },
        {
            _id: { oid: "664788064e9b94949c471c80" },
            tipo: "Acidente",
            risco: "Manuseio de ferramentas",
        },
        {
            _id: { oid: "664788064e9b94949c471c81" },
            tipo: "Acidente",
            risco: "Manutenção",
        },
        {
            _id: { oid: "664788064e9b94949c471c82" },
            tipo: "Acidente",
            risco: "Máquinas e equipamentos necessitando ajustes e manutenção",
        },
        {
            _id: { oid: "664788064e9b94949c471c83" },
            tipo: "Acidente",
            risco: "Máquinas e equipamentos sem proteção",
        },
        {
            _id: { oid: "664788064e9b94949c471c84" },
            tipo: "Acidente",
            risco: "Mecânicos",
        },
        {
            _id: { oid: "664788064e9b94949c471c85" },
            tipo: "Acidente",
            risco: "Mobiliário e/ou superfícies com quinas vivas, rebarbas ou elementos de fixação expostos",
        },
        {
            _id: { oid: "664788064e9b94949c471c86" },
            tipo: "Acidente",
            risco: "Mordidas",
        },
        {
            _id: { oid: "664788064e9b94949c471c87" },
            tipo: "Acidente",
            risco: "Móveis de aço soltos",
        },
        {
            _id: { oid: "664788064e9b94949c471c88" },
            tipo: "Acidente",
            risco: "Movimentação de materiais",
        },
        {
            _id: { oid: "664788064e9b94949c471c89" },
            tipo: "Acidente",
            risco: "Objetos cortantes e/ou perfurocortantes",
        },
        {
            _id: { oid: "664788064e9b94949c471c8a" },
            tipo: "Acidente",
            risco: "Operação de motosserras",
        },
        {
            _id: { oid: "664788064e9b94949c471c8b" },
            tipo: "Acidente",
            risco: "Operação de munck",
        },
        {
            _id: { oid: "664788064e9b94949c471c8c" },
            tipo: "Acidente",
            risco: "Operar BobCat em área energizada",
        },
        {
            _id: { oid: "664788064e9b94949c471c8d" },
            tipo: "Acidente",
            risco: "Outros",
        },
        {
            _id: { oid: "664788064e9b94949c471c8e" },
            tipo: "Acidente",
            risco: "Perda excessiva do calor do corpo",
        },
        {
            _id: { oid: "664788064e9b94949c471c8f" },
            tipo: "Acidente",
            risco: "Perfuração",
        },
        {
            _id: { oid: "664788064e9b94949c471c90" },
            tipo: "Acidente",
            risco: "Perfurações",
        },
        {
            _id: { oid: "664788064e9b94949c471c91" },
            tipo: "Acidente",
            risco: "Pisos, passagens, passarelas, plataformas, rampas e corredores com saliências, descontinuidades, aberturas ou obstruções, ou escorregadios",
        },
        {
            _id: { oid: "664788064e9b94949c471c92" },
            tipo: "Acidente",
            risco: "Possibilidade de exposição a violência/agressão no ambiente de trabalho",
        },
        {
            _id: { oid: "664788064e9b94949c471c93" },
            tipo: "Acidente",
            risco: "Probabilidade de incêndio ou explosão",
        },
        {
            _id: { oid: "664788064e9b94949c471c94" },
            tipo: "Acidente",
            risco: "Procedimentos de ajuste, limpeza, manutenção e inspeção deficientes ou inexistentes",
        },
        {
            _id: { oid: "664788064e9b94949c471c95" },
            tipo: "Acidente",
            risco: "Projeção de partículas de mistura química nos olhos",
        },
        {
            _id: { oid: "664788064e9b94949c471c96" },
            tipo: "Acidente",
            risco: "Projeção de partículas em operação de corte de alumínio, esmerilhamento e outras atividades",
        },
        {
            _id: { oid: "664788064e9b94949c471c97" },
            tipo: "Acidente",
            risco: "Projeção de partículas em operações de corte de ferro, esmerilhamento e outras atividades semelhantes",
        },
        {
            _id: { oid: "664788064e9b94949c471c98" },
            tipo: "Acidente",
            risco: "Projeção de partículas em operações diversas de manutenção",
        },
        {
            _id: { oid: "664788064e9b94949c471c99" },
            tipo: "Acidente",
            risco: "Projeção de partículas volantes",
        },
        {
            _id: { oid: "664788064e9b94949c471c9a" },
            tipo: "Acidente",
            risco: "Projeção de resíduos de madeira nos processos de corte e lixação de madeira",
        },
        {
            _id: { oid: "664788064e9b94949c471c9b" },
            tipo: "Acidente",
            risco: "Queda de materiais",
        },
        {
            _id: { oid: "664788064e9b94949c471c9c" },
            tipo: "Acidente",
            risco: "Queda da rampa de carregamento",
        },
        {
            _id: { oid: "664788064e9b94949c471c9d" },
            tipo: "Acidente",
            risco: "Queda de altura",
        },
        {
            _id: { oid: "664788064e9b94949c471c9e" },
            tipo: "Acidente",
            risco: "Queda de diferença de nível",
        },
        {
            _id: { oid: "664788064e9b94949c471c9f" },
            tipo: "Acidente",
            risco: "Queda de galhos",
        },
        {
            _id: { oid: "664788064e9b94949c471ca0" },
            tipo: "Acidente",
            risco: "Queda de materiais (restos de construção)",
        },
        {
            _id: { oid: "664788064e9b94949c471ca1" },
            tipo: "Acidente",
            risco: "Queda de material",
        },
        {
            _id: { oid: "664788064e9b94949c471ca2" },
            tipo: "Acidente",
            risco: "Queda de objetos",
        },
        {
            _id: { oid: "664788064e9b94949c471ca3" },
            tipo: "Acidente",
            risco: "Queda de peças",
        },
        {
            _id: { oid: "664788064e9b94949c471ca4" },
            tipo: "Acidente",
            risco: "Queda no piso escorregadio ou molhado",
        },
        {
            _id: { oid: "664788064e9b94949c471ca5" },
            tipo: "Acidente",
            risco: "Queimadura (chamas provenientes da caldeira e/ou recolhimento de cinza)",
        },
        {
            _id: { oid: "664788064e9b94949c471ca6" },
            tipo: "Acidente",
            risco: "Queimadura (solda)",
        },
        {
            _id: { oid: "664788064e9b94949c471ca7" },
            tipo: "Acidente",
            risco: "Queimadura em máquina de passar roupas (lençóis)",
        },
        {
            _id: { oid: "664788064e9b94949c471ca8" },
            tipo: "Acidente",
            risco: "Queimadura por contato com azeite quente proveniente de fritador para cones de massa",
        },
        {
            _id: { oid: "664788064e9b94949c471ca9" },
            tipo: "Acidente",
            risco: "Queimadura por manipulação de recipientes (panelas, formas) utilizadas no preparo de alimentos",
        },
        {
            _id: { oid: "664788064e9b94949c471caa" },
            tipo: "Acidente",
            risco: "Queimaduras",
        },
        {
            _id: { oid: "664788064e9b94949c471cab" },
            tipo: "Acidente",
            risco: "Respingo de água quente na face",
        },
        {
            _id: { oid: "664788064e9b94949c471cac" },
            tipo: "Acidente",
            risco: "Respingo de óleo quente nos olhos e face",
        },
        {
            _id: { oid: "664788064e9b94949c471cad" },
            tipo: "Acidente",
            risco: "Respingo de produto químico nos olhos",
        },
        {
            _id: { oid: "664788064e9b94949c471cae" },
            tipo: "Acidente",
            risco: "Respingo de produtos químicos",
        },
        {
            _id: { oid: "664788064e9b94949c471caf" },
            tipo: "Acidente",
            risco: "Risco da atividade",
        },
        {
            _id: { oid: "664788064e9b94949c471cb0" },
            tipo: "Acidente",
            risco: "Roubos ou outras espécies de violência física",
        },
        {
            _id: { oid: "664788064e9b94949c471cb1" },
            tipo: "Acidente",
            risco: "Sinalização deficiente e/ou inadequada",
        },
        {
            _id: { oid: "664788064e9b94949c471cb2" },
            tipo: "Acidente",
            risco: "Sinalização e isolamento ambiente",
        },
        {
            _id: { oid: "664788064e9b94949c471cb3" },
            tipo: "Acidente",
            risco: "Solda",
        },
        {
            _id: { oid: "664788064e9b94949c471cb4" },
            tipo: "Acidente",
            risco: "Superfícies e/ou materiais aquecidos expostos",
        },
        {
            _id: { oid: "664788064e9b94949c471cb5" },
            tipo: "Acidente",
            risco: "Superfícies e/ou materiais em baixa temperatura expostos",
        },
        {
            _id: { oid: "664788064e9b94949c471cb6" },
            tipo: "Acidente",
            risco: "Tombamento",
        },
        {
            _id: { oid: "664788064e9b94949c471cb7" },
            tipo: "Acidente",
            risco: "Trabalhos em altura",
        },
        {
            _id: { oid: "664788064e9b94949c471cb8" },
            tipo: "Acidente",
            risco: "Trabalhos em espaços confinados",
        },
        {
            _id: { oid: "664788064e9b94949c471cb9" },
            tipo: "Acidente",
            risco: "Uso de ar comprimido",
        },
        {
            _id: { oid: "664789c24e9b94949c471cba" },
            risco: "Assento inadequado",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cbb" },
            risco: "Cadência do trabalho imposta por um equipamento",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cbc" },
            risco: "Compressão de partes do corpo por superfícies rígidas ou com quinas",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cbd" },
            risco: "Controle rígido de produtividade",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cbe" },
            risco: "Desequilíbrio entre tempo de trabalho e tempo de repouso",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cbf" },
            risco: "Encosto do assento inadequado ou ausente",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc0" },
            risco: "Equipamentos e/ou máquinas sem meios de regulagem de ajuste ou sem condições de uso",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc1" },
            risco: "Equipamentos ou mobiliários não adaptados à antropometria do trabalhador",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc2" },
            risco: "Exigência de alto nível de concentração, atenção e memória",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc3" },
            risco: "Exigência de elevação frequente de membros superiores",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc4" },
            risco: "Exigência de flexões de coluna vertebral frequentes",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc5" },
            risco: "Exigência de postura inadequada",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc6" },
            risco: "Exigência de realização de múltiplas tarefas, com alta demanda cognitiva",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc7" },
            risco: "Exigência de uso frequente de força, pressão, preensão, flexão, extensão ou torção dos segmentos corporais",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc8" },
            risco: "Flexão da cervical e abdução dos ombros",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cc9" },
            risco: "Flexão da cervical e deslocamento constante",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cca" },
            risco: "Flexão da cervical e extensão dos punhos.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ccb" },
            risco: "Flexão da cervical, da coluna lombar e dos ombros.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ccc" },
            risco: "Flexão da cervical, dos punhos e ombros.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ccd" },
            risco: "Flexão da cervical, rotação do tronco",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cce" },
            risco: "Flexão da cervical, rotação do tronco e abdução dos ombros.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ccf" },
            risco: "Flexão da cervical, rotação do tronco e flexão dos ombros.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd0" },
            risco: "Flexão da cervical, rotação do tronco e flexão dos punhos.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd1" },
            risco: "Flexão da coluna lombar e dos punhos.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd2" },
            risco: "Flexão da coluna lombar, extensão dos punhos e flexão dos ombros.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd3" },
            risco: "Flexão de tronco, flexão da cervical e extensão dos ombros.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd4" },
            risco: "Flexão de tronco, flexão da cervical e extensão dos punhos.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd5" },
            risco: "Flexão e rotação de tronco e da coluna cervical",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd6" },
            risco: "Flexões de coluna vertebral frequentes",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd7" },
            risco: "Frequente ação de puxar/empurrar cargas ou volumes",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd8" },
            risco: "Frequente deslocamento a pé durante a jornada de trabalho",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cd9" },
            risco: "Frequente execução de movimentos repetitivos",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cda" },
            risco: "Iluminação Inadequada",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cdb" },
            risco: "Imposição de ritmos excessivos de trabalho",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cdc" },
            risco: "Insatisfação no trabalho",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cdd" },
            risco: "Insuficiência de capacitação para execução da tarefa",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cde" },
            risco: "Jornadas de trabalho prolongadas",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cdf" },
            risco: "LER",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce0" },
            risco: "LER/DORT",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce1" },
            risco: "Levantamento de peso, cargas e volumes",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce2" },
            risco: "Levantamento e transporte manual de cargas ou volumes",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce3" },
            risco: "Levantamento e transporte manual de peso",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce4" },
            risco: "Manuseio de ferramentas e/ou objetos pesados por longos períodos",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce5" },
            risco: "Manuseio de galões cheios e manipulam compensados para acomodação das cargas.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce6" },
            risco: 'Manuseio ou movimentação de cargas e volumes sem pega ou com "pega pobre"',
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce7" },
            risco: "Mobiliário ou equipamento sem espaço para movimentação de segmentos corporais",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce8" },
            risco: "Mobiliário sem meios de regulagem de ajuste",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ce9" },
            risco: "Monotonia",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cea" },
            risco: "Monotonia e Repetitividade",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ceb" },
            risco: "Movimentos repetitivos de punhos, mão e braços",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cec" },
            risco: "Outras situações causadoras de estresse físico e/ou psíquico",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471ced" },
            risco: "Piso escorregadio e/ou irregular",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cee" },
            risco: "Posto de trabalho improvisado",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cef" },
            risco: "Posto de trabalho não planejado/adaptado para a posição sentada",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf0" },
            risco: "Postura (trabalho com computador).",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf1" },
            risco: "Postura constante em pé / Postura vertical em pé",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf2" },
            risco: "Postura constante em pé e agachado",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf3" },
            risco: "Postura de pé por longos períodos",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf4" },
            risco: "Postura forçada e desajuste estrutural de coluna",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf5" },
            risco: "Postura Inadequada",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf6" },
            risco: "Postura predominante sentada",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf7" },
            risco: "Postura sentada por longos períodos",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf8" },
            risco: "Postural",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cf9" },
            risco: "Presença de reflexos em telas, painéis, vidros, monitores ou qualquer superfície, que causem desconforto ou prejudiquem a visualização",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cfa" },
            risco: "Risco de patologias de MMSS, coluna cervical.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cfb" },
            risco: "Risco em desconforto de membros superiores e coluna cervical na manipulação das ferramentas",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cfc" },
            risco: "Risco minimo em estruturas corporais como: membros inferiores e coluna lombar",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cfd" },
            risco: "Riscos em patologias de membros superiores e inferiores",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cfe" },
            risco: "Rotação da coluna torácica e Flexão dos ombros.",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471cff" },
            risco: "Situações de sobrecarga de trabalho mental",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d00" },
            risco: "Sobrecarga psíquica e muscular estática de pescoço, ombros, dorso e membros superiores",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d01" },
            risco: "Tensões musculares",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d02" },
            risco: "Trabalho com demandas divergentes (ordens divergentes, metas incompatíveis entre si, exigência de qualidade X quantidade, entre outras)",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d03" },
            risco: "Trabalho com esforço físico intenso",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d04" },
            risco: "Trabalho com necessidade de alcançar objetos, documentos, controles ou qualquer ponto além das zonas de alcance ideais para as características antropométricas do trabalhador",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d05" },
            risco: "Trabalho com necessidade de variação de turnos",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d06" },
            risco: "Trabalho com utilização rigorosa de metas de produção",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d07" },
            risco: "Trabalho em condições de difícil comunicação",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d08" },
            risco: "Trabalho em posturas incômodas ou pouco confortáveis por longos períodos",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d09" },
            risco: "Trabalho em turno e noturno",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d0a" },
            risco: "Trabalho intensivo com teclado ou outros dispositivos de entrada de dados",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d0b" },
            risco: "Trabalho noturno",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d0c" },
            risco: "Trabalho realizado sem pausas pré-definidas para descanso",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d0d" },
            risco: "Trabalho remunerado por produção",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d0e" },
            risco: "Transporte Manual / Levantamento de Peso",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d0f" },
            risco: "Uso frequente de alavancas",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d10" },
            risco: "Uso frequente de escadas",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664789c24e9b94949c471d11" },
            risco: "Uso frequente de pedais",
            tipo: "Ergonomico",
        },
        {
            _id: { oid: "664b86754341c7488e24330f" },
            risco: "Composto de inseticida: este produto químico é um preparado",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243310" },
            risco: "Inseticida",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243311" },
            risco: "SUVINIL CONSTRUCOES ACRILICO STANDARD FOSCO BRANCO",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243312" },
            risco: "CORAL DECORA ACRÍLICO FOSCO BASE PMFT",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243313" },
            risco: "Graxa lubrificante",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243314" },
            risco: "Composto químico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243315" },
            risco: "2-PROPANOL",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243316" },
            risco: "RIGON GS",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243317" },
            risco: "Composto químico inseticida",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243318" },
            risco: "Raticida",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243319" },
            risco: "VERNIZ BASE EPOXI POLIAMIDA PLUS (BRASEPOXI)",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24331a" },
            risco: "ACETATO DE ETILA",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24331b" },
            risco: "ACETATO DE N-BUTILA",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24331c" },
            risco: "ACETONA",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24331d" },
            risco: "Adesivo formulado para colagem de topo de espuma de PU entre si, substratos de adamold, ABS, polipress, feltros fenolicos prensados, lignotock com: laminados de PVC, tecidos de poliester, carpetes, etc.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24331e" },
            risco: "SW VERNIZ COPAL BR INCOLOR",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24331f" },
            risco: "Fabricação e manipulação de ácido fosfórico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243320" },
            risco: "MAZA VERNIZ MARÍTIMO - BRILHANTE",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243321" },
            risco: "Composto químico representado pela fórmula HNO3, líquido viscoso, inodoro e incolor, muito volátil, forte oxidante, corrosivo, miscível em água.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243322" },
            risco: "Ácido sulfúrico, também conhecido como vitríolo, é um ácido mineral composto pelos elementos enxofre, oxigênio e hidrogênio com a fórmula molecular H2SO4. É um líquido viscoso, incolor, inodoro e solúvel em água, produzindo uma reação altamente exotérmica.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243323" },
            risco: "Verniz",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243324" },
            risco: "PLASTEEL CERÂMICO ESPATULÁVEL CINZA",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243325" },
            risco: "Água destilada é a água obtida por meio da destilação (condensação do vapor de água obtido pela ebulição ou pela evaporação) de água não pura (que contém outras substâncias dissolvidas), e então condensada em outro recipiente.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243326" },
            risco: "SUVINIL AGUARRAS",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243327" },
            risco: "MAZA AGUARRAZ",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243328" },
            risco: "MAZA DEMARCACAO ACRÍLICA DNIT 3,16",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243329" },
            risco: "Alaranjado de metila, também chamado de alaranjado de metilo, laranja de metila, heliantina ou ainda metilorange é um indicador de pH frequentemente usado em titulações. É frequentemente escolhido para ser usado em titulações por causa de sua clara mudança de coloração.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24332a" },
            risco: "Álcalis cáusticos",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24332b" },
            risco: "CORAL VERNIZ ACRÍLICO",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24332c" },
            risco: "Thinner",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24332d" },
            risco: "ÁLCOOL ISOBUTÍLICO",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24332e" },
            risco: "ÁLCOOL N-BUTÍLICO",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24332f" },
            risco: "Impermeabilizante",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243330" },
            risco: "Cimento portland",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243331" },
            risco: "Antimônio e compostos",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243332" },
            risco: "Cimento",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243333" },
            risco: "Argamassa",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243334" },
            risco: "Extração e manipulação de arsênico e preparação de seus compostos. Fabricação e preparação de tintas à base de arsênico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243335" },
            risco: "Fabricação de produtos parasiticidas, inseticidas e raticidas contendo compostos de arsênico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243336" },
            risco: "Pintura a pistola com pigmentos de compostos de arsênico, em recintos limitados ou fechados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243337" },
            risco: "Preparação do Secret",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243338" },
            risco: "Produção de trióxido de arsênico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243339" },
            risco: "Bronzeamento em negro e verde com compostos de arsênico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24333a" },
            risco: "Conservação e peles e plumas; depilação de peles à base de compostos de arsênico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24333b" },
            risco: "Descoloração de vidros e cristais à base de compostos de arsênico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24333c" },
            risco: "Emprego de produtos parasiticidas, inseticidas e raticidas à base de compostos de arsênico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24333d" },
            risco: "Fabricação de cartas de jogar, papéis pintados e flores artificiais à base de compostos de arsênico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24333e" },
            risco: "Metalurgia de minérios arsenicais (ouro, prata, chumbo, zinco, níquel, antimônio, cobalto e ferro)",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24333f" },
            risco: "Operações de galvanotécnica à base de compostos de arsênico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243340" },
            risco: "Pintura manual (pincel, rolo e escova) com pigmentos de compostos de arsênico em recintos limitados ou fechados, exceto com pincel capilar",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243341" },
            risco: "Empalhamento de animais à base de compostos de arsênico",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243342" },
            risco: "Fabricação de tafetá sire",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243343" },
            risco: "Pintura a pistola ou manual com pigmentos de compostos de arsênico ao ar livre",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243344" },
            risco: "Manipulação de outras substâncias cancerígenas afins",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243345" },
            risco: "HIDROCARBONETOS E OUTROS COMPOSTOS DE CARBONO: Manipulação de outras substâncias cancerígenas afins",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243346" },
            risco: "Composto químico de inseticida",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243347" },
            risco: "Composição",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243348" },
            risco: "Cádmio presente na quantificação dos fumos metálicos da solda",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243349" },
            risco: "Operações com cádmio e seus compostos, extração, tratamento, preparação de ligas, fabricação e emprego de seus compostos, solda com cádmio, utilização em fotografia com luz ultravioleta, em fabricação de vidros, como antioxidante, em revestimentos metálicos, e outros produtos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24334a" },
            risco: "Cal e Cimento",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24334b" },
            risco: "Composição química",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24334c" },
            risco: "CAL HIDRATADA",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24334d" },
            risco: "Trabalho permanente no subsolo em operações de corte, furação e desmonte, de operações de carregamento no local de desmonte, em atividades de manobra, nos pontos de transferência de carga e de viradores.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24334e" },
            risco: "Demais atividades permanentes do subsolo compreendendo serviços, tais como: operações de locomotiva, condutores, engatadores, bombeiros, madeireiros, trilheiros e eletricistas.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24334f" },
            risco: "Atividades permanentes de superfícies nas operações a seco, com britadores, peneiras, classificadores, carga e descarga de silos, de transportadores de correia e de teleféricos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243350" },
            risco: "Tintas Sumaré - Diluente 951",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243351" },
            risco: "Fabricação de compostos de chumbo, carbonato, arseniato, cromato mínio, litargírio e outros.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243352" },
            risco: "Fabricação de esmaltes, vernizes, cores, pigmentos, tintas, ungüentos, óleos, pastas, líquidos e pós à base de compostos de chumbo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243353" },
            risco: "Fabricação e restauração de acumuladores, pilhas e baterias elétricas contendo compostos de chumbo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243354" },
            risco: "Limpeza, raspagem e reparação de tanques de mistura, armazenamento e demais trabalhos com gasolina contendo chumbo tetraetila.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243355" },
            risco: "Pintura a pistola com pigmentos de compostos de chumbo em recintos limitados ou fechados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243356" },
            risco: "Aplicação e empregos de esmaltes, vernizes, cores, tintas, pigmentos, ungüentos, óleos, pastas, líquidos e pós à base de compostos de chumbo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243357" },
            risco: "Fabricação de porcelana com esmaltes de compostos de chumbo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243358" },
            risco: "Pintura e decoração manual (pincel, rolo e escova) com pigmentos de compostos de chumbo (exceto pincel capilar), em recintos limitados ou fechados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243359" },
            risco: "Tinturaria e estamparia com pigmentos à base de compostos de chumbo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24335a" },
            risco: "Pintura a pistola ou manual com pigmentos de compostos de chumbo ao ar livre.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24335b" },
            risco: "Fabricação e emprego de chumbo tetraetila de chumbo tetrametila.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24335c" },
            risco: "Fundição e laminação de zinco velho, cobre e latão.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24335d" },
            risco: "Vulcanização de borracha pelo litargírio ou outros compostos de chumbo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24335e" },
            risco: "CICLOHEXANO",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24335f" },
            risco: "Carbonato de Cálcio e Silicatos",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243360" },
            risco: "Cloreto de Amónio, Cloreto de Amônio ou ainda sal amoníaco é o composto químico inorgânico de fórmula NH4Cl. É um sal cristalino e branco, altamente solúvel em água. Soluções de cloreto de amônio são levemente ácidas.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243361" },
            risco: "COMBACTER 800 ia (desinfetante)",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243362" },
            risco: "Cloreto de sódio, popularmente conhecido como sal ou sal de cozinha, é uma substância largamente utilizada, formada na proporção de um átomo de cloro para cada átomo de sódio. A sua fórmula química é NaCl. O sal é essencial para a vida animal e é também um importante conservante de alimentos e um popular tempero.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243363" },
            risco: "O cloro (do grego khlorós, esverdeado) é um elemento químico, símbolo Cl, número atômico 17. Está contido no grupo dos halogênios (grupo 17; anteriormente conhecido como VIIA) e é o segundo halógeno mais leve, após o flúor. Sob condições normais é um gás de coloração amarelo esverdeada, onde forma as moléculas diatômicas. Tem a maior afinidade eletrônica, e a quarta maior eletronegatividade de todos os elementos reativos. E por esta razão, o cloro é um forte agente oxidante. O cloro livre é raro na Terra, e, geralmente, é um resultado da oxidação direta ou indireta, por oxigênio.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243364" },
            risco: "Cobalto presente na quantificação dos fumos metálicos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243365" },
            risco: "Colagens leves de forração de calçados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243366" },
            risco: "Óleo lubrificante básico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243367" },
            risco: "Espalhante adesivo não-iônico, penetrante, do grupo químico dos silicones para ser usado na agricultura.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243368" },
            risco: "MAZA DEMARCACAO ACRÍLICA DNIT 3,16.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243369" },
            risco: "Fabricação cromatos e bicromatos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24336a" },
            risco: "Cromagem eletrolítica dos metais.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24336b" },
            risco: "Manipulação de cromatos e bicromatos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24336c" },
            risco: "Tanagem e cromo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24336d" },
            risco: "Pintura a pistola com pigmentos de compostos de cromo, em recintos limitados ou fechados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24336e" },
            risco: "Fabricação de palitos fosfóricos à base de compostos de cromo (preparação da pasta e trabalho nos secadores).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24336f" },
            risco: "Pintura manual com pigmentos de compostos de cromo em recintos limitados ou fechados (exceto pincel capilar).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243370" },
            risco: "Preparação por processos fotomecânicos de clichês para impressão à base de compostos de cromo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243371" },
            risco: "Cumeno.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243372" },
            risco: "Defensivos Agrícolas.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243373" },
            risco: "HIDROCARBONETOS E OUTROS COMPOSTOS DE CARBONO.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243374" },
            risco: "Composto de inseticida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243375" },
            risco: "SUVINIL VERNIZ PREMIUM BASE AGUA BRILHANTE NATURAL.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243376" },
            risco: "Ativados Lagos Clean L.500.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243377" },
            risco: "Desengraxante Lagos Clean.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243378" },
            risco: "Desinfetante AVT – 80.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243379" },
            risco: "MAZA VERNIZ MARÍTIMO - BRILHANTE.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24337a" },
            risco: "Mistura complexa de ingredientes para desinfetante institucional, ingredientes e/ou impurezas que contribuem para o perigo. Composição e informações sobre os ingredientes: Dodecilbenzenossulfonato de sódio, Lauril éter sulfato de sódio, Bronopol.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24337b" },
            risco: "Agente químico não quantificável.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24337c" },
            risco: "Dicloreto de metileno.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24337d" },
            risco: "ANTIRRESPINGO LIQUIDO PARA SOLDA CONCENTRADO.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24337e" },
            risco: "Composto químico de raticida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24337f" },
            risco: "Participa como reagente em química analítica, solvente em preparações de formulação diversas, elaboração de outras substâncias em sínteses orgânica, Solvente de auxílio em tratamento e fabricação de artigos de couro natural e sintético e agente de polimerização.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243380" },
            risco: "CORAL DECORA ACRÍLICO FOSCO BASE PMFT.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243381" },
            risco: "MAZA DEMARCACAO ACRÍLICA DNIT 3,16.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243382" },
            risco: "SUVINIL VERNIZ PREMIUM BASE AGUA BRILHANTE NATURAL.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243383" },
            risco: "Produto de limpeza, sabão, detergente, água sanitária, cloro, etc.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243384" },
            risco: "Reagente para laboratório.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243385" },
            risco: "Emprego de cresol, naftaleno e derivados tóxicos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243386" },
            risco: "Composto de um fungicida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243387" },
            risco: "Fluido concentrado para eletroerosão a fio.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243388" },
            risco: "Resina Poliuretanicas, pigmentos orgânicos e inorgânicos, solventes aromáticos, acetatos e aditivos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243389" },
            risco: "ESPUMA EXPANSIVA DE POLIURETANO.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24338a" },
            risco: "ESTIRENO.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24338b" },
            risco: "ETANOL.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24338c" },
            risco: "O etileno ou eteno é o hidrocarboneto alceno mais simples da família das olefinas, constituído por dois átomos de carbono e quatro de hidrogênio (C2H4). Existe uma ligação dupla entre os dois carbonos. A existência de uma ligação dupla significa que o etileno é um hidrocarboneto insaturado. Pela nomenclatura IUPAC recebe a denominação de eteno.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24338d" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24338e" },
            risco: "ETILBENZENO.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24338f" },
            risco: "Super cola utilizada na preparação de cadáveres.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243390" },
            risco: "Adesivo indicado para uso na montagem de bico em calçados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243391" },
            risco: "Cimento portland.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243392" },
            risco: "Produto de uso direto para vedar furos, junções e juntas de escapamentos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243393" },
            risco: "Fluido de corte.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243394" },
            risco: "Este produto químico é um produto preparado.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243395" },
            risco: "Formaldeído. O formaldeído é um dos mais comuns produtos químicos de uso atual. É o aldeído mais simples, de fórmula molecular H2CO e nome oficial metanal. A solução aquosa de formaldeído, em regra diluída a 45%, denomina-se formol ou formalina.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243396" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243397" },
            risco: "Extração e preparação de fósforo branco e seus compostos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243398" },
            risco: "Fabricação de defensivos fosforados e organofosforados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243399" },
            risco: "Fabricação de projéteis incendiários, explosivos e gases asfixiantes à base de fósforo branco.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24339a" },
            risco: "Fabricação de bronze fosforado.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24339b" },
            risco: "Fabricação de mechas fosforadas para lâmpadas de mineiros.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24339c" },
            risco: "Emprego de defensivos organofosforados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24339d" },
            risco: "Decorrente do processo de Oxicorte.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24339e" },
            risco: "Fumos metálicos provenientes do processo de soldagem.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24339f" },
            risco: "Verificadas as tarefas e as condições de trabalho, concluímos que as atividades devem ser classificadas como 'NÃO INSALUBRES EM 20%', eis que não foram constatados indícios de exposição a agentes que por sua intensidade, duração e frequência permitam o enquadramento na Portaria 3214/78 em sua NR-15 ou que não tivessem sido satisfatoriamente neutralizados com o uso de EPI.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a0" },
            risco: "Adesivo indicado para todos os pisos e revestimento.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a1" },
            risco: "LUBRAX CLAY (1 e 2).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a2" },
            risco: "Graxa.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a3" },
            risco: "Graxa e óleo lubrificante. Composição e informações sobre os ingredientes: Óleo lubrificante, Hidróxido de Lítio.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a4" },
            risco: "Colagens de espuma de PU entre si, espuma de PU com madeira, espuma de PU com tecido e espuma com isopor na fabricação de colchões.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a5" },
            risco: "Desmoldante.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a6" },
            risco: "Composto no produto Orbi limpa Bico Injetor.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a7" },
            risco: "HIDROCARBONETOS E OUTROS COMPOSTOS DE CARBONO: Emprego de produtos contendo hidrocarbonetos aromáticos como solventes ou em limpeza de peças.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a8" },
            risco: "Fabricação de artigos de borracha, de produtos para impermeabilização e de tecidos impermeáveis à base de hidrocarbonetos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433a9" },
            risco: "Fabricação de linóleos, célulóides, lacas, tintas, esmaltes, vernizes, solventes, colas, artefatos de ebonite, guta-percha, chapéus de palha e outros à base de hidrocarbonetos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433aa" },
            risco: "Limpeza de peças ou motores com óleo diesel aplicado sob pressão (nebulização).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ab" },
            risco: "Pintura a pincel com esmaltes, tintas e vernizes em solvente contendo hidrocarbonetos aromáticos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ac" },
            risco: "Emprego de aminoderivados de hidrocarbonetos aromáticos (homólogos de anilina).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ad" },
            risco: "Emprego de isocianatos na formação de poliuretanas (lacas de desmoldagem, lacas de dupla composição, lacas protetoras de madeira e metais, adesivos especiais e outros produtos à base de poliisocianetos e poliuretanas).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ae" },
            risco: "Destilação do alcatrão de hulha.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433af" },
            risco: "Destilação de petróleo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b0" },
            risco: "Manipulação de alcatrão, breu, betume, antraceno, óleos minerais, óleo queimado, parafina ou outras substâncias cancerígenas afins.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b1" },
            risco: "Fabricação de fenóis, cresóis, naftóis, nitroderivados, aminoderivados, derivados halogenados e outras substâncias tóxicas derivadas de hidrocarbonetos cíclicos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b2" },
            risco: "Pintura a pistola com esmaltes, tintas, vernizes e solventes contendo hidrocarbonetos aromáticos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b3" },
            risco: "Emprego de defensivos organoclorados: DDT (diclorodifeniltricloretano), DDD (diclorodifenildicloretano), metoxicloro (dimetoxidifeniltricloretano), BHC (hexacloreto de benzeno) e seus compostos e isômeros.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b4" },
            risco: "Emprego de defensivos derivados do ácido carbônico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b5" },
            risco: "Hidrocarbonetos e Outros Compostos de Carbono.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b6" },
            risco: "Óleo lubrificante formulado a partir de óleo mineral de petróleo do tipo parafínico, compostos de hidrocarboneto; e com aditivação.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b7" },
            risco: "O hidróxido de amônio é conhecido comercialmente por amoníaco, sendo muito utilizado na produção de ácido nítrico para a produção de fertilizantes e explosivos. Ele também é usado em limpeza doméstica, na produção de compostos orgânicos e como gás de refrigeração.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b8" },
            risco: "Seladora para madeira.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433b9" },
            risco: "Seladora para madeira.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ba" },
            risco: "CAL HIDRATADA ITAÚ.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433bb" },
            risco: "Composto da graxa azul.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433bc" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433bd" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433be" },
            risco: "Detergente desengraxante alcalino.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433bf" },
            risco: "Detergente desengraxante alcalino.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c0" },
            risco: "CAL HIDRATADA ITAÚ.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c1" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c2" },
            risco: "Composição e informações sobre os ingredientes:\n• Soda caustica (NaOH) -1% massa\n• Cloreto de sodio (NaCI) - 14% massa\n• Agua - 71% massa\n• Hipoclorito de Sodio - 14% massa.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c3" },
            risco: "Inseticida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c4" },
            risco: "Carmim de índigo ou índigo-carmim, ou sal sódico do ácido 5,5'-indigodisulfônico, é um corante e indicador de pH com a fórmula química C16H8N2Na2O8S2.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c5" },
            risco: "Inseticidas e Fungicidas.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c6" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c7" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c8" },
            risco: "CORAL DECORA ACRÍLICO FOSCO BASE PMFT.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433c9" },
            risco: "Composição e informações sobre os ingredientes:\n• Linear Alquil Benzeno Sulfonato de Sódio\n• Linear Alquil Benzeno Sulfonato de Trietanolamina\n• Lauril Éter Sulfato de Sódio\n• MIT/CMIT\n• Bronopol\n• Fragrância.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ca" },
            risco: "Composição e informações sobre os ingredientes:\nNome químico comum ou Genérico:\nDetergente lava roupas Pó\nIngredientes perigosos e faixas de concentração:\nNão existem ingredientes perigosos.\nMatéria componente:\nTensoativos aniônicos com coadjuvantes.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433cb" },
            risco: "Não é uma substância ou uma mistura perigosa.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433cc" },
            risco: "Composição e informações sobre os ingredientes:\n• Óleo lubrificante.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433cd" },
            risco: "Composição e informações sobre os ingredientes:\n• Óleo lubrificante.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ce" },
            risco: "Composição e informações sobre os ingredientes:\n• Destilados (Petróleo), Leves Tratados Com Hidrogênio\n• Dióxido De Titânio\n• Ácido Neodecanóico, Sal De Cobalto\n• Butanona-Oxima\n• Ácido 2-Etilhexanóico, Sal De Zircónio Trióxido De Diferro.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433cf" },
            risco: "Composição e informações sobre os ingredientes:\n• Etilbenzeno\n• Xileno\n• Querosene de destilação direta\n• n-Hexano\n• Heptane\n• Etilmetilcetoxima\n• Octano, todos os isómeros\n• Ácido 2-Etilhexanóico, Sal De Manganês\n• Bis(2-Etilhexanoato) De Cobalto.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d0" },
            risco: "Fabricação e manipulação de compostos orgânicos de mercúrio.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d1" },
            risco: "Composto de inseticida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d2" },
            risco: "METIL ISOBUTIL CETONA.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d3" },
            risco: "Volcane - Herbicida não seletivo, não sistêmico, pós-emergente do grupo químico organoarsênico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d4" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d5" },
            risco: "Não está classificado como perigoso em conformidade com Norma Brasileira ABNT NBR 14725-2.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d6" },
            risco: "Solução aquosa de Sal de Sódio e Ácido Sulfônico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d7" },
            risco: "Herbicida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d8" },
            risco: "MAZA DEMARCACAO ACRÍLICA DNIT 3,16.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433d9" },
            risco: "SW VERNIZ COPAL BR INCOLOR.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433da" },
            risco: "Névoas provenientes do processo de pintura.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433db" },
            risco: "N-HEXANO.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433dc" },
            risco: "Níquel e compostos inorgânicos solúveis.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433dd" },
            risco: "ÓLEO COMBUSTÍVEL TIPO A1.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433de" },
            risco: "Óleo Diesel.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433df" },
            risco: "Composição e informações sobre os ingredientes:\n• Composto de enxofre;\n• Composto oxigenado;\n• Composto nitrogenado;\n• Enxofre;\n• Biodiesel B100;\n• Aditivos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e0" },
            risco: "Composição e informações sobre os ingredientes:\n• Mistura de óleos lubrificantes básicos\n• Antiespumante.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e1" },
            risco: "LUBRAX HYDRA ECO.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e2" },
            risco: "IPIRANGA BRUTUS PERFORMANCE CI-4 15W40.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e3" },
            risco: "Óleo Lubrificante.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e4" },
            risco: "Óleo lubrificante e graxa.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e5" },
            risco: "Óleo mineral.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e6" },
            risco: "Óleo lubrificante básico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e7" },
            risco: "Composto da graxa azul.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e8" },
            risco: "Composto no produto Graxa Azul.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433e9" },
            risco: "Óleo Solúvel e Fluído de corte - Carvão mineral e seus derivados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ea" },
            risco: "Óleos e graxas.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433eb" },
            risco: "Manipulação de alcatrão, breu, betume, antraceno, óleos minerais, óleo queimado, parafina ou outras substâncias cancerígenas afins.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ec" },
            risco: "Manipulação de alcatrão, breu, betume, antraceno, óleos minerais, óleo queimado, parafina ou outras substâncias cancerígenas afins.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ed" },
            risco: "Manipulação de alcatrão, breu, betume, antraceno, óleos minerais, óleo queimado, parafina ou outras substâncias cancerígenas afins.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ee" },
            risco: "Óleos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ef" },
            risco: "Óleos, graxas e desengripantes.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f0" },
            risco: "Operações com as seguintes substâncias: - 4,4' - metileno bis (2-cloro anilina).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f1" },
            risco: "Operações com as seguintes substâncias: - 4,4' - metileno dianilina.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f2" },
            risco: "Operações com as seguintes substâncias: - Nitrosaminas.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f3" },
            risco: "Operações com as seguintes substâncias: - Propano sultone.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f4" },
            risco: "Operações com as seguintes substâncias: - Betapropiolactona.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f5" },
            risco: "Operações com as seguintes substâncias: - Tálio.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f6" },
            risco: "Operações com as seguintes substâncias: - Berílio.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f7" },
            risco: "Operações com as seguintes substâncias: - Produção de trióxido de amônio.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f8" },
            risco: "Operações com as seguintes substâncias: - Ustulação de sulfeto de níquel.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433f9" },
            risco: "Operações com as seguintes substâncias: - Éter bis (clorometílico).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433fa" },
            risco: "Operações com as seguintes substâncias: - Benzopireno.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433fb" },
            risco: "Operações com as seguintes substâncias: - Cloreto de dimetil-carbamila.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433fc" },
            risco: "Operações com as seguintes substâncias: - 3,3' - dicloro-benzidina.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433fd" },
            risco: "Operações com as seguintes substâncias: - Dióxido de vinil ciclohexano.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433fe" },
            risco: "Operações com as seguintes substâncias: - Epicloridrina.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e2433ff" },
            risco: "Operações com as seguintes substâncias: - Hexametilfosforamida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243400" },
            risco: "Operações com as seguintes substâncias: éter bis (clorometílico), benzopireno, berílio, cloreto de dimetilcarbamila, 3,3' - diclorobenzidina, dióxido de vinil ciclohexano, epicloridrina, hexametilfosforamida, 4,4' - metileno bis (2-cloro anilina), 4,4' - metileno dianilina, nitrosaminas, propano sultone, betapropiolactona, tálio, produção de trióxido de amônio ustulação de sulfeto de níquel.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243401" },
            risco: "Fabricação e manipulação de ácido oxálico, nítrico sulfúrico, bromídrico, fosfórico, pícrico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243402" },
            risco: "Operações com o timbó.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243403" },
            risco: "Operações com bagaço de cana nas fases de grande exposição à poeira.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243404" },
            risco: "Operações de galvanoplastia: douração, prateação, niquelagem, cromagem, zincagem, cobreagem, anodização de alumínio.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243405" },
            risco: "Telegrafia e radiotelegrafia, manipulação em aparelhos do tipo Morse e recepção de sinais em fones.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243406" },
            risco: "Trabalhos com escórias de Thomás: remoção, trituração, moagem e acondicionamento.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243407" },
            risco: "Trabalho de retirada, raspagem a seco e queima de pinturas.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243408" },
            risco: "Trabalhos na extração de sal (salinas).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243409" },
            risco: "Fabricação e manuseio de álcalis cáusticos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24340a" },
            risco: "Trabalhos em convés de navios.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24340b" },
            risco: "Fabricação e transporte de cal e cimento nas fases de grande exposição a poeiras.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24340c" },
            risco: "Trabalhos de carregamento, descarregamento ou remoção de enxofre ou sulfitos em geral, em sacos ou a granel.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24340d" },
            risco: "Aplicação a pistola de tintas de alumínio.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24340e" },
            risco: "Fabricação de pós de alumínio (trituração e moagem).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24340f" },
            risco: "Fabricação de emetina e pulverização de ipeca.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243410" },
            risco: "Metalização a pistola.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243411" },
            risco: "Fungicida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243412" },
            risco: "CAL HIDRATADA ITAÚ.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243413" },
            risco: "Saneante.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243414" },
            risco: "ACTELLIC PROF (inseticida).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243415" },
            risco: "PASTA DE INJEÇÃO CORES.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243416" },
            risco: "O polietileno é quimicamente o polímero mais simples. Devido à sua alta produção mundial, é também o mais barato, sendo um dos tipos de plástico mais comuns. É quimicamente inerte. Obtém-se pela polimerização do etileno, de que deriva seu nome.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243417" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243418" },
            risco: "Produto de uso direto para vedar furos, junções e juntas de escapamentos.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243419" },
            risco: "Polipropileno ou polipropeno é um polímero, mais precisamente um termoplástico, derivado do propeno ou propileno reciclável.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24341a" },
            risco: "Produto para manutenção de granja / incubatório.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24341b" },
            risco: "Preto de eriocromo T ou negro de eriocromo T é um indicador complexométrico que é usado em titulações complexométricas, como na determinação da dureza da água. É um corante azóico, o que lhe confere intensa cor e a solubilidade em água é dada pela presença de grupos sulfônicos. Como corante é classificado com o C.I. Composição e informações sobre os ingredientes: • Água • Pedra Pomes • D-Limoneno • Surfatante não-iônico • Loção Corn Huskers® • Trietanolamina • Polímero de ácido acrílico • Dimetil Hidroximetilpirazol • Lanolina • Óleo de jojoba • Aloe vera.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24341c" },
            risco: "Limpeza realizada no local de trabalho.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24341d" },
            risco: "Produtos Químicos diversos (Tintas e Solventes).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24341e" },
            risco: "Produtos Químicos – devido ao acesso nos locais onde há o risco (Cola, Sabão em Pedra e Pó para Tamponamento).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24341f" },
            risco: "Produtos Químicos (Óleo Lubrificante).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243420" },
            risco: "Produtos Químicos (Óleo Solúvel; Óleo Lubrificante; Óleo de Corte; Graxa).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243421" },
            risco: "Produtos Químicos (Óleos e Graxas).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243422" },
            risco: "Produtos Químicos (Óleos e Graxas, Tintas e Solventes).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243423" },
            risco: "PRODUTOS QUÍMICOS (Óleos, Graxas, Ácido Clorídrico).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243424" },
            risco: "Produtos Químicos (Recipientes de Produtos Químicos Diversos).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243425" },
            risco: "Produtos Químicos a base de água.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243426" },
            risco: "Produtos Químicos Diversos na atividade de manutenção predial.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243427" },
            risco: "Produtos Químicos e Solventes.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243428" },
            risco: "Produtos Químicos e Solventes Em recipientes Fechados.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243429" },
            risco: "Produtos químicos usados na lavagem das roupas de cama.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24342a" },
            risco: "Encontrado no produto: Desingripante GT Lub 2000.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24342b" },
            risco: "MAZA QUEROSENE.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24342c" },
            risco: "SW VERNIZ COPAL BR INCOLOR.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24342d" },
            risco: "VERNIZ BASE EPOXI POLIAMIDA PLUS (BRASEPOXI).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24342e" },
            risco: "Composto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24342f" },
            risco: "Herbicida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243430" },
            risco: "Colagens leves: dobração e forração de calçados que, após colados, recebem costuras.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243431" },
            risco: "Tintas Sumaré - Diluente 951.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243432" },
            risco: "Agrotóxico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243433" },
            risco: "Para as substâncias ou processos a seguir relacionados, não deve ser permitida nenhuma exposição ou contato, por qualquer via: - 4-amino difenil (p-xenilamina).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243434" },
            risco: "Para as substâncias ou processos a seguir relacionados, não deve ser permitida nenhuma exposição ou contato, por qualquer via: - Produção de Benzidina.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243435" },
            risco: "Para as substâncias ou processos a seguir relacionados, não deve ser permitida nenhuma exposição ou contato, por qualquer via: - 4-nitrodifenil.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243436" },
            risco: "Para as substâncias ou processos a seguir relacionados, não deve ser permitida nenhuma exposição ou contato, por qualquer via: - Betanaftilamina.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243437" },
            risco: "Cimento Portland.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243438" },
            risco: "Sulfato de Manganês.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243439" },
            risco: "Agente floculante especial.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24343a" },
            risco: "Produto ácido, na concentração ideal para limpeza de sujidades mais pesadas.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24343b" },
            risco: "TETRAHIDROFURANO.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24343c" },
            risco: "TOLUENO.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24343d" },
            risco: "Colagem de borrachas vulcanizadas, EVA, couro e látex vulcanizado.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24343e" },
            risco: "Verniz.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e24343f" },
            risco: "Fungicida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243440" },
            risco: "Fungicida.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243441" },
            risco: "Composição e informações sobre os ingredientes: • Ácido Dodecil Benzeno Sulfonato de Sódio Linear 96% • Álcool etoxilado • Coadjuvantes • EDTA tetrassódico • Essência • Veículo.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243442" },
            risco: "Produto químico.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243443" },
            risco: "Resina Epóxi.",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b86754341c7488e243444" },
            risco: "VERNIZ BASE EPOXI POLIAMIDA PLUS (BRASEPOXI).",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e243446" },
            risco: "Cimentos e massas usinadas",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e243447" },
            risco: "Extração, tratamento, moagem, transporte do minério; ou ainda outras operações com exposição a poeiras de manganês ou de seus compostos",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e243448" },
            risco: "Metalurgia de minerais de manganês, fabricação de baterias e pilhas secas, fabricação de vidros especiais e cerâmicas, fabricação e uso de eletrodos de solda, fabricação de produtos químicos, tintas e fertilizantes, ou ainda outras operações com exposição a fumos de manganês ou de seus compostos",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e243449" },
            risco: "Particulados (insolúveis  ou de baixa solubilidade) não especificados de outra maneira (PNOS)",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e24344a" },
            risco: "Poeira respirável",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e24344b" },
            risco: "Milhões de partículas por decímetro cúbico (mppdc)",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e24344c" },
            risco: "Poeira total (respirável e não respirável)",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e24344d" },
            risco: "SÍLICA LÍVRE CRISTALIZADA",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e24344e" },
            risco: "FIBRAS RESPIRÁVEIS DE ASBESTO CRISOTILA",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b91104341c7488e24344f" },
            risco: "ASBESTOS",
            tipo: "Quimico",
        },
        {
            _id: { oid: "664b930e4341c7488e243451" },
            risco: "Ruído",
            tipo: "Fisico",
        },
        {
            _id: { oid: "664b930e4341c7488e243452" },
            risco: "Calor",
            tipo: "Fisico",
        },
        {
            _id: { oid: "664b930e4341c7488e243453" },
            risco: "Radiação Ionizantes",
            tipo: "Fisico",
        },
        {
            _id: { oid: "664b930e4341c7488e243454" },
            risco: "Radiação Não Ionizantes",
            tipo: "Fisico",
        },
        {
            _id: { oid: "664b930e4341c7488e243455" },
            risco: "Vibração",
            tipo: "Fisico",
        },
        {
            _id: { oid: "664b930e4341c7488e243456" },
            risco: "Frio",
            tipo: "Fisico",
        },
        {
            _id: { oid: "664b930e4341c7488e243457" },
            risco: "Umidade",
            tipo: "Fisico",
        },
        {
            _id: { oid: "664b94414341c7488e243459" },
            risco: "Agentes biológicos (bactérias, vírus, protozoários, fungos, príons, parasitas e outros)",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24345a" },
            risco: "Bactéria",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24345b" },
            risco: "Contato com Esgotos",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24345c" },
            risco: "Contato com Materiais Contaminados",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24345d" },
            risco: "Contato com materiais infecto-contagiantes",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24345e" },
            risco: "Contato com microrganismos nos corpos",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24345f" },
            risco: "Contato com pacientes e materiais perfuro cortantes",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243460" },
            risco: "Contato direto com pacientes",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243461" },
            risco: "Contato direto com pacientes e materiais infecto contagiosos",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243462" },
            risco: "Couro de animais",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243463" },
            risco: "Estábulos e cavalariças.",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243464" },
            risco: "Fungos",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243465" },
            risco: "Higienização de instalações sanitárias e contato com material infecto contagiante (coleta de lixo).",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243466" },
            risco: "Hospitais, ambulatórios, postos de vacinação e outros estabelecimentos destinados ao atendimento e tratamento de animais (aplica-se apenas ao pessoal que tenha contato com tais animais)",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243467" },
            risco: "Manutenção em maquinas e equipamentos contaminados (ao acessar setores onde se encontra o risco biológico)",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243468" },
            risco: "Resíduos de animais não deteriorados.",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243469" },
            risco: "SARS-Cov-2 (Covid-19)",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24346a" },
            risco: "Trabalhos e operações em cemitérios (exumação de corpos).",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24346b" },
            risco: "Trabalhos e operações em contato permanente com pacientes, animais ou com material infecto-contagiante em gabinetes de autópsias, de anatomia e histoanatomopatologia (aplica-se somente ao pessoal técnico).",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24346c" },
            risco: "Trabalhos e operações em contato permanente com pacientes, animais ou com material infecto-contagiante em hospitais, ambulatórios, postos de vacinação e outros estabelecimentos destinados ao atendimento e tratamento de animais (aplica-se apenas ao pessoal que tenha contato com tais animais).",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24346d" },
            risco: "Trabalhos e operações em contato permanente com pacientes, animais ou com material infecto-contagiante em hospitais, serviços de emergência, enfermarias, ambulatórios, postos de vacinação e outros estabelecimentos destinados aos cuidados da saúde humana (aplica-se unicamente ao pessoal que tenha contato com os pacientes, bem como aos que manuseiam objetos de uso desses pacientes, não previamente esterilizados).",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24346e" },
            risco: "Trabalhos e operações em contato permanente com pacientes, animais ou com material infecto-contagiante em laboratórios de análise clínica e histopatologia (aplica-se tão-só ao pessoal técnico).",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e24346f" },
            risco: "Trabalhos e operações em contato permanente com resíduos de animais deteriorados.",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243470" },
            risco: "Trabalhos ou operações, em contato com pacientes em isolamento por doenças infecto-contagiosas, bem como objetos de seu uso, não previamente esterilizados.",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243471" },
            risco: "Trabalhos ou operações, em contato permanente com carnes, glândulas, vísceras, sangue, ossos, couros, pelos e dejeções de animais portadores de doenças infecto-contagiosas (carbunculose, brucelose, tuberculose).",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243472" },
            risco: "Trabalhos ou operações, em contato permanente com esgotos (galerias e tanques).",
            tipo: "Biologico",
        },
        {
            _id: { oid: "664b94414341c7488e243473" },
            risco: "Trabalhos ou operações, em contato permanente com lixo urbano (coleta e industrialização).",
            tipo: "Biologico",
        },
    ];

}