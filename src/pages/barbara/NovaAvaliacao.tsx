import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCliente, useCriarAvaliacao, useProtocolos } from "@/lib/queries"
import { MOVIMENTOS, type Lado, type Medicao, type Movimento, type MovimentoInfo, type RegiaoCorporal } from "@/types/dominio"

type ForcasPorMovimento = Record<Movimento, Record<Lado, string>>

function forcasIniciais(movimentos: readonly MovimentoInfo[]): ForcasPorMovimento {
  const inicial = {} as ForcasPorMovimento
  for (const movimento of movimentos) {
    inicial[movimento.id] = { E: "", D: "" }
  }
  return inicial
}

function hojeIso(): string {
  return new Date().toISOString().slice(0, 10)
}

const REGIOES: RegiaoCorporal[] = ["Ombro", "Cotovelo", "Punho", "Quadril", "Joelho", "Tornozelo"]

export function NovaAvaliacao() {
  const { clienteId, protocoloId } = useParams<{ clienteId: string; protocoloId: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState(hojeIso())
  const [forcas, setForcas] = useState<ForcasPorMovimento | null>(null)

  const clienteQuery = useCliente(clienteId)
  const protocolosQuery = useProtocolos()
  const criarAvaliacaoMutation = useCriarAvaliacao()

  const protocolo = protocolosQuery.data?.find((p) => p.id === protocoloId)
  const movimentosDoProtocolo = useMemo(
    () => (protocolo ? MOVIMENTOS.filter((info) => protocolo.movimentos.includes(info.id)) : null),
    [protocolo]
  )

  useEffect(() => {
    if (clienteQuery.isSuccess && !clienteQuery.data) navigate("/painel", { replace: true })
  }, [clienteQuery.isSuccess, clienteQuery.data, navigate])

  useEffect(() => {
    if (protocolosQuery.isSuccess && !protocolo) navigate(clienteId ? `/avaliar/${clienteId}` : "/painel", { replace: true })
  }, [protocolosQuery.isSuccess, protocolo, clienteId, navigate])

  useEffect(() => {
    if (movimentosDoProtocolo) setForcas(forcasIniciais(movimentosDoProtocolo))
  }, [movimentosDoProtocolo])

  function atualizarForca(movimento: Movimento, lado: Lado, valor: string) {
    setForcas((atual) => (atual ? { ...atual, [movimento]: { ...atual[movimento], [lado]: valor } } : atual))
  }

  function aoSalvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!clienteId || !movimentosDoProtocolo || !forcas) return

    const medicoes: Medicao[] = movimentosDoProtocolo.flatMap((info): Medicao[] =>
      (["E", "D"] as const).map((lado) => ({
        movimento: info.id,
        lado,
        forcaKgf: Number(forcas[info.id][lado].replace(",", ".")) || 0,
      }))
    )

    criarAvaliacaoMutation.mutate(
      { clienteId, data, medicoes },
      { onSuccess: (avaliacao) => navigate(`/avaliacao/${avaliacao.id}`) }
    )
  }

  if (clienteQuery.isLoading || protocolosQuery.isLoading || !movimentosDoProtocolo || !forcas) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </main>
      </>
    )
  }

  if (clienteQuery.isSuccess && !clienteQuery.data) return null

  if (clienteQuery.isError || protocolosQuery.isError) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Não foi possível carregar os dados. Tente novamente.</p>
        </main>
      </>
    )
  }

  const cliente = clienteQuery.data

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
          {cliente?.nome ?? "Aluna"} — {protocolo?.nome} · informe a força medida no dinamômetro (kgf) para cada lado.
        </p>

        <form onSubmit={aoSalvar} className="mt-6 space-y-4">
          <div className="card p-5">
            <Label htmlFor="data">Data da avaliação</Label>
            <Input id="data" type="date" className="max-w-52" value={data} onChange={(e) => setData(e.target.value)} />
          </div>

          {REGIOES.map((regiao) => {
            const movimentosDaRegiao = movimentosDoProtocolo.filter((info) => info.regiao === regiao)
            if (movimentosDaRegiao.length === 0) return null

            return (
              <section key={regiao} className="card p-5">
                <h2 className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{regiao}</h2>
                <div className="mt-3 space-y-3">
                  {movimentosDaRegiao.map((info) => (
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
            )
          })}

          {criarAvaliacaoMutation.isError && (
            <p className="text-sm text-status-alta-strong">Não foi possível salvar. Tente novamente.</p>
          )}

          <Button type="submit" variant="primary" className="w-full" disabled={criarAvaliacaoMutation.isPending}>
            <Save className="h-4 w-4" />
            Salvar avaliação e ver resultado
          </Button>
        </form>
      </main>
    </>
  )
}
