import { BadgeAssimetria } from "@/components/shared/BadgeAssimetria"
import type { ResumoAvaliacao } from "@/lib/calculations"
import { formatarNumero } from "@/lib/format"
import { obterInfoMovimento } from "@/types/dominio"

export function ResumoAvaliacaoCards({ resumo }: { resumo: ResumoAvaliacao }) {
  const { maiorAssimetria } = resumo

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <div className="card p-4">
        <p className="text-xs text-muted-foreground">Maior assimetria</p>
        <p className="mt-1 font-mono text-xl font-semibold tabular-nums">
          {formatarNumero(maiorAssimetria?.assimetria.percentual ?? 0)}%
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {maiorAssimetria ? obterInfoMovimento(maiorAssimetria.movimento).nome : "—"}
        </p>
        {maiorAssimetria && <BadgeAssimetria classificacao={maiorAssimetria.classificacao} className="mt-2" />}
      </div>

      <div className="card p-4">
        <p className="text-xs text-muted-foreground">Movimentos equilibrados</p>
        <p className="mt-1 font-mono text-xl font-semibold tabular-nums">
          {resumo.movimentosEquilibrados}
          <span className="text-sm text-muted-foreground">/{resumo.resultados.length}</span>
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">assimetria até 10%</p>
      </div>

      <div className="card col-span-2 p-4 sm:col-span-1">
        <p className="text-xs text-muted-foreground">Relações musculares</p>
        <dl className="mt-2 space-y-1.5 text-xs">
          {resumo.relacoesMusculares.map((relacao) => (
            <div key={relacao.nome} className="flex items-baseline justify-between gap-2">
              <dt>{relacao.nome}</dt>
              <dd className="font-mono font-medium whitespace-nowrap tabular-nums">
                D {formatarNumero(relacao.valorD, 2)} · E {formatarNumero(relacao.valorE, 2)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-[11px] text-muted-foreground">Razão direta entre forças (kgf), por lado.</p>
      </div>
    </div>
  )
}
