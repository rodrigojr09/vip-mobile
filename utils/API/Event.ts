import { getAndroidId } from "expo-application";
import { v4 as uuidv4 } from "uuid";
import type { VIPEvento } from "@/types/VIPEvent";
import { getCurrentLocation } from "./Locator";
import "react-native-get-random-values";
import Storage, { storage } from "../Storage";

class Event {
	public atual: null | string = null;

	constructor() {
		this.sendEvent("[Event] Instância criada").catch(console.error);
	}

	private formatDateTime() {
		const agora = new Date();
		const data = `${String(agora.getDate()).padStart(2, "0")}/${String(
			agora.getMonth() + 1,
		).padStart(2, "0")}/${agora.getFullYear()}`;
		const hora = `${String(agora.getHours()).padStart(2, "0")}:${String(
			agora.getMinutes(),
		).padStart(2, "0")}:${String(agora.getSeconds()).padStart(2, "0")}`;
		return { data, hora };
	}

	public startEvent(eventName: string) {
		this.atual = eventName;
		console.log(`🔄 Evento iniciado: ${eventName}`);
	}

	public endEvent() {
		if (!this.atual) {
			console.warn("Nenhum evento ativo para encerrar.");
			return;
		}
		console.log(`✅ Evento encerrado: ${this.atual}`);
		this.atual = null;
	}

	public async sendEvent(evento: string) {
		const { data, hora } = this.formatDateTime();

		const novoEvento: VIPEvento = {
			id: uuidv4(),
			device: getAndroidId() || "unknown-device",
			data,
			hora,
			msg: evento,
			localizacao: await getCurrentLocation(),
		};

		try {
			const res = await fetch(`${Storage.base_url}/eventos/send`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(novoEvento),
			});

			if (!res.ok) throw new Error("Falha ao enviar para API");

			return true;
		} catch {
			console.warn("⚠️ Evento salvo offline:", novoEvento.msg);
			await storage.addEvento(novoEvento);
			return false;
		}
	}

	public async saveOfflineEvento(evento: VIPEvento) {
		try {
			await storage.addEvento(evento);
			console.log("📦 Evento salvo offline:", evento.msg);
		} catch (error) {
			console.error("Erro ao salvar evento offline:", error);
		}
	}

	public async syncOfflineEventos() {
		try {
			const content = (await storage.getEventos()) || "[]";
			const eventos: VIPEvento[] = JSON.parse(content);

			if (!eventos.length) return;

			const enviado = await this.setEventos(eventos);

			if (enviado) {
				await storage.clearEventos();
				console.log("✅ Eventos offline sincronizados com sucesso.");
			} else {
				console.warn("⚠️ Falha ao sincronizar eventos offline.");
			}
		} catch (error) {
			console.error("❌ Erro ao sincronizar eventos offline:", error);
		}
	}

	private async setEventos(eventos: VIPEvento[]) {
		try {
			const res = await fetch(`${Storage.base_url}/eventos/set`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(eventos),
			});
			return res.ok;
		} catch (error) {
			console.error("Erro ao enviar eventos para API:", error);
			return false;
		}
	}

	public async getOfflineEventos(): Promise<VIPEvento[]> {
		try {
			const content = (await storage.getEventos()) || "[]";
			return JSON.parse(content);
		} catch (error) {
			console.error("Erro ao ler eventos offline:", error);
			return [];
		}
	}
}

export const events = new Event();
