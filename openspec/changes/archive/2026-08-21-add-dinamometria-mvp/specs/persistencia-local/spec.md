## Purpose

Garante que os dados do protótipo (alunas, avaliações e configurações) sobrevivam a recarregamentos de página usando armazenamento local do navegador, sem exigir backend.

## ADDED Requirements

### Requirement: Seed inicial a partir dos dados de exemplo
O sistema SHALL, no primeiro carregamento sem dados persistidos, popular o armazenamento local com os dados de exemplo (3 clientes fictícios com 2–3 avaliações cada e coeficientes padrão).

#### Scenario: Primeira visita
- **WHEN** o app é carregado pela primeira vez em um navegador sem dados salvos
- **THEN** os 3 clientes de exemplo e suas avaliações ficam disponíveis imediatamente, sem cadastro manual

### Requirement: Persistência de dados criados ou editados
O sistema SHALL persistir qualquer aluna cadastrada, avaliação criada ou coeficiente editado, de forma que essas mudanças sobrevivam a um recarregamento da página.

#### Scenario: Nova avaliação sobrevive a reload
- **WHEN** Bárbara cria uma nova avaliação e a página é recarregada
- **THEN** a avaliação criada continua disponível no histórico da aluna
