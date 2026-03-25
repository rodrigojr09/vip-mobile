export interface VIPEmpresaType {
    id: string;
    token: string;
    razao_social: string;
    nome_fantasia: string;
    apelido?: string
    cnpj: string;
    visitas?: Visita[];
}
