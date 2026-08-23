## Context

Ver proposal.md - Why. Hoje `src/lib/storage.ts` é a única porta de entrada para dados no frontend, mas suas 10 funções são **síncronas** (ex.: `listarClientes(): Cliente[]`) e são chamadas diretamente durante a renderização em 10 arquivos (`Painel`, `PerfilAluna`, `ResultadoAvaliacao`, `DashboardAluna`, `Configuracoes`, `NovaAvaliacao`, `NovaAluna`, `SelecaoPerfil`, `auth.tsx`, `sessao-context.ts`), sem `useEffect`/`useState`. Trocar `localStorage` por chamadas HTTP torna essas funções assíncronas — isso se propaga para todo chamador, não só para `storage.ts`.

O backend é implementado e deployado separadamente no repositório `studio-strength-flow-backend` (change `add-backend-cadastros` lá). O contrato autoritativo da API está no spec `backend-cadastros` daquele repositório; o resumo abaixo é só para orientar a integração.

**Contrato da API (resumo, ver o spec `backend-cadastros` do backend para o detalhe):**

| Função em `storage.ts` | Endpoint |
|---|---|
| `listarClientes` | `GET /api/clientes` |
| `obterCliente` | `GET /api/clientes/:id` |
| `criarCliente` | `POST /api/clientes` |
| `listarAvaliacoes` | `GET /api/clientes/:id/avaliacoes` |
| `obterAvaliacao` | `GET /api/avaliacoes/:id` |
| `criarAvaliacao` | `POST /api/avaliacoes` |
| `obterConfig` / `salvarConfig` | `GET` / `PUT /api/config` |
| `restaurarDadosExemplo` | `POST /api/restaurar-dados-exemplo` |

Todas as respostas usam `id` (string), nunca `_id` — o backend mapeia isso, então `src/types/dominio.ts` não precisa mudar.

## Goals / Non-Goals

**Goals:**
- `storage.ts` mantém as mesmas funções/assinaturas de nome, agora retornando `Promise`, implementadas como cliente HTTP contra `import.meta.env.VITE_API_URL`.
- Os 10 pontos de chamada passam a lidar com estados de carregamento/erro de forma consistente, sem duplicar boilerplate em cada tela.

**Non-Goals:**
- Qualquer decisão de implementação do backend (stack, banco, deploy) — isso é design do repositório `studio-strength-flow-backend`.
- Autenticação/autorização real (fica para uma mudança futura).
- Migrar o mock de sessão/perfil (`autenticacao-mock`) — continua em `localStorage`, sem relação com este backend.

## Decisions

**Data-fetching: adicionar `@tanstack/react-query`.**
Resolve o problema descrito em Context (10 call sites síncronos viram assíncronos) sem duplicar lógica de loading/erro manualmente em cada tela. Alternativa considerada: `useState`/`useEffect` artesanal em cada página — rejeitada, repetiria o mesmo boilerplate 10 vezes sem ganho sobre uma biblioteca padrão já comum em apps Vite+React.

**`storage.ts` continua exportando as mesmas funções, agora todas assíncronas.**
Exceto `obterConfigPadrao` (continua síncrona — é uma constante local, não dado persistido) e as funções de sessão (`obterSessao`/`salvarSessao`/`limparSessao`, que permanecem intocadas em `localStorage`).

**`VITE_API_URL` configurável por ambiente, sem valor hardcoded.**
A URL do backend em produção só existirá quando o deploy do repositório irmão estiver pronto; em dev local pode apontar para uma instância local daquele backend.

**`src/lib/mockData.ts` é removido, não mantido como fallback.**
O backend já garante os mesmos dados de exemplo via seed/reset; manter uma segunda cópia no frontend criaria duas fontes da verdade para o mesmo dataset.

## Risks / Trade-offs

- **[`storage.ts` assíncrono é uma mudança de contrato interno que atinge os 10 call sites]** → Mitigação: hooks de `react-query` absorvem o boilerplate de loading/erro; cada tela recebe uma adaptação pequena e consistente em vez de código sob medida.
- **[Dependência de um repositório separado com cronograma próprio]** → Mitigação: `VITE_API_URL` é configurável; o frontend pode apontar para uma instância local do backend enquanto o deploy definitivo não está pronto, sem bloquear o trabalho deste repositório.
- **[Sem autenticação no backend, qualquer cliente que souber a URL da API pode ler/gravar dados de qualquer aluna]** → Aceito explicitamente pelo usuário nesta fase (decisão e mitigação detalhadas no design do `studio-strength-flow-backend`); não há nada adicional a fazer do lado do frontend.
- **[Dados hoje em `localStorage` de quem já usa o protótipo se perdem no corte]** → Mitigação: aceito no proposal (BREAKING, sem migração); o backend já sobe com o mesmo dataset de exemplo usado hoje.

## Migration Plan

1. Reescrever `src/lib/storage.ts` como cliente HTTP assíncrono contra `VITE_API_URL`.
2. Remover `src/lib/mockData.ts`.
3. Adicionar `@tanstack/react-query` e um `QueryClientProvider` na raiz do app.
4. Atualizar os 10 call sites para consumir hooks assíncronos em vez de chamar `storage.ts` diretamente durante a renderização.
5. Configurar `VITE_API_URL` assim que a URL do backend (repositório irmão) estiver disponível, e rodar o smoke test manual fim a fim.

Rollback: reverter para o commit anterior (`storage.ts` só com `localStorage`) — frontend e backend são deploys desacoplados, então não há nada destrutivo a desfazer.
