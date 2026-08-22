import Model, { type IExerciseData, type Muscle } from "react-body-highlighter"

import { BadgeAssimetria } from "@/components/shared/BadgeAssimetria"
import type { ClassificacaoAssimetria, ResultadoMovimento } from "@/lib/calculations"
import { obterInfoMovimento, type Movimento } from "@/types/dominio"

interface RegiaoMuscular {
  musculo: Muscle
  vista: "anterior" | "posterior"
}

/**
 * react-body-highlighter só tem um polígono por músculo por vista — `abductors`
 * (usado para abdução de quadril) só existe na vista anterior da biblioteca,
 * não na posterior. Se um movimento futuro precisar reusar um músculo já
 * mapeado aqui, a técnica de frequência abaixo para de funcionar (a frequência
 * dos dois movimentos somaria no mesmo músculo).
 */
const REGIAO_POR_MOVIMENTO: Record<Movimento, RegiaoMuscular> = {
  kneeExt: { musculo: "quadriceps", vista: "anterior" },
  kneeFlex: { musculo: "hamstring", vista: "posterior" },
  hipAbd: { musculo: "abductors", vista: "anterior" },
  shoulderIR: { musculo: "front-deltoids", vista: "anterior" },
  shoulderER: { musculo: "back-deltoids", vista: "posterior" },
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

interface DiagramaCorporalProps {
  resultados: ResultadoMovimento[]
}

export function DiagramaCorporal({ resultados }: DiagramaCorporalProps) {
  const data: IExerciseData[] = resultados.map((resultado) => ({
    name: obterInfoMovimento(resultado.movimento).nome,
    muscles: [REGIAO_POR_MOVIMENTO[resultado.movimento].musculo],
    frequency: FREQUENCIA_POR_CLASSIFICACAO[resultado.classificacao],
  }))

  return (
    <section className="card p-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="mx-auto w-full max-w-[180px]">
          <p className="mb-1 text-center text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Frontal
          </p>
          <Model type="anterior" data={data} bodyColor="var(--secondary)" highlightedColors={CORES_POR_TIER} />
        </div>
        <div className="mx-auto w-full max-w-[180px]">
          <p className="mb-1 text-center text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            Posterior
          </p>
          <Model type="posterior" data={data} bodyColor="var(--secondary)" highlightedColors={CORES_POR_TIER} />
        </div>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-1.5 border-t border-border pt-4 sm:grid-cols-2">
        {resultados.map((resultado) => (
          <li key={resultado.movimento} className="flex items-center justify-between gap-2 text-xs">
            <span className="text-muted-foreground">{obterInfoMovimento(resultado.movimento).nome}</span>
            <BadgeAssimetria classificacao={resultado.classificacao} />
          </li>
        ))}
      </ul>
    </section>
  )
}
