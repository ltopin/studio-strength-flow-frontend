## Why

Antes de iniciar o acompanhamento de uma aluna, Bárbara precisa registrar seu histórico e queixas iniciais (anamnese) — uma seção de entrada que hoje não existe no app, presente como seção própria em apps de referência do setor (Kinology).

## What Changes

- Nova seção "Anamnese": formulário estruturado (queixa principal, histórico de saúde, objetivos, observações) registrado por visita/data — cada nova anamnese é um registro novo, preservando o histórico de mudanças ao longo do acompanhamento (decisão explícita: versionado por data, não um documento único sobrescrito).
- Novo acesso rápido a partir do perfil da aluna, análogo ao chip "Anamnese" do Kinology.
- Histórico de registros de anamnese por aluna.

## Capabilities

### New Capabilities
- `anamnese`: registro estruturado de anamnese por visita e histórico por aluna.

## Impact

- `src/types/dominio.ts`: novo tipo `RegistroAnamnese`.
- `src/lib/storage.ts` / `src/lib/queries.ts`: novas funções/hooks (`listarAnamneses`, `obterAnamnese`, `criarAnamnese`).
- Novas páginas: formulário de anamnese e visão de histórico/detalhe.
- `PerfilAluna.tsx`: novo ponto de entrada para a seção.
- Depende do backend expor os endpoints de `anamnese` (change correspondente no repositório `studio-strength-flow-backend`).
