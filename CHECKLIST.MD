# Checklist - Psicossocial (o que pode ser melhorado)

Escopo analisado (principais arquivos):

- `app/(tabs)/Psicossocial/index.tsx`
- `app/(tabs)/Psicossocial/resumo.tsx`
- `app/(tabs)/Psicossocial/finalizado.tsx`
- `app/(tabs)/Config/psicossociais.tsx`
- `hooks/Psicossocial/PsicoProvider.tsx`
- `utils/Data/PsicoData.ts`
- `utils/Psicossocial/formatHTML.ts`
- `types/Psicossocial/PsicossocialType.d.ts`

## Dados / Modelo

- [ ] `types/Psicossocial/PsicossocialType.d.ts`: padronizar o significado de `orientacao` e `autorizado` (1/2/3). Hoje a UI permite `3 = N/A`, mas o relatorio nao trata `3` explicitamente.
- [ ] `types/Psicossocial/PsicossocialType.d.ts`: considerar tornar `observacao` opcional ou permitir `null` (hoje e `string`, mas o formulario diz "opcional").
- [ ] `hooks/Psicossocial/PsicoProvider.tsx`: `clear()` deveria limpar tambem `id` e `data` (hoje ficam com o ultimo valor, o que pode vazar estado para o proximo relatorio).
- [ ] `utils/Data/PsicoData.ts`: validar `data` antes de salvar (hoje nao valida; mas a lista em `Config/psicossociais.tsx` exibe `item.data`).
- [ ] `utils/Data/PsicoData.ts`: evitar duplicidade de registros (ex.: mesmo `id` ou mesma combinacao `empresa+data`), ou ao menos checar antes de `push`.
- [ ] `utils/Data/PsicoData.ts`: proteger `JSON.parse` com try/catch e fallback (se o storage corromper, hoje quebra o fluxo).

## UX / Fluxo de Tela (formulario)

- [ ] `app/(tabs)/Psicossocial/index.tsx`: impedir adicionar empresa inclusa duplicada (hoje `setInclusas([...inclusas, selectedEmpresa])` pode repetir).
- [ ] `app/(tabs)/Psicossocial/index.tsx`: `removeEmpresaInclusa(empresaId?: string)` compara `cnpj !== empresaId` (o nome do parametro sugere id, mas o comparador usa CNPJ). Padronizar (ou renomear para `cnpj`).
- [ ] `app/(tabs)/Psicossocial/index.tsx`: quando seleciona `empresa`, o `Input` passa a mostrar `truncateLabel(empresa.razao_social, ...)` mas `onChange={setSearch}` continua ativo. Considerar travar edicao enquanto `empresa` estiver selecionada, ou ao digitar limpar `empresa` automaticamente.
- [ ] `app/(tabs)/Psicossocial/index.tsx`: melhorar acessibilidade/ergonomia dos botoes Sim/Nao/N/A (area de toque, feedback, leitura por screen reader, foco).
- [ ] `app/(tabs)/Psicossocial/index.tsx`: revisar regra de bloqueio `block` para tratar `3 = N/A` com intencao (hoje `!orientacao` e `!autorizado` deixam passar 3, mas o relatorio mostra "status nao informado"/texto generico).
- [ ] `app/(tabs)/Psicossocial/index.tsx`: data salva como `day/month/year` sem zero a esquerda (ex.: `2/3/2026`). Padronizar para `DD/MM/YYYY`.

## Relatorio / PDF (HTML)

- [ ] `utils/Psicossocial/formatHTML.ts`: corrigir strings "quebradas" (mojibake tipo `NÃ£o`, `RELATÃ“RIO`). Isso costuma ser arquivo salvo em encoding errado. Re-salvar em UTF-8 e substituir os textos no codigo.
- [ ] `utils/Psicossocial/formatHTML.ts`: usar `psicossocial.data` no relatorio (hoje usa `new Date().toLocaleDateString("pt-BR")`, o que pode divergir do `data` armazenado/exibido).
- [ ] `utils/Psicossocial/formatHTML.ts`: tratar `orientacao === 3` e `autorizado === 3` com texto/rotulo apropriados (N/A), em vez de cair no texto "nao foi possivel determinar".
- [ ] `utils/Psicossocial/formatHTML.ts`: revisar layout para A4:
  - `container { width: 70%; margin: 3rem auto; }` pode gerar muito espaco em branco. Considerar `width: 100%` e margens consistentes com `@page`.
- [ ] `utils/Psicossocial/formatHTML.ts`: sanitizar/escapar `observacao` (HTML injection). Hoje injeta texto direto no HTML (`${psicossocial.observacao}`).
- [ ] `utils/Psicossocial/formatHTML.ts`: se `assinatura` for data URL muito grande, considerar compressao/limite e comportamento no `expo-print` (para evitar PDF pesado/lento).

## Persistencia / Exportacao / Tela de Config

- [ ] `app/(tabs)/Psicossocial/finalizado.tsx`: garantir que o save local finalize antes de limpar estado/voltar (hoje chama `manager.psicos.salvar(psicossocial).then(...)` sem `await`; se houver erro, o usuario pode sair sem feedback consistente).
- [ ] `app/(tabs)/Config/psicossociais.tsx`: remover `console.log(parsedData)` (ou proteger por flag de debug).
- [ ] `app/(tabs)/Config/psicossociais.tsx`: `handleExport` faz cast forzado `as PsicossocialType` mesmo se nao encontrar `id`. Tratar caso `find` retornar `undefined` com alerta de erro.
- [ ] `app/(tabs)/Config/psicossociais.tsx`: melhorar acao do botao `+` (ex.: menu com "Compartilhar PDF", "Copiar ID", "Ver detalhes") e evitar usar `Alert` como unica UI.
- [ ] `utils/Data/PsicoData.ts`: log no construtor aparece como `ðŸŽ¯ ...` (encoding). Ajustar/remover.

## Qualidade / Consistencia de Texto (i18n)

- [ ] `app/index.tsx` e telas do Psicossocial: corrigir strings quebradas (`Visita TÃ©cnica`, `RelatÃ³rio`, `ConfiguraÃ§Ã£o`, etc.). Centralizar textos (ou ao menos garantir UTF-8).
- [ ] Padronizar "Psicossocial" vs "Relatorio de Psicossocial" (titulo `Relatorio de Psicossocial` em `Psicossocial/index.tsx` parece estranho; pode ser "Relatorio Psicossocial").

## Testes / Confiabilidade

- [ ] Adicionar testes (mesmo que simples) para:
  - `getRelatorioPsicossocialHtml`: saida para combinacoes (orientacao 1/2/3 x autorizado 1/2/3), e garantia de uso de `data` armazenada.
  - `PsicoData.salvar`: validacoes e comportamento quando storage esta vazio/corrompido.
- [ ] Instrumentar erros (ex.: quando falha `expo-print` ou `expo-sharing`) com mensagens acionaveis para o usuario.

