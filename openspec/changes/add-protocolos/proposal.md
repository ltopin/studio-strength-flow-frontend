## Why

Hoje toda avaliação de força mede sempre os 17 movimentos do protocolo Morin et al. (2023), mesmo quando Bárbara só precisa acompanhar uma região (ex.: evolução de membros inferiores). Isso torna o formulário longo para casos de uso mais focados — problema que apps de referência do setor (Kinology) resolvem oferecendo protocolos pré-cadastrados por região/objetivo, com tempo estimado, em vez de uma única avaliação monolítica.

## What Changes

- Nova tela de seleção de protocolo, exibida antes do formulário de nova avaliação, listando protocolos pré-cadastrados (ex.: Membros Inferiores, Membros Superiores, Relação I/Q, Cotovelo) com nome e tempo estimado, além da opção "Avaliação completa" (os 17 movimentos, comportamento atual).
- `NovaAvaliacao` passa a filtrar os campos de força exibidos/exigidos pelos movimentos do protocolo escolhido, em vez de sempre exigir os 17.
- Novo tipo `Protocolo` consumido a partir do catálogo exposto pela API (backend change correspondente `add-protocolos` no repositório `studio-strength-flow-backend`).
- Protocolos são um catálogo pré-cadastrado, somente leitura nesta change — Bárbara não cria/edita protocolos próprios (ver design.md).

## Capabilities

### New Capabilities
- `protocolos`: catálogo de protocolos de avaliação (subconjuntos nomeados dos 17 movimentos) e a tela de seleção de protocolo antes de uma nova avaliação.

### Modified Capabilities
- `avaliacao`: o requirement de formulário de nova avaliação passa a depender do protocolo escolhido, em vez de sempre cobrir todos os movimentos.

## Impact

- `src/types/dominio.ts`: novo tipo `Protocolo`.
- `src/lib/storage.ts` / `src/lib/queries.ts`: nova função/hook `listarProtocolos`.
- Nova página `EscolherProtocolo.tsx`; `NovaAvaliacao.tsx` modificado para aceitar um protocolo e filtrar `MOVIMENTOS`.
- Rotas em `main.tsx`: `/avaliar/:clienteId` passa a abrir a seleção de protocolo antes do formulário.
- Depende do backend expor `GET /api/protocolos` **e** suportar os 17 movimentos em `Avaliacao`/`Config` — hoje o backend só persiste 5 dos 17 (ver Risks em design.md do change correspondente no repositório `studio-strength-flow-backend`).
