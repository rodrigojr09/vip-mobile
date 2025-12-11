
/* Tabela Empresa */
CREATE TABLE Empresa (
    id VARCHAR(255) PRIMARY KEY,
    token TEXT NOT NULL,
    razao_social TEXT NOT NULL,
    nome_fantasia TEXT NOT NULL,
    cnpj TEXT NOT NULL
);

/* Tabela Visita */
CREATE TABLE Visita (
    id VARCHAR(255) PRIMARY KEY,
    empresa_id VARCHAR(255),
    responsavel TEXT NOT NULL,
    tecnico TEXT NOT NULL,
    data TEXT NOT NULL,
    hora_entrada TEXT,
    hora_saida TEXT,
    assinatura TEXT,

    FOREIGN KEY (empresa_id) REFERENCES Empresa(id)
);

/* Tabela: Visita_Setor */
CREATE TABLE visita_setor (
    id VARCHAR(255) PRIMARY KEY,
    visita_id VARCHAR(255) NOT NULL,
    nome TEXT NOT NULL,

    FOREIGN KEY (visita_id) REFERENCES Visita(id)
);

/* Tabela: Visita_Setor_Pergunta */
CREATE TABLE Visita_Setor_Pergunta (
    id VARCHAR(255) PRIMARY KEY,
    setor_id VARCHAR(255) NOT NULL,
    pergunta TEXT NOT NULL,
    condition VARCHAR(10),   -- sim / não / na
    type VARCHAR(20) NOT NULL, -- boolean / check / info / text
    parent_id VARCHAR(255),     -- subperguntas

    FOREIGN KEY (setor_id) REFERENCES Visita_Setor(id),
    FOREIGN KEY (parent_id) REFERENCES Visita_Setor_Pergunta(id)
);

/* Tabela: Visita_Setor_Resposta */
CREATE TABLE Visita_Setor_Resposta (
    id SERIAL PRIMARY KEY,
    setor_id VARCHAR(255) NOT NULL,
    pergunta TEXT NOT NULL,
    observation TEXT,
    checked VARCHAR(10),  -- Sim / Não / NA / Check

    FOREIGN KEY (setor_id) REFERENCES Visita_Setor(id)
);
