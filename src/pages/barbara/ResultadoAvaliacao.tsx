import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { VisaoAvaliacao } from "@/components/shared/VisaoAvaliacao"
import { formatarDataLonga } from "@/lib/format"
import { obterAvaliacao, obterCliente, obterConfig } from "@/lib/storage"

export function ResultadoAvaliacao() {
  const { avaliacaoId } = useParams<{ avaliacaoId: string }>()
  const navigate = useNavigate()

  const avaliacao = avaliacaoId ? obterAvaliacao(avaliacaoId) : undefined
  const cliente = avaliacao ? obterCliente(avaliacao.clienteId) : undefined
  const config = obterConfig()

  useEffect(() => {
    if (!avaliacao) navigate("/painel", { replace: true })
  }, [avaliacao, navigate])

  if (!avaliacao) return null

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
