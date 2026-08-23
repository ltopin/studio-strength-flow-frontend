## Why

Um questionário padronizado de qualidade de vida (36 itens, 8 domínios) é amplamente usado em avaliação física/reabilitação, presente como seção própria em apps de referência do setor (Kinology). Adicioná-lo dá a Bárbara um instrumento validado de acompanhamento além da força/assimetria — usando o **RAND 36-Item Health Survey (RAND-36)**, versão de domínio público do instrumento, não o SF-36 licenciado (Ware et al.): o app não deve depender de instrumentos pagos.

## What Changes

- Nova seção "RAND-36" (nome técnico interno `sf36`, mantido por já estar em uso nesta change): formulário com os 36 itens padronizados, respondido por visita/data.
- Cálculo dos 8 domínios (0–100 cada) a partir das respostas, usando as fórmulas de domínio público do RAND-36, seguindo o mesmo padrão já usado em `avaliacao` — o backend persiste as respostas brutas, o frontend deriva o resultado (`calculations.ts`).
- Visão de resultado por registro (pontuação por domínio) e histórico/evolução por aluna, análogo ao que já existe para avaliações de força.
- Novo acesso rápido a partir do perfil da aluna, análogo ao chip "SF-36" do Kinology (aqui rotulado "RAND-36" na UI).

## Capabilities

### New Capabilities
- `sf36`: registro das respostas do questionário, cálculo dos domínios e histórico por aluna.

## Impact

- `src/types/dominio.ts`: novo tipo `RegistroSF36`.
- `src/lib/calculations.ts`: nova função de scoring dos 8 domínios, usando as fórmulas do RAND-36 (ver design.md).
- `src/lib/storage.ts` / `src/lib/queries.ts`: novas funções/hooks (`listarRegistrosSF36`, `obterRegistroSF36`, `criarRegistroSF36`).
- Novas páginas: formulário de 36 itens, resultado por domínio, histórico.
- `PerfilAluna.tsx`: novo ponto de entrada para a seção.
- Depende do backend expor os endpoints de `sf36` (change correspondente no repositório `studio-strength-flow-backend`).
