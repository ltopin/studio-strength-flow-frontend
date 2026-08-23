import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CalendarDays, HeartPulse } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { VisaoAvaliacao } from "@/components/shared/VisaoAvaliacao"
import { formatarDataLonga } from "@/lib/format"
import { useCliente, useConfig, useUltimaAvaliacao } from "@/lib/queries"

const HOJE_ISO = new Date().toISOString().slice(0, 10)

export function DashboardAluna() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const clienteQuery = useCliente(clienteId)
  const avaliacaoQuery = useUltimaAvaliacao(clienteId)
  const configQuery = useConfig()

  useEffect(() => {
    if (clienteQuery.isSuccess && !clienteQuery.data) navigate("/", { replace: true })
  }, [clienteQuery.isSuccess, clienteQuery.data, navigate])

  if (clienteQuery.isLoading || avaliacaoQuery.isLoading || configQuery.isLoading) {
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

  if (clienteQuery.isError || avaliacaoQuery.isError || configQuery.isError || !configQuery.data) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Não foi possível carregar os dados. Tente novamente.</p>
        </main>
      </>
    )
  }

  const cliente = clienteQuery.data!
  const avaliacao = avaliacaoQuery.data
  const config = configQuery.data
  const primeiroNome = cliente.nome.split(" ")[0]

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-muted-foreground uppercase">
          <CalendarDays className="h-3.5 w-3.5 text-accent" />
          {formatarDataLonga(HOJE_ISO)}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold">Olá, {primeiroNome}!</h1>

        {avaliacao ? (
          <>
            <p className="mt-1 text-sm text-muted-foreground">
              Estes são os resultados da sua avaliação de{" "}
              <span className="font-medium text-foreground">{formatarDataLonga(avaliacao.data)}</span>. A assimetria
              mostra a diferença de força entre os lados do corpo: quanto menor, mais equilibrado.
            </p>
            <div className="mt-6">
              <VisaoAvaliacao avaliacao={avaliacao} config={config} />
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Dúvidas sobre os números? Converse com a Bárbara no seu próximo treino.
            </p>
          </>
        ) : (
          <div className="card mt-6 p-8 text-center">
            <HeartPulse className="mx-auto h-8 w-8 text-accent" />
            <p className="mt-3 text-sm text-muted-foreground">
              Você ainda não tem uma avaliação registrada. Assim que a Bárbara fizer a primeira, seus resultados
              aparecem aqui.
            </p>
          </div>
        )}
      </main>
    </>
  )
}
