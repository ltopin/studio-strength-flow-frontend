## Why

O relatório em PDF de terceiros que a Bárbara usava antes representava as assimetrias sobre um diagrama do corpo humano — dava uma leitura instantânea de "onde estão os problemas" antes de entrar nos números. Hoje o resultado da avaliação só tem cards e tabelas; queremos recuperar esse resumo visual imediato, reaproveitando 100% da classificação de assimetria que já calculamos, sem inventar lógica nova.

## What Changes

- Novo componente de diagrama corporal (vista frontal + posterior) que destaca a região muscular de cada um dos 5 movimentos, colorida pelos 4 tokens de classificação de assimetria já existentes (`status-leve/moderada/alta/muito-alta`).
- Spike de validação visual como primeira tarefa: renderizar `react-body-highlighter` (candidato principal, MIT), testar override de cor por CSS por região (`.rbh-<musculo>`), e confirmar que o estilo simplificado combina com a identidade visual do app antes de comprometer a implementação. Se não servir, avaliar `body-muscles` (Apache 2.0) como plano B.
- Mapeamento fixo movimento → região muscular: `kneeExt` → quadriceps (front), `kneeFlex` → hamstring (back), `hipAbd` → abductors (back), `shoulderIR` → front-deltoids (front), `shoulderER` → back-deltoids (back).
- Diagrama inserido no topo do `VisaoAvaliacao` compartilhado — aparece automaticamente em **Resultado da avaliação** (Bárbara) e **Dashboard da aluna**, sempre visível (sem toggle/colapsável), acima dos cards de movimento existentes, sem alterar o que já existe ali.
- Diagrama adicional (da avaliação mais recente) no topo do **Perfil da aluna**, como resumo visual antes do histórico e do gráfico de evolução — essa tela não reaproveita `VisaoAvaliacao` hoje, então é uma integração própria.

## Capabilities

### New Capabilities
_(nenhuma — o diagrama é uma nova forma de exibir dados que a capability `avaliacao` já calcula)_

### Modified Capabilities
- `avaliacao`: nova requirement de visão — diagrama corporal com destaque muscular por classificação de assimetria, exibido na visão de resultado.
- `alunas`: nova requirement — diagrama corporal resumido (avaliação mais recente) no topo do perfil da aluna.

## Impact

- Nova dependência de terceiros: `react-body-highlighter` (MIT), pendente confirmação pelo spike da primeira tarefa.
- Componentes afetados: `VisaoAvaliacao` (novo elemento no topo) e `PerfilAluna` (nova seção); nenhuma mudança em `CardMovimento`, `ResumoAvaliacaoCards` ou `Balanca`.
- Nenhuma mudança em `lib/calculations.ts` — o diagrama consome os mesmos `ResultadoMovimento`/`classificacao` já produzidos por `calcularResumoAvaliacao`.
