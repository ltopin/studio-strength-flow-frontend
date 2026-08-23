## Why

O protótipo hoje persiste alunas, avaliações e configurações apenas no `localStorage` do navegador (`persistencia-local`), então os dados vivem por dispositivo/navegador e não são compartilhados entre os aparelhos da Bárbara nem confiáveis para acesso pelas alunas. O backend real (API + MongoDB) que resolve isso está sendo implementado no repositório irmão `studio-strength-flow-backend`; esta change cobre o lado de cá: adaptar este frontend para consumir essa API em vez do `localStorage`.

## What Changes

- `src/lib/storage.ts` deixa de ler/escrever `localStorage` e passa a ser um cliente HTTP para a API do backend irmão, mantendo as mesmas assinaturas de função — nenhum componente React muda de nome de função, mas todas passam a ser assíncronas (`Promise`).
- Adição de `@tanstack/react-query` para lidar com os estados de carregamento/erro nos pontos onde essas funções são consumidas.
- `src/lib/mockData.ts` é removido do frontend — o dataset de exemplo passa a ser responsabilidade exclusiva do backend (repositório `studio-strength-flow-backend`).
- **BREAKING**: dados hoje existentes no `localStorage` de quem já usou o protótipo não são migrados — a primeira conexão com o backend parte dos dados de exemplo que ele mesmo semeia.

Não-objetivos explícitos desta change:
- A implementação do backend em si (API, MongoDB, deploy) está fora deste repositório — é responsabilidade do `studio-strength-flow-backend`. Esta change só cobre o consumo da API pelo frontend.
- Sem autenticação/autorização real ainda — o mock de sessão (`autenticacao-mock`, seleção de perfil sem senha) não muda e continua em `localStorage`.
- Configuração de movimentos continua global (um único documento no backend) — não vira configuração por aluna nem por usuário.

## Capabilities

### New Capabilities
(nenhuma — a capability nova de backend vive no repositório `studio-strength-flow-backend`)

### Modified Capabilities
- `persistencia-local`: a persistência deixa de ser feita inteiramente no navegador e passa a depender da API do backend (MongoDB); o app front-end agora requer conectividade com essa API para ler/gravar clientes, avaliações e configurações.

## Impact

- `src/lib/storage.ts` reescrito como cliente HTTP assíncrono; `src/lib/mockData.ts` removido.
- Nova variável de ambiente `VITE_API_URL` apontando para a URL do backend (fornecida pelo repositório irmão quando o deploy estiver pronto).
- Nova dependência `@tanstack/react-query` e um `QueryClientProvider` na raiz do app.
- Os 10 pontos de chamada de `storage.ts` (`Painel`, `PerfilAluna`, `ResultadoAvaliacao`, `DashboardAluna`, `Configuracoes`, `NovaAvaliacao`, `NovaAluna`, `SelecaoPerfil`, `auth.tsx`, `sessao-context.ts`) precisam lidar com carregamento/erro assíncrono.
- Sem mudança em `src/lib/calculations.ts`, na lógica de UI em si, ou no mock de sessão/autenticação.
