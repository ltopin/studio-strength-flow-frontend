import Model, { type IExerciseData, type IMuscleStats, type Muscle } from "react-body-highlighter"

import { BadgeAssimetria } from "@/components/shared/BadgeAssimetria"
import { Badge } from "@/components/ui/badge"
import { classificarEva, type ClassificacaoAssimetria, type ResultadoMovimento, type SeveridadeEva } from "@/lib/calculations"
import { NOMES_REGIAO_DOR, obterInfoMovimento, type Movimento, type PontoDor, type RegiaoDor } from "@/types/dominio"

interface RegiaoMuscular {
  musculo: Muscle
  vista: "anterior" | "posterior"
}

/**
 * react-body-highlighter só tem ~20 músculos e 1 polígono por músculo (a
 * frequência soma por chave de músculo, ignorando vista). Ela não cobre
 * cotovelo, punho, rotadores/flexores/extensores de quadril nem tornozelo
 * especificamente, então vários dos 17 movimentos do protocolo dividem o
 * mesmo polígono (ex.: hipIR/hipAbd → abductors; hipER/hipExt → gluteal;
 * wristFlex/wristExt → forearm; ankleDF → calves, ankleEv → left-soleus como
 * aproximações — a lib não tem tibial anterior nem fibulares). Quando isso
 * acontece, `DiagramaCorporal` só manda para o `data` do músculo o resultado
 * de classificação mais alta (ver `maisRelevantePorMusculo` abaixo); os
 * demais continuam aparecendo com o badge real na lista abaixo do corpo.
 */
const REGIAO_POR_MOVIMENTO: Record<Movimento, RegiaoMuscular> = {
  kneeExt: { musculo: "quadriceps", vista: "anterior" },
  kneeFlex: { musculo: "hamstring", vista: "posterior" },
  hipAbd: { musculo: "abductors", vista: "anterior" },
  hipIR: { musculo: "abductors", vista: "anterior" },
  hipER: { musculo: "gluteal", vista: "posterior" },
  hipFlex: { musculo: "quadriceps", vista: "anterior" },
  hipExt: { musculo: "gluteal", vista: "posterior" },
  shoulderIR: { musculo: "front-deltoids", vista: "anterior" },
  shoulderER: { musculo: "back-deltoids", vista: "posterior" },
  shoulderAbd: { musculo: "front-deltoids", vista: "anterior" },
  shoulderFlex: { musculo: "chest", vista: "anterior" },
  elbowFlex: { musculo: "biceps", vista: "anterior" },
  elbowExt: { musculo: "triceps", vista: "posterior" },
  wristFlex: { musculo: "forearm", vista: "anterior" },
  wristExt: { musculo: "forearm", vista: "posterior" },
  ankleDF: { musculo: "calves", vista: "anterior" },
  ankleEv: { musculo: "left-soleus", vista: "posterior" },
}

/** Índice (1-based) de `CORES_POR_TIER` — não é frequência de uso real. */
const FREQUENCIA_POR_CLASSIFICACAO: Record<ClassificacaoAssimetria, number> = {
  Leve: 1,
  Moderada: 2,
  Alta: 3,
  "Muito alta": 4,
}

const CORES_POR_TIER = [
  "var(--status-leve)",
  "var(--status-moderada)",
  "var(--status-alta)",
  "var(--status-muito-alta)",
]

const FREQUENCIA_POR_SEVERIDADE_EVA: Record<SeveridadeEva, number> = {
  leve: 1,
  moderada: 2,
  alta: 3,
  "muito-alta": 4,
}

interface DiagramaCorporalProps {
  resultados?: ResultadoMovimento[]
  pontosDor?: PontoDor[]
  onRegiaoClick?: (regiao: RegiaoDor) => void
}

/**
 * Quando dois movimentos caem no mesmo músculo da lib (ver comentário acima de
 * REGIAO_POR_MOVIMENTO), só o de classificação de assimetria mais alta pinta o
 * polígono — evita que a soma de frequência da lib misture os dois resultados.
 */
function selecionarResultadoPorMusculo(resultados: ResultadoMovimento[]): Set<Movimento> {
  const maisRelevantePorMusculo = new Map<Muscle, ResultadoMovimento>()

  for (const resultado of resultados) {
    const { musculo } = REGIAO_POR_MOVIMENTO[resultado.movimento]
    const atual = maisRelevantePorMusculo.get(musculo)
    const superaAtual =
      !atual || FREQUENCIA_POR_CLASSIFICACAO[resultado.classificacao] > FREQUENCIA_POR_CLASSIFICACAO[atual.classificacao]

    if (superaAtual) maisRelevantePorMusculo.set(musculo, resultado)
  }

  return new Set([...maisRelevantePorMusculo.values()].map((resultado) => resultado.movimento))
}

export function DiagramaCorporal({ resultados = [], pontosDor = [], onRegiaoClick }: DiagramaCorporalProps) {
  const movimentosSelecionados = selecionarResultadoPorMusculo(resultados)

  const dataResultados: IExerciseData[] = resultados
    .filter((resultado) => movimentosSelecionados.has(resultado.movimento))
    .map((resultado) => ({
      name: obterInfoMovimento(resultado.movimento).nome,
      muscles: [REGIAO_POR_MOVIMENTO[resultado.movimento].musculo],
      frequency: FREQUENCIA_POR_CLASSIFICACAO[resultado.classificacao],
    }))

  const dataPontosDor: IExerciseData[] = pontosDor.map((ponto) => ({
    name: NOMES_REGIAO_DOR[ponto.regiao],
    muscles: [ponto.regiao as Muscle],
    frequency: FREQUENCIA_POR_SEVERIDADE_EVA[classificarEva(ponto.eva)],
  }))

  const data = [...dataResultados, ...dataPontosDor]

  function aoClicarMusculo({ muscle }: IMuscleStats) {
    onRegiaoClick?.(muscle as RegiaoDor)
  }

  return (
    <section className="card p-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="mx-auto w-full max-w-[180px]">
          <p className="mb-1 text-center text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Frontal
          </p>
          <Model
            type="anterior"
            data={data}
            bodyColor="var(--secondary)"
            highlightedColors={CORES_POR_TIER}
            onClick={onRegiaoClick ? aoClicarMusculo : undefined}
          />
        </div>
        <div className="mx-auto w-full max-w-[180px]">
          <p className="mb-1 text-center text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Posterior
          </p>
          <Model
            type="posterior"
            data={data}
            bodyColor="var(--secondary)"
            highlightedColors={CORES_POR_TIER}
            onClick={onRegiaoClick ? aoClicarMusculo : undefined}
          />
        </div>
      </div>

      {resultados.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 gap-1.5 border-t border-border pt-4 sm:grid-cols-2">
          {resultados.map((resultado) => (
            <li key={resultado.movimento} className="flex items-center justify-between gap-2 text-xs">
              <span className="text-muted-foreground">{obterInfoMovimento(resultado.movimento).nome}</span>
              <BadgeAssimetria classificacao={resultado.classificacao} />
            </li>
          ))}
        </ul>
      )}

      {pontosDor.length > 0 && (
        <ul className="mt-4 grid grid-cols-1 gap-1.5 border-t border-border pt-4 sm:grid-cols-2">
          {pontosDor.map((ponto, indice) => (
            <li key={`${ponto.regiao}-${indice}`} className="flex items-center justify-between gap-2 text-xs">
              <span className="text-muted-foreground">{NOMES_REGIAO_DOR[ponto.regiao]}</span>
              <Badge variant={classificarEva(ponto.eva)}>EVA {ponto.eva}</Badge>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
