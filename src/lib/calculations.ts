import {
  DOMINIOS_SF36,
  ITENS_SF36,
  MOVIMENTOS,
  type ConfigMovimento,
  type ConfigMovimentos,
  type DominioSF36,
  type Lado,
  type Medicao,
  type Movimento,
} from "@/types/dominio"

/** Aceleração da gravidade padrão (m/s²), usada para converter kgf em torque. */
const GRAVIDADE = 9.80665

export function calcularTorque(forcaKgf: number, bracoAlavanca: number): number {
  return forcaKgf * GRAVIDADE * bracoAlavanca
}

export function calcular1RM(forcaKgf: number, coeficiente1RM: number): number {
  return forcaKgf * coeficiente1RM
}

export interface ResultadoAssimetria {
  percentual: number
  ladoMaisForte: Lado | null
}

export function calcularAssimetria(forcaD: number, forcaE: number): ResultadoAssimetria {
  const maior = Math.max(forcaD, forcaE)
  const menor = Math.min(forcaD, forcaE)

  if (maior === 0) {
    return { percentual: 0, ladoMaisForte: null }
  }

  const percentual = ((maior - menor) / maior) * 100
  const ladoMaisForte: Lado | null = forcaD === forcaE ? null : forcaD > forcaE ? "D" : "E"

  return { percentual, ladoMaisForte }
}

export type ClassificacaoAssimetria = "Leve" | "Moderada" | "Alta" | "Muito alta"

/** Limites inclusivos na extremidade inferior de cada faixa (ex.: 10% conta como Leve). */
export function classificarAssimetria(percentual: number): ClassificacaoAssimetria {
  if (percentual <= 10) return "Leve"
  if (percentual <= 15) return "Moderada"
  if (percentual <= 20) return "Alta"
  return "Muito alta"
}

export type SeveridadeEva = "leve" | "moderada" | "alta" | "muito-alta"

/** Faixas inspiradas na escala EVA de dor (0–10), no mesmo padrão visual de `ClassificacaoAssimetria`. */
export function classificarEva(eva: number): SeveridadeEva {
  if (eva <= 3) return "leve"
  if (eva <= 6) return "moderada"
  if (eva <= 8) return "alta"
  return "muito-alta"
}

export interface ZonaTreinoCalculada {
  nome: string
  percentualLabel: string
  min: number
  max: number
}

const ZONAS_TREINO_PERCENTUAIS: ReadonlyArray<{ nome: string; min: number; max: number }> = [
  { nome: "Resistência", min: 0.4, max: 0.4 },
  { nome: "Hipertrofia", min: 0.6, max: 0.8 },
  { nome: "Força máxima", min: 0.8, max: 0.9 },
  { nome: "Potência", min: 0.45, max: 0.6 },
  { nome: "Velocidade", min: 0.3, max: 0.3 },
]

export function calcularZonasTreino(umRM: number): ZonaTreinoCalculada[] {
  return ZONAS_TREINO_PERCENTUAIS.map((zona) => ({
    nome: zona.nome,
    percentualLabel:
      zona.min === zona.max
        ? `${Math.round(zona.min * 100)}%`
        : `${Math.round(zona.min * 100)}–${Math.round(zona.max * 100)}%`,
    min: umRM * zona.min,
    max: umRM * zona.max,
  }))
}

/** Razão direta entre forças em kgf (não entre 1RM), ex.: flexão/extensão de joelho. */
export function calcularRelacaoMuscular(forcaNumerador: number, forcaDenominador: number): number {
  if (forcaDenominador === 0) return 0
  return forcaNumerador / forcaDenominador
}

/** Largura (%) da barra de um lado no componente de balança, relativa ao lado mais forte. */
export function calcularLarguraBalanca(forcaLado: number, forcaMaior: number): number {
  if (forcaMaior === 0) return 0
  return (forcaLado / forcaMaior) * 100
}

export function encontrarForca(medicoes: Medicao[], movimento: Movimento, lado: Lado): number {
  return medicoes.find((m) => m.movimento === movimento && m.lado === lado)?.forcaKgf ?? 0
}

export interface ResultadoMovimento {
  movimento: Movimento
  forcaD: number
  forcaE: number
  torqueD: number
  torqueE: number
  umRMD: number
  umRME: number
  assimetria: ResultadoAssimetria
  classificacao: ClassificacaoAssimetria
  zonasD: ZonaTreinoCalculada[]
  zonasE: ZonaTreinoCalculada[]
}

export function calcularResultadoMovimento(
  movimento: Movimento,
  medicoes: Medicao[],
  config: ConfigMovimento
): ResultadoMovimento {
  const forcaD = encontrarForca(medicoes, movimento, "D")
  const forcaE = encontrarForca(medicoes, movimento, "E")
  const torqueD = calcularTorque(forcaD, config.bracoAlavanca)
  const torqueE = calcularTorque(forcaE, config.bracoAlavanca)
  const umRMD = calcular1RM(forcaD, config.coeficiente1RM)
  const umRME = calcular1RM(forcaE, config.coeficiente1RM)
  const assimetria = calcularAssimetria(forcaD, forcaE)

  return {
    movimento,
    forcaD,
    forcaE,
    torqueD,
    torqueE,
    umRMD,
    umRME,
    assimetria,
    classificacao: classificarAssimetria(assimetria.percentual),
    zonasD: calcularZonasTreino(umRMD),
    zonasE: calcularZonasTreino(umRME),
  }
}

export interface RelacaoMuscular {
  nome: string
  valorD: number
  valorE: number
}

export function calcularRelacoesMusculares(medicoes: Medicao[]): RelacaoMuscular[] {
  return [
    {
      nome: "Flexão/Extensão joelho",
      valorD: calcularRelacaoMuscular(
        encontrarForca(medicoes, "kneeFlex", "D"),
        encontrarForca(medicoes, "kneeExt", "D")
      ),
      valorE: calcularRelacaoMuscular(
        encontrarForca(medicoes, "kneeFlex", "E"),
        encontrarForca(medicoes, "kneeExt", "E")
      ),
    },
    {
      nome: "Rot. ext/int ombro",
      valorD: calcularRelacaoMuscular(
        encontrarForca(medicoes, "shoulderER", "D"),
        encontrarForca(medicoes, "shoulderIR", "D")
      ),
      valorE: calcularRelacaoMuscular(
        encontrarForca(medicoes, "shoulderER", "E"),
        encontrarForca(medicoes, "shoulderIR", "E")
      ),
    },
    {
      nome: "Flexão/Extensão cotovelo",
      valorD: calcularRelacaoMuscular(
        encontrarForca(medicoes, "elbowFlex", "D"),
        encontrarForca(medicoes, "elbowExt", "D")
      ),
      valorE: calcularRelacaoMuscular(
        encontrarForca(medicoes, "elbowFlex", "E"),
        encontrarForca(medicoes, "elbowExt", "E")
      ),
    },
    {
      nome: "Flexão/Extensão punho",
      valorD: calcularRelacaoMuscular(
        encontrarForca(medicoes, "wristFlex", "D"),
        encontrarForca(medicoes, "wristExt", "D")
      ),
      valorE: calcularRelacaoMuscular(
        encontrarForca(medicoes, "wristFlex", "E"),
        encontrarForca(medicoes, "wristExt", "E")
      ),
    },
    {
      nome: "Flexão/Extensão quadril",
      valorD: calcularRelacaoMuscular(
        encontrarForca(medicoes, "hipFlex", "D"),
        encontrarForca(medicoes, "hipExt", "D")
      ),
      valorE: calcularRelacaoMuscular(
        encontrarForca(medicoes, "hipFlex", "E"),
        encontrarForca(medicoes, "hipExt", "E")
      ),
    },
    {
      nome: "Rot. ext/int quadril",
      valorD: calcularRelacaoMuscular(
        encontrarForca(medicoes, "hipER", "D"),
        encontrarForca(medicoes, "hipIR", "D")
      ),
      valorE: calcularRelacaoMuscular(
        encontrarForca(medicoes, "hipER", "E"),
        encontrarForca(medicoes, "hipIR", "E")
      ),
    },
  ]
}

export interface ResumoAvaliacao {
  resultados: ResultadoMovimento[]
  maiorAssimetria: ResultadoMovimento | null
  movimentosEquilibrados: number
  relacoesMusculares: RelacaoMuscular[]
}

export type ResultadoDominiosSF36 = Record<DominioSF36, number>

/** Deriva a pontuação 0–100 de cada um dos 8 domínios do RAND-36 a partir das 36 respostas brutas (ver design.md). */
export function calcularDominiosSF36(respostas: number[]): ResultadoDominiosSF36 {
  const somas = new Map<DominioSF36, number>()
  const contagens = new Map<DominioSF36, number>()

  for (const item of ITENS_SF36) {
    if (!item.dominio) continue
    const resposta = respostas[item.indice]
    const pontuacaoItem = item.recodificacao[resposta - 1] ?? 0
    somas.set(item.dominio, (somas.get(item.dominio) ?? 0) + pontuacaoItem)
    contagens.set(item.dominio, (contagens.get(item.dominio) ?? 0) + 1)
  }

  return Object.fromEntries(
    DOMINIOS_SF36.map((dominio) => [
      dominio.chave,
      (somas.get(dominio.chave) ?? 0) / (contagens.get(dominio.chave) ?? 1),
    ])
  ) as ResultadoDominiosSF36
}

/** Faixas no mesmo padrão visual de `classificarEva`, mas com polaridade invertida: pontuação alta = melhor qualidade de vida. */
export function classificarPontuacaoSF36(pontuacao: number): SeveridadeEva {
  if (pontuacao >= 75) return "leve"
  if (pontuacao >= 50) return "moderada"
  if (pontuacao >= 25) return "alta"
  return "muito-alta"
}

export function calcularResumoAvaliacao(medicoes: Medicao[], config: ConfigMovimentos): ResumoAvaliacao {
  const resultados = MOVIMENTOS.map((info) => calcularResultadoMovimento(info.id, medicoes, config[info.id]))

  const maiorAssimetria = resultados.reduce<ResultadoMovimento | null>((maior, atual) => {
    if (!maior || atual.assimetria.percentual > maior.assimetria.percentual) return atual
    return maior
  }, null)

  const movimentosEquilibrados = resultados.filter((r) => r.assimetria.percentual <= 10).length

  return {
    resultados,
    maiorAssimetria,
    movimentosEquilibrados,
    relacoesMusculares: calcularRelacoesMusculares(medicoes),
  }
}
