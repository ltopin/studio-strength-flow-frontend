import { useQueries } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { ClipboardPlus, Settings2, UserPlus, UsersRound } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { BadgeAssimetria } from "@/components/shared/BadgeAssimetria"
import { calcularResumoAvaliacao, type ClassificacaoAssimetria } from "@/lib/calculations"
import { formatarDataCurta, formatarNumero } from "@/lib/format"
import { chavesQuery, useClientes, useConfig } from "@/lib/queries"
import { listarAvaliacoes } from "@/lib/storage"
import { obterInfoMovimento, type Avaliacao, type Cliente, type ConfigMovimentos } from "@/types/dominio"

const CLASSIFICACOES_QUE_PEDEM_ATENCAO: ClassificacaoAssimetria[] = ["Alta", "Muito alta"]

interface LinhaAluna {
  cliente: Cliente
  ultimaAvaliacaoData: string | null
  maiorAssimetriaNome: string | null
  classificacao: ClassificacaoAssimetria | null
}

function montarLinhas(clientes: Cliente[], config: ConfigMovimentos, avaliacoesPorCliente: Avaliacao[][]): LinhaAluna[] {
  return clientes.map((cliente, indice): LinhaAluna => {
    const [ultima] = avaliacoesPorCliente[indice] ?? []
    if (!ultima) {
      return { cliente, ultimaAvaliacaoData: null, maiorAssimetriaNome: null, classificacao: null }
    }
    const resumo = calcularResumoAvaliacao(ultima.medicoes, config)
    return {
      cliente,
      ultimaAvaliacaoData: ultima.data,
      maiorAssimetriaNome: resumo.maiorAssimetria ? obterInfoMovimento(resumo.maiorAssimetria.movimento).nome : null,
      classificacao: resumo.maiorAssimetria?.classificacao ?? null,
    }
  })
}

export function Painel() {
  const clientesQuery = useClientes()
  const configQuery = useConfig()
  const clientes = clientesQuery.data ?? []

  const avaliacoesQueries = useQueries({
    queries: clientes.map((cliente) => ({
      queryKey: chavesQuery.avaliacoesDoCliente(cliente.id),
      queryFn: () => listarAvaliacoes(cliente.id),
    })),
  })

  const carregando = clientesQuery.isLoading || configQuery.isLoading || avaliacoesQueries.some((q) => q.isLoading)
  const comErro = clientesQuery.isError || configQuery.isError || avaliacoesQueries.some((q) => q.isError)

  if (carregando) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-5xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </main>
      </>
    )
  }

  if (comErro || !configQuery.data) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-5xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Não foi possível carregar os dados. Tente novamente.</p>
        </main>
      </>
    )
  }

  const linhas = montarLinhas(
    clientes,
    configQuery.data,
    avaliacoesQueries.map((q) => q.data ?? [])
  )
  const totalAvaliacoes = linhas.filter((l) => l.ultimaAvaliacaoData).length
  const pedemAtencao = linhas.filter(
    (l) => l.classificacao && CLASSIFICACOES_QUE_PEDEM_ATENCAO.includes(l.classificacao)
  ).length

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-5xl px-4 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] text-muted-foreground uppercase">Painel</p>
            <h1 className="mt-1 font-display text-3xl font-semibold">Olá, Bárbara</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {linhas.length} alunas · {totalAvaliacoes} avaliações registradas
              {pedemAtencao > 0 && (
                <>
                  {" "}
                  · <span className="font-medium text-status-alta-strong">{pedemAtencao} pedem atenção</span>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/configuracoes" className="btn-outline">
              <Settings2 className="h-4 w-4" />
              Configurações
            </Link>
            <Link to="/alunas/nova" className="btn-primary">
              <UserPlus className="h-4 w-4" />
              Nova aluna
            </Link>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            <UsersRound className="h-4 w-4" />
            Alunas
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {linhas.map(({ cliente, ultimaAvaliacaoData, maiorAssimetriaNome, classificacao }) => (
              <li key={cliente.id} className="card p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      to={`/alunas/${cliente.id}`}
                      className="font-display text-lg font-semibold hover:text-primary hover:underline"
                    >
                      {cliente.nome}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {cliente.idade} anos · {formatarNumero(cliente.peso)} kg · {formatarNumero(cliente.altura, 2)} m
                    </p>
                  </div>
                  {classificacao && <BadgeAssimetria classificacao={classificacao} />}
                </div>

                {ultimaAvaliacaoData ? (
                  <p className="mt-3 text-xs text-muted-foreground">
                    Última avaliação em <span className="font-medium text-foreground">{formatarDataCurta(ultimaAvaliacaoData)}</span>
                    {maiorAssimetriaNome && (
                      <>
                        {" "}
                        — maior assimetria em <span className="font-medium text-foreground">{maiorAssimetriaNome}</span>
                      </>
                    )}
                  </p>
                ) : (
                  <p className="mt-3 text-xs text-muted-foreground">Ainda sem avaliação registrada.</p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <Link to={`/avaliar/${cliente.id}`} className="btn-accent !px-3 !py-1.5 text-xs">
                    <ClipboardPlus className="h-3.5 w-3.5" />
                    Nova avaliação
                  </Link>
                  <Link to={`/alunas/${cliente.id}`} className="btn-outline !px-3 !py-1.5 text-xs">
                    Ver perfil
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
