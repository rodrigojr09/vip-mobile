# VIP Mobile

Aplicativo mobile em Expo/React Native para duas rotinas principais:

- `Levantamento`: coleta estruturada de dados por empresa, setor, funcao e riscos para gerar um relatorio HTML.
- `Visita Tecnica`: execucao de checklists por setor e administrativo, com assinatura, persistencia offline e sincronizacao com a API.

O projeto usa `expo-router` para navegacao baseada em arquivos, `AsyncStorage` para persistencia local e uma camada simples de servicos em `utils/Data` e `utils/API`.

## Stack

- Expo SDK 54
- React 19
- React Native 0.81
- TypeScript
- Expo Router
- AsyncStorage
- Expo Location / Task Manager / Background Fetch
- Expo File System / Sharing / Print
- Biome para formatacao e lint

## Como o app funciona

1. O ponto de entrada real e `expo-router/entry` definido em `package.json`.
2. `app/_layout.tsx` monta o layout global, inicializa os managers de dados e tenta sincronizar eventos offline.
3. `components/Layout.tsx` pede permissoes de localizacao, inicializa `manager.visitas`, controla cabecalho/botao voltar e exibe loading.
4. A home em `app/index.tsx` direciona para os fluxos `Levantamento`, `Visita` e `Config`.
5. Cada fluxo possui providers proprios em `hooks/` para manter estado em memoria e salvar automaticamente no storage local.

## Estrutura geral

```text
vip-mobile/
|- app/                 rotas e telas do app
|- assets/              fontes e imagens estaticas
|- components/          componentes reutilizaveis de UI e formularios
|- hooks/               providers e hooks de estado/navegacao
|- types/               tipagens do dominio e modelagens SQL
|- utils/               armazenamento, API, HTML, tarefas e listas auxiliares
|- .expo/               arquivos gerados pelo Expo
|- node_modules/        dependencias instaladas
```

## Pastas e arquivos

### Raiz

| Caminho | Funcao |
| --- | --- |
| `.expo/` | Metadados locais gerados pelo Expo durante desenvolvimento. Nao e codigo da aplicacao. |
| `.git/` | Historico Git do projeto. |
| `node_modules/` | Dependencias instaladas pelo gerenciador de pacotes. |
| `.gitignore` | Regras de arquivos ignorados pelo Git. |
| `app.json` | Configuracao do app Expo: nome, package, icone, permissoes Android, plugins e EAS project id. |
| `babel.config.js` | Configura Babel e aliases `@/` para imports absolutos. |
| `biome.json` | Configuracao de formatacao, lint e organize imports com Biome. |
| `eas.json` | Perfis de build do Expo Application Services. |
| `expo-env.d.ts` | Referencia de tipos gerada pelo Expo. Arquivo auxiliar, nao deveria ser editado manualmente. |
| `index.html` | Template HTML usado pelo Expo Web. |
| `package.json` | Scripts, dependencias e configuracoes principais do projeto. |
| `README.md` | Este documento. |
| `tsconfig.json` | Configuracao TypeScript com `strict` e alias `@/*`. |
| `yarn.lock` | Lockfile do Yarn para reproducao de dependencias. |

### `app/`

Camada de rotas com `expo-router`.

| Caminho | Funcao |
| --- | --- |
| `app/_layout.tsx` | Layout raiz. Envolve o app com `NavigationProvider`, `SafeAreaView`, `Layout`, registra managers e sincroniza eventos offline ao iniciar. |
| `app/index.tsx` | Tela inicial com acesso para `Levantamento`, `Visita` e `Config`. |
| `app/+not-found.tsx` | Tela fallback para rotas inexistentes do Expo Router. |
| `app/(tabs)/` | Grupo de rotas principal. O nome sugere tabs, mas o projeto usa `Stack` interno. |

### `app/(tabs)/Levantamento/`

Fluxo de levantamento de riscos e ambientes.

| Caminho | Funcao |
| --- | --- |
| `app/(tabs)/Levantamento/_layout.tsx` | Empilha `EmpresaProvider`, `SetorProvider` e `FuncaoProvider`, e salva o levantamento automaticamente a cada mudanca relevante. |
| `app/(tabs)/Levantamento/index.tsx` | Tela inicial do levantamento. Coleta empresa e responsavel, cria ID e inicia evento. |
| `app/(tabs)/Levantamento/resumo.tsx` | Lista os setores cadastrados, permite editar/excluir e seguir para finalizacao. |
| `app/(tabs)/Levantamento/setor.tsx` | Formulario completo de setor: medidas, ambiente, controles e tabela de funcoes. |
| `app/(tabs)/Levantamento/funcao.tsx` | Formulario de funcao, descricao, funcionarios e riscos associados. |
| `app/(tabs)/Levantamento/rascunho.tsx` | Exibe previa HTML do levantamento em `WebView` e coleta assinatura. |
| `app/(tabs)/Levantamento/finalizado.tsx` | Gera o HTML final assinado, salva no sandbox do app e compartilha o arquivo. |

### `app/(tabs)/Visita/`

Fluxo de visita tecnica com perguntas por setor e administrativas.

| Caminho | Funcao |
| --- | --- |
| `app/(tabs)/Visita/_layout.tsx` | Monta `VisitaProvider` e salva automaticamente a visita em progresso. |
| `app/(tabs)/Visita/index.tsx` | Seleciona empresa principal, empresas inclusas, tecnico e responsavel; inicia a visita. |
| `app/(tabs)/Visita/setores.tsx` | Resume os setores vistoriados, permite revisar, adicionar novos e ir para perguntas administrativas. |
| `app/(tabs)/Visita/resumo.tsx` | Exibe o HTML da visita em `WebView`, coleta assinatura e encaminha para finalizacao. |
| `app/(tabs)/Visita/assinatura.tsx` | Tela alternativa de assinatura em landscape. Hoje parece apoio/debug, pois o fluxo principal usa `resumo.tsx`. |
| `app/(tabs)/Visita/finalizado.tsx` | Fecha evento, salva visita localmente, tenta criar no backend e mostra links para abrir a visita online quando houver token. |
| `app/(tabs)/Visita/Perguntas/` | Subrotas do checklist da visita. |
| `app/(tabs)/Visita/Perguntas/Setor.tsx` | Aplica perguntas por setor, controla respostas locais e adiciona/edita setores vistoriados. |
| `app/(tabs)/Visita/Perguntas/Administrativo.tsx` | Aplica perguntas administrativas e libera a finalizacao quando tudo estiver respondido. |

### `app/(tabs)/Config/`

Area administrativa/local do app.

| Caminho | Funcao |
| --- | --- |
| `app/(tabs)/Config/_layout.tsx` | Layout simples em `Stack` sem cabecalho nativo. |
| `app/(tabs)/Config/index.tsx` | Menu de backups locais e configuracao do nome do dispositivo para registro de eventos. |
| `app/(tabs)/Config/levantamentos.tsx` | Lista levantamentos salvos no AsyncStorage e permite regenerar/compartilhar o HTML. |
| `app/(tabs)/Config/visitas/index.tsx` | Lista visitas salvas, permite sincronizar manualmente, baixar HTML e acessar area de desenvolvedor. |
| `app/(tabs)/Config/visitas/info.tsx` | Detalha uma visita salva e permite exclusao protegida por senha. |
| `app/(tabs)/Config/visitas/dev.tsx` | Tela de inspecao de chaves do AsyncStorage para desenvolvimento. |

### `assets/`

Arquivos estaticos usados pelo app.

| Caminho | Funcao |
| --- | --- |
| `assets/fonts/SpaceMono-Regular.ttf` | Fonte instalada no projeto. |
| `assets/images/icon.png` | Icone principal do aplicativo e base do adaptive icon/splash. |

### `components/`

Componentes reutilizaveis de UI e blocos de formulario.

| Caminho | Funcao |
| --- | --- |
| `components/Assinatura.tsx` | Componente generico de captura de assinatura com validacao minima. |
| `components/Button.tsx` | Botao padrao do app com variante secundaria e estado desabilitado. |
| `components/Container.tsx` | Wrapper de layout; pode renderizar `View` ou `ScrollView`. |
| `components/Input.tsx` | Campo de texto padronizado com suporte a `textarea`, refs e navegacao pelo teclado. |
| `components/Layout.tsx` | Shell visual do app: cabecalho, controle de voltar, loading, inicializacao de visita e rastreio de localizacao em background. |
| `components/Loading.tsx` | Tela simples de carregamento. |
| `components/Model.tsx` | Modal de finalizacao da visita para escolher relatorio conjunto ou separado por empresa. |
| `components/RadioButton.tsx` | Componente simples de escolha binaria `Sim`/`Nao`. |
| `components/RiscoForm.tsx` | Grade de riscos da funcao, com `Switch` e descricao por risco. |
| `components/VIPTabela.tsx` | Tabela simples reutilizavel para listagens com acao de editar/excluir. |
| `components/Visita/` | Componentes especificos do fluxo de visita tecnica. |
| `components/Visita/ObservacaoCampo.tsx` | Campo multiline para observacoes das respostas. |
| `components/Visita/QuestionBlock.tsx` | Renderizador recursivo das perguntas, subperguntas, checks condicionais e observacoes. |
| `components/Visita/Sidebar.tsx` | Painel lateral/listagem de setores da visita para revisao rapida. |

### `hooks/`

Estado compartilhado e navegacao.

| Caminho | Funcao |
| --- | --- |
| `hooks/Navigation.tsx` | Historico de navegacao proprio sobre `expo-router`, com `push`, `replace` e `back`. |
| `hooks/Levantamento/EmpresaProvider.tsx` | Estado global da empresa em levantamento. |
| `hooks/Levantamento/SetorProvider.tsx` | Estado global do setor em edicao, com `load` e `clear`. |
| `hooks/Levantamento/FuncaoProvider.tsx` | Estado global da funcao em edicao, incluindo riscos. |
| `hooks/VisitaTecnica/VisitaProvider.tsx` | Estado completo da visita tecnica: empresa, inclusas, perguntas, respostas e setores. |

### `types/`

Modelos tipados do dominio e referencias de modelagem.

| Caminho | Funcao |
| --- | --- |
| `types/VIPEvent.d.ts` | Tipos dos eventos registrados localmente/remotamente. |
| `types/Levantamento/VIPEmpresaType.d.ts` | Tipo da empresa no fluxo de levantamento. |
| `types/Levantamento/VIPFuncaoType.d.ts` | Tipo da funcao/setor no levantamento. |
| `types/Levantamento/VIPRiscoType.d.ts` | Tipo dos riscos vinculados a funcoes. |
| `types/Levantamento/VIPSetorType.d.ts` | Tipo do setor no levantamento. |
| `types/Levantamento/Modelagem.sql` | Modelagem SQL de referencia do dominio de levantamento. |
| `types/VisitaTecnica/VIPEmpresaType.d.ts` | Tipo de empresa recebido/usado na visita tecnica. |
| `types/VisitaTecnica/VIPPerguntaType.d.ts` | Tipos de perguntas, subperguntas e respostas da visita. |
| `types/VisitaTecnica/VIPSetorType.d.ts` | Tipo do setor da visita, incluindo perguntas e respostas. |
| `types/VisitaTecnica/VIPVisitaType.d.ts` | Tipo principal da visita tecnica completa. |
| `types/VisitaTecnica/Modelagem.sql` | Modelagem SQL de referencia do dominio de visitas. |

### `utils/`

Servicos, persistencia, catálogos e geracao de relatorios.

| Caminho | Funcao |
| --- | --- |
| `utils/Storage.ts` | Classe base de armazenamento com chaves do AsyncStorage e `base_url` da API. |
| `utils/BackgroundTasks.ts` | Define a task de rastreio em background que registra evento de localizacao. |
| `utils/formatHTML.ts` | Gera o HTML final do levantamento. |
| `utils/verifyPerguntas.ts` | Verifica se ainda existem perguntas obrigatorias sem resposta. |
| `utils/Riscos.ts` | Catalogo de riscos. Exporta uma lista resumida usada no formulario e uma lista extensa por categoria. |
| `utils/quests.ts` | Perguntas padrao locais de visita (`adm` e `setor`). Funciona como fallback/catalogo local. |
| `utils/Epis.ts` | Catalogo extenso de EPIs. Hoje funciona mais como base de referencia do dominio. |
| `utils/abrirArquivo.ts` | Helper Android para abrir arquivo externo via intent. |
| `utils/API/` | Integracoes com API e localizacao. |
| `utils/API/Event.ts` | Registro de eventos de operacao, com tentativa de envio remoto e fallback offline. |
| `utils/API/Locator.ts` | Obtem a localizacao atual usando `expo-location`. |
| `utils/API/Quests.ts` | Utilitario para baixar e salvar quests em JSON local. Parece auxiliar/legado e nao participa do fluxo principal atual. |
| `utils/Data/` | Managers singleton para visitas, levantamentos e eventos. |
| `utils/Data/manager.ts` | Facade que expoe as instancias singleton de `visitas`, `levantamentos` e `eventos`. |
| `utils/Data/EventoData.ts` | Persistencia local dos eventos e configuracao do nome do dispositivo. |
| `utils/Data/LevanamentoData.ts` | Persistencia local do levantamento, com merge incremental de empresa, setor e funcao. |
| `utils/Data/VisitaData.ts` | Inicializa empresas/perguntas, envia visitas ao backend e salva visitas localmente. |
| `utils/Visita/` | Utilitarios especificos de visita tecnica. |
| `utils/Visita/formatHTML.ts` | Gera o HTML final da visita tecnica com respostas e assinatura. |
| `utils/Visita/saveOffline.ts` | Salva uma visita em JSON no sandbox local. Hoje parece complementar/legado em relacao ao AsyncStorage. |

## Fluxos principais

### Levantamento

1. `app/(tabs)/Levantamento/index.tsx` cria a empresa base.
2. `setor.tsx` cadastra cada ambiente/setor.
3. `funcao.tsx` adiciona funcoes e riscos por setor.
4. `resumo.tsx` revisa os setores.
5. `rascunho.tsx` gera previa e coleta assinatura.
6. `finalizado.tsx` salva/compartilha o HTML.

### Visita Tecnica

1. `app/(tabs)/Visita/index.tsx` escolhe empresa, tecnico e responsavel.
2. `Perguntas/Setor.tsx` aplica checklist por setor.
3. `Perguntas/Administrativo.tsx` aplica checklist administrativo.
4. `setores.tsx` revisa setores e define formato de salvamento.
5. `resumo.tsx` gera previa HTML e captura assinatura.
6. `finalizado.tsx` salva localmente e tenta sincronizar online.

## Persistencia e offline

- `AsyncStorage` guarda empresas, perguntas, visitas, levantamentos, eventos e nome do dispositivo.
- `VisitaData.init()` tenta carregar empresas e perguntas da API; se falhar, usa cache local.
- `Event.ts` envia logs operacionais para a API e salva offline quando nao consegue.
- Os dois fluxos principais possuem autosave via providers nos `_layout.tsx` internos.

## Observacoes importantes sobre o codigo

- O projeto esta fortemente orientado a Android, embora `app.json` tambem tenha `bundleIdentifier` iOS.
- Existe codigo auxiliar ou legado que nao parece estar no fluxo principal atual, como `utils/API/Quests.ts`, `utils/Visita/saveOffline.ts` e `app/(tabs)/Visita/assinatura.tsx`.
- Os HTMLs de saida sao montados manualmente em string, sem template engine.
- O controle de navegacao usa um historico proprio em vez de depender apenas do `router.back()`.

## Scripts

| Comando | Funcao |
| --- | --- |
| `yarn start` | Inicia o Expo. |
| `yarn android` | Abre o projeto no Android via Expo. |
| `yarn ios` | Abre o projeto no iOS via Expo. |
| `yarn web` | Roda a versao web. |
| `yarn lint` | Executa o lint configurado pelo Expo/Biome. |
| `yarn test` | Executa Jest em modo watch. |

## Resumo arquitetural

- `app/`: telas e navegacao.
- `components/`: UI reutilizavel.
- `hooks/`: estado compartilhado.
- `utils/Data`: persistencia e cache.
- `utils/API`: comunicacao externa e localizacao.
- `utils/*HTML*`: geracao de relatorios exportaveis.
- `types/`: contratos do dominio.

