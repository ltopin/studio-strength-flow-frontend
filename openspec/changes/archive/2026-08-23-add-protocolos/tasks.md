## 1. Tipos e dados

- [x] 1.1 Adicionar tipo `Protocolo { id, nome, movimentos: Movimento[], tempoEstimadoMin }` em `dominio.ts`
- [x] 1.2 Adicionar `listarProtocolos` em `storage.ts` (`GET /api/protocolos`)
- [x] 1.3 Adicionar `useProtocolos` em `queries.ts`

## 2. Seleção de protocolo

- [x] 2.1 Criar página `EscolherProtocolo.tsx` listando protocolos com nome/tempo estimado + opção "Avaliação completa"
- [x] 2.2 Ajustar rotas em `main.tsx`: `/avaliar/:clienteId` → `EscolherProtocolo`, nova rota `/avaliar/:clienteId/:protocoloId` → `NovaAvaliacao` filtrado
- [x] 2.3 Atualizar link "Nova avaliação" em `PerfilAluna.tsx` para apontar para `EscolherProtocolo`

## 3. Formulário filtrado

- [x] 3.1 Atualizar `NovaAvaliacao.tsx` para filtrar `MOVIMENTOS` pelo protocolo selecionado
- [x] 3.2 Garantir que "Avaliação completa" mantém o comportamento anterior (17 movimentos)

## 4. Verificação

- [x] 4.1 Confirmar manualmente que uma avaliação criada via protocolo parcial só contém as medições esperadas
- [x] 4.2 Confirmar que `ResultadoAvaliacao`/`PerfilAluna` lidam bem com avaliações parciais (sem todos os 17 movimentos)
