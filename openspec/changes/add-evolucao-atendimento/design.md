## Context

O mais simples dos 5 tópicos explorados — o único sem "resultado calculado", puro registro e leitura de texto. Ver proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Campo de texto por visita.
- Timeline de notas no perfil da aluna.

**Non-Goals:**
- Edição ou exclusão de notas antigas — mesma decisão do backend, pode vir depois.
- Paywall/tier PRO — decisão explícita de manter aberto (ver proposal.md - Why).

## Decisions

**Exibido como timeline (mais recente primeiro) direto no perfil, sem tela de detalhe separada.**
O conteúdo é só texto — abrir uma segunda tela para ver uma nota não agrega nada sobre já vê-la inline na timeline.

## Risks / Trade-offs

Nenhum risco relevante além dos já cobertos pela dependência do backend (ver Impact no proposal.md).

## Migration Plan

1. Adicionar tipo `RegistroEvolucao` em `dominio.ts`.
2. Adicionar funções de storage/query (`listarRegistrosEvolucao`, `criarRegistroEvolucao`).
3. Criar formulário simples de nota.
4. Exibir timeline no perfil da aluna.
5. Adicionar ponto de entrada em `PerfilAluna.tsx`.

Depende do backend expor os endpoints de `evolucao-atendimento` (change correspondente em `studio-strength-flow-backend`).
