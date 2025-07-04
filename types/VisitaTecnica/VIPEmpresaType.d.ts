export interface VIPEmpresaType {
	id: string;
	token: string;
	razao_social: string;
	nome_fantasia: string;
	cnpj: string;
	visitas?: Visita[];
}
