import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { formatarDataLonga } from "@/lib/format"
import { useAnamnese, useCliente } from "@/lib/queries"

const CAMPOS: { chave: "queixaPrincipal" | "historicoSaude" | "objetivos" | "observacoes"; titulo: string }[] = [
  { chave: "queixaPrincipal", titulo: "Queixa principal" },
  { chave: "historicoSaude", titulo: "Histórico de saúde" },
  { chave: "objetivos", titulo: "Objetivos" },
  { chave: "observacoes", titulo: "Observações" },
]

export function DetalheAnamnese() {
  const { registroId } = useParams<{ registroId: string }>()
  const navigate = useNavigate()

  const registroQuery = useAnamnese(registroId)
  const clienteQuery = useCliente(registroQuery.data?.clienteId)

  useEffect(() => {
    if (registroQuery.isSuccess && !registroQuery.data) navigate("/painel", { replace: true })
  }, [registroQuery.isSuccess, registroQuery.data, navigate])

  if (registroQuery.isLoading) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </main>
      </>
    )
  }

  if (registroQuery.isSuccess && !registroQuery.data) return null

  if (registroQuery.isError) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Não foi possível carregar os dados. Tente novamente.</p>
        </main>
      </>
    )
  }

  const registro = registroQuery.data!
  const cliente = clienteQuery.data
  const camposPreenchidos = CAMPOS.filter((campo) => registro[campo.chave]?.trim())

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Link to={`/alunas/${registro.clienteId}`} className="btn-outline !px-3 !py-1.5 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao perfil
        </Link>

        <div className="mt-5">
          <h1 className="font-display text-3xl font-semibold">Anamnese</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {cliente?.nome ?? "Aluna"} · {formatarDataLonga(registro.data)}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          {camposPreenchidos.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum campo preenchido neste registro.</p>
          ) : (
            camposPreenchidos.map((campo) => (
              <section key={campo.chave} className="card p-5">
                <h2 className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {campo.titulo}
                </h2>
                <p className="mt-2 text-sm whitespace-pre-wrap">{registro[campo.chave]}</p>
              </section>
            ))
          )}
        </div>
      </main>
    </>
  )
}
