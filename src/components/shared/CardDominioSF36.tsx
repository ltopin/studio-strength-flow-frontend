import { Badge } from "@/components/ui/badge"
import { classificarPontuacaoSF36 } from "@/lib/calculations"
import { formatarNumero } from "@/lib/format"
import type { DominioSF36Info } from "@/types/dominio"

interface CardDominioSF36Props {
  info: DominioSF36Info
  pontuacao: number
}

export function CardDominioSF36({ info, pontuacao }: CardDominioSF36Props) {
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs text-muted-foreground">{info.nome}</p>
        <Badge variant={classificarPontuacaoSF36(pontuacao)}>{formatarNumero(pontuacao, 0)}</Badge>
      </div>
      <p className="mt-1 font-mono text-xl font-semibold tabular-nums">
        {formatarNumero(pontuacao, 0)}
        <span className="text-sm text-muted-foreground">/100</span>
      </p>
    </div>
  )
}
