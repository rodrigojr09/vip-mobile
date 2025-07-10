import { VIPPerguntaType } from "@/types/VisitaTecnica/VIPPerguntaType";

export const quests: VIPPerguntaType[] = [
	{
		id: "q1",
		pergunta: "Houve admissão no ultimo mês?",
		subpergunta: [
			{
				id: "q1-1",
				pergunta: "Os admitidos realizaram os exames admissionais?",
				subpergunta: [
					{
						id: "q1-1-1",
						pergunta:
							"Os admitidos participaram da integração de segurança?",
						subpergunta: [
							{
								id: "q1-1-1-1",
								pergunta:
									"Foram entregue todos os EPIs aos admitidos?",
								subpergunta: [
									{
										id: "q1-1-1-1-1",
										pergunta:
											"Os admitidos preencheram a ficha de EPIs?",
										subpergunta: [
											{
												id: "q1-1-1-1-1-1",
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
		pergunta: "Houve demissão no ultimo mês?",
		subpergunta: [
			{
				id: "q2-1",
				pergunta: "Os demitidos realizaram os exames demissionais?",
				subpergunta: [
					{
						id: "q2-1-1",
						pergunta: "Os demitidos devolveram os EPIs?",
					},
				],
			},
		],
	},
	{
		id: "q3",
		pergunta: "Houve acidentes/incidentes no ultimo mês?",
		subpergunta: [
			{
				id: "q3-1",
				type: "sim",
				pergunta: "Houve afastamento?",
				subpergunta: [
					{
						id: "q3-1-1",
						type: "sim",
						pergunta: "Foi realizado a analise de acidente?",
						subpergunta: [
							{
								id: "q3-1-1-1",
								type: "sim",
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
		pergunta:
			"As fichas de EPIs estão preenchidas corretamente e atualizadas?",
		subpergunta: [
			{
				id: "q4-1",
				type: "sim",
				pergunta: "Quem informou?",
			},
			{
				id: "q4-2",
				type: "sim",
				pergunta: "Há resistencia ao uso dos EPIs?",
			},
		],
	},
    {
        id: "q5",
        pergunta: "Os colaboradores estão com os treinamentos atualizados?",
        subpergunta: [
            {
                id: "q5-1",
                type: "sim", 
                pergunta: "Quem informou?",
            },
        ],
    },
];
 