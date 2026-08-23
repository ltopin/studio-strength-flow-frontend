# avaliacao Specification

## Purpose

Define o cálculo e a apresentação dos resultados de uma avaliação de dinamometria — força, torque, 1RM estimado, assimetria, zonas de treino e relações musculares — por movimento e por lado do corpo.

## Requirements

### Requirement: Cálculo de torque
O sistema SHALL calcular o torque em N·m como `forcaKgf × 9.80665 × bracoAlavanca(movimento)`, usando o braço de alavanca configurado para o movimento (kneeExt: 0.40, kneeFlex: 0.40, hipAbd: 0.50, shoulderIR: 0.25, shoulderER: 0.25).

#### Scenario: Torque de extensão de joelho
- **WHEN** a força medida for 38,22 kgf no movimento de extensão de joelho
- **THEN** o torque calculado deve ser aproximadamente 149,9 N·m

### Requirement: Cálculo de 1RM estimado
O sistema SHALL calcular o 1RM estimado em kg como `forcaKgf × coeficiente1RM(movimento)`, usando o coeficiente configurado para o movimento (kneeExt: 0.80, kneeFlex: 0.81, hipAbd: 0.84, shoulderIR: 0.87, shoulderER: 0.91).

#### Scenario: 1RM de extensão de joelho
- **WHEN** a força medida for 38,22 kgf no movimento de extensão de joelho
- **THEN** o 1RM estimado deve ser aproximadamente 30,58 kg

### Requirement: Cálculo e classificação de assimetria
O sistema SHALL calcular a assimetria percentual entre os lados como `(maior - menor) / maior × 100` e classificá-la como Leve quando ≤10%, Moderada quando >10% e ≤15%, Alta quando >15% e ≤20%, ou Muito alta quando >20%.

#### Scenario: Assimetria alta em abdução de quadril
- **WHEN** a abdução de quadril for D=16,40 kgf e E=10,47 kgf
- **THEN** a assimetria calculada deve ser aproximadamente 36% e classificada como "Alta"

#### Scenario: Limite entre Leve e Moderada
- **WHEN** a assimetria calculada for exatamente 10%
- **THEN** a classificação deve ser "Leve"

#### Scenario: Limite entre Alta e Muito alta
- **WHEN** a assimetria calculada for exatamente 20%
- **THEN** a classificação deve ser "Alta"

### Requirement: Zonas de treino por movimento e lado
O sistema SHALL calcular, para cada lado, as zonas de treino como percentuais do 1RM daquele lado: Resistência (40%, valor único), Hipertrofia (60–80%), Força (80–90%), Potência (45–60%) e Velocidade (30%, valor único).

#### Scenario: Zonas calculadas independentemente por lado
- **WHEN** o 1RM estimado for D=35,2 kg e E=32,0 kg em um movimento
- **THEN** a zona de Resistência exibida deve ser aproximadamente 14,1 kg para o lado D e 12,8 kg para o lado E

### Requirement: Relações musculares por lado
O sistema SHALL calcular, por lado, a razão direta entre forças em kgf (não entre 1RM): flexão/extensão de joelho, e rotação externa/interna de ombro.

#### Scenario: Relação flexão/extensão de joelho
- **WHEN** a flexão de joelho lado D for 27 kgf e a extensão de joelho lado D for 44 kgf
- **THEN** a relação flexão/extensão exibida para o lado D deve ser aproximadamente 0,61

### Requirement: Formulário de nova avaliação
O sistema SHALL permitir que a Bárbara, após escolher um protocolo (ou a opção "Avaliação completa"), registre para uma aluna selecionada uma data e a força medida (kgf) em cada lado dos movimentos incluídos nesse protocolo, criando uma nova avaliação ao confirmar.

#### Scenario: Salvar avaliação e ver resultado
- **WHEN** Bárbara escolhe um protocolo, preenche a data e os campos de força (um por lado de cada movimento do protocolo) para uma aluna e confirma
- **THEN** uma nova avaliação é criada para essa aluna, contendo apenas as medições dos movimentos daquele protocolo, e o sistema exibe o resultado calculado dessa avaliação

### Requirement: Visão de resultado da avaliação
O sistema SHALL exibir, para cada movimento de uma avaliação, o gráfico de balança D/E, a força/torque/1RM por lado, o badge de classificação de assimetria e as zonas de treino em uma seção recolhível; e, para a avaliação como um todo, a maior assimetria entre os movimentos, a contagem de movimentos com assimetria ≤10% e as relações musculares.

#### Scenario: Resultado idêntico nas duas visões
- **WHEN** a mesma avaliação é visualizada pela Bárbara e pela aluna dona da avaliação
- **THEN** os valores calculados exibidos (torque, 1RM, assimetria, zonas de treino) são idênticos nas duas visões

### Requirement: Comparação visual D/E (balança)
O sistema SHALL representar a comparação entre lados de cada movimento como duas barras horizontais divergindo de um eixo central, onde o lado mais forte ocupa 100% da sua metade e o lado mais fraco ocupa uma largura proporcional a `menor/maior × 100%`.

#### Scenario: Barras proporcionais ao valor relativo
- **WHEN** um movimento tem força E=40 kgf e D=44 kgf
- **THEN** a barra do lado E deve ocupar aproximadamente 90,9% da largura disponível em sua metade, e a barra do lado D deve ocupar 100% da sua metade

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
