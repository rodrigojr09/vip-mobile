import AsyncStorage from "@react-native-async-storage/async-storage";
import type { EmpresaType, PerguntaType, } from "@/types/Visita";

/**
 * Classe base de armazenamento e inicialização dos módulos de dados.
 * 
 * Cada módulo (EventoData, LevantamentoData, VisitaData)
 * herda esta classe e usa AsyncStorage para persistência local.
 */
export default class Storage {
    /** 🗝️ Chaves de armazenamento */
    public keys = {
        EMPRESAS_KEY: "@vip:empresas",
        PERGUNTAS_KEY: "@vip:perguntas",
        LEVANTAMENTOS_KEY: "@vip:levantamentos_v2",
        VISITAS_KEY: "@vip:visitas",
        OLD_LEVANTAMENTOS_KEY: "@vip:levantamentos",
        EVENTOS_KEY: "@vip:eventos",
    } as const;

    /** 🧾 Cache de dados em memória (não persistente) */
    public empresas: EmpresaType[] = [];
    public perguntas: { adm: PerguntaType[]; setor: PerguntaType[] } = { adm: [], setor: [] };

    /** 🌐 URL base da API */
    static base_url = __DEV__
        ? "http://192.168.3.66:3000/api/v3"
        : "https://vip-admin.vercel.app/api/v3";

    constructor() {
        console.log("🎯 Storage base inicializado");
    }

    /**
     * 💾 Salva um valor no AsyncStorage
     */
    async save(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.error(`❌ Erro ao salvar dados em ${key}:`, e);
        }
    }

    /**
     * 📦 Recupera um valor do AsyncStorage
     */
    async get(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (e) {
            console.error(`❌ Erro ao ler dados de ${key}:`, e);
            return null;
        }
    }

    /**
    * 📥 Importar um JSON de todas as informações salvas no AsyncStorage
    */
    async importAll() {
        const empresas = JSON.parse(await this.get(this.keys.EMPRESAS_KEY) || "[]");
        const perguntas = JSON.parse(await this.get(this.keys.PERGUNTAS_KEY) || "[]");
        const levantamentos_v2 = JSON.parse(await this.get(this.keys.LEVANTAMENTOS_KEY) || "[]");
        const visitas = JSON.parse(await this.get(this.keys.VISITAS_KEY) || "[]");
        const eventos = JSON.parse(await this.get(this.keys.EVENTOS_KEY) || "[]");
        const levantamentos = JSON.parse(await this.get(this.keys.OLD_LEVANTAMENTOS_KEY) || "[]");
        return { empresas, perguntas, levantamentos, visitas, eventos, levantamentos_v2 };
    }

    /**
     * 🧹 Remove uma chave específica (opcional)
     */
    async remove(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (e) {
            console.error(`❌ Erro ao remover ${key}:`, e);
        }
    }

    /**
     * 💣 Limpa todos os dados locais (somente em DEV!)
     */
    static async clearAll(): Promise<void> {
        try {
            await AsyncStorage.clear();
            console.log("🧹 Todos os dados locais foram apagados!");
        } catch (e) {
            console.error("❌ Erro ao limpar o AsyncStorage:", e);
        }
    }
}
