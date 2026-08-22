## Why

A Bárbara Lages precisa validar o produto de avaliação de dinamometria com alunas reais antes de investir em qualquer backend. Hoje ela recebe um relatório em PDF de um equipamento de terceiros; queremos um MVP de front-end navegável — dados mockados, sem servidor — que reproduza esse fluxo (registrar força D/E por movimento, ver torque/1RM/assimetria calculados, acompanhar evolução) para validar se o produto resolve o problema antes de qualquer decisão de persistência real.

## What Changes

- Scaffold completo de um app Vite + React + TypeScript (strict) — o repositório está vazio hoje.
- Tailwind CSS configurado com os tokens de design confirmados a partir do protótipo de referência (`studio-strength-flow.lovable.app`): paleta OKLCH no estilo shadcn/ui (`primary`, `accent`, `card`, `secondary`, `muted`, `destructive`, `border`, `status-leve/moderada/alta/muito-alta` com variantes `-strong`), tipografia Fraunces (títulos), Inter (corpo) e JetBrains Mono (números/métricas).
- shadcn/ui como base de componentes primitivos (button, card, badge, input, label, details/collapsible), sem recriação do zero.
- Roteamento via react-router-dom cobrindo as 8 rotas mapeadas na referência: seleção de perfil, painel da Bárbara, cadastro de aluna, perfil da aluna, nova avaliação, resultado da avaliação, dashboard da aluna e configurações.
- Módulo puro `lib/calculations.ts` com torque, 1RM estimado, classificação de assimetria, zonas de treino e relações musculares — fórmulas e coeficientes validados contra os números do relatório original e do protótipo de referência.
- `lib/mockData.ts` com 3 clientes fictícios e 2–3 avaliações cada, com evolução de assimetria visível ao longo do tempo.
- Mock de autenticação (`lib/mockAuth` ou equivalente): seleção de perfil sem senha/validação real, sessão persistida em localStorage entre reloads — comentário no código deixando explícito que é mock.
- `lib/storage.ts` isolando todo acesso a localStorage: seed inicial a partir do mock, persistência de avaliações/alunas/configurações criadas ou editadas em sessão, e duas ações de reset (restaurar coeficientes padrão por movimento; restaurar todos os dados de exemplo).
- Gráfico de evolução da assimetria com recharts, reproduzindo as linhas de referência nos limiares de classificação (10/15/20%) vistas no protótipo.
- Componente de "balança" (barra D/E com eixo central) como elemento visual assinatura, reutilizado em todo resultado de avaliação.

## Capabilities

### New Capabilities
- `avaliacao`: modelo de dados de avaliação/medição, cálculos puros (torque, 1RM, assimetria, zonas de treino, relações musculares), formulário de nova avaliação e a visão de resultado (balança D/E, tabela torque/1RM, badge de classificação, zonas colapsáveis, relações musculares) — reutilizada tanto na visão da Bárbara quanto no dashboard da aluna.
- `alunas`: cadastro de nova aluna, painel/lista de alunas com badge de acompanhamento (assimetria Alta/Muito alta pendente), e perfil da aluna com histórico de avaliações e gráfico de evolução da assimetria por movimento.
- `autenticacao-mock`: seleção de perfil (Bárbara vs. aluna), sessão mock persistida entre reloads, sem senha nem validação real.
- `configuracoes`: coeficientes de 1RM e braço de alavanca editáveis por movimento (globais, aplicados retroativamente a avaliações antigas), com "restaurar padrão" por movimento e "restaurar dados de exemplo" completo.
- `persistencia-local`: módulo de storage isolado atrás de `lib/storage.ts`, nunca acessado direto dos componentes; seed inicial a partir do mock na primeira carga; persiste o que for criado/editado na sessão.

### Modified Capabilities
_(nenhuma — projeto novo, sem specs existentes)_

## Impact

- Repositório atualmente vazio: cria toda a estrutura (`lib/`, `components/`, `pages/`, `types/`) e o projeto Vite do zero.
- Novas dependências: `react-router-dom`, `recharts`, `tailwindcss`, `shadcn/ui` (+ `lucide-react` para ícones, seguindo a referência), fontes via Google Fonts (Fraunces, Inter, JetBrains Mono).
- Sem backend, API, banco de dados ou autenticação real — fora de escopo.
- Fonte de verdade visual: `studio-strength-flow.lovable.app` (tokens de cor/tipografia e estrutura das telas), com escopo de fluxo expandido para incluir cadastro de aluna e os dois controles de reset encontrados na referência.
