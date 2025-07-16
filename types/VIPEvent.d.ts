export interface VIPLocalizacao {
	latitude: number;
	longitude: number;
}

export interface VIPEvento {
	id: string;
	data: string;
	hora: string;
	msg: string;
	localizacao?: VIPLocalizacao;
}
