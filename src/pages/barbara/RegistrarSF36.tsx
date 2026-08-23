import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCliente, useCriarRegistroSF36 } from "@/lib/queries"
import { ITENS_SF36 } from "@/types/dominio"

function hojeIso(): string {
  return new Date().toISOString().slice(0, 10)
}

const TOTAL_ITENS = ITENS_SF36.length

export function RegistrarSF36() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const [data, setData] = useState(hojeIso())
  const [respostas, setRespostas] = useState<(number | null)[]>(() => Array(TOTAL_ITENS).fill(null))

  const clienteQuery = useCliente(clienteId)
  const criarRegistroSF36Mutation = useCriarRegistroSF36()

  useEffect(() => {
    if (clienteQuery.isSuccess && !clienteQuery.data) navigate("/painel", { replace: true })
  }, [clienteQuery.isSuccess, clienteQuery.data, navigate])

  function responder(indice: number, valor: number) {
    setRespostas((atuais) => atuais.map((r, i) => (i === indice ? valor : r)))
  }

  const respondidos = respostas.filter((r) => r !== null).length
  const completo = respondidos === TOTAL_ITENS

  function aoSalvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!clienteId || !completo) return

    criarRegistroSF36Mutation.mutate(
      { clienteId, data, respostas: respostas as number[] },
      { onSuccess: (registro) => navigate(`/sf36/${registro.id}`) }
    )
  }

  if (clienteQuery.isLoading) {
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

  if (clienteQuery.isError) {
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

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Link to={`/alunas/${cliente.id}`} className="btn-outline !px-3 !py-1.5 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao perfil
        </Link>

        <h1 className="mt-5 font-display text-3xl font-semibold">Nova avaliação de qualidade de vida (RAND-36)</h1>
        <p className="mt-1 text-sm text-muted-foreground">{cliente.nome}</p>

        <form onSubmit={aoSalvar} className="mt-6 space-y-4">
          <div className="card sticky top-4 z-10 flex flex-wrap items-center justify-between gap-3 p-4">
            <div className="flex items-center gap-3">
              <Label htmlFor="data-sf36" className="shrink-0">
                Data
              </Label>
              <Input
                id="data-sf36"
                type="date"
                className="max-w-52"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>
            <p className="font-mono text-sm tabular-nums text-muted-foreground">
              {respondidos}/{TOTAL_ITENS} respondidas
            </p>
          </div>

          <div className="space-y-3">
            {ITENS_SF36.map((item, ordem) => (
              <div key={item.indice} className="card p-5">
                <p className="text-sm font-medium">
                  <span className="mr-1.5 text-muted-foreground">{ordem + 1}.</span>
                  {item.texto}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.opcoes.map((opcao, i) => {
                    const valor = i + 1
                    const selecionado = respostas[item.indice] === valor
                    return (
                      <Button
                        key={opcao}
                        type="button"
                        variant={selecionado ? "primary" : "outline"}
                        size="sm"
                        aria-pressed={selecionado}
                        onClick={() => responder(item.indice, valor)}
                      >
                        {opcao}
                      </Button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {criarRegistroSF36Mutation.isError && (
            <p className="text-sm text-status-alta-strong">Não foi possível salvar o registro. Tente novamente.</p>
          )}

          <Button type="submit" variant="primary" className="w-full" disabled={criarRegistroSF36Mutation.isPending || !completo}>
            <Save className="h-4 w-4" />
            {completo ? "Salvar avaliação" : `Responda todos os itens (${respondidos}/${TOTAL_ITENS})`}
          </Button>
        </form>
      </main>
    </>
  )
}
