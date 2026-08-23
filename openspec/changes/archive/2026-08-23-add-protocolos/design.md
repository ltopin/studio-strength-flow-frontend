## Context

`NovaAvaliacao.tsx` hoje sempre renderiza os 17 `MOVIMENTOS` agrupados por região, e `PerfilAluna.tsx` linka direto para `/avaliar/:clienteId`. Ver proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Selecionar um protocolo antes de preencher a avaliação, filtrando os movimentos exibidos/exigidos.
- Preservar o comportamento atual (17 movimentos) como uma opção do catálogo ("Avaliação completa"), sem quebrar o requirement existente de `avaliacao`.

**Non-Goals:**
- CRUD de protocolos por Bárbara — o catálogo é somente leitura nesta change.
- Mudar `calculations.ts` — os cálculos por movimento continuam os mesmos, só muda o tamanho da lista de medições enviada.

## Decisions

**Protocolos como catálogo somente leitura, seedado no backend.**
Mesmo padrão de `MOVIMENTOS`, hoje hardcoded no frontend. Alternativa considerada: Bárbara cria protocolos customizados — rejeitada por ora: sem necessidade demonstrada ainda, e aumentaria muito o escopo (tela de gestão, edição, validação de conflitos).

**"Avaliação completa" é um protocolo comum dentro do catálogo (todos os 17 movimentos), não um caso especial no código.**
Mantém `NovaAvaliacao` com uma única lógica de filtro, sem branch condicional para "sem protocolo".

**Nova rota `/avaliar/:clienteId` vira a tela de seleção; o formulário passa a viver em `/avaliar/:clienteId/:protocoloId`.**
Alternativa considerada: modal de seleção sobre a tela atual — rejeitada por quebrar o padrão de navegação por rota já usado no resto do app (ex.: `/avaliacao/:id`, `/alunas/:clienteId`).

## Risks / Trade-offs

- **[Backend hoje só persiste 5 dos 17 movimentos]** → Bloqueante para este change; ver design.md do change `add-protocolos` no repositório `studio-strength-flow-backend`. Não implementar o lado frontend antes desse ajuste estar pronto, ou a criação de avaliação por protocolos que incluam os 12 movimentos adicionais vai falhar na API.
- **[Avaliações antigas não têm protocolo associado]** → Sem impacto: o protocolo não é armazenado na `Avaliacao` em si (que continua sendo só `medicoes`), é só um filtro no momento da criação — não há dado existente para migrar.

## Migration Plan

1. Confirmar que o backend já suporta os 17 movimentos e expõe `GET /api/protocolos` (pré-requisito, ver Risks).
2. Adicionar tipo `Protocolo`, função de storage e hook de query.
3. Criar `EscolherProtocolo.tsx` e a rota associada.
4. Adaptar `NovaAvaliacao.tsx` para filtrar por protocolo.
5. Atualizar o link "Nova avaliação" em `PerfilAluna.tsx`.

Rollback: reverter para o commit anterior — a mudança não altera o formato de `Avaliacao` já persistida, então não há dado a desfazer.
