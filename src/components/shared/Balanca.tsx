import { calcularLarguraBalanca } from "@/lib/calculations"
import { formatarNumero } from "@/lib/format"

interface BalancaProps {
  forcaE: number
  forcaD: number
}

export function Balanca({ forcaE, forcaD }: BalancaProps) {
  const maior = Math.max(forcaE, forcaD)
  const larguraE = calcularLarguraBalanca(forcaE, maior)
  const larguraD = calcularLarguraBalanca(forcaD, maior)

  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        <span>E · esquerdo</span>
        <span>D · direito</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-14 text-right font-mono text-sm font-medium tabular-nums">{formatarNumero(forcaE)}</span>
        <div className="relative flex h-4 flex-1">
          <div className="flex w-1/2 justify-end overflow-hidden rounded-l-full bg-secondary">
            <div
              className="h-full rounded-l-full bg-primary transition-all duration-500"
              style={{ width: `${larguraE}%` }}
            />
          </div>
          <div className="w-1/2 overflow-hidden rounded-r-full bg-secondary">
            <div
              className="h-full rounded-r-full bg-accent transition-all duration-500"
              style={{ width: `${larguraD}%` }}
            />
          </div>
          <div className="absolute top-1/2 left-1/2 h-6 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/60" />
        </div>
        <span className="w-14 font-mono text-sm font-medium tabular-nums">{formatarNumero(forcaD)}</span>
      </div>
      <p className="mt-1 text-center text-[11px] text-muted-foreground">Força em kgf</p>
    </div>
  )
}
