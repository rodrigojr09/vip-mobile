export const calculateIBUTG = (Tbu: string, Tg: string) => {
	if (
		!Tbu ||
		!Tg ||
		Number.isNaN(parseFloat(Tbu)) ||
		Number.isNaN(parseFloat(Tg))
	) {
		return "";
	}
	return (0.7 * parseFloat(Tbu) + 0.3 * parseFloat(Tg)).toFixed(2);
};

export const calculateMediaIBUTG = (data: string[][]) => {
	const validValues = data
		.map((row) => parseFloat(row[4]))
		.filter((value) => !Number.isNaN(value));
	if (validValues.length === 0) return "";
	const sum = validValues.reduce((acc, val) => acc + val, 0);
	return (sum / validValues.length).toFixed(2);
};

export const calculateCalor = (
	IBUTG: string,
	Tg: string,
	Tbu: string,
	tempoTrabalho: string,
	metabolismoTrabalho: string,
) => {
	if (!IBUTG || !Tg || !Tbu || !tempoTrabalho || !metabolismoTrabalho) {
		return "";
	}

	const ibutgValor = parseFloat(IBUTG);
	const tgValor = parseFloat(Tg);
	const tbuValor = parseFloat(Tbu);
	const tempoValor = parseFloat(tempoTrabalho);
	const metabolismoValor = parseFloat(metabolismoTrabalho);

	if (
		Number.isNaN(ibutgValor) ||
		Number.isNaN(tgValor) ||
		Number.isNaN(tbuValor) ||
		Number.isNaN(tempoValor) ||
		Number.isNaN(metabolismoValor)
	) {
		return "";
	}

	const variavel = ibutgValor / tempoValor;
	const calorTrabalho = ibutgValor + tgValor * tbuValor;
	const metabolismo = metabolismoValor * tempoValor;
	const metabolismoTotal = metabolismo / 60;

	return (variavel + calorTrabalho + metabolismoTotal).toFixed(2);
};
