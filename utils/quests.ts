import type { VIPPerguntaType } from "@/types/VisitaTecnica/VIPPerguntaType";

export const quests_adm: VIPPerguntaType[] = [
	{
		id: "q1",
		type: "boolean",
		pergunta: "Houveram admissão no ultimo mês?",
		subpergunta: [
			{
				id: "q1-1",
				when: "sim",
				type: "boolean",
				pergunta: "Os admitidos realizaram os exames admissionais?",
				subpergunta: [
					{
						id: "q1-1-1",
						when: "sim",
						type: "boolean",
						pergunta: "Os admitidos participaram da integração de segurança?",
						subpergunta: [
							{
								id: "q1-1-1-1",
								when: "sim",
								type: "boolean",
								pergunta: "Foram entregue todos os EPIs aos admitidos?",
								subpergunta: [
									{
										id: "q1-1-1-1-1",
										when: "sim",
										type: "boolean",
										pergunta: "Os admitidos preencheram a ficha de EPIs?",
										subpergunta: [
											{
												id: "q1-1-1-1-1-1",
												when: "sim",
												type: "boolean",
												pergunta:
													"Os admitidos realizaram os treinamentos internos?",
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
	{
		id: "q2",
		type: "boolean",
		pergunta: "Houveram demissão no ultimo mês?",
		subpergunta: [
			{
				id: "q2-1",
				when: "sim",
				type: "boolean",
				pergunta: "Os demitidos realizaram os exames demissionais?",
				subpergunta: [
					{
						id: "q2-1-1",
						when: "sim",
						type: "boolean",
						pergunta: "Os demitidos devolveram os EPIs?",
					},
				],
			},
		],
	},
	{
		id: "q3",
		when: "sim",
		type: "boolean",
		pergunta: "Houveram acidentes/incidentes no ultimo mês?",
		subpergunta: [
			{
				id: "q3-1",
				when: "sim",
				type: "boolean",
				pergunta: "Houveram afastamento?",
				subpergunta: [
					{
						id: "q3-1-1",
						when: "sim",
						type: "boolean",
						pergunta: "Foi realizado a analise de acidente?",
						subpergunta: [
							{
								id: "q3-1-1-1",
								when: "sim",
								type: "boolean",
								pergunta: "Teve emissão de CAT?",
							},
						],
					},
				],
			},
		],
	},
	{
		id: "q4",
		type: "boolean",
		pergunta: "As fichas de EPIs estão preenchidas corretamente e atualizadas?",
		subpergunta: [
			{
				id: "q4-1",
				when: "sim",
				type: "boolean",
				pergunta: "Quem informou?",
			},
			{
				id: "q4-3",
				when: "sim",
				type: "boolean",
				pergunta: "Há resistencia ao uso dos EPIs?",
			},
		],
	},
	{
		id: "q5",
		type: "boolean",
		pergunta: "Os colaboradores estão com os treinamentos atualizados?",
		subpergunta: [
			{
				id: "q5-1",
				when: "não",
				type: "info",
				pergunta: "Quais treinamentos precisam de atualização?",
				subpergunta: [
					{
						id: "q5-0",
						type: "check",
						pergunta:
							"NR 5 - Comissão Interna de Prevenção de Acidentes (CIPA)",
					},
					{
						id: "q5-1",
						type: "check",
						pergunta: "NR 6 - Equipamentos de Proteção Individual (EPI)",
					},
					{
						id: "q5-2",
						type: "check",
						pergunta:
							"NR 7 - Primeiros Socorros / Tabagismo, Alcoolismo, Drogas e IST's",
					},
					{
						id: "q5-3",
						type: "check",
						pergunta:
							"NR 10 - Segurança em Instalações e Serviços em Eletricidade",
					},
					{
						id: "q5-4",
						type: "check",
						pergunta:
							"NR 11 - Transporte, Movimentação, Armazenagem e Manuseio de Materiais",
					},
					{
						id: "q5-5",
						type: "check",
						pergunta: "NR 12 - Máquinas e Equipamentos",
					},
					{
						id: "q5-6",
						type: "check",
						pergunta: "NR 13 - Caldeiras",
					},
					{
						id: "q5-7",
						type: "check",
						pergunta: "NR 17 - Ergonomia",
					},
					{
						id: "q5-8",
						type: "check",
						pergunta: "NR 18 - Construção Civil",
					},
					{
						id: "q5-9",
						type: "check",
						pergunta: "NR 20 - Inflamáveis e Combustíveis",
					},
					{
						id: "q5-10",
						type: "check",
						pergunta: "NR 23 - Combate a Princípios de Incêndio",
					},
					{
						id: "q5-11",
						type: "check",
						pergunta: "NR 31 - Trabalho Rural",
					},
					{
						id: "q5-12",
						type: "check",
						pergunta: "NR 33 - Espaços Confinados",
					},
					{
						id: "q5-13",
						type: "check",
						pergunta: "NR 35 - Trabalho em Altura",
					},
				],
			},
		],
	},
];

export const quests_setor: VIPPerguntaType[] = [
	{
		id: "q1",
		type: "boolean",
		pergunta: "Os ambientes estão organizados e livres de obstruções?",
	},
	{
		id: "q2",
		type: "boolean",
		pergunta: "As áreas de circulação estão devidamente sinalizadas?",
	},
	{
		id: "q3",
		type: "boolean",
		pergunta: "Existe controle de acesso a áreas restritas?",
	},
	{
		id: "q4",
		type: "boolean",
		pergunta: "As instalações elétricas estão em bom estado e sinalizadas?",
	},
	{
		id: "q5",
		type: "boolean",
		pergunta:
			"Há proteção contra contato direto (tomadas, disjuntores, fios, etc.)?",
	},
	{
		id: "q6",
		type: "boolean",
		pergunta: "Os quadros elétricos estão identificados e de fácil acesso?",
	},
	{
		id: "q7",
		type: "boolean",
		pergunta: "As máquinas possuem proteção mecânica (grades, sensores, etc.)?",
	},
	{
		id: "q8",
		type: "boolean",
		pergunta: "Há sinalização de segurança nas áreas de operação de maquinas?",
	},
	{
		id: "q9",
		type: "boolean",
		pergunta:
			"Os colaboradores estão utilizando os EPIs corretamente no setor?",
	},
];
