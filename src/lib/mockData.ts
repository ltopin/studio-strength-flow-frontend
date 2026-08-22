import type { Avaliacao, Cliente, ConfigMovimentos } from "@/types/dominio"

export const CONFIG_PADRAO: ConfigMovimentos = {
  kneeExt: { bracoAlavanca: 0.4, coeficiente1RM: 0.8 },
  kneeFlex: { bracoAlavanca: 0.4, coeficiente1RM: 0.81 },
  hipAbd: { bracoAlavanca: 0.5, coeficiente1RM: 0.84 },
  shoulderIR: { bracoAlavanca: 0.25, coeficiente1RM: 0.87 },
  shoulderER: { bracoAlavanca: 0.25, coeficiente1RM: 0.91 },
}

export const CLIENTES_MOCK: Cliente[] = [
  { id: "cli-marina", nome: "Marina Duarte", idade: 34, peso: 62, altura: 1.68 },
  { id: "cli-carla", nome: "Carla Nogueira", idade: 45, peso: 70.5, altura: 1.63 },
  { id: "cli-paula", nome: "Paula Reis", idade: 28, peso: 58, altura: 1.7 },
]

export const AVALIACOES_MOCK: Avaliacao[] = [
  {
    id: "ava-marina-1",
    clienteId: "cli-marina",
    data: "2026-06-12",
    medicoes: [
      { movimento: "kneeExt", lado: "E", forcaKgf: 36 },
      { movimento: "kneeExt", lado: "D", forcaKgf: 38 },
      { movimento: "kneeFlex", lado: "E", forcaKgf: 23 },
      { movimento: "kneeFlex", lado: "D", forcaKgf: 24 },
      { movimento: "hipAbd", lado: "E", forcaKgf: 24 },
      { movimento: "hipAbd", lado: "D", forcaKgf: 26 },
      { movimento: "shoulderIR", lado: "E", forcaKgf: 16 },
      { movimento: "shoulderIR", lado: "D", forcaKgf: 18 },
      { movimento: "shoulderER", lado: "E", forcaKgf: 12 },
      { movimento: "shoulderER", lado: "D", forcaKgf: 13 },
    ],
  },
  {
    id: "ava-marina-2",
    clienteId: "cli-marina",
    data: "2026-08-10",
    medicoes: [
      { movimento: "kneeExt", lado: "E", forcaKgf: 40 },
      { movimento: "kneeExt", lado: "D", forcaKgf: 44 },
      { movimento: "kneeFlex", lado: "E", forcaKgf: 25 },
      { movimento: "kneeFlex", lado: "D", forcaKgf: 27 },
      { movimento: "hipAbd", lado: "E", forcaKgf: 26 },
      { movimento: "hipAbd", lado: "D", forcaKgf: 32 },
      { movimento: "shoulderIR", lado: "E", forcaKgf: 17 },
      { movimento: "shoulderIR", lado: "D", forcaKgf: 19 },
      { movimento: "shoulderER", lado: "E", forcaKgf: 13 },
      { movimento: "shoulderER", lado: "D", forcaKgf: 15 },
    ],
  },
  {
    id: "ava-carla-1",
    clienteId: "cli-carla",
    data: "2026-05-25",
    medicoes: [
      { movimento: "kneeExt", lado: "E", forcaKgf: 29 },
      { movimento: "kneeExt", lado: "D", forcaKgf: 33 },
      { movimento: "kneeFlex", lado: "E", forcaKgf: 21 },
      { movimento: "kneeFlex", lado: "D", forcaKgf: 22 },
      { movimento: "hipAbd", lado: "E", forcaKgf: 19 },
      { movimento: "hipAbd", lado: "D", forcaKgf: 21 },
      { movimento: "shoulderIR", lado: "E", forcaKgf: 13 },
      { movimento: "shoulderIR", lado: "D", forcaKgf: 14 },
      { movimento: "shoulderER", lado: "E", forcaKgf: 10 },
      { movimento: "shoulderER", lado: "D", forcaKgf: 11 },
    ],
  },
  {
    id: "ava-carla-2",
    clienteId: "cli-carla",
    data: "2026-08-18",
    medicoes: [
      { movimento: "kneeExt", lado: "E", forcaKgf: 30 },
      { movimento: "kneeExt", lado: "D", forcaKgf: 38 },
      { movimento: "kneeFlex", lado: "E", forcaKgf: 22 },
      { movimento: "kneeFlex", lado: "D", forcaKgf: 24 },
      { movimento: "hipAbd", lado: "E", forcaKgf: 20 },
      { movimento: "hipAbd", lado: "D", forcaKgf: 22 },
      { movimento: "shoulderIR", lado: "E", forcaKgf: 14 },
      { movimento: "shoulderIR", lado: "D", forcaKgf: 15 },
      { movimento: "shoulderER", lado: "E", forcaKgf: 11 },
      { movimento: "shoulderER", lado: "D", forcaKgf: 12 },
    ],
  },
]
