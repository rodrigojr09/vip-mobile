import AsyncStorage from "@react-native-async-storage/async-storage";
import type { VIPEmpresaType as LevantamentoVIPEmpresaType } from "@/types/Levantamento/VIPEmpresaType";
import type { VIPFuncaoType } from "@/types/Levantamento/VIPFuncaoType";
import type { VIPSetorType } from "@/types/Levantamento/VIPSetorType";
import type { VIPEvento } from "@/types/VIPEvent";
import type { VIPEmpresaType } from "@/types/VisitaTecnica/VIPEmpresaType";
import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";

export default class Storage {
    public keys = {
        EMPRESAS_KEY: "@vip:empresas",
        PERGUNTAS_KEY: "@vip:perguntas",
        LEVANTAMENTOS_KEY: "@vip:levantamentos",
        VISITAS_KEY: "@vip:visitas",
        EVENTOS_KEY: "@vip:eventos",
    };

    public empresas: VIPEmpresaType[] = [];
    public perguntas: VIPVisitaType["perguntas"] = { adm: [], setor: [] };

    static base_url = __DEV__
        ? "http://192.168.3.33:3000/api/v3"
        : "https://mobile.vipsst.com.br/api/v3";

    async init() {
        try {
            console.log("🔄 Iniciando carregamento de dados...");

            // Fetch empresas
            console.log("🌐 Buscando empresas da API...");
            const res_empresas = await fetch(`${Storage.base_url}/empresas`);
            if (res_empresas.ok) {
                const empresas = await res_empresas.json();
                this.empresas = empresas;
                console.log(`✅ Empresas carregadas da API: ${empresas.length} itens`);
                await this.save(this.keys.EMPRESAS_KEY, JSON.stringify(empresas));
                console.log("💾 Empresas salvas no storage local");
            } else {
                console.warn(
                    `⚠️ Falha ao carregar empresas da API (status: ${res_empresas.status}). Carregando do storage local...`,
                );
                const storedEmpresas = await this.get(this.keys.EMPRESAS_KEY);
                this.empresas = JSON.parse(storedEmpresas || "[]");
                console.log(
                    `💾 Empresas carregadas do storage local: ${this.empresas.length} itens`,
                );
            }

            // Fetch perguntas
            console.log("🌐 Buscando perguntas da API...");
            const res_perguntas = await fetch(`${Storage.base_url}/perguntas`);
            if (res_perguntas.ok) {
                const perguntas = await res_perguntas.json();
                this.perguntas = {
                    adm: perguntas.questionsAdm,
                    setor: perguntas.questionsSetor,
                };
                console.log(
                    `✅ Perguntas carregadas da API: adm=${perguntas.questionsAdm.length}, setor=${perguntas.questionsSetor.length}`,
                );
                await this.save(
                    this.keys.PERGUNTAS_KEY,
                    JSON.stringify({
                        adm: perguntas.questionsAdm,
                        setor: perguntas.questionsSetor,
                    }),
                );
                console.log("💾 Perguntas salvas no storage local");
            } else {
                console.warn(
                    `⚠️ Falha ao carregar perguntas da API (status: ${res_perguntas.status}). Carregando do storage local...`,
                );
                const storedPerguntas = await this.get(this.keys.PERGUNTAS_KEY);
                this.perguntas = JSON.parse(storedPerguntas || "{}");
                console.log(
                    `💾 Perguntas carregadas do storage local: adm=${this.perguntas.adm?.length || 0}, setor=${this.perguntas.setor?.length || 0}`,
                );
            }

            console.log("🎯 Carregamento de dados concluído com sucesso!");
        } catch (error) {
            console.error("❌ Erro ao inicializar dados:", error);
        }
    }

    async addVisita(visita: VIPVisitaType) {
        const visitas = JSON.parse(
            (await this.get(this.keys.VISITAS_KEY)) || "[]",
        ) as VIPVisitaType[];
        visitas.push(visita);
        await this.save(this.keys.VISITAS_KEY, JSON.stringify(visitas));
    }

    async addEvento(evento: VIPEvento) {
        const eventos = JSON.parse(
            (await this.get(this.keys.EVENTOS_KEY)) || "[]",
        ) as any[];
        eventos.push(evento);
        await this.save(this.keys.EVENTOS_KEY, JSON.stringify(eventos));
    }

    async getEventos(): Promise<string | null> {
        return this.get(this.keys.EVENTOS_KEY);
    }

    async clearEventos() {
        await this.save(this.keys.EVENTOS_KEY, JSON.stringify([]));
    }

    async clearVisitas() {
        await this.save(this.keys.VISITAS_KEY, JSON.stringify([]));
    }

    async getLevantamentos(): Promise<string | null> {
        return this.get(this.keys.LEVANTAMENTOS_KEY);
    }

    async clearLevantamentos() {
        await this.save(this.keys.LEVANTAMENTOS_KEY, JSON.stringify([]));
    }

    async deleteLevantamento(id: string) {
        const levantamentos = JSON.parse(
            (await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]",
        ) as { empresa: LevantamentoVIPEmpresaType }[];
        const filtered = levantamentos.filter((l) => l.empresa.id !== id);
        await this.save(this.keys.LEVANTAMENTOS_KEY, JSON.stringify(filtered));
        return true;
    }

    async getLevantamento(
        id: string,
    ): Promise<LevantamentoVIPEmpresaType | null> {
        const levantamentos = JSON.parse(
            (await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]",
        ) as { empresa: LevantamentoVIPEmpresaType }[];
        const found = levantamentos.find((l) => l.empresa.id === id);
        return found ? found.empresa : null;
    }

    async save(key: string, value: string) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error("Error saving data", e);
        }
    }

    async get(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (e) {
            console.error("Error reading data", e);
            return null;
        }
    }
}

export const storage = new Storage();
