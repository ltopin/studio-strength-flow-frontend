## Purpose

Define o registro de notas de evolução de atendimento por visita e sua exibição como linha do tempo no perfil da aluna.

## ADDED Requirements

### Requirement: Registro de nota de evolução
O sistema SHALL permitir que Bárbara registre, para uma aluna selecionada, uma data e um texto livre de evolução, criando um novo registro ao confirmar.

#### Scenario: Salvar nota de evolução
- **WHEN** Bárbara preenche a data e o texto da nota para uma aluna e confirma
- **THEN** um novo registro de evolução é criado para essa aluna

### Requirement: Timeline de evolução no perfil
O sistema SHALL exibir, no perfil da aluna, os registros de evolução como uma linha do tempo ordenada da mais recente para a mais antiga, sem exigir navegação para uma tela separada.

#### Scenario: Ver timeline de evolução
- **WHEN** Bárbara abre o perfil de uma aluna com registros de evolução
- **THEN** ela vê o texto de cada nota diretamente na linha do tempo, da mais recente para a mais antiga
