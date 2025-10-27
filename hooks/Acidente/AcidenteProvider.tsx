import React, { createContext, type JSX, useContext, useState } from "react";

import type Acidente from "@/types/Acidente";

const AcidenteContext = createContext<
	| {
			acidente: Acidente;
			setAcidente: React.Dispatch<React.SetStateAction<Acidente>>;
	  }
	| undefined
>(undefined);

export default function AcidenteProvider({
	children,
}: {
	children: JSX.Element;
}) {
	const hoje = new Date();
	const dia = String(hoje.getDate()).padStart(2, "0");
	const mes = String(hoje.getMonth() + 1).padStart(2, "0"); // Janeiro = 0
	const ano = hoje.getFullYear();

	const dataFormatada = `${dia}/${mes}/${ano}`;
	const [acidente, setAcidente] = useState<Acidente>({
		cat1: {
			dataAnalise: dataFormatada,
		},
		cat2: {},
		cat3: {},
		cat4: {},
		cat5: {},
		cat6: {},
		cat7: {},
		cat8: {},
		cat9: {},
	});
	return (
		<AcidenteContext.Provider value={{ acidente, setAcidente }}>
			{children}
		</AcidenteContext.Provider>
	);
}

export function useAcidente() {
	const context = useContext(AcidenteContext);
	if (context === undefined) {
		throw new Error("useAcidente must be used within a AcidenteProvider");
	}
	return context;
}
