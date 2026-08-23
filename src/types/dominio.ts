export type Movimento =
  | "kneeExt"
  | "kneeFlex"
  | "hipAbd"
  | "shoulderIR"
  | "shoulderER"
  | "shoulderAbd"
  | "shoulderFlex"
  | "elbowFlex"
  | "elbowExt"
  | "wristFlex"
  | "wristExt"
  | "hipIR"
  | "hipER"
  | "hipFlex"
  | "hipExt"
  | "ankleDF"
  | "ankleEv"

export type Lado = "D" | "E"

export type RegiaoCorporal = "Joelho" | "Quadril" | "Ombro" | "Cotovelo" | "Punho" | "Tornozelo"

export interface MovimentoInfo {
  id: Movimento
  nome: string
  regiao: RegiaoCorporal
}

/** 17 grupos do protocolo padronizado de Morin et al. (2023). */
export const MOVIMENTOS: readonly MovimentoInfo[] = [
  { id: "shoulderAbd", nome: "Abdução de ombro", regiao: "Ombro" },
  { id: "shoulderIR", nome: "Rotação interna de ombro", regiao: "Ombro" },
  { id: "shoulderER", nome: "Rotação externa de ombro", regiao: "Ombro" },
  { id: "shoulderFlex", nome: "Flexão de ombro", regiao: "Ombro" },
  { id: "elbowFlex", nome: "Flexão de cotovelo", regiao: "Cotovelo" },
  { id: "elbowExt", nome: "Extensão de cotovelo", regiao: "Cotovelo" },
  { id: "wristFlex", nome: "Flexão de punho", regiao: "Punho" },
  { id: "wristExt", nome: "Extensão de punho", regiao: "Punho" },
  { id: "hipAbd", nome: "Abdução de quadril", regiao: "Quadril" },
  { id: "hipIR", nome: "Rotação interna de quadril", regiao: "Quadril" },
  { id: "hipER", nome: "Rotação externa de quadril", regiao: "Quadril" },
  { id: "hipFlex", nome: "Flexão de quadril", regiao: "Quadril" },
  { id: "hipExt", nome: "Extensão de quadril", regiao: "Quadril" },
  { id: "kneeFlex", nome: "Flexão de joelho", regiao: "Joelho" },
  { id: "kneeExt", nome: "Extensão de joelho", regiao: "Joelho" },
  { id: "ankleDF", nome: "Dorsiflexão de tornozelo", regiao: "Tornozelo" },
  { id: "ankleEv", nome: "Eversão de tornozelo", regiao: "Tornozelo" },
] as const

export function obterInfoMovimento(movimento: Movimento): MovimentoInfo {
  const info = MOVIMENTOS.find((m) => m.id === movimento)
  if (!info) throw new Error(`Movimento desconhecido: ${movimento}`)
  return info
}

export interface Cliente {
  id: string
  nome: string
  idade: number
  peso: number
  altura: number
}

export interface Medicao {
  movimento: Movimento
  lado: Lado
  forcaKgf: number
}

export interface Avaliacao {
  id: string
  clienteId: string
  data: string
  medicoes: Medicao[]
}

export interface ConfigMovimento {
  bracoAlavanca: number
  coeficiente1RM: number
}

export type ConfigMovimentos = Record<Movimento, ConfigMovimento>

export interface Protocolo {
  id: string
  nome: string
  movimentos: Movimento[]
  tempoEstimadoMin: number
}

export interface RegistroEvolucao {
  id: string
  clienteId: string
  data: string
  texto: string
}

/** Espelha as chaves de `Muscle` de react-body-highlighter, usadas por `DiagramaCorporal`. */
export type RegiaoDor =
  | "trapezius"
  | "upper-back"
  | "lower-back"
  | "chest"
  | "biceps"
  | "triceps"
  | "forearm"
  | "back-deltoids"
  | "front-deltoids"
  | "abs"
  | "obliques"
  | "adductor"
  | "hamstring"
  | "quadriceps"
  | "abductors"
  | "calves"
  | "gluteal"
  | "head"
  | "neck"
  | "knees"
  | "left-soleus"
  | "right-soleus"

export const NOMES_REGIAO_DOR: Record<RegiaoDor, string> = {
  trapezius: "Trapézio",
  "upper-back": "Costas (superior)",
  "lower-back": "Lombar",
  chest: "Peito",
  biceps: "Bíceps",
  triceps: "Tríceps",
  forearm: "Antebraço",
  "back-deltoids": "Ombro (posterior)",
  "front-deltoids": "Ombro (anterior)",
  abs: "Abdômen",
  obliques: "Oblíquos",
  adductor: "Adutores",
  hamstring: "Posterior de coxa",
  quadriceps: "Quadríceps",
  abductors: "Abdutores/Quadril",
  calves: "Panturrilha",
  gluteal: "Glúteos",
  head: "Cabeça",
  neck: "Pescoço",
  knees: "Joelho",
  "left-soleus": "Sóleo (esquerdo)",
  "right-soleus": "Sóleo (direito)",
}

export interface PontoDor {
  regiao: RegiaoDor
  eva: number
}

export interface RegistroDor {
  id: string
  clienteId: string
  data: string
  pontos: PontoDor[]
}

export interface RegistroAnamnese {
  id: string
  clienteId: string
  data: string
  queixaPrincipal?: string
  historicoSaude?: string
  objetivos?: string
  observacoes?: string
}

/** Os 8 domínios padronizados do RAND-36 (ver design.md — nome técnico interno `sf36`). */
export type DominioSF36 =
  | "capacidadeFuncional"
  | "limitacaoAspectosFisicos"
  | "dor"
  | "estadoGeralSaude"
  | "vitalidade"
  | "aspectosSociais"
  | "limitacaoAspectosEmocionais"
  | "saudeMental"

export interface DominioSF36Info {
  chave: DominioSF36
  nome: string
}

export const DOMINIOS_SF36: readonly DominioSF36Info[] = [
  { chave: "capacidadeFuncional", nome: "Capacidade funcional" },
  { chave: "limitacaoAspectosFisicos", nome: "Limitação por aspectos físicos" },
  { chave: "dor", nome: "Dor" },
  { chave: "estadoGeralSaude", nome: "Estado geral de saúde" },
  { chave: "vitalidade", nome: "Vitalidade" },
  { chave: "aspectosSociais", nome: "Aspectos sociais" },
  { chave: "limitacaoAspectosEmocionais", nome: "Limitação por aspectos emocionais" },
  { chave: "saudeMental", nome: "Saúde mental" },
] as const

export function obterInfoDominioSF36(dominio: DominioSF36): DominioSF36Info {
  const info = DOMINIOS_SF36.find((d) => d.chave === dominio)
  if (!info) throw new Error(`Domínio SF-36 desconhecido: ${dominio}`)
  return info
}

export interface ItemSF36 {
  /** Posição em `RegistroSF36.respostas` (0–35). */
  indice: number
  /** `null` para o item de transição (comparação com o ano anterior), que não entra no cálculo dos domínios. */
  dominio: DominioSF36 | null
  texto: string
  opcoes: readonly string[]
  /** Pontuação 0–100 correspondente a cada opção (mesma ordem de `opcoes`) — fórmula pública do RAND-36. */
  recodificacao: readonly number[]
}

const ESCALA_LIMITACAO = ["Sim, limita muito", "Sim, limita um pouco", "Não, não limita de forma alguma"] as const
const RECODE_LIMITACAO = [0, 50, 100] as const

const ESCALA_SIM_NAO = ["Sim", "Não"] as const
const RECODE_SIM_NAO = [0, 100] as const

const ESCALA_INTENSIDADE_5 = ["De forma alguma", "Um pouco", "Moderadamente", "Bastante", "Extremamente"] as const
const RECODE_INTENSIDADE_5 = [100, 75, 50, 25, 0] as const

const ESCALA_FREQUENCIA_6 = [
  "Todo o tempo",
  "A maior parte do tempo",
  "Uma boa parte do tempo",
  "Alguma parte do tempo",
  "Uma pequena parte do tempo",
  "Nunca",
] as const
const RECODE_FREQUENCIA_6_POSITIVA = [100, 80, 60, 40, 20, 0] as const
const RECODE_FREQUENCIA_6_NEGATIVA = [0, 20, 40, 60, 80, 100] as const

const ESCALA_TEMPO_5 = [
  "Todo o tempo",
  "A maior parte do tempo",
  "Alguma parte do tempo",
  "Uma pequena parte do tempo",
  "Nenhuma parte do tempo",
] as const
const RECODE_TEMPO_5 = [0, 25, 50, 75, 100] as const

const ESCALA_VERDADE_5 = [
  "Definitivamente verdadeiro",
  "Em geral verdadeiro",
  "Não sei",
  "Em geral falso",
  "Definitivamente falso",
] as const
const RECODE_VERDADE_5_POSITIVA = [100, 75, 50, 25, 0] as const
const RECODE_VERDADE_5_NEGATIVA = [0, 25, 50, 75, 100] as const

const ESCALA_SAUDE_5 = ["Excelente", "Muito boa", "Boa", "Ruim", "Muito ruim"] as const
const RECODE_SAUDE_5 = [100, 75, 50, 25, 0] as const

const ESCALA_DOR_6 = ["Nenhuma", "Muito leve", "Leve", "Moderada", "Intensa", "Muito intensa"] as const
const RECODE_DOR_6 = [100, 80, 60, 40, 20, 0] as const

const ESCALA_COMPARACAO_5 = [
  "Muito melhor do que há um ano",
  "Um pouco melhor do que há um ano",
  "Aproximadamente igual a há um ano",
  "Um pouco pior do que há um ano",
  "Muito pior do que há um ano",
] as const

/** Os 36 itens do RAND-36, na ordem armazenada em `RegistroSF36.respostas` (ver design.md). */
export const ITENS_SF36: readonly ItemSF36[] = [
  {
    indice: 0,
    dominio: "estadoGeralSaude",
    texto: "Em geral, você diria que sua saúde é:",
    opcoes: ESCALA_SAUDE_5,
    recodificacao: RECODE_SAUDE_5,
  },
  {
    indice: 1,
    dominio: null,
    texto: "Comparada a um ano atrás, como você classificaria sua saúde em geral, agora?",
    opcoes: ESCALA_COMPARACAO_5,
    recodificacao: RECODE_SAUDE_5,
  },
  {
    indice: 2,
    dominio: "capacidadeFuncional",
    texto: "Atividades vigorosas, como correr, levantar objetos pesados, participar de esportes intensos",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 3,
    dominio: "capacidadeFuncional",
    texto: "Atividades moderadas, como mover uma mesa, usar aspirador de pó, jogar boliche",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 4,
    dominio: "capacidadeFuncional",
    texto: "Levantar ou carregar as compras do mercado",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 5,
    dominio: "capacidadeFuncional",
    texto: "Subir vários lances de escada",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 6,
    dominio: "capacidadeFuncional",
    texto: "Subir um lance de escada",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 7,
    dominio: "capacidadeFuncional",
    texto: "Curvar-se, ajoelhar-se ou dobrar-se",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 8,
    dominio: "capacidadeFuncional",
    texto: "Andar mais de 1 quilômetro",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 9,
    dominio: "capacidadeFuncional",
    texto: "Andar vários quarteirões",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 10,
    dominio: "capacidadeFuncional",
    texto: "Andar um quarteirão",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 11,
    dominio: "capacidadeFuncional",
    texto: "Tomar banho ou vestir-se sozinha",
    opcoes: ESCALA_LIMITACAO,
    recodificacao: RECODE_LIMITACAO,
  },
  {
    indice: 12,
    dominio: "limitacaoAspectosFisicos",
    texto: "Reduziu o tempo dedicado ao trabalho ou a outras atividades",
    opcoes: ESCALA_SIM_NAO,
    recodificacao: RECODE_SIM_NAO,
  },
  {
    indice: 13,
    dominio: "limitacaoAspectosFisicos",
    texto: "Realizou menos do que gostaria",
    opcoes: ESCALA_SIM_NAO,
    recodificacao: RECODE_SIM_NAO,
  },
  {
    indice: 14,
    dominio: "limitacaoAspectosFisicos",
    texto: "Ficou limitada quanto ao tipo de trabalho ou outras atividades",
    opcoes: ESCALA_SIM_NAO,
    recodificacao: RECODE_SIM_NAO,
  },
  {
    indice: 15,
    dominio: "limitacaoAspectosFisicos",
    texto: "Teve dificuldade para realizar o trabalho ou outras atividades (por exemplo, precisou de um esforço extra)",
    opcoes: ESCALA_SIM_NAO,
    recodificacao: RECODE_SIM_NAO,
  },
  {
    indice: 16,
    dominio: "limitacaoAspectosEmocionais",
    texto: "Reduziu o tempo dedicado ao trabalho ou a outras atividades",
    opcoes: ESCALA_SIM_NAO,
    recodificacao: RECODE_SIM_NAO,
  },
  {
    indice: 17,
    dominio: "limitacaoAspectosEmocionais",
    texto: "Realizou menos do que gostaria",
    opcoes: ESCALA_SIM_NAO,
    recodificacao: RECODE_SIM_NAO,
  },
  {
    indice: 18,
    dominio: "limitacaoAspectosEmocionais",
    texto: "Fez o trabalho ou as atividades com menos cuidado do que o habitual",
    opcoes: ESCALA_SIM_NAO,
    recodificacao: RECODE_SIM_NAO,
  },
  {
    indice: 19,
    dominio: "aspectosSociais",
    texto:
      "Durante as últimas 4 semanas, em que medida sua saúde física ou problemas emocionais interferiram nas suas atividades sociais normais, em relação à família, amigos, vizinhos ou grupos?",
    opcoes: ESCALA_INTENSIDADE_5,
    recodificacao: RECODE_INTENSIDADE_5,
  },
  {
    indice: 20,
    dominio: "dor",
    texto: "Quanta dor no corpo você teve durante as últimas 4 semanas?",
    opcoes: ESCALA_DOR_6,
    recodificacao: RECODE_DOR_6,
  },
  {
    indice: 21,
    dominio: "dor",
    texto:
      "Durante as últimas 4 semanas, o quanto a dor interferiu no seu trabalho normal (incluindo tanto o trabalho fora de casa quanto o trabalho doméstico)?",
    opcoes: ESCALA_INTENSIDADE_5,
    recodificacao: RECODE_INTENSIDADE_5,
  },
  {
    indice: 22,
    dominio: "vitalidade",
    texto: "Sentiu-se cheia de vigor, cheia de vontade, cheia de força?",
    opcoes: ESCALA_FREQUENCIA_6,
    recodificacao: RECODE_FREQUENCIA_6_POSITIVA,
  },
  {
    indice: 23,
    dominio: "saudeMental",
    texto: "Você tem sido uma pessoa muito nervosa?",
    opcoes: ESCALA_FREQUENCIA_6,
    recodificacao: RECODE_FREQUENCIA_6_NEGATIVA,
  },
  {
    indice: 24,
    dominio: "saudeMental",
    texto: "Sentiu-se tão deprimida que nada conseguia animá-la?",
    opcoes: ESCALA_FREQUENCIA_6,
    recodificacao: RECODE_FREQUENCIA_6_NEGATIVA,
  },
  {
    indice: 25,
    dominio: "saudeMental",
    texto: "Sentiu-se calma ou tranquila?",
    opcoes: ESCALA_FREQUENCIA_6,
    recodificacao: RECODE_FREQUENCIA_6_POSITIVA,
  },
  {
    indice: 26,
    dominio: "vitalidade",
    texto: "Você tinha muita energia?",
    opcoes: ESCALA_FREQUENCIA_6,
    recodificacao: RECODE_FREQUENCIA_6_POSITIVA,
  },
  {
    indice: 27,
    dominio: "saudeMental",
    texto: "Sentiu-se desanimada e triste?",
    opcoes: ESCALA_FREQUENCIA_6,
    recodificacao: RECODE_FREQUENCIA_6_NEGATIVA,
  },
  {
    indice: 28,
    dominio: "vitalidade",
    texto: "Sentiu-se esgotada?",
    opcoes: ESCALA_FREQUENCIA_6,
    recodificacao: RECODE_FREQUENCIA_6_NEGATIVA,
  },
  {
    indice: 29,
    dominio: "saudeMental",
    texto: "Você tem sido uma pessoa feliz?",
    opcoes: ESCALA_FREQUENCIA_6,
    recodificacao: RECODE_FREQUENCIA_6_POSITIVA,
  },
  {
    indice: 30,
    dominio: "vitalidade",
    texto: "Sentiu-se cansada?",
    opcoes: ESCALA_FREQUENCIA_6,
    recodificacao: RECODE_FREQUENCIA_6_NEGATIVA,
  },
  {
    indice: 31,
    dominio: "aspectosSociais",
    texto:
      "Durante as últimas 4 semanas, quanto do seu tempo a saúde física ou problemas emocionais interferiram nas suas atividades sociais (como visitar amigos, parentes, etc.)?",
    opcoes: ESCALA_TEMPO_5,
    recodificacao: RECODE_TEMPO_5,
  },
  {
    indice: 32,
    dominio: "estadoGeralSaude",
    texto: "Fico doente um pouco mais facilmente do que outras pessoas",
    opcoes: ESCALA_VERDADE_5,
    recodificacao: RECODE_VERDADE_5_NEGATIVA,
  },
  {
    indice: 33,
    dominio: "estadoGeralSaude",
    texto: "Sou tão saudável quanto qualquer pessoa que conheço",
    opcoes: ESCALA_VERDADE_5,
    recodificacao: RECODE_VERDADE_5_POSITIVA,
  },
  {
    indice: 34,
    dominio: "estadoGeralSaude",
    texto: "Acho que a minha saúde vai piorar",
    opcoes: ESCALA_VERDADE_5,
    recodificacao: RECODE_VERDADE_5_NEGATIVA,
  },
  {
    indice: 35,
    dominio: "estadoGeralSaude",
    texto: "Minha saúde é excelente",
    opcoes: ESCALA_VERDADE_5,
    recodificacao: RECODE_VERDADE_5_POSITIVA,
  },
] as const

export interface RegistroSF36 {
  id: string
  clienteId: string
  data: string
  /** 36 respostas, valores 1-based dentro da escala de cada item (ver `ITENS_SF36`). */
  respostas: number[]
}
