import { useState, type FormEvent } from "react"
import { NotebookPen, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatarDataCurta } from "@/lib/format"
import { useCriarRegistroEvolucao, useRegistrosEvolucaoDoCliente } from "@/lib/queries"

function hojeIso(): string {
  return new Date().toISOString().slice(0, 10)
}

export function EvolucaoAtendimento({ clienteId }: { clienteId: string }) {
  const [formAberto, setFormAberto] = useState(false)
  const [data, setData] = useState(hojeIso())
  const [texto, setTexto] = useState("")

  const registrosQuery = useRegistrosEvolucaoDoCliente(clienteId)
  const criarRegistroMutation = useCriarRegistroEvolucao()

  function aoSalvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!texto.trim()) return

    criarRegistroMutation.mutate(
      { clienteId, data, texto: texto.trim() },
      {
        onSuccess: () => {
          setTexto("")
          setData(hojeIso())
          setFormAberto(false)
        },
      }
    )
  }

  const registros = registrosQuery.data ?? []

  return (
    <section className="card mt-6 p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
          <NotebookPen className="h-4 w-4" />
          Evolução de atendimento
        </h2>
        <Button type="button" variant="outline" size="sm" onClick={() => setFormAberto((aberto) => !aberto)}>
          <Plus className="h-3.5 w-3.5" />
          Nova nota
        </Button>
      </div>

      {formAberto && (
        <form onSubmit={aoSalvar} className="mt-4 space-y-3 border-t border-border pt-4">
          <div>
            <Label htmlFor="data-evolucao">Data</Label>
            <Input id="data-evolucao" type="date" className="max-w-52" value={data} onChange={(e) => setData(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="texto-evolucao">Nota</Label>
            <Textarea
              id="texto-evolucao"
              placeholder="Como foi o atendimento..."
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>
          {criarRegistroMutation.isError && (
            <p className="text-sm text-status-alta-strong">Não foi possível salvar a nota. Tente novamente.</p>
          )}
          <Button type="submit" variant="primary" size="sm" disabled={criarRegistroMutation.isPending || !texto.trim()}>
            Salvar nota
          </Button>
        </form>
      )}

      <div className="mt-4">
        {registrosQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">Carregando...</p>
        ) : registrosQuery.isError ? (
          <p className="text-sm text-muted-foreground">Não foi possível carregar as notas de evolução.</p>
        ) : registros.length === 0 ? (
          <p className="text-sm text-muted-foreground">Ainda não há notas de evolução para esta aluna.</p>
        ) : (
          <ol className="space-y-3">
            {registros.map((registro) => (
              <li key={registro.id} className="border-l-2 border-border pl-3">
                <p className="text-xs font-medium text-muted-foreground">{formatarDataCurta(registro.data)}</p>
                <p className="mt-0.5 text-sm whitespace-pre-wrap">{registro.texto}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}
