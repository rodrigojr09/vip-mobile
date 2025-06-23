import { Question } from "@/types/VIPVisitaType";

/* Questions Old*/
const questions: Question[] = [
	{
		label: "Existe Sinalização de Segurança?",
		subquest: {
			true: {
				label: "A sinalização de segurança está visível e compreensível?",
				subquest: {
					true: {
						label: "As placas de sinalização estão em bom estado (sem danos ou desgastes)?",
						subquest: null,
					},
					false: {
						label: "As placas precisam ser substituídas ou reforçadas?",
						subquest: null,
					},
				},
			},
			false: {
				label: "A ausência de sinalização representa risco aos trabalhadores?",
				subquest: {
					true: {
						label: "É necessário providenciar a instalação imediata de sinalização adequada?",
						subquest: null,
					},
					false: {
						label: "Existe outro meio seguro de orientação além da sinalização formal?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "EPIs disponíveis e em uso correto?",
		subquest: {
			true: {
				label: "Os EPIs estão disponíveis para todos os trabalhadores?",
				subquest: {
					true: {
						label: "Os EPIs estão sendo usados corretamente durante as atividades?",
						subquest: {
							true: {
								label: "Os trabalhadores demonstram entendimento sobre a importância do uso dos EPIs?",
								subquest: null,
							},
							false: {
								label: "Houve orientação ou treinamento recente sobre o uso correto dos EPIs?",
								subquest: null,
							},
						},
					},
					false: {
						label: "Há fiscalização do uso correto dos EPIs pelos supervisores?",
						subquest: null,
					},
				},
			},
			false: {
				label: "Há falta de algum EPI essencial para a atividade?",
				subquest: {
					true: {
						label: "Já foi feita a solicitação de reposição ou compra desses EPIs?",
						subquest: null,
					},
					false: {
						label: "A ausência dos EPIs pode causar riscos imediatos à saúde dos trabalhadores?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "Os Treinamentos de segurança estão atualizados?",
		subquest: {
			true: {
				label: "Os trabalhadores passaram por treinamentos de segurança atualizados?",
				subquest: {
					true: {
						label: "Há registros documentados dos treinamentos realizados?",
						subquest: null,
					},
					false: {
						label: "Os treinamentos foram aplicados informalmente, sem documentação?",
						subquest: null,
					},
				},
			},
			false: {
				label: "A ausência de treinamentos compromete a execução segura das tarefas?",
				subquest: {
					true: {
						label: "É necessário agendar treinamentos obrigatórios com urgência?",
						subquest: null,
					},
					false: {
						label: "Há previsão de treinamentos futuros já planejados?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "Possui máquinas e equipamentos?",
		subquest: {
			true: {
				label: "As máquinas estão em bom estado de conservação e funcionamento?",
				subquest: {
					true: {
						label: "As manutenções estão sendo realizadas periodicamente?",
						subquest: null,
					},
					false: {
						label: "Existe um plano de manutenção preventiva em andamento?",
						subquest: null,
					},
				},
			},
			false: {
				label: "Há máquinas ou equipamentos com defeitos que oferecem riscos?",
				subquest: {
					true: {
						label: "Foi sinalizado o equipamento defeituoso e suspenso o uso?",
						subquest: null,
					},
					false: {
						label: "As maquinas/equipamentos com defeito continuam em uso?",
						subquest: null,
					},
				},
			},
		},
	},

	{
		label: "Controle de acesso a áreas restritas",
		subquest: {
			true: {
				label: "O acesso às áreas restritas está devidamente controlado?",
				subquest: {
					true: {
						label: "Somente pessoas autorizadas têm acesso?",
						subquest: null,
					},
					false: {
						label: "Há registros de acessos indevidos ou não autorizados?",
						subquest: null,
					},
				},
			},
			false: {
				label: "A ausência de controle representa risco à segurança?",
				subquest: {
					true: {
						label: "Há necessidade de medidas imediatas de controle?",
						subquest: null,
					},
					false: {
						label: "Há plano para instalação de controle de acesso?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "Presença de mapa de risco atualizado",
		subquest: {
			true: {
				label: "O mapa de risco está visível e atualizado?",
				subquest: {
					true: {
						label: "Os trabalhadores conhecem as áreas de risco?",
						subquest: null,
					},
					false: {
						label: "É necessário reforçar a comunicação sobre os riscos?",
						subquest: null,
					},
				},
			},
			false: {
				label: "A ausência do mapa compromete a percepção dos riscos?",
				subquest: {
					true: {
						label: "Deve-se providenciar a atualização e divulgação imediata?",
						subquest: null,
					},
					false: {
						label: "Outros meios estão sendo utilizados para informar os riscos?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "Plano de emergência e abandono divulgado e sinalizado",
		subquest: {
			true: {
				label: "O plano está divulgado e sinalizado corretamente?",
				subquest: {
					true: {
						label: "Há treinamentos periódicos sobre evacuação?",
						subquest: null,
					},
					false: {
						label: "Está prevista a realização de simulado?",
						subquest: null,
					},
				},
			},
			false: {
				label: "A ausência do plano compromete a resposta a emergências?",
				subquest: {
					true: {
						label: "É necessária a implantação urgente do plano?",
						subquest: null,
					},
					false: {
						label: "Há outro sistema de orientação em caso de emergência?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "Condições dos banheiros e áreas de descanso",
		subquest: {
			true: {
				label: "As áreas estão limpas, organizadas e em bom estado?",
				subquest: {
					true: {
						label: "Há manutenção e limpeza periódica?",
						subquest: null,
					},
					false: {
						label: "Há necessidade de ajustes na frequência de limpeza?",
						subquest: null,
					},
				},
			},
			false: {
				label: "As condições identificadas afetam o bem-estar dos trabalhadores?",
				subquest: {
					true: {
						label: "Foram tomadas medidas imediatas para melhoria?",
						subquest: null,
					},
					false: {
						label: "Há planejamento para reestruturação dos espaços?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "Ventilação e qualidade do ar no ambiente",
		subquest: {
			true: {
				label: "A ventilação é adequada para o ambiente de trabalho?",
				subquest: {
					true: {
						label: "Há monitoramento periódico da qualidade do ar?",
						subquest: null,
					},
					false: {
						label: "Foi recomendada a implantação de controle da qualidade do ar?",
						subquest: null,
					},
				},
			},
			false: {
				label: "A ventilação inadequada impacta a saúde dos trabalhadores?",
				subquest: {
					true: {
						label: "Foram propostas melhorias imediatas?",
						subquest: null,
					},
					false: {
						label: "Há plano de ação gradual para correção?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "Controle de ruído",
		subquest: {
			true: {
				label: "O controle de ruído está adequado (medições, protetores)?",
				subquest: {
					true: {
						label: "Os trabalhadores utilizam os protetores corretamente?",
						subquest: null,
					},
					false: {
						label: "Há falhas na adesão ao uso de protetores?",
						subquest: null,
					},
				},
			},
			false: {
				label: "O ruído excessivo pode causar danos à saúde?",
				subquest: {
					true: {
						label: "Foram tomadas ações corretivas ou de mitigação?",
						subquest: null,
					},
					false: {
						label: "Está em andamento estudo técnico para melhorias?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "Controle de calor ou exposição a agentes térmicos",
		subquest: {
			true: {
				label: "Há controle adequado da exposição ao calor?",
				subquest: {
					true: {
						label: "Os trabalhadores têm pausas e hidratação adequadas?",
						subquest: null,
					},
					false: {
						label: "Há recomendações para ajustes no regime de trabalho?",
						subquest: null,
					},
				},
			},
			false: {
				label: "A exposição térmica está acima dos limites aceitáveis?",
				subquest: {
					true: {
						label: "Há ações corretivas imediatas em andamento?",
						subquest: null,
					},
					false: {
						label: "Está sendo feito monitoramento técnico da exposição?",
						subquest: null,
					},
				},
			},
		},
	},
	{
		label: "Controle de agentes químicos",
		subquest: {
			true: {
				label: "Os agentes químicos estão controlados conforme FISPQ?",
				subquest: {
					true: {
						label: "Os EPIs utilizados são compatíveis com os riscos?",
						subquest: null,
					},
					false: {
						label: "Foi solicitada adequação dos EPIs fornecidos?",
						subquest: null,
					},
				},
			},
			false: {
				label: "A manipulação dos produtos oferece riscos diretos?",
				subquest: {
					true: {
						label: "A atividade foi suspensa ou isolada?",
						subquest: null,
					},
					false: {
						label: "A equipe foi instruída a reforçar as medidas preventivas?",
						subquest: null,
					},
				},
			},
		},
	},
];

export default questions;
