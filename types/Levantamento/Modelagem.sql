/* Tabela: Empresa */
CREATE TABLE Empresa (
    id VARCHAR(255) PRIMARY KEY,
    responsavel TEXT NOT NULL,
    nome TEXT NOT NULL,
    data TEXT,
    assinatura TEXT
);

/* Tabela: Setor */
CREATE TABLE Setor (
    id VARCHAR(255) PRIMARY KEY,
    empresa_id VARCHAR(255) NOT NULL,
    nome TEXT NOT NULL,
    comprimento TEXT,
    largura TEXT,
    pe_direito TEXT,
    piso TEXT,
    estrutura TEXT,
    forro TEXT,
    me TEXT,
    mce TEXT,
    mcr TEXT,
    lux TEXT,

    iluminacao_natural TEXT,
    iluminacao_artificial TEXT,
    ventilacao_natural TEXT,
    ventilacao_artificial TEXT,

    FOREIGN KEY (empresa_id) REFERENCES Empresa(id)
);

/* Tabela: Funcao */
CREATE TABLE Funcao (
    id VARCHAR(255) PRIMARY KEY,
    setor_id VARCHAR(255) NOT NULL,
    nome TEXT NOT NULL,
    description TEXT,
    funcionarios TEXT,
    FOREIGN KEY (setor_id) REFERENCES Setor(id)
);

/* Tabela: Risco */
CREATE TABLE risco (
    id VARCHAR(255) PRIMARY KEY,
    funcao_id VARCHAR(255) NOT NULL,
    risco TEXT NOT NULL,
    fonte_geradora TEXT,
    FOREIGN KEY (funcao_id) REFERENCES funcao(id)
);
