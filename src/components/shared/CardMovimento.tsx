import { Fragment } from "react"
import { ChevronDown } from "lucide-react"

import { Balanca } from "@/components/shared/Balanca"
import { BadgeAssimetria } from "@/components/shared/BadgeAssimetria"
import type { ResultadoMovimento } from "@/lib/calculations"
import { formatarFaixa, formatarNumero } from "@/lib/format"
import type { MovimentoInfo } from "@/types/dominio"

interface CardMovimentoProps {
  info: MovimentoInfo
  resultado: ResultadoMovimento
}

export function CardMovimento({ info, resultado }: CardMovimentoProps) {
  const { assimetria } = resultado

  return (
    <section className="card p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{info.regiao}</p>
          <h3 className="font-display text-lg font-semibold">{info.nome}</h3>
        </div>
        <BadgeAssimetria classificacao={resultado.classificacao} />
      </div>

      <Balanca forcaE={resultado.forcaE} forcaD={resultado.forcaD} />

      <p className="mt-3 text-sm text-muted-foreground">
        Assimetria de{" "}
        <span className="font-mono font-medium text-foreground tabular-nums">
          {formatarNumero(assimetria.percentual)}%
        </span>
        {assimetria.ladoMaisForte && (
          <>
            {" "}
            — lado <span className="font-semibold text-foreground">{assimetria.ladoMaisForte}</span> mais forte
          </>
        )}
      </p>

      <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-1.5 border-t border-border pt-3 text-sm">
        <span />
        <span className="text-right text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">E</span>
        <span className="text-right text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">D</span>

        <span className="text-muted-foreground">Força (kgf)</span>
        <span className="text-right font-mono font-medium tabular-nums">{formatarNumero(resultado.forcaE)}</span>
        <span className="text-right font-mono font-medium tabular-nums">{formatarNumero(resultado.forcaD)}</span>

        <span className="text-muted-foreground">Torque (N·m)</span>
        <span className="text-right font-mono font-medium tabular-nums">{formatarNumero(resultado.torqueE)}</span>
        <span className="text-right font-mono font-medium tabular-nums">{formatarNumero(resultado.torqueD)}</span>

        <span className="text-muted-foreground">1RM estimado (kg)</span>
        <span className="text-right font-mono font-medium tabular-nums">{formatarNumero(resultado.umRME)}</span>
        <span className="text-right font-mono font-medium tabular-nums">{formatarNumero(resultado.umRMD)}</span>
      </div>

      <details className="group mt-4 rounded-xl border border-border bg-secondary/50">
        <summary className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium">
          Zonas de treino (% do 1RM)
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="border-t border-border px-4 py-3">
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-1.5 text-sm">
            <span />
            <span className="text-right text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              E
            </span>
            <span className="text-right text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              D
            </span>
            {resultado.zonasE.map((zonaE, indice) => {
              const zonaD = resultado.zonasD[indice]
              return (
                <Fragment key={zonaE.nome}>
                  <span>
                    {zonaE.nome} <span className="text-xs text-muted-foreground">({zonaE.percentualLabel})</span>
                  </span>
                  <span className="text-right font-mono text-[13px] tabular-nums">
                    {formatarFaixa(zonaE.min, zonaE.max, "kg")}
                  </span>
                  <span className="text-right font-mono text-[13px] tabular-nums">
                    {formatarFaixa(zonaD.min, zonaD.max, "kg")}
                  </span>
                </Fragment>
              )
            })}
          </div>
        </div>
      </details>
    </section>
  )
}
