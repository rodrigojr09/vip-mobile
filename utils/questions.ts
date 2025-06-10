/* Questions Old*/
[
	{
		label: "Existe Sinalização de Segurança?",
		subquest: {
			true: {
				label: "A sinalização de segurança está visível e compreensível?",
				subquest: {
					true: {
						label: "As placas de sinalização estão em bom estado (sem danos ou desgastes)?",
						subquest: {},
					},
					false: {
						label: "As placas precisam ser substituídas ou reforçadas?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A ausência de sinalização representa risco aos trabalhadores?",
				subquest: {
					true: {
						label: "É necessário providenciar a instalação imediata de sinalização adequada?",
						subquest: {},
					},
					false: {
						label: "Existe outro meio seguro de orientação além da sinalização formal?",
						subquest: {},
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
								subquest: {},
							},
							false: {
								label: "Houve orientação ou treinamento recente sobre o uso correto dos EPIs?",
								subquest: {},
							},
						},
					},
					false: {
						label: "Há fiscalização do uso correto dos EPIs pelos supervisores?",
						subquest: {},
					},
				},
			},
			false: {
				label: "Há falta de algum EPI essencial para a atividade?",
				subquest: {
					true: {
						label: "Já foi feita a solicitação de reposição ou compra desses EPIs?",
						subquest: {},
					},
					false: {
						label: "A ausência dos EPIs pode causar riscos imediatos à saúde dos trabalhadores?",
						subquest: {},
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
						subquest: {},
					},
					false: {
						label: "Os treinamentos foram aplicados informalmente, sem documentação?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A ausência de treinamentos compromete a execução segura das tarefas?",
				subquest: {
					true: {
						label: "É necessário agendar treinamentos obrigatórios com urgência?",
						subquest: {},
					},
					false: {
						label: "Há previsão de treinamentos futuros já planejados?",
						subquest: {},
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
						subquest: {},
					},
					false: {
						label: "Existe um plano de manutenção preventiva em andamento?",
						subquest: {},
					},
				},
			},
			false: {
				label: "Há máquinas ou equipamentos com defeitos que oferecem riscos?",
				subquest: {
					true: {
						label: "Foi sinalizado o equipamento defeituoso e suspenso o uso?",
						subquest: {},
					},
					false: {
						label: "As maquinas/equipamentos com defeito continuam em uso?",
						subquest: {},
					},
				},
			},
		},
	},
	/*{
		label: "Ordem, limpeza e organização do ambiente",
		subquest: {
			true: {
				label: "O ambiente está limpo, organizado e sem materiais fora do lugar?",
				subquest: {
					true: {
						label: "Há rotina estabelecida de limpeza e organização?",
						subquest: {},
					},
					false: {
						label: "A limpeza é realizada eventualmente ou por necessidade?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A desorganização representa risco de acidentes ou contaminações?",
				subquest: {
					true: {
						label: "Foram feitas recomendações imediatas de limpeza e organização?",
						subquest: {},
					},
					false: {
						label: "Há justificativa temporária para a situação identificada?",
						subquest: {},
					},
				},
			},
		},
	},*/
	/*{
		label: "Instalações elétricas em conformidade?",
		subquest: {
			true: {
				label: "As instalações elétricas estão em conformidade com as normas?",
				subquest: {
					true: {
						label: "Há manutenção preventiva do sistema elétrico?",
						subquest: {},
					},
					false: {
						label: "Foram encontrados pequenos ajustes pendentes?",
						subquest: {},
					},
				},
			},
			false: {
				label: "Há risco de choque, curto ou incêndio nas instalações?",
				subquest: {
					true: {
						label: "É necessária intervenção imediata nas instalações elétricas?",
						subquest: {},
					},
					false: {
						label: "Os riscos foram mapeados e controlados temporariamente?",
						subquest: {},
					},
				},
			},
		},
	},*/
	/*{
		label: "A empresa possui sistema de Proteção contra incêndio?",
		subquest: {
			true: {
				label: "Esse sistema é funcional?",
				subquest: {
					true: {
						label: "Os dispositivos de combate a incêndio estão sinalizados e acessíveis?",
						subquest: {},
					},
					false: {
						label: "Há falhas pontuais de sinalização ou acesso?",
						subquest: {},
					},
				},
			},
			false: {
				label: "Há ausência de extintores, alarmes ou rotas de fuga adequadas?",
				subquest: {
					true: {
						label: "Foram emitidas recomendações para regularização?",
						subquest: {},
					},
					false: {
						label: "Medidas paliativas foram adotadas provisoriamente?",
						subquest: {},
					},
				},
			},
		},
	},*/
	/*{
		label: "Armazenamento de produtos químicos",
		subquest: {
			true: {
				label: "Os produtos químicos estão armazenados de forma adequada?",
				subquest: {
					true: {
						label: "Há sinalização e segregação correta de substâncias incompatíveis?",
						subquest: {},
					},
					false: {
						label: "A sinalização ou contenção precisa ser reforçada?",
						subquest: {},
					},
				},
			},
			false: {
				label: "O armazenamento inadequado oferece riscos imediatos?",
				subquest: {
					true: {
						label: "Foi determinada a correção imediata da situação?",
						subquest: {},
					},
					false: {
						label: "A área está isolada e sob controle até a adequação?",
						subquest: {},
					},
				},
			},
		},
	},*/
	/*{
		label: "Os postos de trabalho estão ergonomicamente adequados?",
		subquest: {
			true: {
				label: "Foram observadas boas práticas de postura, altura e iluminação?",
				subquest: {},
			},
			false: {
				label: "Foram identificados riscos ergonômicos significativos?",
				subquest: {
					true: {
						label: "Há plano de intervenção ergonômica em andamento?",
						subquest: {},
					},
					false: {
						label: "A situação exige avaliação especializada urgente?",
						subquest: {},
					},
				},
			},
		},
	},*/
	/*{
		label: "Gestão de resíduos",
		subquest: {
			true: {
				label: "Os resíduos estão sendo corretamente segregados, armazenados e descartados?",
				subquest: {
					true: {
						label: "Existe coleta seletiva e destinação final adequada?",
						subquest: {},
					},
					false: {
						label: "Algumas melhorias no sistema de gestão foram recomendadas?",
						subquest: {},
					},
				},
			},
			false: {
				label: "O descarte inadequado representa risco ao meio ambiente ou à saúde?",
				subquest: {
					true: {
						label: "A situação exige providências imediatas?",
						subquest: {},
					},
					false: {
						label: "A empresa tem plano de adequação em andamento?",
						subquest: {},
					},
				},
			},
		},
	},*/
	/*{
		label: "Os funcionarios possuem acesso a equipamentos de emergência?",
		subquest: {
			true: {
				label: "Os equipamentos de emergência estão acessíveis e sinalizados?",
				subquest: {
					true: {
						label: "Os funcionários sabem utilizá-los em caso de necessidade?",
						subquest: {},
					},
					false: {
						label: "É necessário reforçar treinamentos de emergência?",
						subquest: {},
					},
				},
			},
			false: {
				label: "O acesso dificultado compromete a resposta a emergências?",
				subquest: {
					true: {
						label: "Foram feitas recomendações imediatas de correção?",
						subquest: {},
					},
					false: {
						label: "Há planos para melhoria de acesso e sinalização?",
						subquest: {},
					},
				},
			},
		},
	},*?
	/*{
		label: "A Documentação de segurança atualizada?",
		subquest: {
			true: {
				label: "Toda a documentação exigida por lei está atualizada?",
				subquest: {
					true: {
						label: "Os documentos estão disponíveis para consulta imediata?",
						subquest: {},
					},
					false: {
						label: "Os documentos estão disponíveis, mas de forma parcial?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A ausência documental representa risco legal ou operacional?",
				subquest: {
					true: {
						label: "Foi iniciado processo de regularização imediata?",
						subquest: {},
					},
					false: {
						label: "A regularização será feita em prazo previamente definido?",
						subquest: {},
					},
				},
			},
		},
	},*/
	/*{
		label: "Inspeção de escadas, plataformas e andaimes",
		subquest: {
			true: {
				label: "As estruturas estão seguras e dentro das normas técnicas?",
				subquest: {
					true: {
						label: "As inspeções são feitas periodicamente?",
						subquest: {},
					},
					false: {
						label: "Foram encontradas estruturas danificadas ou mal fixadas?",
						subquest: {
							true: {
								label: "Foi determinada a interdição ou reparo imediato?",
								subquest: {},
							},
							false: {
								label: "As falhas não oferecem risco imediato, mas requerem atenção?",
								subquest: {},
							},
						},
					},
				},
			},
		},
	},*/
	{
		label: "Controle de acesso a áreas restritas",
		subquest: {
			true: {
				label: "O acesso às áreas restritas está devidamente controlado?",
				subquest: {
					true: {
						label: "Somente pessoas autorizadas têm acesso?",
						subquest: {},
					},
					false: {
						label: "Há registros de acessos indevidos ou não autorizados?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A ausência de controle representa risco à segurança?",
				subquest: {
					true: {
						label: "Há necessidade de medidas imediatas de controle?",
						subquest: {},
					},
					false: {
						label: "Há plano para instalação de controle de acesso?",
						subquest: {},
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
						subquest: {},
					},
					false: {
						label: "É necessário reforçar a comunicação sobre os riscos?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A ausência do mapa compromete a percepção dos riscos?",
				subquest: {
					true: {
						label: "Deve-se providenciar a atualização e divulgação imediata?",
						subquest: {},
					},
					false: {
						label: "Outros meios estão sendo utilizados para informar os riscos?",
						subquest: {},
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
						subquest: {},
					},
					false: {
						label: "Está prevista a realização de simulado?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A ausência do plano compromete a resposta a emergências?",
				subquest: {
					true: {
						label: "É necessária a implantação urgente do plano?",
						subquest: {},
					},
					false: {
						label: "Há outro sistema de orientação em caso de emergência?",
						subquest: {},
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
						subquest: {},
					},
					false: {
						label: "Há necessidade de ajustes na frequência de limpeza?",
						subquest: {},
					},
				},
			},
			false: {
				label: "As condições identificadas afetam o bem-estar dos trabalhadores?",
				subquest: {
					true: {
						label: "Foram tomadas medidas imediatas para melhoria?",
						subquest: {},
					},
					false: {
						label: "Há planejamento para reestruturação dos espaços?",
						subquest: {},
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
						subquest: {},
					},
					false: {
						label: "Foi recomendada a implantação de controle da qualidade do ar?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A ventilação inadequada impacta a saúde dos trabalhadores?",
				subquest: {
					true: {
						label: "Foram propostas melhorias imediatas?",
						subquest: {},
					},
					false: {
						label: "Há plano de ação gradual para correção?",
						subquest: {},
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
						subquest: {},
					},
					false: {
						label: "Há falhas na adesão ao uso de protetores?",
						subquest: {},
					},
				},
			},
			false: {
				label: "O ruído excessivo pode causar danos à saúde?",
				subquest: {
					true: {
						label: "Foram tomadas ações corretivas ou de mitigação?",
						subquest: {},
					},
					false: {
						label: "Está em andamento estudo técnico para melhorias?",
						subquest: {},
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
						subquest: {},
					},
					false: {
						label: "Há recomendações para ajustes no regime de trabalho?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A exposição térmica está acima dos limites aceitáveis?",
				subquest: {
					true: {
						label: "Há ações corretivas imediatas em andamento?",
						subquest: {},
					},
					false: {
						label: "Está sendo feito monitoramento técnico da exposição?",
						subquest: {},
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
						subquest: {},
					},
					false: {
						label: "Foi solicitada adequação dos EPIs fornecidos?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A manipulação dos produtos oferece riscos diretos?",
				subquest: {
					true: {
						label: "A atividade foi suspensa ou isolada?",
						subquest: {},
					},
					false: {
						label: "A equipe foi instruída a reforçar as medidas preventivas?",
						subquest: {},
					},
				},
			},
		},
	},
	/*{
		label: "Controle de agentes biológicos",
		subquest: {
			true: {
				label: "Há controle de limpeza e descarte adequado de resíduos?",
				subquest: {
					true: {
						label: "O ambiente está higienizado e livre de contaminações?",
						subquest: {},
					},
					false: {
						label: "Foram recomendadas melhorias no plano de limpeza?",
						subquest: {},
					},
				},
			},
			false: {
				label: "O ambiente apresenta riscos biológicos ativos?",
				subquest: {
					true: {
						label: "Foi realizada desinfecção ou isolamento da área?",
						subquest: {},
					},
					false: {
						label: "Está sendo programada ação sanitária imediata?",
						subquest: {},
					},
				},
			},
		},
	},
	{
		label: "Inspeção dos meios de transporte interno",
		subquest: {
			true: {
				label: "Os meios de transporte interno estão em bom estado?",
				subquest: {
					true: {
						label: "São realizadas inspeções periódicas?",
						subquest: {},
					},
					false: {
						label: "Há plano para iniciar rotina de inspeção?",
						subquest: {},
					},
				},
			},
			false: {
				label: "Há falhas que comprometem a segurança no transporte interno?",
				subquest: {
					true: {
						label: "Os equipamentos foram interditados ou ajustados?",
						subquest: {},
					},
					false: {
						label: "As falhas foram mapeadas para correção futura?",
						subquest: {},
					},
				},
			},
		},
	},
	{
		label: "Condições dos pisos",
		subquest: {
			true: {
				label: "Os pisos estão em boas condições (sem desníveis, antiderrapantes)?",
				subquest: {
					true: {
						label: "Há manutenção preventiva dos pisos?",
						subquest: {},
					},
					false: {
						label: "Foi recomendado plano de manutenção periódica?",
						subquest: {},
					},
				},
			},
			false: {
				label: "Os pisos apresentam risco de escorregões ou quedas?",
				subquest: {
					true: {
						label: "Foi feita sinalização e correção emergencial?",
						subquest: {},
					},
					false: {
						label: "Há plano de adequação em prazo determinado?",
						subquest: {},
					},
				},
			},
		},
	},
	{
		label: "Campanhas e programas de segurança",
		subquest: {
			true: {
				label: "A empresa realiza campanhas como SIPAT e DDS?",
				subquest: {
					true: {
						label: "Os temas abordados são relevantes e atuais?",
						subquest: {},
					},
					false: {
						label: "Há sugestões de melhoria para os conteúdos?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A ausência dessas campanhas compromete a cultura de segurança?",
				subquest: {
					true: {
						label: "Foi recomendada a implementação das campanhas?",
						subquest: {},
					},
					false: {
						label: "Outras formas de conscientização estão sendo usadas?",
						subquest: {},
					},
				},
			},
		},
	},
	{
		label: "Avaliação do risco de quedas de materiais",
		subquest: {
			true: {
				label: "A avaliação de risco foi realizada e documentada?",
				subquest: {
					true: {
						label: "As medidas de controle estão implantadas?",
						subquest: {},
					},
					false: {
						label: "Foram recomendadas ações complementares?",
						subquest: {},
					},
				},
			},
			false: {
				label: "Há risco real de queda de materiais sem controle?",
				subquest: {
					true: {
						label: "Foi determinada ação imediata de contenção?",
						subquest: {},
					},
					false: {
						label: "A situação está sob observação técnica?",
						subquest: {},
					},
				},
			},
		},
	},
	{
		label: "Sinalização de emergência visível",
		subquest: {
			true: {
				label: "A sinalização é visível mesmo sem energia elétrica?",
				subquest: {
					true: {
						label: "São usados materiais fotoluminescentes ou com backup?",
						subquest: {},
					},
					false: {
						label: "Há recomendações para adaptação da sinalização?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A ausência de sinalização em caso de falta de luz compromete a segurança?",
				subquest: {
					true: {
						label: "Foram propostas medidas urgentes de correção?",
						subquest: {},
					},
					false: {
						label: "Há medidas provisórias em estudo?",
						subquest: {},
					},
				},
			},
		},
	},
	{
		label: "Verificação das saídas de emergência",
		subquest: {
			true: {
				label: "As saídas estão desobstruídas e bem sinalizadas?",
				subquest: {
					true: {
						label: "São verificadas regularmente?",
						subquest: {},
					},
					false: {
						label: "Foi recomendada inspeção periódica formalizada?",
						subquest: {},
					},
				},
			},
			false: {
				label: "A obstrução ou sinalização deficiente representa risco imediato?",
				subquest: {
					true: {
						label: "Foi determinada correção urgente?",
						subquest: {},
					},
					false: {
						label: "A liberação das rotas já foi planejada?",
						subquest: {},
					},
				},
			},
		},
	},
	{
		label: "Disponibilidade e validade dos extintores e mangueiras",
		subquest: {
			true: {
				label: "Todos os equipamentos estão dentro do prazo de validade?",
				subquest: {
					true: {
						label: "As inspeções estão documentadas?",
						subquest: {},
					},
					false: {
						label: "Foi recomendada melhoria na documentação?",
						subquest: {},
					},
				},
			},
			false: {
				label: "Há equipamentos vencidos ou ausentes?",
				subquest: {
					true: {
						label: "Foi feita substituição ou recarga imediata?",
						subquest: {},
					},
					false: {
						label: "A substituição foi programada em prazo definido?",
						subquest: {},
					},
				},
			},
		},
	},
	{
		label: "Inspeção dos sistemas de proteção coletiva",
		subquest: {
			true: {
				label: "Os sistemas estão em bom estado (corrimãos, grades)?",
				subquest: {
					true: {
						label: "A manutenção está sendo feita periodicamente?",
						subquest: {},
					},
					false: {
						label: "Foi sugerida a criação de rotina de inspeção?",
						subquest: {},
					},
				},
			},
			false: {
				label: "Há falhas nos sistemas que oferecem risco?",
				subquest: {
					true: {
						label: "Foi determinada correção imediata?",
						subquest: {},
					},
					false: {
						label: "As falhas foram documentadas para correção futura?",
						subquest: {},
					},
				},
			},
		},
	},*/
];

const questions = [
	{
		id: "id_1a2b3c",
		label: "Controle de agentes químicos",
		next: { true: "id_4d5e6f", false: "id_m3n4o5", none: null },
		first: true,
	},
	{
		id: "id_4d5e6f",
		label: "Os agentes químicos estão controlados conforme FISPQ?",
		next: { true: "id_7g8h9i", false: "id_j0k1l2", none: null },
	},
	{
		id: "id_7g8h9i",
		label: "Os EPIs utilizados são compatíveis com os riscos?",
		next: null,
	},
	{
		id: "id_j0k1l2",
		label: "Foi solicitada adequação dos EPIs fornecidos?",
		next: null,
	},
	{
		id: "id_m3n4o5",
		label: "A manipulação dos produtos oferece riscos diretos?",
		next: { true: "id_p6q7r8", false: "id_s9t0u1", none: null },
	},
	{
		id: "id_p6q7r8",
		label: "A atividade foi suspensa ou isolada?",
		next: null,
	},
	{
		id: "id_s9t0u1",
		label: "A equipe foi instruída a reforçar as medidas preventivas?",
		next: null,
	},
	{
		id: "id_8d36b9c",
		label: "Somente pessoas autorizadas têm acesso?",
		next: null,
	},
	{
		id: "id_0d9525c",
		label: "Há registros de acessos indevidos ou não autorizados?",
		next: null,
	},
	{
		id: "id_1bcec23",
		label: "O acesso às áreas restritas está devidamente controlado?",
		next: { true: "id_8d36b9c", false: "id_0d9525c", none: null },
	},
	{
		id: "id_feca5e4",
		label: "Há necessidade de medidas imediatas de controle?",
		next: null,
	},
	{
		id: "id_79ba23e",
		label: "Há plano para instalação de controle de acesso?",
		next: null,
	},
	{
		id: "id_97ad8e5",
		label: "A ausência de controle representa risco à segurança?",
		next: { true: "id_feca5e4", false: "id_79ba23e", none: null },
	},
	{
		id: "id_a2f0a51",
		label: "Controle de acesso a áreas restritas",
		next: { true: "id_1bcec23", false: "id_97ad8e5", none: null },
		first: true,
	},
	{
		id: "id_43a3d75",
		label: "Os trabalhadores conhecem as áreas de risco?",
		next: null,
	},
	{
		id: "id_b740bc9",
		label: "É necessário reforçar a comunicação sobre os riscos?",
		next: null,
	},
	{
		id: "id_d898a5d",
		label: "O mapa de risco está visível e atualizado?",
		next: { true: "id_43a3d75", false: "id_b740bc9", none: null },
	},
	{
		id: "id_7da190a",
		label: "Deve-se providenciar a atualização e divulgação imediata?",
		next: null,
	},
	{
		id: "id_1b17f23",
		label: "Outros meios estão sendo utilizados para informar os riscos?",
		next: null,
	},
	{
		id: "id_b0ff441",
		label: "A ausência do mapa compromete a percepção dos riscos?",
		next: { true: "id_7da190a", false: "id_1b17f23", none: null },
	},
	{
		id: "id_d6bcb03",
		label: "Presença de mapa de risco atualizado",
		next: { true: "id_d898a5d", false: "id_b0ff441", none: null },
		first: true,
	},
	{
		id: "id_7d497f9",
		label: "Há treinamentos periódicos sobre evacuação?",
		next: null,
	},
	{
		id: "id_421c20d",
		label: "Está prevista a realização de simulado?",
		next: null,
	},
	{
		id: "id_76efdcf",
		label: "O plano está divulgado e sinalizado corretamente?",
		next: { true: "id_7d497f9", false: "id_421c20d", none: null },
	},
	{
		id: "id_cfff365",
		label: "É necessária a implantação urgente do plano?",
		next: null,
	},
	{
		id: "id_491ba0c",
		label: "Há outro sistema de orientação em caso de emergência?",
		next: null,
	},
	{
		id: "id_93c2680",
		label: "A ausência do plano compromete a resposta a emergências?",
		next: { true: "id_cfff365", false: "id_491ba0c", none: null },
	},
	{
		id: "id_620e27c",
		label: "Plano de emergência e abandono divulgado e sinalizado",
		next: { true: "id_76efdcf", false: "id_93c2680", none: null },
		first: true,
	},
	{
		id: "id_a7a0da5",
		label: "Há manutenção e limpeza periódica?",
		next: null,
	},
	{
		id: "id_e67a67a",
		label: "Há necessidade de ajustes na frequência de limpeza?",
		next: null,
	},
	{
		id: "id_a36131e",
		label: "As áreas estão limpas, organizadas e em bom estado?",
		next: { true: "id_a7a0da5", false: "id_e67a67a", none: null },
	},
	{
		id: "id_a084b5a",
		label: "Foram tomadas medidas imediatas para melhoria?",
		next: null,
	},
	{
		id: "id_4c39f0f",
		label: "Há planejamento para reestruturação dos espaços?",
		next: null,
	},
	{
		id: "id_ce6f9d8",
		label: "As condições identificadas afetam o bem-estar dos trabalhadores?",
		next: { true: "id_a084b5a", false: "id_4c39f0f", none: null },
	},
	{
		id: "id_c3d9f58",
		label: "Condições dos banheiros e áreas de descanso",
		next: { true: "id_a36131e", false: "id_ce6f9d8", none: null },
		first: true,
	},
	{
		id: "id_d7bed24",
		label: "Há monitoramento periódico da qualidade do ar?",
		next: null,
	},
	{
		id: "id_9672fcc",
		label: "Foi recomendada a implantação de controle da qualidade do ar?",
		next: null,
	},
	{
		id: "id_6fd5f7a",
		label: "A ventilação é adequada para o ambiente de trabalho?",
		next: { true: "id_d7bed24", false: "id_9672fcc", none: null },
	},
	{
		id: "id_4dc9838",
		label: "Foram propostas melhorias imediatas?",
		next: null,
	},
	{
		id: "id_0080fa2",
		label: "Há plano de ação gradual para correção?",
		next: null,
	},
	{
		id: "id_f56aeb6",
		label: "A ventilação inadequada impacta a saúde dos trabalhadores?",
		next: { true: "id_4dc9838", false: "id_0080fa2", none: null },
	},
	{
		id: "id_1f10836",
		label: "Ventilação e qualidade do ar no ambiente",
		next: { true: "id_6fd5f7a", false: "id_f56aeb6", none: null },
		first: true,
	},
	{
		id: "id_08a2085",
		label: "Os trabalhadores utilizam os protetores corretamente?",
		next: null,
	},
	{
		id: "id_d7cd18d",
		label: "Há falhas na adesão ao uso de protetores?",
		next: null,
	},
	{
		id: "id_defd103",
		label: "O controle de ruído está adequado (medições, protetores)?",
		next: { true: "id_08a2085", false: "id_d7cd18d", none: null },
	},
	{
		id: "id_610388e",
		label: "Foram tomadas ações corretivas ou de mitigação?",
		next: null,
	},
	{
		id: "id_51ebce2",
		label: "Está em andamento estudo técnico para melhorias?",
		next: null,
	},
	{
		id: "id_6a31362",
		label: "O ruído excessivo pode causar danos à saúde?",
		next: { true: "id_610388e", false: "id_51ebce2", none: null },
	},
	{
		id: "id_7c0c77d",
		label: "Controle de ruído",
		next: { true: "id_defd103", false: "id_6a31362", none: null },
		first: true,
	},
	{
		id: "id_0a2bcb1",
		label: "Os trabalhadores têm pausas e hidratação adequadas?",
		next: null,
	},
	{
		id: "id_b2b5fa4",
		label: "Há recomendações para ajustes no regime de trabalho?",
		next: null,
	},
	{
		id: "id_e8a76ab",
		label: "Há controle adequado da exposição ao calor?",
		next: { true: "id_0a2bcb1", false: "id_b2b5fa4", none: null },
	},
	{
		id: "id_93f7ee4",
		label: "Há ações corretivas imediatas em andamento?",
		next: null,
	},
	{
		id: "id_04b0bc9",
		label: "Está sendo feito monitoramento técnico da exposição?",
		next: null,
	},
	{
		id: "id_52dd9b9",
		label: "A exposição térmica está acima dos limites aceitáveis?",
		next: { true: "id_93f7ee4", false: "id_04b0bc9", none: null },
	},
	{
		id: "id_cc56f6f",
		label: "Controle de calor ou exposição a agentes térmicos",
		next: { true: "id_e8a76ab", false: "id_52dd9b9", none: null },
		first: true,
	},
	{
		id: "id_1109bc4",
		label: "As placas de sinalização estão em bom estado (sem danos ou desgastes)?",
		next: null,
	},
	{
		id: "id_2e3df49",
		label: "As placas precisam ser substituídas ou reforçadas?",
		next: null,
	},
	{
		id: "id_32b839e",
		label: "A sinalização de segurança está visível e compreensível?",
		next: { true: "id_1109bc4", false: "id_2e3df49", none: null },
	},
	{
		id: "id_6b0f11c",
		label: "É necessário providenciar a instalação imediata de sinalização adequada?",
		next: null,
	},
	{
		id: "id_89703fd",
		label: "Existe outro meio seguro de orientação além da sinalização formal?",
		next: null,
	},
	{
		id: "id_6d43647",
		label: "A ausência de sinalização representa risco aos trabalhadores?",
		next: { true: "id_6b0f11c", false: "id_89703fd", none: null },
	},
	{
		id: "id_09a3804",
		label: "Existe Sinalização de Segurança?",
		next: { true: "id_32b839e", false: "id_6d43647", none: null },
		first: true,
	},
	{
		id: "id_3b65f57",
		label: "Os trabalhadores demonstram entendimento sobre a importância do uso dos EPIs?",
		next: null,
	},
	{
		id: "id_ba5ff5c",
		label: "Houve orientação ou treinamento recente sobre o uso correto dos EPIs?",
		next: null,
	},
	{
		id: "id_8cfced2",
		label: "Os EPIs estão sendo usados corretamente durante as atividades?",
		next: { true: "id_3b65f57", false: "id_ba5ff5c", none: null },
	},
	{
		id: "id_1d38928",
		label: "Há fiscalização do uso correto dos EPIs pelos supervisores?",
		next: null,
	},
	{
		id: "id_3247cda",
		label: "Os EPIs estão disponíveis para todos os trabalhadores?",
		next: { true: "id_8cfced2", false: "id_1d38928", none: null },
	},
	{
		id: "id_9551f22",
		label: "Já foi feita a solicitação de reposição ou compra desses EPIs?",
		next: null,
	},
	{
		id: "id_e7eb755",
		label: "A ausência dos EPIs pode causar riscos imediatos à saúde dos trabalhadores?",
		next: null,
	},
	{
		id: "id_8eac4dd",
		label: "Há falta de algum EPI essencial para a atividade?",
		next: { true: "id_9551f22", false: "id_e7eb755", none: null },
	},
	{
		id: "id_748b457",
		label: "EPIs disponíveis e em uso correto?",
		next: { true: "id_3247cda", false: "id_8eac4dd", none: null },
		first: true,
	},
	{
		id: "id_794de8c",
		label: "Há registros documentados dos treinamentos realizados?",
		next: null,
	},
	{
		id: "id_6ef3d31",
		label: "Os treinamentos foram aplicados informalmente, sem documentação?",
		next: null,
	},
	{
		id: "id_c1c2d1a",
		label: "Os trabalhadores passaram por treinamentos de segurança atualizados?",
		next: { true: "id_794de8c", false: "id_6ef3d31", none: null },
	},
	{
		id: "id_cc8a8bb",
		label: "É necessário agendar treinamentos obrigatórios com urgência?",
		next: null,
	},
	{
		id: "id_e0bf9f2",
		label: "Há previsão de treinamentos futuros já planejados?",
		next: null,
	},
	{
		id: "id_1a2f974",
		label: "A ausência de treinamentos compromete a execução segura das tarefas?",
		next: { true: "id_cc8a8bb", false: "id_e0bf9f2", none: null },
	},
	{
		id: "id_83422b2",
		label: "Os Treinamentos de segurança estão atualizados?",
		next: { true: "id_c1c2d1a", false: "id_1a2f974", none: null },
		first: true,
	},
	{
		id: "id_a193a4d",
		label: "As manutenções estão sendo realizadas periodicamente?",
		next: null,
	},
	{
		id: "id_50a81c7",
		label: "Existe um plano de manutenção preventiva em andamento?",
		next: null,
	},
	{
		id: "id_ccd0099",
		label: "As máquinas estão em bom estado de conservação e funcionamento?",
		next: { true: "id_a193a4d", false: "id_50a81c7", none: null },
	},
	{
		id: "id_dbfc73b",
		label: "Foi sinalizado o equipamento defeituoso e suspenso o uso?",
		next: null,
	},
	{
		id: "id_3ba0315",
		label: "As maquinas/equipamentos com defeito continuam em uso?",
		next: null,
	},
	{
		id: "id_60fef4e",
		label: "Há máquinas ou equipamentos com defeitos que oferecem riscos?",
		next: { true: "id_dbfc73b", false: "id_3ba0315", none: null },
	},
	{
		id: "id_8867c4a",
		label: "Possui máquinas e equipamentos?",
		next: { true: "id_ccd0099", false: "id_60fef4e", none: null },
		first: true,
	},
];

export interface Question {
	id: string;
	label: string;
	next: {
		true: string;
		false: string;
		none: string | null;
	} | null;
	first?: boolean;
}

export default questions;
