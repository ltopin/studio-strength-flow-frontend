import { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { DiagramaCorporal } from "@/components/shared/DiagramaCorporal"
import { formatarDataLonga } from "@/lib/format"
import { useCliente, useRegistroDor } from "@/lib/queries"

export function DetalheRegistroDor() {
  const { registroId } = useParams<{ registroId: string }>()
  const navigate = useNavigate()

  const registroQuery = useRegistroDor(registroId)
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

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Link to={`/alunas/${registro.clienteId}`} className="btn-outline !px-3 !py-1.5 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao perfil
        </Link>

        <div className="mt-5">
          <h1 className="font-display text-3xl font-semibold">Registro de dor</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {cliente?.nome ?? "Aluna"} · {formatarDataLonga(registro.data)}
          </p>
        </div>

        <div className="mt-6">
          <DiagramaCorporal pontosDor={registro.pontos} />
        </div>
      </main>
    </>
  )
}
