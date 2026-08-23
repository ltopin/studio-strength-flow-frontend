## MODIFIED Requirements

### Requirement: Formulário de nova avaliação
O sistema SHALL permitir que a Bárbara, após escolher um protocolo (ou a opção "Avaliação completa"), registre para uma aluna selecionada uma data e a força medida (kgf) em cada lado dos movimentos incluídos nesse protocolo, criando uma nova avaliação ao confirmar.

#### Scenario: Salvar avaliação e ver resultado
- **WHEN** Bárbara escolhe um protocolo, preenche a data e os campos de força (um por lado de cada movimento do protocolo) para uma aluna e confirma
- **THEN** uma nova avaliação é criada para essa aluna, contendo apenas as medições dos movimentos daquele protocolo, e o sistema exibe o resultado calculado dessa avaliação
