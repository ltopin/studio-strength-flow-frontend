# configuracoes Specification

## Purpose

Permite à Bárbara ajustar os coeficientes de 1RM e o braço de alavanca usados nos cálculos de cada movimento, e restaurar valores padrão ou os dados de exemplo do protótipo.

## Requirements

### Requirement: Edição de coeficientes por movimento
O sistema SHALL permitir editar o braço de alavanca e o coeficiente de 1RM de cada um dos 5 movimentos; os valores salvos SHALL ser aplicados globalmente, recalculando o torque e o 1RM de todas as avaliações — passadas e futuras — daquele movimento.

#### Scenario: Coeficiente editado afeta avaliação antiga
- **WHEN** Bárbara altera o coeficiente de 1RM de um movimento em Configurações e salva
- **THEN** o 1RM exibido em qualquer avaliação anterior daquele movimento passa a refletir o novo coeficiente

### Requirement: Restaurar padrão por movimento
O sistema SHALL permitir restaurar os campos de coeficiente e braço de alavanca de todos os movimentos para os valores padrão originais (kneeExt: braço 0.40/coef 0.80, kneeFlex: braço 0.40/coef 0.81, hipAbd: braço 0.50/coef 0.84, shoulderIR: braço 0.25/coef 0.87, shoulderER: braço 0.25/coef 0.91), sem exigir confirmação adicional para editar antes de salvar.

#### Scenario: Restaurar padrão preenche os valores originais
- **WHEN** Bárbara aciona "Restaurar padrão"
- **THEN** os campos de coeficiente e braço de alavanca de todos os movimentos exibem os valores padrão originais

### Requirement: Restaurar dados de exemplo
O sistema SHALL permitir substituir todas as alunas, avaliações e configurações persistidas pelos dados de exemplo originais (3 clientes com 2–3 avaliações cada e coeficientes padrão).

#### Scenario: Restaurar dados de exemplo limpa alterações da sessão
- **WHEN** Bárbara aciona "Restaurar dados de exemplo"
- **THEN** todas as alunas, avaliações e configurações criadas ou editadas na sessão são substituídas pelos dados de exemplo originais
