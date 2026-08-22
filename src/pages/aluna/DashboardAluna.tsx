import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CalendarDays, HeartPulse } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { VisaoAvaliacao } from "@/components/shared/VisaoAvaliacao"
import { formatarDataLonga } from "@/lib/format"
import { obterCliente, obterConfig, obterUltimaAvaliacao } from "@/lib/storage"

const HOJE_ISO = new Date().toISOString().slice(0, 10)

export function DashboardAluna() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const cliente = clienteId ? obterCliente(clienteId) : undefined
  const avaliacao = clienteId ? obterUltimaAvaliacao(clienteId) : undefined
  const config = obterConfig()

  useEffect(() => {
    if (!cliente) navigate("/", { replace: true })
  }, [cliente, navigate])

  if (!cliente) return null

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
