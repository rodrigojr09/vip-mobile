export default interface Acidente {
    id?: string;
    cat1?: {
        empresa?: string;
        cnpj?: string;
        dataAnalise?: string;
    },
    cat2?: {
        colaborador?: string;
        idade?: string;
        endereco?: string;
        cep?: string;
        telefone?: string;
        grauInstrucao?: string;
        estadoCivil?: "Solteiro" | "Casado" | "Divorciado" | "Viuvo";
        cpf?: string;
        funcao?: string;
        cbo?: string;
        setor?: string;
    },
    cat3?: {
        dataAtestado?: string;
        duracaoTratamento?: string;
        horaAtendimento?: string;
        houveInternacao?: boolean;
        afastar?: string;
        naturezaLesao?: string;
        medicoCRM?: string;
        cid?: string;
    },
    cat4?: {
        localAcidente?: string;
        dataAcidente?: string;
        horaAcidente?: string;
        horasTrabalhadas?: string;
        cidade?: string;
        bairro?: string;
        rua?: string;
        numero?: string;
        houveOcorrencia?: boolean;
        houveMorte?: boolean;
        parteAtingida?: string;
        lateralidade?: string;
        agenteCausador?: string;
        acao?: string;
        responsavel?: string;
        prazo?: string;
    },
    cat5?: {
        descricaoAcidente?: string;
        assinaturaAcidentado?: string;
    },
    cat6?: {
        atividadeExecutada?: string;
        periodicidade?: "Habitual Permanente" | "Habitual Intermitente" | "Ocasional Permanente" | "Ocasional Intermitente" | "Eventual Permanente" | "Eventual";
        recebeuTreiamento?: "Suficiente" | "Insuficiente" | "Não Recebeu";
        utilizouEPI?: "Sim" | "Não";
        utilizouEPIDescricao?: string;
        epiEficaz?: "Sim" | "Não";
        epiEficazDescricao?: string;
        ferramentas?: "Sim" | "Não";
        ferramentasDescricao?: string;
        ambiente?: "Sim" | "Não";
        ambienteDescricao?: string;
    },
    cat7?: {
        responsavelEmpresa?: string;
        responsavelAceitacao?: "Sim" | "Não";
        responsavelAceitacaoDescricao?: string;
        assinaturaResponsavel?: string;
    },
    cat8?: {
        testemunhos?: {
            nome?: string;
            aceitacao?: "Sim" | "Não";
            aceitacaoDescricao?: string;
            assinaturaTestemunha?: string;
        }[];
    },
    cat9?: {
        images?: string[];
    },
}
