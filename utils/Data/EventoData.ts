import type { VIPEvento } from "@/types/VIPEvent";
import Storage from "../Storage";

export default class EventoData extends Storage {
    private static instance: EventoData;

    static getInstance() {
        if (!EventoData.instance) {
            EventoData.instance = new EventoData();
        }
        return EventoData.instance;
    }

    private constructor() {
        super();
        
        console.log("🎯 EventoData inicializado");
    }

    async add(evento: VIPEvento) {
        const eventos = (await this.getAll()) || [];
        eventos.push(evento);
        await this.save(this.keys.EVENTOS_KEY, JSON.stringify(eventos));
    }

    async getAll(): Promise<VIPEvento[]> {
        const data = await this.get(this.keys.EVENTOS_KEY);
        return data ? JSON.parse(data) : [];
    }

    async clear() {
        await this.save(this.keys.EVENTOS_KEY, JSON.stringify([]));
    }

    async getDevice(): Promise<string | null> {
        const device = await this.get("@vip:device_id");
        return device;
    }

    async setDevice(deviceId: string) {
        await this.save("@vip:device_id", deviceId);
    }
}
