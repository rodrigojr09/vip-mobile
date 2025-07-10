import * as FileSystem from "expo-file-system";

class Data {
	private paths = {
		empresas: "empresas.json",
		perguntas: "perguntas.json",
		offline_empresas: "offline_empresas.json",
		offline_perguntas: "offline_perguntas.json",
	};

    private loading = false;

	private base_url = __DEV__
		? "http://192.168.3.29:3000/api/v3"
		: "https://mobile.vipsst.com.br/api/v3";
    private base_dir = FileSystem.documentDirectory;
    
    public async getData() {
        const empresas = await this.getEmpresas();
        const perguntas = await this.getPerguntas();
        return this.loading = true;
    }

	public async getEmpresas() {
		console.log("🔎 | Buscando empresas...");
		const response = await fetch(this.base_url + "/empresas");
		if (!response.ok) {
			console.error(`❌ | Erro ao buscar empresas: ${response.status}`);
			return this.getJson(this.paths.offline_empresas);
		} else {
			console.log("✅ | Empresas buscadas com sucesso.");
			const empresas = await response.json();
			this.saveJson(
				this.paths.offline_empresas,
				JSON.stringify(empresas)
			);
			return empresas;
		}
    }
    
    public async getPerguntas() {
        console.log("🔎 | Buscando perguntas...");
        const response = await fetch(this.base_url + "/perguntas");
        if (!response.ok) {
            console.error(`❌ | Erro ao buscar perguntas: ${response.status}`);
            return this.getJson(this.paths.offline_perguntas);
        } else {
            console.log("✅ | Perguntas buscadas com sucesso.");
            const perguntas = await response.json();
            this.saveJson(
                this.paths.offline_perguntas,
                JSON.stringify(perguntas)
            );
            return perguntas;
        }
    }

	private async saveJson(arquivo: string, data: string) {
		const path = `${this.base_dir}${arquivo}`;
		console.log(`📝 | Salvando dados em: ${path}`);
		await FileSystem.writeAsStringAsync(path, data);
		console.log(`✅ | Arquivo salvo localmente em: ${path}`);
	}

	private async getJson(arquivo: string) {
		const path = `${this.base_dir}${arquivo}`;
		try {
			const fileInfo = await FileSystem.getInfoAsync(path);

			if (!fileInfo.exists) {
				console.warn("⚠️ | Arquivo de empresas não encontrado.");
				return null;
			}

			const content = await FileSystem.readAsStringAsync(path);
			console.log(`✅ | Empresas lidas com sucesso em: ${path}`);
			return JSON.parse(content);
		} catch (error: any) {
			console.error("❌ | Erro ao ler empresas:", error.message || error);
			return null;
		}
	}
}

export default new Data();
