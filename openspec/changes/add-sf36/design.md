## Context

Primeiro instrumento do app com fórmula de scoring pública e fixa, análogo a como `calculations.ts` já deriva torque/1RM/assimetria a partir de medições brutas de dinamometria. Ver proposal.md - Why.

## Goals / Non-Goals

**Goals:**
- Formulário de 36 itens do SF-36.
- Cálculo dos 8 domínios (0–100 cada) a partir das respostas.
- Resultado por registro e histórico/evolução por aluna.

**Non-Goals:**
- Comparação normativa por idade/sexo (norm-based scoring) — a versão inicial usa só o score bruto por domínio, sem comparação populacional.

## Decisions

**Reaproveitar o padrão visual de `ResultadoAvaliacao` (badge + card por domínio) em vez de criar um layout novo do zero.**
Consistência visual com o resto do app e menos decisões de design novas para validar.

**Usar o RAND 36-Item Health Survey (RAND-36), não o SF-36 licenciado (Ware et al.).**
Decisão explícita: o app não deve depender de instrumentos pagos/licenciados. O RAND-36 é de domínio público, cobre os mesmos 36 itens e os mesmos 8 domínios, com cálculo ligeiramente diferente do SF-36 oficial em 2 dos 36 itens (dor e saúde geral) — essa é a fórmula de referência para `calcularDominiosSF36`. O nome exibido na UI deve deixar claro que é o RAND-36 (evitar a marca "SF-36", que é registrada), mas o app/rotas podem manter o nome interno `sf36` já usado nesta change.

## Risks / Trade-offs

- **[Nome "SF-36" é marca registrada, mas o instrumento usado é o RAND-36]** → Mitigação: usar "RAND-36" ou "Avaliação de qualidade de vida (RAND-36)" nos textos visíveis à Bárbara/aluna; manter `sf36`/`SF36` só como nome técnico interno (tipos, rotas, arquivos), já usado nesta change.

## Migration Plan

1. Adicionar tipo `RegistroSF36` em `dominio.ts`.
2. Adicionar funções de storage/query (`listarRegistrosSF36`, `obterRegistroSF36`, `criarRegistroSF36`).
3. Implementar o cálculo dos 8 domínios em `calculations.ts`, usando as fórmulas do RAND-36 (domínio público).
4. Criar formulário de 36 itens.
5. Criar tela de resultado e histórico.
6. Adicionar ponto de entrada em `PerfilAluna.tsx`.

Depende do backend expor os endpoints de `sf36` (change correspondente em `studio-strength-flow-backend`).
