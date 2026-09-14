import type PsicossocialType from "@/types/Psicossocial/PsicossocialType";
import Storage from "../Storage";

class PsicoData extends Storage {

    static instance: PsicoData;

    static getInstance() {
        if (!PsicoData.instance) {
            PsicoData.instance = new PsicoData();
        }
        return PsicoData.instance;
    }

    constructor() {
        super();
        console.log("🎯 Psicossocial Data initialized");
    }

    async salvar(data: PsicossocialType) {
        if (!data.autorizado || !data.orientacao) return false;
        if (!data.id) return false;
        if (!data.empresa?.cnpj) return false;
        if (!data.empresa?.razao_social) return false;
        if (!data.tecnico) return false;
        if (!data.responsavel) return false;
        const raw = (await this.get(this.keys.PSICOSSOCIAIS_KEY)) || "[]";
        const psicossociais = JSON.parse(raw) as PsicossocialType[];
        psicossociais.push(data);
        await this.save(this.keys.PSICOSSOCIAIS_KEY, JSON.stringify(psicossociais));
        return true;
    }

    async getAll(): Promise<string | null> {
        return this.get(this.keys.PSICOSSOCIAIS_KEY);
    }

    async clear() {
        await this.save(this.keys.PSICOSSOCIAIS_KEY, JSON.stringify([]));
    }

}

export default PsicoData;