import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Clock, ListChecks } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { useCliente, useProtocolos } from "@/lib/queries"

export function EscolherProtocolo() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const clienteQuery = useCliente(clienteId)
  const protocolosQuery = useProtocolos()

  useEffect(() => {
    if (clienteQuery.isSuccess && !clienteQuery.data) navigate("/painel", { replace: true })
  }, [clienteQuery.isSuccess, clienteQuery.data, navigate])

  if (clienteQuery.isLoading || protocolosQuery.isLoading) {
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

  if (clienteQuery.isError || protocolosQuery.isError || !protocolosQuery.data) {
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
  const protocolos = protocolosQuery.data

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Link to={clienteId ? `/alunas/${clienteId}` : "/painel"} className="btn-outline !px-3 !py-1.5 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao perfil
        </Link>

        <h1 className="mt-5 font-display text-3xl font-semibold">Escolher protocolo</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {cliente?.nome ?? "Aluna"} — selecione o protocolo de avaliação a ser aplicado.
        </p>

        <ul className="mt-6 space-y-3">
          {protocolos.map((protocolo) => (
            <li key={protocolo.id}>
              <Link
                to={`/avaliar/${clienteId}/${protocolo.id}`}
                className="card flex items-center justify-between gap-3 p-4 transition hover:border-primary/40"
              >
                <div>
                  <p className="font-medium">{protocolo.nome}</p>
                  <p className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {protocolo.tempoEstimadoMin} min
                    </span>
                    <span className="flex items-center gap-1">
                      <ListChecks className="h-3.5 w-3.5" />
                      {protocolo.movimentos.length} {protocolo.movimentos.length === 1 ? "movimento" : "movimentos"}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
