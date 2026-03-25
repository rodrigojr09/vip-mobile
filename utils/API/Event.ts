import { v4 as uuidv4 } from "uuid";
import * as Network from "expo-network";
import type { VIPEvento, VIPLocalizacao } from "@/types/VIPEvent";
import "react-native-get-random-values";
import manager from "../Data/manager";
import Storage from "../Storage";
import { getCurrentLocation } from "./Locator";
import { logger } from "../logger";

class Event {
	public atual: null | string = null;
	private context: string | null = null;

	constructor() {
		this.sendEvent("Event instance created").catch((error) =>
			logger.error("Event", "Failed to send startup event", error),
		);
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

	private formatMessage(message: string, contextOverride?: string | null) {
		const parts: string[] = [];
		const context = contextOverride ?? this.context;

		if (context) parts.push(context);
		if (this.atual) parts.push(this.atual);

		if (parts.length === 0) return message;
		return `[${parts.join("][")}] ${message}`;
	}

	public setContext(context: string | null) {
		this.context = context;
		logger.debug("Event", "Context updated", context ?? "none");
	}

	public startEvent(eventName: string) {
		this.atual = eventName;
		logger.info("Event", `Event started: ${eventName}`);
	}

	public endEvent() {
		if (!this.atual) {
			logger.warn("Event", "No active event to close");
			return;
		}
		logger.info("Event", `Event finished: ${this.atual}`);
		this.atual = null;
	}

	public async sendEvent(evento: string) {
		return this.sendEventWithLocation(evento);
	}

	public async sendEventWithLocation(
		evento: string,
		localizacao?: VIPLocalizacao,
		contextOverride?: string | null,
	) {
		const { data, hora } = this.formatDateTime();
		const msg = this.formatMessage(evento, contextOverride);

		const novoEvento: VIPEvento = {
			id: uuidv4(),
			device: (await manager.eventos.getDevice()) || "unknown-device",
			data,
			hora,
			msg,
			localizacao: localizacao ?? (await getCurrentLocation()),
		};

		try {
			const network = await Network.getNetworkStateAsync();
			const offline =
				network.isConnected === false ||
				network.isInternetReachable === false;

			if (offline) {
				logger.warn("Event", "Offline, queued event", novoEvento.msg);
				await manager.eventos.add(novoEvento);
				return false;
			}
		} catch (error) {
			logger.warn("Event", "Failed to check network state", error);
		}

		try {
			const res = await fetch(`${Storage.base_url}/eventos/send`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(novoEvento),
			});

			if (!res.ok) throw new Error("Failed to send event to API");

			return true;
		} catch {
			logger.warn("Event", "Event saved offline", novoEvento.msg);
			await manager.eventos.add(novoEvento);
			return false;
		}
	}

	public async syncOfflineEventos() {
		try {
			const content = (await manager.eventos.getAll()) || [];
			const eventos: VIPEvento[] = content;

			if (!eventos.length) return;

			const enviado = await this.setEventos(eventos);

			if (enviado) {
				await manager.eventos.clear();
				logger.info("Event", "Offline events synced");
			} else {
				logger.warn("Event", "Failed to sync offline events");
			}
		} catch (error) {
			logger.error("Event", "Error syncing offline events", error);
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
			logger.error("Event", "Failed to send events to API", error);
			return false;
		}
	}

	public async getOfflineEventos(): Promise<VIPEvento[]> {
		try {
			const content = (await manager.eventos.getAll()) || [];
			return content;
		} catch (error) {
			logger.error("Event", "Failed to read offline events", error);
			return [];
		}
	}
}

export const events = new Event();
