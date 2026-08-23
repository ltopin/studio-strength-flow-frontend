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
