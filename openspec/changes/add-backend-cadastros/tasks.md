## 1. Reescrita de storage.ts

- [x] 1.1 Adicionar leitura de `VITE_API_URL` (env do Vite)
- [x] 1.2 Reescrever as funções de `src/lib/storage.ts` como chamadas `fetch` assíncronas, mantendo os mesmos nomes/assinaturas (agora retornando `Promise`), exceto `obterConfigPadrao` e as funções de sessão (`obterSessao`/`salvarSessao`/`limparSessao`), que continuam síncronas em `localStorage`
- [x] 1.3 Adicionar um wrapper fino de fetch que lança erro com o detalhe retornado pela API quando a resposta não for 2xx
- [x] 1.4 Remover `src/lib/mockData.ts` — o dataset de exemplo agora é responsabilidade exclusiva do backend (repositório `studio-strength-flow-backend`)

## 2. Data-fetching com react-query

- [x] 2.1 Adicionar dependência `@tanstack/react-query`
- [x] 2.2 Adicionar `QueryClientProvider` na raiz do app
- [x] 2.3 Atualizar `Painel.tsx` para usar hooks de query (clientes, avaliações, config) com estados de carregamento/erro
- [ ] 2.4 Atualizar `PerfilAluna.tsx` da mesma forma
- [ ] 2.5 Atualizar `ResultadoAvaliacao.tsx` da mesma forma
- [ ] 2.6 Atualizar `DashboardAluna.tsx` da mesma forma
- [ ] 2.7 Atualizar `Configuracoes.tsx` (query de config + mutation de `salvarConfig`)
- [ ] 2.8 Atualizar `NovaAvaliacao.tsx` (mutation de `criarAvaliacao`)
- [ ] 2.9 Atualizar `NovaAluna.tsx` (mutation de `criarCliente`)
- [ ] 2.10 Atualizar `SelecaoPerfil.tsx` (query de `listarClientes` para a lista de alunas)

## 3. Verificação

- [ ] 3.1 Configurar `VITE_API_URL` apontando para uma instância (local ou já deployada) do backend em `studio-strength-flow-backend`
- [ ] 3.2 Smoke test manual fim a fim: cadastrar aluna, criar avaliação, editar configuração, restaurar dados de exemplo
- [ ] 3.3 Confirmar manualmente os cenários de `persistencia-local`: avaliação sobrevive a reload, aparece em outro dispositivo, e backend indisponível mostra erro em vez de dado desatualizado
