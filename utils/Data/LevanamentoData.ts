import type { EmpresaType } from "@/types/Levantamento";
import Storage from "../Storage";

class LevantamentoData extends Storage {

    static instance: LevantamentoData;

    static getInstance() {
        if (!LevantamentoData.instance) {
            LevantamentoData.instance = new LevantamentoData();
        }
        return LevantamentoData.instance;
    }

    constructor() {
        super();
        console.log("🎯 Levantamentos Data initialized");
    }

    async salvar(data: EmpresaType) {
        if (!data.id) {
            console.log("⚠️ ID vazio, não salvando levantamento");
            return;
        }

        console.log("📦 Iniciando salvamento do levantamento...");

        const raw = (await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]";
        const levantamentos = JSON.parse(raw) as EmpresaType[];

        const levantamento = levantamentos.find(
            (l) => l.id === data.id
        );

        if (levantamento) {
            console.log("🏢 Empresa encontrada:", levantamento.nome);
            console.log("✏️ Atualizando empresa inteira:", data.nome);
            await this.save(
                this.keys.LEVANTAMENTOS_KEY,
                JSON.stringify(
                    levantamentos.map((l) =>
                        l.id === data.id
                            ? data
                            : l
                    )
                )
            );
            console.log("✅ Empresa atualizada com sucesso.");

        } else {
            console.log("🆕 Empresa não encontrada. Adicionando nova:", data.nome);
            await this.save(
                this.keys.LEVANTAMENTOS_KEY,
                JSON.stringify([...levantamentos, data])
            );
            console.log("✅ Empresa adicionada com sucesso.");
        }

        console.log("💾 Salvamento concluído.");
    }


    async getAll(): Promise<string | null> {
        return this.get(this.keys.LEVANTAMENTOS_KEY);
    }

    async clear() {
        await this.save(this.keys.LEVANTAMENTOS_KEY, JSON.stringify([]));
    }

    async delete(id: string) {
        const levantamentos = JSON.parse(
            (await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]",
        ) as EmpresaType[];
        const filtered = levantamentos.filter((l) => l.id !== id);
        await this.save(this.keys.LEVANTAMENTOS_KEY, JSON.stringify(filtered));
        return true;
    }

    async getById(
        id: string,
    ): Promise<EmpresaType | null> {
        const levantamentos = JSON.parse(
            (await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]",
        ) as EmpresaType[];
        const found = levantamentos.find((l) => l.id === id);
        return found ? found : null;
    }

}

export default LevantamentoData;
