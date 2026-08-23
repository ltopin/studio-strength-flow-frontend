## Purpose

Define o registro estruturado de anamnese por visita e sua exibição no histórico da aluna.

## ADDED Requirements

### Requirement: Formulário de anamnese
O sistema SHALL permitir que Bárbara registre, para uma aluna selecionada, uma data e campos de texto livre (queixa principal, histórico de saúde, objetivos, observações), criando um novo registro de anamnese ao confirmar.

#### Scenario: Salvar registro de anamnese
- **WHEN** Bárbara preenche a data e ao menos um dos campos de anamnese para uma aluna e confirma
- **THEN** um novo registro de anamnese é criado para essa aluna

### Requirement: Histórico de anamnese no perfil
O sistema SHALL exibir, no perfil da aluna, o histórico cronológico de registros de anamnese.

#### Scenario: Ver histórico de anamnese
- **WHEN** Bárbara abre o perfil de uma aluna com registros de anamnese
- **THEN** ela vê a lista de registros de anamnese por data, podendo abrir cada um para ver o detalhe completo
