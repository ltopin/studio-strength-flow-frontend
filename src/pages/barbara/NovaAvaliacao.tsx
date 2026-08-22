import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { criarAvaliacao, obterCliente } from "@/lib/storage"
import { MOVIMENTOS, type Lado, type Medicao, type Movimento, type RegiaoCorporal } from "@/types/dominio"

type ForcasPorMovimento = Record<Movimento, Record<Lado, string>>

function forcasIniciais(): ForcasPorMovimento {
  const inicial = {} as ForcasPorMovimento
  for (const movimento of MOVIMENTOS) {
    inicial[movimento.id] = { E: "", D: "" }
  }
  return inicial
}

function hojeIso(): string {
  return new Date().toISOString().slice(0, 10)
}

const REGIOES: RegiaoCorporal[] = ["Joelho", "Quadril", "Ombro"]

export function NovaAvaliacao() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState(hojeIso())
  const [forcas, setForcas] = useState<ForcasPorMovimento>(forcasIniciais)

  const cliente = useMemo(() => (clienteId ? obterCliente(clienteId) : undefined), [clienteId])

  useEffect(() => {
    if (clienteId && !obterCliente(clienteId)) {
      navigate("/painel", { replace: true })
    }
  }, [clienteId, navigate])

  function atualizarForca(movimento: Movimento, lado: Lado, valor: string) {
    setForcas((atual) => ({ ...atual, [movimento]: { ...atual[movimento], [lado]: valor } }))
  }

  function aoSalvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!clienteId) return

    const medicoes: Medicao[] = MOVIMENTOS.flatMap((info): Medicao[] =>
      (["E", "D"] as const).map((lado) => ({
        movimento: info.id,
        lado,
        forcaKgf: Number(forcas[info.id][lado].replace(",", ".")) || 0,
      }))
    )

    const avaliacao = criarAvaliacao({ clienteId, data, medicoes })
    navigate(`/avaliacao/${avaliacao.id}`)
  }

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Link to={clienteId ? `/alunas/${clienteId}` : "/painel"} className="btn-outline !px-3 !py-1.5 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao perfil
        </Link>

        <h1 className="mt-5 font-display text-3xl font-semibold">Nova avaliação</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {cliente?.nome ?? "Aluna"} — informe a força medida no dinamômetro (kgf) para cada lado.
        </p>

        <form onSubmit={aoSalvar} className="mt-6 space-y-4">
          <div className="card p-5">
            <Label htmlFor="data">Data da avaliação</Label>
            <Input id="data" type="date" className="max-w-52" value={data} onChange={(e) => setData(e.target.value)} />
          </div>

          {REGIOES.map((regiao) => (
            <section key={regiao} className="card p-5">
              <h2 className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{regiao}</h2>
              <div className="mt-3 space-y-3">
                {MOVIMENTOS.filter((info) => info.regiao === regiao).map((info) => (
                  <div key={info.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
                    <label className="text-sm font-medium">{info.nome}</label>
                    {(["E", "D"] as const).map((lado) => (
                      <div key={lado} className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold text-muted-foreground">{lado}</span>
                        <Input
                          className="w-24 text-right font-mono tabular-nums"
                          inputMode="decimal"
                          placeholder="kgf"
                          aria-label={`${info.nome} — lado ${lado === "E" ? "esquerdo" : "direito"} (kgf)`}
                          value={forcas[info.id][lado]}
                          onChange={(e) => atualizarForca(info.id, lado, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}

          <Button type="submit" variant="primary" className="w-full">
            <Save className="h-4 w-4" />
            Salvar avaliação e ver resultado
          </Button>
        </form>
      </main>
    </>
  )
}
