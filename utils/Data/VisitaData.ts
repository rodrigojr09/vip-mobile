import type { VIPVisitaType } from "@/types/VisitaTecnica/VIPVisitaType";
import Storage from "../Storage";

export default class VisitaData extends Storage {
    private static instance: VisitaData;
	private listeners: Array<() => void> = [];

    public perguntas: VIPVisitaType["perguntas"] = { adm: [], setor: [] };

    /** 🔁 Singleton — garante apenas uma instância */
    static getInstance(): VisitaData {
        if (!VisitaData.instance) {
            VisitaData.instance = new VisitaData();
        }
        return VisitaData.instance;
    }

    private constructor() {
        super();
        console.log("🎯 VisitaData inicializado");
    }

    /** 🚀 Inicializa dados locais e remotos */
    public async init(): Promise<void> {
        try {
            console.log("🔄 Iniciando carregamento de dados...");

            await this.loadEmpresas();
            await this.loadPerguntas();

            console.log("✅ Dados de visitas inicializados com sucesso!");
        } catch (error) {
            console.error("❌ Erro ao carregar dados em VisitaData:", error);
        } finally {
			this.notify();
		}
    }

	public subscribe(listener: () => void) {
		this.listeners.push(listener);
		return () => {
			this.listeners = this.listeners.filter((item) => item !== listener);
		};
	}

	private notify() {
		this.listeners.forEach((listener) => {
			try {
				listener();
			} catch (error) {
				console.error("❌ Erro ao notificar listeners de VisitaData:", error);
			}
		});
	}

    /** 🌐 Carrega empresas da API ou localmente */
    private async loadEmpresas(): Promise<void> {
        try {
            console.log("🌐 Buscando empresas da API...");
            const res = await fetch(`${Storage.base_url}/empresas?exclude=true`);

            if (res.ok) {
                const empresas = await res.json();
				if (!Array.isArray(empresas)) {
					throw new Error("Payload de empresas invalido");
				}
                this.empresas = empresas;
                console.log(`✅ ${empresas.length} empresas carregadas da API`);
                await this.save(this.keys.EMPRESAS_KEY, JSON.stringify(empresas));
            } else {
                throw new Error(`Status ${res.status}`);
            }
        } catch (err) {
            console.log(err);
            console.warn("⚠️ Falha ao carregar empresas. Carregando do storage local...");
            const stored = await this.get(this.keys.EMPRESAS_KEY);
			if (stored) {
				try {
					const parsed = JSON.parse(stored);
					this.empresas = Array.isArray(parsed) ? parsed : [];
				} catch (parseError) {
					console.warn("⚠️ Erro ao ler cache de empresas:", parseError);
					this.empresas = [];
				}
			} else {
				this.empresas = [];
			}
            console.log(`💾 ${this.empresas.length} empresas carregadas do cache`);
        }
    }

    /** 🌐 Carrega perguntas da API ou localmente */
    private async loadPerguntas(): Promise<void> {
        try {
            console.log("🌐 Buscando perguntas da API...");
            const res = await fetch(`${Storage.base_url}/perguntas`);

            if (res.ok) {
                const perguntas = await res.json();
				if (
					!perguntas ||
					!Array.isArray(perguntas.questionsAdm) ||
					!Array.isArray(perguntas.questionsSetor)
				) {
					throw new Error("Payload de perguntas invalido");
				}
                this.perguntas = {
                    adm: perguntas.questionsAdm || [],
                    setor: perguntas.questionsSetor || [],
                };
                console.log(
                    `✅ Perguntas carregadas: adm=${this.perguntas.adm.length}, setor=${this.perguntas.setor.length}`
                );

                await this.save(this.keys.PERGUNTAS_KEY, JSON.stringify(this.perguntas));
            } else {
                throw new Error(`Status ${res.status}`);
            }
        } catch (err) {
            console.log(err);
            console.warn("⚠️ Falha ao carregar perguntas. Carregando do storage local...");
            const stored = await this.get(this.keys.PERGUNTAS_KEY);
			if (stored) {
				try {
					const parsed = JSON.parse(stored);
					if (
						parsed &&
						Array.isArray(parsed.adm) &&
						Array.isArray(parsed.setor)
					) {
						this.perguntas = parsed;
					} else {
						this.perguntas = { adm: [], setor: [] };
					}
				} catch (parseError) {
					console.warn("⚠️ Erro ao ler cache de perguntas:", parseError);
					this.perguntas = { adm: [], setor: [] };
				}
			} else {
				this.perguntas = { adm: [], setor: [] };
			}
            console.log(
                `💾 Perguntas carregadas do cache: adm=${this.perguntas.adm.length}, setor=${this.perguntas.setor.length}`
            );
        }
    }

    /** 🧩 Cria nova visita (offline ou online) */
    async create(visita: VIPVisitaType): Promise<boolean | "offline" | null> {
        try {
            console.log("📝 Enviando visita:", visita.id);

            const payload = {
                id: visita.id,
                empresaId: visita.empresa?.id,
                inclusasId: visita.inclusas?.map(i => i.empresa?.id) || [],
                responsavel: visita.responsavel,
                tecnico: visita.tecnico,
                data: visita.data,
                horaEntrada: visita.horaEntrada,
                horaSaida: visita.horaSaida,
                perguntas: visita.perguntas,
                respostas: visita.respostas,
                setores: visita.setores,
                assinatura: visita.assinatura,
            };

            // 🔌 Tenta enviar para o servidor
            const res = await fetch(`${Storage.base_url}/visitas`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            // ✅ Sucesso
            if (res.ok) {
                console.log("✅ Visita enviada com sucesso!");
                return true;
            }

            // ⚠️ Falha no status HTTP
            console.warn("⚠️ Falha ao enviar visita. Status:", res.status);
            console.warn("💾 Salvando visita localmente (modo offline)");
            return "offline";

        } catch (err) {
            // ❌ Erro de rede ou exceção
            console.error("❌ Erro ao criar visita:", err);
            console.warn("💾 Salvando visita localmente (erro na requisição)");
            return "offline";
        }
    }


    /** 📦 Retorna todas as visitas salvas localmente */
    async getAll(): Promise<VIPVisitaType[]> {
        try {
            const data = await this.get(this.keys.VISITAS_KEY);
            return data ? (JSON.parse(data) as VIPVisitaType[]) : [];
        } catch (err) {
            console.error("❌ Erro ao carregar visitas:", err);
            return [];
        }
    }

    async salvar(visita: VIPVisitaType) {
        try {
            const visitas = await this.getAll();
            if (visitas.find(v => v.id === visita.id)) {
                await this.save(this.keys.VISITAS_KEY, JSON.stringify(visitas.map(v => v.id === visita.id ? visita : v)));
            } else {
                visitas.push(visita);
                await this.save(this.keys.VISITAS_KEY, JSON.stringify(visitas));
            }
            console.log(`💾 Visita salva localmente (${visitas.length} total)`);
            return "offline";
        } catch (err) {
            console.error("❌ Erro ao salvar visita local:", err);
            return null;
        }
    }

    /** 🔍 Busca visita por ID */
    async getById(id: string): Promise<VIPVisitaType | null> {
        try {
            const visitas = await this.getAll();
            return visitas.find((v) => v.id === id) || null;
        } catch (err) {
            console.error("❌ Erro ao buscar visita:", err);
            return null;
        }
    }

    /** 🗑️ Remove todas as visitas locais */
    async clearVisitas(): Promise<void> {
        try {
            await this.save(this.keys.VISITAS_KEY, JSON.stringify([]));
            console.log("🧹 Todas as visitas foram limpas");
        } catch (err) {
            console.error("❌ Erro ao limpar visitas:", err);
        }
    }

    /** 🗑️ Deletar uma visita */
    async delete(id: string): Promise<void> {
        try {
            const visitas = await this.getAll();
            await this.save(this.keys.VISITAS_KEY, JSON.stringify(visitas.filter((v) => v.id !== id)));
            console.log("🧹 Visita deletada com sucesso!");
        } catch (err) {
            console.error("❌ Erro ao deletar visita:", err);
        }
    }

}
