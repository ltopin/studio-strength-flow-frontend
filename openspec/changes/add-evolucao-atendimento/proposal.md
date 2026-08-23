## Why

Bárbara quer registrar notas livres de acompanhamento a cada atendimento, sem depender de uma avaliação formal — seção presente em apps de referência do setor (Kinology). Diferente do que o Kinology faz, esta seção fica aberta a todas as usuárias do app, sem paywall (decisão explícita para este produto).

## What Changes

- Nova seção "Evolução de atendimento": nota de texto livre por visita/data, sem paywall.
- Histórico cronológico de notas por aluna, exibido como linha do tempo no perfil.
- Novo acesso rápido a partir do perfil da aluna, análogo ao card "Evolução de atendimento" do Kinology (aqui sem o marcador PRO).

## Capabilities

### New Capabilities
- `evolucao-atendimento`: registro de notas de evolução por visita e histórico por aluna.

## Impact

- `src/types/dominio.ts`: novo tipo `RegistroEvolucao`.
- `src/lib/storage.ts` / `src/lib/queries.ts`: novas funções/hooks (`listarRegistrosEvolucao`, `criarRegistroEvolucao`).
- Nova página/seção: formulário de nota e linha do tempo no perfil.
- `PerfilAluna.tsx`: novo ponto de entrada para a seção.
- Depende do backend expor os endpoints de `evolucao-atendimento` (change correspondente no repositório `studio-strength-flow-backend`).
