## 1. Tipos e dados

- [ ] 1.1 Adicionar tipo `RegistroDor { id, clienteId, data, pontos: { regiao, eva }[] }` em `dominio.ts`
- [ ] 1.2 Adicionar `listarRegistrosDor`, `obterRegistroDor`, `criarRegistroDor` em `storage.ts`
- [ ] 1.3 Adicionar hooks correspondentes em `queries.ts`

## 2. Diagrama interativo

- [ ] 2.1 Estender `DiagramaCorporal` com prop opcional de clique por região, sem alterar o uso atual (somente leitura)

## 3. Telas

- [ ] 3.1 Criar tela de registro de dor (diagrama interativo + campo de EVA por ponto marcado)
- [ ] 3.2 Criar tela de resultado/detalhe de um registro
- [ ] 3.3 Exibir histórico cronológico de registros de dor em `PerfilAluna.tsx`

## 4. Entry point

- [ ] 4.1 Adicionar acesso rápido "Dor" em `PerfilAluna.tsx`

## 5. Verificação

- [ ] 5.1 Confirmar manualmente o fluxo completo: marcar pontos, salvar, ver no histórico
