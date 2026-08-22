## ADDED Requirements

### Requirement: Diagrama corporal com destaque muscular
O sistema SHALL exibir, na visão de resultado da avaliação, um diagrama do corpo humano com vista frontal e posterior, destacando a região muscular associada a cada um dos 5 movimentos com a cor correspondente à classificação de assimetria daquele movimento (Leve, Moderada, Alta ou Muito alta).

#### Scenario: Região colorida pela classificação
- **WHEN** a assimetria de um movimento for classificada como "Alta"
- **THEN** a região muscular correspondente a esse movimento no diagrama é exibida na cor associada a "Alta"

#### Scenario: Diagrama sempre visível, sem substituir os cards existentes
- **WHEN** o resultado de uma avaliação é exibido
- **THEN** o diagrama corporal aparece no topo, acima dos cards por movimento, sem exigir nenhuma interação para ser visto, e os cards por movimento continuam exibindo o mesmo conteúdo detalhado de antes

#### Scenario: Diagrama compartilhado entre Bárbara e aluna
- **WHEN** a mesma avaliação é visualizada pela Bárbara em "Resultado da avaliação" e pela aluna em seu dashboard
- **THEN** o diagrama corporal exibido é idêntico nas duas visões
