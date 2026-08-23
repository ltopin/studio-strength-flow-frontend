import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useCliente, useCriarAnamnese } from "@/lib/queries"

function hojeIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function RegistrarAnamnese() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const [data, setData] = useState(hojeIso())
  const [queixaPrincipal, setQueixaPrincipal] = useState("")
  const [historicoSaude, setHistoricoSaude] = useState("")
  const [objetivos, setObjetivos] = useState("")
  const [observacoes, setObservacoes] = useState("")

  const clienteQuery = useCliente(clienteId)
  const criarAnamneseMutation = useCriarAnamnese()

  useEffect(() => {
    if (clienteQuery.isSuccess && !clienteQuery.data) navigate("/painel", { replace: true })
  }, [clienteQuery.isSuccess, clienteQuery.data, navigate])

  const algumCampoPreenchido = Boolean(
    queixaPrincipal.trim() || historicoSaude.trim() || objetivos.trim() || observacoes.trim()
  )

  function aoSalvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!clienteId || !algumCampoPreenchido) return

    criarAnamneseMutation.mutate(
      {
        clienteId,
        data,
        queixaPrincipal: queixaPrincipal.trim() || undefined,
        historicoSaude: historicoSaude.trim() || undefined,
        objetivos: objetivos.trim() || undefined,
        observacoes: observacoes.trim() || undefined,
      },
      { onSuccess: (registro) => navigate(`/anamnese/${registro.id}`) }
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

        <h1 className="mt-5 font-display text-3xl font-semibold">Nova anamnese</h1>
        <p className="mt-1 text-sm text-muted-foreground">{cliente.nome}</p>

        <form onSubmit={aoSalvar} className="mt-6 space-y-4">
          <div className="card p-5">
            <Label htmlFor="data-anamnese">Data</Label>
            <Input
              id="data-anamnese"
              type="date"
              className="max-w-52"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="card space-y-4 p-5">
            <div>
              <Label htmlFor="queixa-principal">Queixa principal</Label>
              <Textarea
                id="queixa-principal"
                placeholder="O que motivou o atendimento..."
                value={queixaPrincipal}
                onChange={(e) => setQueixaPrincipal(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="historico-saude">Histórico de saúde</Label>
              <Textarea
                id="historico-saude"
                placeholder="Condições, lesões, cirurgias anteriores..."
                value={historicoSaude}
                onChange={(e) => setHistoricoSaude(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="objetivos">Objetivos</Label>
              <Textarea
                id="objetivos"
                placeholder="O que a aluna espera alcançar..."
                value={objetivos}
                onChange={(e) => setObjetivos(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Outras observações relevantes..."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
              />
            </div>
          </div>

          {criarAnamneseMutation.isError && (
            <p className="text-sm text-status-alta-strong">Não foi possível salvar o registro. Tente novamente.</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={criarAnamneseMutation.isPending || !algumCampoPreenchido}
          >
            <Save className="h-4 w-4" />
            Salvar anamnese
          </Button>
        </form>
      </main>
    </>
  )
}
