import { type Href, useRouter } from "expo-router";
import type { NavigationOptions } from "expo-router/build/global-state/routing";
import type React from "react";
import { createContext, useContext, useState } from "react";

// Contexto para navegação
interface NavigationContextType {
	push: (path: Href) => void;
	back: () => void;
	history: Href[];
	replace: (path: Href) => void;
}

const NavigationHistoryContext = createContext<
	NavigationContextType | undefined
>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const router = useRouter();
	const [history, setHistory] = useState<Href[]>([]);

	// Função para navegar para uma rota e registrar no histórico
	const push = (href: Href, options?: NavigationOptions) => {
		setHistory((prev) => [...prev, href]);
		router.push(href, options);
	};

	// Função para substituir a rota atual no histórico
	const replace = (href: Href, options?: NavigationOptions) => {
		setHistory((prev) => {
			const newHistory = [...prev];
			newHistory[newHistory.length - 1] = href; // substitui a última rota
			return newHistory;
		});
		router.replace(href, options);
	};

	// Função para voltar
	const back = () => {
		if (history.length > 1) {
			const newHistory = [...history];
			newHistory.pop(); // remove a rota atual
			const last = newHistory[newHistory.length - 1];
			setHistory(newHistory);
			router.replace(last); // substitui tela atual pela anterior
		} else {
			router.replace("/"); // fallback para home
			setHistory([]); // reset histórico
		}
	};

	return (
		<NavigationHistoryContext.Provider
			value={{ push, back, history, replace }}
		>
			{children}
		</NavigationHistoryContext.Provider>
	);
};

// Hook para usar em componentes
export const useNavigationHistory = () => {
	const context = useContext(NavigationHistoryContext);
	if (!context)
		throw new Error(
			"useNavigationHistory deve ser usado dentro de NavigationProvider"
		);
	return context;
};
