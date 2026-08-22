## Context

Repositório vazio hoje — nenhum código-fonte existe ainda. O produto de referência (`studio-strength-flow.lovable.app`) já implementa este mesmo fluxo com TanStack Start/Router SSR; usamos essa referência apenas como fonte de verdade visual e estrutural (tokens, componentes, sitemap), não como arquitetura a replicar — o stack técnico continua o especificado no proposal.md (Vite + React + TypeScript + react-router-dom, SPA sem SSR). Ver proposal.md para motivação completa.

## Goals / Non-Goals

**Goals:**
- App navegável de ponta a ponta com dados mockados, visualmente fiel à referência (tokens OKLCH, tipografia, componente de balança, gráfico de evolução com linhas de referência nos limiares).
- Separação estrita entre cálculo puro (`lib/calculations.ts`), dados mockados (`lib/mockData.ts`) e persistência (`lib/storage.ts`), sem lógica de cálculo dentro de componentes React.
- Zero acoplamento a backend: toda leitura/escrita passa por `lib/storage.ts`.

**Non-Goals:**
- Replicar a stack técnica da referência (TanStack Start/SSR) — mantemos Vite SPA + react-router-dom conforme já decidido.
- Autenticação real, multi-tenant, exportação em PDF, integração com hardware — permanecem fora de escopo (ver proposal.md - Impact).

## Decisions

### Fonte de verdade dos tokens visuais
Usar exatamente os tokens extraídos da referência (paleta OKLCH completa: `primary`, `accent`, `background`, `foreground`, `card`, `popover`, `secondary`, `muted`, `destructive`, `border`, `input`, `ring`, `status-leve/-strong`, `status-moderada/-strong`, `status-alta/-strong`, `status-muito-alta/-strong`, `chart-1`..`chart-5`) e as três famílias tipográficas (Fraunces para `font-display`, Inter para `font-sans`, JetBrains Mono para `font-mono`), declarados como variáveis CSS (`:root`) e mapeados no `tailwind.config.ts`, substituindo a lista de hex plana do brief original. Alternativa descartada: manter os hex originais do brief — rejeitada por decisão do usuário durante a exploração, em favor da paleta mais completa e já validada visualmente.

### Componente de resultado único, reutilizado por rota
Um único componente de "visão de avaliação" renderiza os cards de resumo (maior assimetria, movimentos equilibrados, relações musculares) e a lista de cards por movimento (balança, tabela, badge, zonas colapsáveis). É reutilizado em três contextos — resultado da Bárbara, dashboard da aluna, e a partir do histórico no perfil da aluna — variando apenas cabeçalho e ações disponíveis (leitura vs. navegação de volta). Alternativa descartada: duplicar a apresentação por rota — rejeitada por violar DRY sem ganho, já que os dados e o cálculo são idênticos.

### Coeficientes globais, não versionados por avaliação
`ConfigMovimento` permanece um único registro por movimento, sem snapshot por avaliação — editar um coeficiente recalcula o 1RM de avaliações antigas (decisão confirmada com o usuário na exploração). Alternativa descartada: congelar coeficiente por avaliação — exigiria estender `Medicao`/`Avaliacao` além do modelo já especificado, sem necessidade validada para o MVP.

### Persistência: seed + merge em localStorage
`lib/storage.ts` verifica na inicialização se já existe estado salvo; se não, grava o mock inicial. Toda leitura subsequente vem do localStorage, nunca do módulo de mock diretamente (que passa a servir só como semente e como fonte do "restaurar dados de exemplo"). Componentes React nunca importam `mockData.ts` ou `localStorage` diretamente — sempre através de funções expostas por `storage.ts`.

### Gráfico de evolução com recharts
Reproduzir o gráfico de linhas da referência (uma linha por movimento, eixo Y de assimetria %, linhas de referência nos limiares 10/15/20%) usando `recharts` (`LineChart` + `ReferenceLine`), conforme já exigido no brief original — sem perda visual em relação à referência, que usa SVG manual.

## Risks / Trade-offs

- [Coeficientes globais recalculam histórico silenciosamente] → Aceito como comportamento intencional (decisão do usuário); não é um bug a corrigir.
- [Ausência de testes automatizados no MVP] → Mitigado mantendo `lib/calculations.ts` puro e sem estado, pronto para testes futuros sem refatoração.
- [Divergência entre stack da referência (SSR) e stack exigida (SPA)] → Sem risco funcional: todas as telas da referência são puramente apresentacionais e não dependem de SSR para o comportamento especificado nos specs.
