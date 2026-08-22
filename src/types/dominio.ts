export type Movimento = "kneeExt" | "kneeFlex" | "hipAbd" | "shoulderIR" | "shoulderER"

export type Lado = "D" | "E"

export type RegiaoCorporal = "Joelho" | "Quadril" | "Ombro"

export interface MovimentoInfo {
  id: Movimento
  nome: string
  regiao: RegiaoCorporal
}

export const MOVIMENTOS: readonly MovimentoInfo[] = [
  { id: "kneeExt", nome: "Extensão de joelho", regiao: "Joelho" },
  { id: "kneeFlex", nome: "Flexão de joelho", regiao: "Joelho" },
  { id: "hipAbd", nome: "Abdução de quadril", regiao: "Quadril" },
  { id: "shoulderIR", nome: "Rotação interna de ombro", regiao: "Ombro" },
  { id: "shoulderER", nome: "Rotação externa de ombro", regiao: "Ombro" },
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
