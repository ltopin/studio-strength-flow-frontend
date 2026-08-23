import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ClipboardPlus, TrendingUp } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { BadgeAssimetria } from "@/components/shared/BadgeAssimetria"
import { DiagramaCorporal } from "@/components/shared/DiagramaCorporal"
import { GraficoEvolucao } from "@/components/shared/GraficoEvolucao"
import { calcularResumoAvaliacao } from "@/lib/calculations"
import { formatarDataCurta, formatarNumero } from "@/lib/format"
import { useAvaliacoesDoCliente, useCliente, useConfig } from "@/lib/queries"
import { obterInfoMovimento } from "@/types/dominio"

export function PerfilAluna() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const clienteQuery = useCliente(clienteId)
  const avaliacoesQuery = useAvaliacoesDoCliente(clienteId)
  const configQuery = useConfig()

  useEffect(() => {
    if (clienteQuery.isSuccess && !clienteQuery.data) navigate("/painel", { replace: true })
  }, [clienteQuery.isSuccess, clienteQuery.data, navigate])

  if (clienteQuery.isLoading || avaliacoesQuery.isLoading || configQuery.isLoading) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-5xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </main>
      </>
    )
  }

  if (clienteQuery.isSuccess && !clienteQuery.data) return null

  if (clienteQuery.isError || avaliacoesQuery.isError || configQuery.isError || !configQuery.data) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-5xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Não foi possível carregar os dados. Tente novamente.</p>
        </main>
      </>
    )
  }

  const cliente = clienteQuery.data!
  const avaliacoes = avaliacoesQuery.data ?? []
  const config = configQuery.data

  const avaliacoesCronologicas = [...avaliacoes].reverse()
  const resumoMaisRecente = avaliacoes[0] ? calcularResumoAvaliacao(avaliacoes[0].medicoes, config) : null

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <button type="button" onClick={() => navigate("/painel")} className="btn-outline !px-3 !py-1.5 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao painel
        </button>

        <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">{cliente.nome}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {cliente.idade} anos · {formatarNumero(cliente.peso)} kg · {formatarNumero(cliente.altura, 2)} m
            </p>
          </div>
          <Link to={`/avaliar/${cliente.id}`} className="btn-accent">
            <ClipboardPlus className="h-4 w-4" />
            Nova avaliação
          </Link>
        </div>

        {resumoMaisRecente && (
          <div className="mt-6">
            <DiagramaCorporal resultados={resumoMaisRecente.resultados} />
          </div>
        )}

        {avaliacoes.length > 0 && (
          <section className="card mt-6 p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
              <TrendingUp className="h-4 w-4" />
              Evolução da assimetria
            </h2>
            <div className="mt-4">
              <GraficoEvolucao avaliacoes={avaliacoesCronologicas} />
            </div>
          </section>
        )}

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Histórico de avaliações
          </h2>
          {avaliacoes.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Ainda não há avaliações registradas para esta aluna.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {avaliacoes.map((avaliacao) => {
                const resumo = calcularResumoAvaliacao(avaliacao.medicoes, config)
                const nomeMovimento = resumo.maiorAssimetria
                  ? obterInfoMovimento(resumo.maiorAssimetria.movimento).nome
                  : null
                return (
                  <li key={avaliacao.id}>
                    <Link
                      to={`/avaliacao/${avaliacao.id}`}
                      className="card flex flex-wrap items-center justify-between gap-3 p-4 transition hover:border-primary/40"
                    >
                      <div>
                        <p className="font-medium">{formatarDataCurta(avaliacao.data)}</p>
                        {nomeMovimento && resumo.maiorAssimetria && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Maior assimetria: {nomeMovimento} ({formatarNumero(resumo.maiorAssimetria.assimetria.percentual)}%)
                          </p>
                        )}
                      </div>
                      {resumo.maiorAssimetria && <BadgeAssimetria classificacao={resumo.maiorAssimetria.classificacao} />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </main>
    </>
  )
}
