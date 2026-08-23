# sf36 Specification

## Purpose

Define o registro das respostas do questionário SF-36, o cálculo dos domínios de qualidade de vida e sua exibição no histórico da aluna.

## Requirements

### Requirement: Formulário de 36 itens do SF-36
O sistema SHALL permitir que Bárbara registre, para uma aluna selecionada, uma data e as respostas aos 36 itens do questionário, criando um novo registro ao confirmar.

#### Scenario: Salvar registro de SF-36
- **WHEN** Bárbara preenche a data e as 36 respostas para uma aluna e confirma
- **THEN** um novo registro de SF-36 é criado para essa aluna e o sistema exibe o resultado calculado desse registro

### Requirement: Cálculo dos domínios do SF-36
O sistema SHALL calcular, a partir das 36 respostas de um registro, uma pontuação de 0 a 100 para cada um dos 8 domínios padronizados do instrumento.

#### Scenario: Domínios calculados a partir das respostas
- **WHEN** um registro de SF-36 tem suas 36 respostas preenchidas
- **THEN** o sistema exibe uma pontuação de 0 a 100 para cada um dos 8 domínios

### Requirement: Histórico de SF-36 no perfil
O sistema SHALL exibir, no perfil da aluna, o histórico cronológico de registros de SF-36.

#### Scenario: Ver histórico de SF-36
- **WHEN** Bárbara abre o perfil de uma aluna com registros de SF-36
- **THEN** ela vê a lista de registros por data, podendo abrir cada um para ver a pontuação por domínio
