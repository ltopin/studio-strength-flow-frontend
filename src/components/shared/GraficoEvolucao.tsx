import { Line, LineChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { calcularAssimetria, encontrarForca } from "@/lib/calculations"
import { formatarDataCurta } from "@/lib/format"
import { MOVIMENTOS, type Avaliacao } from "@/types/dominio"

const CORES_MOVIMENTO = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"]
const LIMITES_CLASSIFICACAO = [10, 15, 20]

interface GraficoEvolucaoProps {
  /** Avaliações ordenadas cronologicamente, da mais antiga para a mais recente. */
  avaliacoes: Avaliacao[]
}

export function GraficoEvolucao({ avaliacoes }: GraficoEvolucaoProps) {
  const dados = avaliacoes.map((avaliacao) => {
    const ponto: Record<string, number | string> = { data: formatarDataCurta(avaliacao.data) }
    for (const info of MOVIMENTOS) {
      const forcaD = encontrarForca(avaliacao.medicoes, info.id, "D")
      const forcaE = encontrarForca(avaliacao.medicoes, info.id, "E")
      ponto[info.id] = Number(calcularAssimetria(forcaD, forcaE).percentual.toFixed(1))
    }
    return ponto
  })

  return (
    <div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dados} margin={{ top: 8, right: 28, bottom: 8, left: 0 }}>
            <XAxis dataKey="data" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
            <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} domain={[0, "dataMax + 5"]} />
            {LIMITES_CLASSIFICACAO.map((limite) => (
              <ReferenceLine
                key={limite}
                y={limite}
                stroke="var(--accent)"
                strokeDasharray="3 4"
                label={{ value: `${limite}%`, position: "right", fontSize: 9, fill: "var(--accent)" }}
              />
            ))}
            {MOVIMENTOS.map((info, indice) => (
              <Line
                key={info.id}
                type="monotone"
                dataKey={info.id}
                stroke={CORES_MOVIMENTO[indice]}
                strokeWidth={2.5}
                dot={{ r: 4, stroke: "var(--card)", strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {MOVIMENTOS.map((info, indice) => (
          <li key={info.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: CORES_MOVIMENTO[indice] }} />
            {info.nome}
          </li>
        ))}
      </ul>
    </div>
  )
}
