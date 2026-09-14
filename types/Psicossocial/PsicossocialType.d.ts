export default interface PsicossocialType {
    id: string;
    empresa: { id: string; cnpj: string; razao_social: string } | null;
    inclusas: { id: string; cnpj: string; razao_social: string }[];
    tecnico: string;
    responsavel: string;
    orientacao: 1 | 2 | 3 | null;
    autorizado: 1 | 2 | 3 | null;
    observacao: string;
    assinatura?: string;
    data: string;
}