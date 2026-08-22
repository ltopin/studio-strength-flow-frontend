## ADDED Requirements

### Requirement: Diagrama corporal resumido no perfil da aluna
O sistema SHALL exibir, no topo do perfil da aluna, o diagrama corporal (vista frontal e posterior) da avaliação mais recente da aluna, antes do histórico de avaliações e do gráfico de evolução.

#### Scenario: Perfil com avaliação registrada
- **WHEN** a aluna possui ao menos uma avaliação registrada
- **THEN** o diagrama corporal no topo do perfil reflete a classificação de assimetria de cada movimento da avaliação mais recente

#### Scenario: Perfil sem avaliação registrada
- **WHEN** a aluna não possui nenhuma avaliação registrada
- **THEN** o diagrama corporal não é exibido no perfil
