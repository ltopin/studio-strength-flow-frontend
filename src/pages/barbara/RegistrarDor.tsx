import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Save, X } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { DiagramaCorporal } from "@/components/shared/DiagramaCorporal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCliente, useCriarRegistroDor } from "@/lib/queries"
import { NOMES_REGIAO_DOR, type PontoDor, type RegiaoDor } from "@/types/dominio"

function hojeIso(): string {
  return new Date().toISOString().slice(0, 10)
}

const EVA_PADRAO = 5

export function RegistrarDor() {
  const { clienteId } = useParams<{ clienteId: string }>()
  const navigate = useNavigate()

  const [data, setData] = useState(hojeIso())
  const [pontos, setPontos] = useState<PontoDor[]>([])

  const clienteQuery = useCliente(clienteId)
  const criarRegistroDorMutation = useCriarRegistroDor()

  useEffect(() => {
    if (clienteQuery.isSuccess && !clienteQuery.data) navigate("/painel", { replace: true })
  }, [clienteQuery.isSuccess, clienteQuery.data, navigate])

  function aoClicarRegiao(regiao: RegiaoDor) {
    setPontos((atuais) => (atuais.some((p) => p.regiao === regiao) ? atuais : [...atuais, { regiao, eva: EVA_PADRAO }]))
  }

  function atualizarEva(regiao: RegiaoDor, eva: number) {
    setPontos((atuais) => atuais.map((p) => (p.regiao === regiao ? { ...p, eva } : p)))
  }

  function removerPonto(regiao: RegiaoDor) {
    setPontos((atuais) => atuais.filter((p) => p.regiao !== regiao))
  }

  function aoSalvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!clienteId || pontos.length === 0) return

    criarRegistroDorMutation.mutate({ clienteId, data, pontos }, { onSuccess: (registro) => navigate(`/registro-dor/${registro.id}`) })
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

        <h1 className="mt-5 font-display text-3xl font-semibold">Registrar dor</h1>
        <p className="mt-1 text-sm text-muted-foreground">{cliente.nome} — clique no diagrama para marcar um ponto de dor.</p>

        <form onSubmit={aoSalvar} className="mt-6 space-y-4">
          <div className="card p-5">
            <Label htmlFor="data-dor">Data</Label>
            <Input id="data-dor" type="date" className="max-w-52" value={data} onChange={(e) => setData(e.target.value)} />
          </div>

          <DiagramaCorporal pontosDor={pontos} onRegiaoClick={aoClicarRegiao} />

          {pontos.length > 0 && (
            <div className="card space-y-3 p-5">
              <h2 className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                Intensidade da dor (EVA 0–10)
              </h2>
              {pontos.map((ponto) => (
                <div key={ponto.regiao} className="grid grid-cols-[1fr_auto_auto] items-center gap-3">
                  <span className="text-sm font-medium">{NOMES_REGIAO_DOR[ponto.regiao]}</span>
                  <Input
                    type="number"
                    min={0}
                    max={10}
                    className="w-20 text-right font-mono tabular-nums"
                    aria-label={`EVA — ${NOMES_REGIAO_DOR[ponto.regiao]}`}
                    value={ponto.eva}
                    onChange={(e) => atualizarEva(ponto.regiao, Math.min(10, Math.max(0, Number(e.target.value) || 0)))}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    aria-label={`Remover ponto — ${NOMES_REGIAO_DOR[ponto.regiao]}`}
                    onClick={() => removerPonto(ponto.regiao)}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {criarRegistroDorMutation.isError && (
            <p className="text-sm text-status-alta-strong">Não foi possível salvar o registro. Tente novamente.</p>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={criarRegistroDorMutation.isPending || pontos.length === 0}
          >
            <Save className="h-4 w-4" />
            Salvar registro de dor
          </Button>
        </form>
      </main>
    </>
  )
}
