import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ClipboardList, ClipboardPlus, HeartPulse, Stethoscope, TrendingUp } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { BadgeAssimetria } from "@/components/shared/BadgeAssimetria"
import { Badge } from "@/components/ui/badge"
import { DiagramaCorporal } from "@/components/shared/DiagramaCorporal"
import { EvolucaoAtendimento } from "@/components/shared/EvolucaoAtendimento"
import { GraficoEvolucao } from "@/components/shared/GraficoEvolucao"
import { calcularDominiosSF36, calcularResumoAvaliacao, classificarEva, classificarPontuacaoSF36 } from "@/lib/calculations"
import { formatarDataCurta, formatarNumero } from "@/lib/format"
import {
  useAnamnesesDoCliente,
  useAvaliacoesDoCliente,
  useCliente,
  useConfig,
  useRegistrosDorDoCliente,
  useRegistrosSF36DoCliente,
} from "@/lib/queries"
import { NOMES_REGIAO_DOR, obterInfoMovimento } from "@/types/dominio"

export function PerfilAluna() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const clienteQuery = useCliente(clienteId)
  const avaliacoesQuery = useAvaliacoesDoCliente(clienteId)
  const configQuery = useConfig()
  const registrosDorQuery = useRegistrosDorDoCliente(clienteId)
  const anamnesesQuery = useAnamnesesDoCliente(clienteId)
  const registrosSF36Query = useRegistrosSF36DoCliente(clienteId)

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
  const registrosDor = registrosDorQuery.data ?? []
  const anamneses = anamnesesQuery.data ?? []
  const registrosSF36 = registrosSF36Query.data ?? []

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
          <div className="flex flex-wrap gap-2">
            <Link to={`/alunas/${cliente.id}/anamnese/nova`} className="btn-outline">
              <ClipboardList className="h-4 w-4" />
              Anamnese
            </Link>
            <Link to={`/alunas/${cliente.id}/dor/nova`} className="btn-outline">
              <Stethoscope className="h-4 w-4" />
              Dor
            </Link>
            <Link to={`/alunas/${cliente.id}/sf36/nova`} className="btn-outline">
              <HeartPulse className="h-4 w-4" />
              RAND-36
            </Link>
            <Link to={`/avaliar/${cliente.id}`} className="btn-accent">
              <ClipboardPlus className="h-4 w-4" />
              Nova avaliação
            </Link>
          </div>
        </div>

        <EvolucaoAtendimento clienteId={cliente.id} />

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

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Histórico de anamnese</h2>
          {anamnesesQuery.isLoading ? (
            <p className="mt-4 text-sm text-muted-foreground">Carregando...</p>
          ) : anamnesesQuery.isError ? (
            <p className="mt-4 text-sm text-muted-foreground">Não foi possível carregar o histórico de anamnese.</p>
          ) : anamneses.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Ainda não há registros de anamnese para esta aluna.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {anamneses.map((registro) => (
                <li key={registro.id}>
                  <Link
                    to={`/anamnese/${registro.id}`}
                    className="card flex flex-wrap items-center justify-between gap-3 p-4 transition hover:border-primary/40"
                  >
                    <div>
                      <p className="font-medium">{formatarDataCurta(registro.data)}</p>
                      {registro.queixaPrincipal && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{registro.queixaPrincipal}</p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Histórico de dor</h2>
          {registrosDorQuery.isLoading ? (
            <p className="mt-4 text-sm text-muted-foreground">Carregando...</p>
          ) : registrosDorQuery.isError ? (
            <p className="mt-4 text-sm text-muted-foreground">Não foi possível carregar o histórico de dor.</p>
          ) : registrosDor.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Ainda não há registros de dor para esta aluna.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {registrosDor.map((registro) => {
                const maiorPonto = registro.pontos.reduce(
                  (maior, ponto) => (!maior || ponto.eva > maior.eva ? ponto : maior),
                  registro.pontos[0]
                )
                return (
                  <li key={registro.id}>
                    <Link
                      to={`/registro-dor/${registro.id}`}
                      className="card flex flex-wrap items-center justify-between gap-3 p-4 transition hover:border-primary/40"
                    >
                      <div>
                        <p className="font-medium">{formatarDataCurta(registro.data)}</p>
                        {maiorPonto && (
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            Maior intensidade: {NOMES_REGIAO_DOR[maiorPonto.regiao]} ({registro.pontos.length}{" "}
                            {registro.pontos.length === 1 ? "ponto" : "pontos"})
                          </p>
                        )}
                      </div>
                      {maiorPonto && <Badge variant={classificarEva(maiorPonto.eva)}>EVA {maiorPonto.eva}</Badge>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <section className="mt-6">
          <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            Histórico de RAND-36
          </h2>
          {registrosSF36Query.isLoading ? (
            <p className="mt-4 text-sm text-muted-foreground">Carregando...</p>
          ) : registrosSF36Query.isError ? (
            <p className="mt-4 text-sm text-muted-foreground">Não foi possível carregar o histórico de RAND-36.</p>
          ) : registrosSF36.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Ainda não há registros de RAND-36 para esta aluna.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {registrosSF36.map((registro) => {
                const dominios = Object.values(calcularDominiosSF36(registro.respostas))
                const pontuacaoGeral = dominios.reduce((soma, valor) => soma + valor, 0) / dominios.length
                return (
                  <li key={registro.id}>
                    <Link
                      to={`/sf36/${registro.id}`}
                      className="card flex flex-wrap items-center justify-between gap-3 p-4 transition hover:border-primary/40"
                    >
                      <div>
                        <p className="font-medium">{formatarDataCurta(registro.data)}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Pontuação geral: {formatarNumero(pontuacaoGeral, 0)}/100
                        </p>
                      </div>
                      <Badge variant={classificarPontuacaoSF36(pontuacaoGeral)}>
                        {formatarNumero(pontuacaoGeral, 0)}
                      </Badge>
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
