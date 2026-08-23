## 1. Tipos e dados

- [x] 1.1 Adicionar tipo `RegistroSF36 { id, clienteId, data, respostas: number[36] }` em `dominio.ts`
- [x] 1.2 Adicionar `listarRegistrosSF36`, `obterRegistroSF36`, `criarRegistroSF36` em `storage.ts`
- [x] 1.3 Adicionar hooks correspondentes em `queries.ts`

## 2. Cálculo

- [x] 2.1 Implementar `calcularDominiosSF36` em `calculations.ts` usando as fórmulas do RAND-36 (domínio público)

## 3. Telas

- [x] 3.1 Criar formulário de 36 itens
- [x] 3.2 Criar tela de resultado (pontuação por domínio)
- [x] 3.3 Exibir histórico cronológico de registros de SF-36 em `PerfilAluna.tsx`

## 4. Entry point

- [x] 4.1 Adicionar acesso rápido "SF-36" em `PerfilAluna.tsx`

## 5. Verificação

- [x] 5.1 Confirmar manualmente o fluxo completo: preencher, salvar, ver resultado por domínio, ver no histórico
