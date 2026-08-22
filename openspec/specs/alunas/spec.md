# alunas Specification

## Purpose

Gerencia o cadastro, a listagem e o perfil histórico das alunas acompanhadas pela Bárbara, incluindo a evolução da assimetria muscular ao longo do tempo.

## Requirements

### Requirement: Cadastro de nova aluna
O sistema SHALL permitir que a Bárbara cadastre uma nova aluna informando nome, idade, peso e altura, tornando-a imediatamente disponível no painel.

#### Scenario: Cadastro bem-sucedido
- **WHEN** Bárbara preenche nome, idade, peso e altura e confirma o cadastro
- **THEN** uma nova aluna é criada e aparece na lista do painel sem avaliações registradas

### Requirement: Painel de alunas com indicador de acompanhamento
O sistema SHALL listar as alunas com nome, data da última avaliação (ou indicação de que ainda não há avaliação), e um badge quando a avaliação mais recente tiver algum movimento classificado como Alta ou Muito alta.

#### Scenario: Badge de acompanhamento pendente
- **WHEN** a avaliação mais recente de uma aluna tem algum movimento com assimetria classificada como Alta
- **THEN** o card dessa aluna no painel exibe um badge "Alta" com a cor correspondente

#### Scenario: Aluna sem avaliação registrada
- **WHEN** uma aluna não possui nenhuma avaliação registrada
- **THEN** seu card no painel não exibe badge de assimetria e indica que ainda não há avaliação

### Requirement: Histórico de avaliações no perfil da aluna
O sistema SHALL exibir, no perfil da aluna, o histórico de suas avaliações ordenado da mais recente para a mais antiga, cada item indicando data e maior assimetria daquela avaliação, e permitindo navegar para o resultado completo.

#### Scenario: Navegação para avaliação do histórico
- **WHEN** Bárbara seleciona um item do histórico de avaliações de uma aluna
- **THEN** o sistema exibe o resultado completo daquela avaliação específica

### Requirement: Evolução da assimetria no perfil da aluna
O sistema SHALL exibir, no perfil da aluna, um gráfico com uma linha por movimento mostrando a evolução do percentual de assimetria ao longo das avaliações registradas, com referência visual nos limiares de classificação (10%, 15%, 20%).

#### Scenario: Evolução com múltiplas avaliações
- **WHEN** a aluna possui duas ou mais avaliações registradas
- **THEN** o gráfico exibe uma linha por movimento conectando os pontos de assimetria percentual de cada avaliação, em ordem cronológica

### Requirement: Diagrama corporal resumido no perfil da aluna
O sistema SHALL exibir, no topo do perfil da aluna, o diagrama corporal (vista frontal e posterior) da avaliação mais recente da aluna, antes do histórico de avaliações e do gráfico de evolução.

#### Scenario: Perfil com avaliação registrada
- **WHEN** a aluna possui ao menos uma avaliação registrada
- **THEN** o diagrama corporal no topo do perfil reflete a classificação de assimetria de cada movimento da avaliação mais recente

#### Scenario: Perfil sem avaliação registrada
- **WHEN** a aluna não possui nenhuma avaliação registrada
- **THEN** o diagrama corporal não é exibido no perfil
