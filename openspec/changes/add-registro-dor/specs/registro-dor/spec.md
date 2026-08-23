## Purpose

Define o registro de dor por região corporal e escala EVA, e sua exibição no histórico da aluna.

## ADDED Requirements

### Requirement: Registro de dor por região e EVA
O sistema SHALL permitir que Bárbara, para uma aluna e data, marque um ou mais pontos no diagrama corporal com intensidade na escala EVA (0–10) e confirme o registro.

#### Scenario: Registrar dor em uma região
- **WHEN** Bárbara clica em uma região do diagrama e informa EVA 6, confirmando o registro
- **THEN** um novo registro de dor é criado para aquela aluna com esse ponto (região e EVA)

### Requirement: Histórico de dor no perfil
O sistema SHALL exibir, no perfil da aluna, o histórico cronológico de registros de dor.

#### Scenario: Ver histórico de dor
- **WHEN** Bárbara abre o perfil de uma aluna com registros de dor
- **THEN** ela vê a lista de registros de dor por data
