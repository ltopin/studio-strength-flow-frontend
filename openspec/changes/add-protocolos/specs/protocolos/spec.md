## Purpose

Define o catálogo de protocolos de avaliação (subconjuntos nomeados dos movimentos de dinamometria) e a seleção de um protocolo antes de registrar uma nova avaliação.

## ADDED Requirements

### Requirement: Catálogo de protocolos
O sistema SHALL exibir uma lista de protocolos pré-cadastrados, cada um com nome, tempo estimado em minutos e o subconjunto de movimentos que inclui, incluindo uma opção "Avaliação completa" com todos os movimentos.

#### Scenario: Bárbara visualiza protocolos disponíveis
- **WHEN** Bárbara abre a tela de nova avaliação para uma aluna
- **THEN** ela vê a lista de protocolos com nome e tempo estimado, incluindo a opção "Avaliação completa"

### Requirement: Seleção de protocolo direciona o formulário
O sistema SHALL, ao selecionar um protocolo, exibir no formulário de nova avaliação apenas os campos de força dos movimentos incluídos naquele protocolo.

#### Scenario: Protocolo parcial mostra só seus movimentos
- **WHEN** Bárbara seleciona o protocolo "Relação I/Q"
- **THEN** o formulário exibe apenas os campos de flexão e extensão de joelho (D/E), sem os demais movimentos

### Requirement: Avaliação completa permanece disponível
O sistema SHALL oferecer, dentro do catálogo de protocolos, uma opção equivalente ao comportamento anterior a esta change (todos os movimentos), para quando nenhum protocolo específico for aplicável.

#### Scenario: Avaliação completa mede tudo
- **WHEN** Bárbara seleciona "Avaliação completa"
- **THEN** o formulário exibe todos os 17 movimentos, como acontecia antes da introdução de protocolos
