## Why

Bárbara quer registrar a dor relatada pela aluna por região do corpo, ao longo do tempo, para além da força/assimetria já coberta pela dinamometria — seguindo o mesmo padrão de instrumento que apps de referência do setor (Kinology) oferecem como seção própria ("Dor").

## What Changes

- Nova seção "Dor": registro por visita de pontos de dor no corpo, cada um com região e intensidade na escala EVA (0–10), reaproveitando o componente `DiagramaCorporal` já existente para a seleção da região.
- Novo acesso rápido a partir do perfil da aluna (`PerfilAluna`), análogo ao chip "Dor" do Kinology.
- Histórico de registros de dor por aluna, com visão de resultado por registro.

## Capabilities

### New Capabilities
- `registro-dor`: registro, cálculo de exibição e histórico de dor por região corporal e escala EVA.

## Impact

- `src/types/dominio.ts`: novo tipo `RegistroDor`.
- `src/lib/storage.ts` / `src/lib/queries.ts`: novas funções/hooks (`listarRegistrosDor`, `obterRegistroDor`, `criarRegistroDor`).
- Novas páginas: formulário de registro de dor e visão de resultado/histórico.
- `PerfilAluna.tsx`: novo ponto de entrada para a seção.
- Depende do backend expor os endpoints de `registro-dor` (change correspondente no repositório `studio-strength-flow-backend`).
