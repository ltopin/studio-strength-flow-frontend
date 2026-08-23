## Context

Primeiro registro estruturado do app que não é uma "avaliação" com resultado calculado — é só entrada e consulta de texto. Ver proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Formulário de anamnese por visita/data.
- Histórico de registros de anamnese no perfil da aluna.

**Non-Goals:**
- Comparação ou "evolução" entre anamneses — o conteúdo é qualitativo, não numérico, então um gráfico de evolução não se aplica aqui (diferente de `GraficoEvolucao` em avaliações).

## Decisions

**Histórico exibido como lista de registros por data, cada um abrindo o detalhe completo — sem resumo/agregação.**
Mesmo padrão de "Histórico de avaliações" em `PerfilAluna.tsx`, mas sem card de resumo calculado (não há o que resumir em texto livre além da data).

## Risks / Trade-offs

Nenhum risco relevante além dos já cobertos pela dependência do backend (ver Impact no proposal.md).

## Migration Plan

1. Adicionar tipo `RegistroAnamnese` em `dominio.ts`.
2. Adicionar funções de storage/query (`listarAnamneses`, `obterAnamnese`, `criarAnamnese`).
3. Criar formulário de anamnese.
4. Criar tela de detalhe/histórico.
5. Adicionar ponto de entrada em `PerfilAluna.tsx`.

Depende do backend expor os endpoints de `anamnese` (change correspondente em `studio-strength-flow-backend`).
