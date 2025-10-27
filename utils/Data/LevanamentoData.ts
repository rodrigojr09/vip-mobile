import type { VIPEmpresaType } from "@/types/Levantamento/VIPEmpresaType";
import type { VIPFuncaoType } from "@/types/Levantamento/VIPFuncaoType";
import type { VIPSetorType } from "@/types/Levantamento/VIPSetorType";
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

    async salvar(data: {
        empresa: VIPEmpresaType;
        setor?: VIPSetorType | null;
        funcao?: VIPFuncaoType | null;
    }) {
        if (!data.empresa.id) {
            console.log("⚠️ ID vazio, não salvando levantamento");
            return;
        }

        console.log("📦 Iniciando salvamento do levantamento...");

        const raw = (await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]";
        const levantamentos = JSON.parse(raw) as { empresa: VIPEmpresaType }[];

        const levantamento = levantamentos.find(
            (l) => l.empresa.id === data.empresa.id
        );
        const hasSetor = levantamento?.empresa.setores.filter((s) => s.nome !== "").find(
            (s) => s.id === data.setor?.id
        );
        const hasFuncao = hasSetor?.funcoes.filter((f) => f.nome !== "").find(
            (f) => f.id === data.funcao?.id
        );

        if (levantamento) {
            console.log("🏢 Empresa encontrada:", levantamento.empresa.nome);

            if (data.setor || data.funcao) {
                if (hasSetor) {
                    console.log("📂 Setor encontrado:", hasSetor.nome);

                    // Atualizar função existente
                    if (hasFuncao) {
                        console.log("✏️ Atualizando função existente:", hasFuncao.nome);
                        await this.save(
                            this.keys.LEVANTAMENTOS_KEY,
                            JSON.stringify(
                                levantamentos.map((l) =>
                                    l.empresa.id === data.empresa.id
                                        ? {
                                            empresa: {
                                                ...levantamento.empresa,
                                                setores: levantamento.empresa.setores.map((s) =>
                                                    s.id === data.setor?.id
                                                        ? {
                                                            ...data.setor,
                                                            funcoes: s.funcoes.map((f) =>
                                                                f.id === data.funcao?.id
                                                                    ? data.funcao
                                                                    : f
                                                            ).filter(f => f?.nome !== ""),
                                                        }
                                                        : s
                                                ),
                                            },
                                        }
                                        : l
                                )
                            )
                        );
                        console.log("✅ Função atualizada com sucesso.");
                    }
                    // Adicionar nova função
                    else if (data.funcao) {
                        console.log("🆕 Adicionando nova função:", data.funcao.nome);
                        await this.save(
                            this.keys.LEVANTAMENTOS_KEY,
                            JSON.stringify(
                                levantamentos.map((l) =>
                                    l.empresa.id === data.empresa.id
                                        ? {
                                            empresa: {
                                                ...levantamento.empresa,
                                                setores: levantamento.empresa.setores.map((s) =>
                                                    s.id === data.setor?.id
                                                        ? {
                                                            ...data.setor,
                                                            funcoes: [...s.funcoes, data.funcao].filter(f => f?.nome !== ""),
                                                        }
                                                        : s
                                                ),
                                            },
                                        }
                                        : l
                                )
                            )
                        );
                        console.log("✅ Função adicionada com sucesso.");
                    }
                    // Atualizar apenas setor
                    else {
                        console.log("✏️ Atualizando setor:", data.setor?.nome);
                        await this.save(
                            this.keys.LEVANTAMENTOS_KEY,
                            JSON.stringify(
                                levantamentos.map((l) =>
                                    l.empresa.id === data.empresa.id
                                        ? {
                                            empresa: {
                                                ...levantamento.empresa,
                                                setores: levantamento.empresa.setores.map((s) =>
                                                    s.id === data.setor?.id ? data.setor : s
                                                ),
                                            },
                                        }
                                        : l
                                )
                            )
                        );
                        console.log("✅ Setor atualizado com sucesso.");
                    }
                } else {
                    // Se não tiver o setor, adiciona
                    console.log("🆕 Adicionando novo setor:", data.setor?.nome);
                    await this.save(
                        this.keys.LEVANTAMENTOS_KEY,
                        JSON.stringify(
                            levantamentos.map((l) =>
                                l.empresa.id === data.empresa.id
                                    ? {
                                        empresa: {
                                            ...levantamento.empresa,
                                            setores: [
                                                ...levantamento.empresa.setores,
                                                data.setor,
                                            ],
                                        },
                                    }
                                    : l
                            )
                        )
                    );
                    console.log("✅ Setor adicionado com sucesso.");
                }
            } else {
                console.log("✏️ Atualizando empresa inteira:", data.empresa.nome);
                await this.save(
                    this.keys.LEVANTAMENTOS_KEY,
                    JSON.stringify(
                        levantamentos.map((l) =>
                            l.empresa.id === data.empresa.id
                                ? { empresa: data.empresa }
                                : l
                        )
                    )
                );
                console.log("✅ Empresa atualizada com sucesso.");
            }
        } else {
            console.log("🆕 Empresa não encontrada. Adicionando nova:", data.empresa.nome);
            await this.save(
                this.keys.LEVANTAMENTOS_KEY,
                JSON.stringify([...levantamentos, { empresa: data.empresa }])
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
        ) as { empresa: VIPEmpresaType }[];
        const filtered = levantamentos.filter((l) => l.empresa.id !== id);
        await this.save(this.keys.LEVANTAMENTOS_KEY, JSON.stringify(filtered));
        return true;
    }

    async getById(
        id: string,
    ): Promise<VIPEmpresaType | null> {
        const levantamentos = JSON.parse(
            (await this.get(this.keys.LEVANTAMENTOS_KEY)) || "[]",
        ) as { empresa: VIPEmpresaType }[];
        const found = levantamentos.find((l) => l.empresa.id === id);
        return found ? found.empresa : null;
    }

}

export default LevantamentoData;
