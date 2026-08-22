## 1. Scaffold do projeto

- [x] 1.1 Criar projeto Vite + React + TypeScript (strict mode habilitado no tsconfig)
- [x] 1.2 Instalar e configurar Tailwind CSS
- [x] 1.3 Instalar e inicializar shadcn/ui (button, card, badge, input, label) — CLI travou com erro de workspace neste ambiente (confirmado nas versões 4.19.0 e 4.18.0); primitivos escritos à mão seguindo exatamente o padrão gerado pelo shadcn (cva + `cn()` + Radix Slot/Label)
- [x] 1.4 Instalar `react-router-dom`, `recharts`, `lucide-react`
- [x] 1.5 Importar fontes via Google Fonts (Fraunces, Inter, JetBrains Mono) e configurar `font-display`/`font-sans`/`font-mono`
- [x] 1.6 Declarar tokens de design em `:root` (paleta OKLCH: primary, accent, background, foreground, card, popover, secondary, muted, destructive, border, input, ring, status-leve/-strong, status-moderada/-strong, status-alta/-strong, status-muito-alta/-strong, chart-1..chart-5) — mapeados via `@theme inline` em `src/index.css` (Tailwind v4 é CSS-first; não há `tailwind.config.ts` nesta versão, o `@theme` cumpre o mesmo papel)
- [x] 1.7 Criar estrutura de pastas: `lib/`, `components/`, `pages/`, `types/`

## 2. Modelo de dados

- [x] 2.1 Definir tipos em `types/`: `Cliente`, `Medicao`, `Avaliacao`, `ConfigMovimento`
- [x] 2.2 Definir tipo/enum dos 5 movimentos e labels em português (nome, região corporal)

## 3. Cálculos puros (lib/calculations.ts)

- [x] 3.1 Implementar `calcularTorque(forcaKgf, bracoAlavanca)`
- [x] 3.2 Implementar `calcular1RM(forcaKgf, coeficiente)`
- [x] 3.3 Implementar `calcularAssimetria(forcaD, forcaE)` retornando percentual e lado mais forte
- [x] 3.4 Implementar `classificarAssimetria(percentual)` (Leve ≤10, Moderada >10 e ≤15, Alta >15 e ≤20, Muito alta >20)
- [x] 3.5 Implementar `calcularZonasTreino(umRM)` (Resistência 40%, Hipertrofia 60–80%, Força 80–90%, Potência 45–60%, Velocidade 30%)
- [x] 3.6 Implementar `calcularRelacaoMuscular(forcaA, forcaB)` (razão direta em kgf)
- [x] 3.7 Validar manualmente contra os números de referência: kneeExt D=38,22kgf → torque≈149,9 N·m, 1RM≈30,58kg; hipAbd D=16,40kgf vs E=10,47kgf → assimetria≈36%, "Alta" — conferido via script node, bate exatamente

## 4. Dados mockados (lib/mockData.ts)

- [x] 4.1 Criar 3 clientes fictícios (nome, idade, peso, altura) — Marina Duarte, Carla Nogueira, Paula Reis (mesmos dados do protótipo de referência)
- [x] 4.2 Criar 2–3 avaliações por cliente, com datas espaçadas e evolução de assimetria visível — Marina (2) e Carla (2) com evolução visível; Paula sem avaliação, para cobrir o estado vazio
- [x] 4.3 Definir coeficientes/braços padrão por movimento (kneeExt 0.40/0.80, kneeFlex 0.40/0.81, hipAbd 0.50/0.84, shoulderIR 0.25/0.87, shoulderER 0.25/0.91)

## 5. Persistência (lib/storage.ts)

- [x] 5.1 Implementar leitura/escrita isolada em localStorage (nenhum componente acessa localStorage diretamente)
- [x] 5.2 Implementar seed automático a partir do mock no primeiro carregamento
- [x] 5.3 Implementar funções de CRUD: criar aluna, criar avaliação, ler/editar configurações de movimento
- [x] 5.4 Implementar "restaurar padrão" (reseta apenas os campos de configuração para os valores originais)
- [x] 5.5 Implementar "restaurar dados de exemplo" (substitui todo o estado persistido pelo mock original)

## 6. Autenticação mock

- [x] 6.1 Implementar módulo de sessão mock (perfil selecionado, persistido via storage), com comentário explícito no código de que não é autenticação real
- [x] 6.2 Página de seleção de perfil (`/`): card "Entrar como Bárbara" + lista de alunas mock
- [x] 6.3 Restaurar sessão automaticamente ao recarregar; ação "Trocar perfil" limpando a sessão

## 7. Componentes compartilhados

- [x] 7.1 Componente de balança D/E (barras divergentes de eixo central, largura proporcional ao lado mais fraco)
- [x] 7.2 Componente de badge de classificação de assimetria (cores status-leve/moderada/alta/muito-alta)
- [x] 7.3 Componente de card de movimento (balança + tabela força/torque/1RM + badge + zonas de treino em `<details>`/collapsible)
- [x] 7.4 Componente de resumo da avaliação (maior assimetria, movimentos equilibrados, relações musculares)
- [x] 7.5 Componente de visão de avaliação completa, combinando 7.3 e 7.4 — cada página compõe seu próprio cabeçalho acima (reutilizável entre rotas)

## 8. Área da Bárbara

- [x] 8.1 Painel (`/painel`): lista de alunas com badge de acompanhamento, última avaliação, ações "Nova avaliação"/"Ver perfil"
- [x] 8.2 Cadastro de nova aluna (`/alunas/nova`): formulário nome/idade/peso/altura
- [x] 8.3 Nova avaliação (`/avaliar/:clienteId`): formulário de data + força D/E dos 5 movimentos, agrupado por região corporal
- [x] 8.4 Resultado da avaliação (`/avaliacao/:avaliacaoId`): visão de avaliação completa (item 7.5)
- [x] 8.5 Perfil da aluna (`/alunas/:clienteId`): histórico de avaliações (linkando para 8.4) + gráfico de evolução da assimetria (recharts, linhas de referência em 10/15/20%)
- [x] 8.6 Configurações (`/configuracoes`): formulário de coeficiente/braço por movimento, ação "Restaurar padrão" e card "Restaurar dados de exemplo"

## 9. Área da aluna

- [x] 9.1 Dashboard da aluna (`/aluna/:clienteId`): visão de avaliação completa (item 7.5) somente leitura, com a avaliação mais recente
- [x] 9.2 Estado vazio para aluna sem avaliação registrada

## 10. Roteamento e navegação

- [x] 10.1 Configurar `react-router-dom` com as 8 rotas mapeadas
- [x] 10.2 Header com "Trocar perfil" nas áreas autenticadas

## 11. Verificação final

- [x] 11.1 `npm run build` sem erros de TypeScript e zero warnings de lint — `npm run build` e `npm run lint` limpos
- [x] 11.2 Navegação completa manual: seleção de perfil → Bárbara vê painel → cria avaliação → vê resultado calculado → aluna vê seu próprio dashboard — verificado via Playwright headless (dev server + navegação real, screenshots em `shots/`); números batem com os valores de referência (torque 149,9 N·m, 1RM 30,6 kg)
- [x] 11.3 Conferir que nenhum componente React contém lógica de cálculo inline — grep em `src/components` e `src/pages` confirma zero ocorrências de fórmulas fora de `lib/calculations.ts`
- [x] 11.4 Conferir persistência: criar avaliação, recarregar página, avaliação continua no histórico — confirmado (reload na tela de resultado mantém a avaliação; histórico da aluna passa a ter o novo item)
- [x] 11.5 Conferir "restaurar dados de exemplo" volta ao estado inicial de 3 clientes — confirmado via Playwright

**Nota:** o exemplo do brief original "Abdução de quadril D=16,40kgf vs E=10,47kgf → Assimetria≈36%, classificação 'Alta'" é inconsistente com a própria tabela de classificação do brief (>20% = "Muito alta"; 36,16% cai nessa faixa). A implementação segue a tabela de classificação (fonte mais específica e também compatível com os tokens `status-muito-alta` do protótipo de referência), então esse caso exibe "Muito alta", não "Alta". Sinalizado para o usuário — não corrigido silenciosamente.
