## Context

`DiagramaCorporal` já existe e é usado em `ResultadoAvaliacao`/`PerfilAluna` para colorir regiões musculares por classificação de assimetria (somente leitura). Ver proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Tela de registro de dor: marcar pontos no diagrama corporal com intensidade EVA (0–10) e confirmar.
- Histórico de registros de dor no perfil da aluna.

**Non-Goals:**
- Gráfico de evolução de dor ao longo do tempo (o app já tem `GraficoEvolucao` para assimetria — não replicar agora; pode vir depois se houver necessidade demonstrada).

## Decisions

**Reaproveitar `DiagramaCorporal` em modo interativo, em vez de criar um novo componente de mapa corporal.**
Reduz risco e reaproveita o SVG/regiões já mapeados. Requer estender o componente com uma prop opcional de callback de clique, sem quebrar o uso atual (somente leitura) em `ResultadoAvaliacao`.

## Risks / Trade-offs

- **[`DiagramaCorporal` hoje só recebe resultados para colorir, não captura cliques]** → Mitigação: extensão do componente com uma prop opcional de interação (ex.: `onRegiaoClick`), mantendo o uso atual sem essa prop intocado.

## Migration Plan

1. Adicionar tipo `RegistroDor` em `dominio.ts`.
2. Adicionar funções de storage/query (`listarRegistrosDor`, `obterRegistroDor`, `criarRegistroDor`).
3. Estender `DiagramaCorporal` para modo interativo.
4. Criar tela de registro de dor.
5. Criar tela de histórico/resultado.
6. Adicionar ponto de entrada em `PerfilAluna.tsx`.

Depende do backend expor os endpoints de `registro-dor` (change correspondente em `studio-strength-flow-backend`).
