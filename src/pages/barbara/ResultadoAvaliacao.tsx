import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { VisaoAvaliacao } from "@/components/shared/VisaoAvaliacao"
import { formatarDataLonga } from "@/lib/format"
import { useAvaliacao, useCliente, useConfig } from "@/lib/queries"

export function ResultadoAvaliacao() {
  const { avaliacaoId } = useParams<{ avaliacaoId: string }>()
  const navigate = useNavigate()

  const avaliacaoQuery = useAvaliacao(avaliacaoId)
  const clienteQuery = useCliente(avaliacaoQuery.data?.clienteId)
  const configQuery = useConfig()

  useEffect(() => {
    if (avaliacaoQuery.isSuccess && !avaliacaoQuery.data) navigate("/painel", { replace: true })
  }, [avaliacaoQuery.isSuccess, avaliacaoQuery.data, navigate])

  if (avaliacaoQuery.isLoading || configQuery.isLoading) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </main>
      </>
    )
  }

  if (avaliacaoQuery.isSuccess && !avaliacaoQuery.data) return null

  if (avaliacaoQuery.isError || configQuery.isError || !configQuery.data) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Não foi possível carregar os dados. Tente novamente.</p>
        </main>
      </>
    )
  }

  const avaliacao = avaliacaoQuery.data!
  const cliente = clienteQuery.data
  const config = configQuery.data

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Link to={`/alunas/${avaliacao.clienteId}`} className="btn-outline !px-3 !py-1.5 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao perfil
        </Link>

        <div className="mt-5">
          <h1 className="font-display text-3xl font-semibold">Resultado da avaliação</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {cliente?.nome ?? "Aluna"} · {formatarDataLonga(avaliacao.data)}
          </p>
        </div>

        <div className="mt-6">
          <VisaoAvaliacao avaliacao={avaliacao} config={config} />
        </div>
      </main>
    </>
  )
}
