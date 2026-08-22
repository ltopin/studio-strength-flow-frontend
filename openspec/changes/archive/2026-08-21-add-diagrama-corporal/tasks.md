## 1. Spike de validação visual

- [x] 1.1 Instalar `react-body-highlighter` e renderizar vista frontal e posterior isoladamente (fora do fluxo real) para avaliar o estilo — spike em rota temporária `/_spike`, removida após validação
- [x] 1.2 Testar override de cor por região em cada vista usando os tokens `status-*` — descoberta: não é override CSS (não existe classe `.rbh-<musculo>`), é `frequency`-como-índice em `highlightedColors`; documentado em design.md
- [x] 1.3 Decidir se o estilo serve visualmente — sim, aprovado (screenshot conferido, combina com a paleta); `body-muscles` não foi necessário. Também corrigido no spike: `abductors` só existe na vista **anterior** da biblioteca, não na posterior (mapeamento em design.md ajustado)
- [x] 1.4 Fixar a versão exata da biblioteca escolhida no `package.json` (sem `^`/`~`) — `react-body-highlighter: "2.0.5"` via `--save-exact`

## 2. Componente DiagramaCorporal compartilhado

- [x] 2.1 Criar `src/components/shared/DiagramaCorporal.tsx` recebendo os `ResultadoMovimento[]` já calculados como prop
- [x] 2.2 Implementar o mapeamento fixo movimento → {região da biblioteca, vista front/back} — com `hipAbd` corrigido para `anterior` (achado do spike)
- [x] 2.3 Aplicar cor por classificação (`status-leve/moderada/alta/muito-alta`) via `frequency`+`highlightedColors`, reaproveitando os mesmos tokens que `BadgeAssimetria` já usa
- [x] 2.4 Renderizar vista frontal e posterior lado a lado, seguindo o layout responsivo do resto do app
- [x] 2.5 Adicionar labels indicando qual movimento cada região representa — lista abaixo do diagrama (nome do movimento + `BadgeAssimetria`), já que a biblioteca não expõe callouts de texto por região

## 3. Integração no resultado da avaliação (Bárbara + aluna)

- [x] 3.1 Inserir `DiagramaCorporal` no topo de `VisaoAvaliacao`, acima de `ResumoAvaliacaoCards`
- [x] 3.2 Verificar visualmente em `/avaliacao/:id` (Bárbara) e `/aluna/:clienteId` (aluna) que o diagrama aparece idêntico nas duas rotas — confirmado via Playwright, mesmas cores/legendas nas duas rotas

## 4. Integração no perfil da aluna

- [x] 4.1 Inserir `DiagramaCorporal` no topo de `PerfilAluna`, usando a avaliação mais recente
- [x] 4.2 Ocultar a seção quando a aluna não tiver nenhuma avaliação registrada — confirmado com a Paula (sem avaliação)

## 5. Verificação final

- [x] 5.1 `npm run build` sem erros de TypeScript e `npm run lint` sem warnings — ambos limpos
- [x] 5.2 Verificação visual (Playwright headless) nas 3 telas: resultado da Bárbara, dashboard da aluna, perfil da aluna — todas renderizando o diagrama corretamente, zero erros de console
- [x] 5.3 Conferir que os cards de movimento existentes (balança, tabela, zonas) continuam inalterados — confirmado visualmente, sem mudança nos cards
- [x] 5.4 Conferir o caso de aluna sem avaliação (Paula) — perfil não quebra e não mostra o diagrama — confirmado
