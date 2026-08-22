# autenticacao-mock Specification

## Purpose

Simula a seleção de perfil (Bárbara ou aluna) sem qualquer autenticação real, apenas para direcionar a navegação para a área correspondente e manter essa escolha durante a sessão do protótipo.

## Requirements

### Requirement: Seleção de perfil sem senha
O sistema SHALL apresentar, na tela inicial, uma opção "Entrar como Bárbara" e uma opção por aluna mockada ("Entrar como [nome]"), sem exigir senha ou qualquer validação de credenciais.

#### Scenario: Entrar como Bárbara
- **WHEN** o usuário seleciona "Entrar como Bárbara"
- **THEN** o sistema exibe o painel da Bárbara

#### Scenario: Entrar como aluna
- **WHEN** o usuário seleciona uma aluna na tela de seleção de perfil
- **THEN** o sistema exibe o dashboard daquela aluna

### Requirement: Sessão mock persistida entre reloads
O sistema SHALL manter o perfil selecionado entre recarregamentos da página, restaurando automaticamente a área correspondente até que o usuário troque de perfil explicitamente.

#### Scenario: Reload mantém o perfil selecionado
- **WHEN** o usuário recarrega a página após já ter selecionado um perfil
- **THEN** o sistema permanece na área daquele perfil, sem retornar à tela de seleção

#### Scenario: Trocar de perfil
- **WHEN** o usuário aciona "Trocar perfil" a partir de qualquer tela autenticada
- **THEN** o sistema limpa o perfil selecionado e retorna à tela de seleção de perfil
