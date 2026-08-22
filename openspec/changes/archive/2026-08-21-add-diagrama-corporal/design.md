## Context

Ver proposal.md - Why. `VisaoAvaliacao` (`src/components/shared/VisaoAvaliacao.tsx`) já é o componente único reaproveitado em "Resultado da avaliação" (Bárbara) e no dashboard da aluna; `PerfilAluna` (`src/pages/barbara/PerfilAluna.tsx`) não o reaproveita, renderizando histórico e evolução de forma independente. `calcularResumoAvaliacao` (`src/lib/calculations.ts`) já produz, por movimento, a `classificacao` de assimetria usada em todo o app via `BadgeAssimetria` e os tokens `status-leve/moderada/alta/muito-alta`.

## Goals / Non-Goals

**Goals:**
- Resumo visual imediato do estado de uma avaliação, sem exigir leitura dos 5 cards.
- Reaproveitar 100% do cálculo de classificação já existente — o diagrama é só uma nova representação visual.
- Manter a paleta e tom "boutique" do app (não clínico), mesmo usando uma biblioteca de terceiros como base do desenho.

**Non-Goals:**
- Não substituir os cards de movimento existentes (balança, tabela força/torque/1RM, zonas de treino) — o diagrama é aditivo.
- Não introduzir interatividade além da já existente (sem clique no músculo abrindo detalhe, por exemplo) neste MVP.
- Não resolver o mapeamento anatômico para movimentos futuros além dos 5 já existentes.

## Decisions

### Biblioteca: `react-body-highlighter`, confirmado pelo spike
Avaliados dois candidatos (`react-body-highlighter`, MIT; `body-muscles`, Apache 2.0). Escolhido e **confirmado visualmente via spike** (renderizado de verdade, screenshot, os 5 músculos nas duas vistas, nos 4 tons de classificação): licença MIT inequívoca, componente React nativo (zero dependências de framework extra), estilo simplificado/estilizado que combina bem com a paleta OKLCH do app (nada clínico), e nomes de região que mapeiam quase 1:1 nos nossos 5 movimentos. `body-muscles` não chegou a ser necessário como plano B. Alternativa descartada preventivamente: adaptar um SVG anatômico genérico (Wikimedia/freesvg) à mão — rejeitada por exigir identificar e recortar manualmente os paths de cada região, sem nenhuma API de coloração pronta.

### Mapeamento fixo movimento → região muscular
| Movimento | Região na biblioteca | Vista |
|---|---|---|
| kneeExt | quadriceps | front (anterior) |
| kneeFlex | hamstring | back (posterior) |
| hipAbd | abductors | **front (anterior)** |
| shoulderIR | front-deltoids | front (anterior) |
| shoulderER | back-deltoids | back (posterior) |

Correção descoberta no spike: `abductors` só existe no dataset **anterior** da biblioteca (renderizado como a região alta/lateral da coxa) — não existe no posterior. A vista posterior tem uma região de nome parecido mas semanticamente diferente (`adductor`, adutor/parte interna da coxa) que não usamos. As duas vistas recebem sempre os 5 resultados; cada `<Model>` simplesmente ignora as entradas cujo músculo não pertence à sua vista, então não há necessidade de filtrar manualmente por página.

Fixo no código (não configurável pela Bárbara) — é uma correspondência anatômica, não uma preferência de produto, e os 5 movimentos já são fixos no domínio (`MOVIMENTOS` em `types/dominio.ts`).

### Cor por classificação via `frequency` + `highlightedColors`, não via CSS
Descoberta do spike: a biblioteca pinta cada polígono com um `style={{ fill: ... }}` **inline** calculado a partir de `highlightedColors[frequency - 1]`, onde `frequency` é a soma das ocorrências daquele músculo no array `data`. Não existe classe CSS por músculo (`.rbh-<musculo>` não existe) — um override via stylesheet não teria como vencer o inline style nem teria seletor estável para mirar. A técnica correta, e a que o spike validou: como cada um dos 5 músculos-alvo é único (nenhum dois movimentos colidem no mesmo músculo), basta emitir uma entrada em `data` por movimento com `frequency` = posição do tier (Leve→1, Moderada→2, Alta→3, Muito alta→4) e passar `highlightedColors = [tokenLeve, tokenModerada, tokenAlta, tokenMuitoAlta]` (strings `var(--status-*)`, que resolvem normalmente dentro de um `style` inline). Cada músculo recebe exatamente a cor do seu próprio tier, sem gradiente/mistura entre eles. `bodyColor` (cor do restante do corpo, sem destaque) usa `var(--secondary)`.

### Posicionamento: dentro do `VisaoAvaliacao` + integração própria no `PerfilAluna`
Inserir o diagrama no topo de `VisaoAvaliacao`, acima de `ResumoAvaliacaoCards`, cobre "Resultado da avaliação" e "Dashboard da aluna" automaticamente por reaproveitamento de componente. `PerfilAluna` recebe sua própria instância do diagrama (mesma lógica de mapeamento/cor, dados da avaliação mais recente), já que não passa por `VisaoAvaliacao`. Sempre visível, sem toggle/colapsável, por decisão já tomada na exploração.

## Risks / Trade-offs

- [O estilo visual da biblioteca pode não combinar com a identidade do app depois de renderizado de verdade] → Resolvido: spike renderizado e aprovado visualmente antes do restante da implementação.
- [A técnica de `frequency`-como-índice-de-cor depende de cada músculo-alvo ser único entre os 5 movimentos; se um movimento futuro reusar um músculo já mapeado, os dois somariam frequência e quebrariam o índice esperado] → Aceito para o MVP (os 5 movimentos atuais não colidem); documentado no componente para quem for adicionar um 6º movimento no futuro. Fixar a versão exata da biblioteca no `package.json` (sem `^`/`~`) para evitar que uma mudança de comportamento em upgrade passe despercebida.
- [Duplicação de lógica de mapeamento/cor entre `VisaoAvaliacao` e `PerfilAluna`] → Mitigado extraindo o diagrama como um único componente compartilhado (`DiagramaCorporal`) que recebe a lista de `ResultadoMovimento` já calculada e não conhece a página que o renderiza.
