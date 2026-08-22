import { CardMovimento } from "@/components/shared/CardMovimento"
import { DiagramaCorporal } from "@/components/shared/DiagramaCorporal"
import { ResumoAvaliacaoCards } from "@/components/shared/ResumoAvaliacaoCards"
import { calcularResumoAvaliacao } from "@/lib/calculations"
import { MOVIMENTOS, type Avaliacao, type ConfigMovimentos } from "@/types/dominio"

interface VisaoAvaliacaoProps {
  avaliacao: Avaliacao
  config: ConfigMovimentos
}

/**
 * Corpo completo do resultado de uma avaliação — reutilizado no resultado da
 * Bárbara e no dashboard da aluna; cada página compõe seu próprio cabeçalho.
 */
export function VisaoAvaliacao({ avaliacao, config }: VisaoAvaliacaoProps) {
  const resumo = calcularResumoAvaliacao(avaliacao.medicoes, config)

  return (
    <div className="space-y-4">
      <DiagramaCorporal resultados={resumo.resultados} />
      <ResumoAvaliacaoCards resumo={resumo} />
      {resumo.resultados.map((resultado, indice) => (
        <CardMovimento key={resultado.movimento} info={MOVIMENTOS[indice]} resultado={resultado} />
      ))}
    </div>
  )
}
