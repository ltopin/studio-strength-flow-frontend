import { useEffect, useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, RotateCcw, Save } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useConfig, useRestaurarDadosExemplo, useSalvarConfig } from "@/lib/queries"
import { obterConfigPadrao } from "@/lib/storage"
import { MOVIMENTOS, type ConfigMovimentos, type Movimento } from "@/types/dominio"

type FormConfig = Record<Movimento, { bracoAlavanca: string; coeficiente1RM: string }>

function paraFormulario(config: ConfigMovimentos): FormConfig {
  const form = {} as FormConfig
  for (const info of MOVIMENTOS) {
    form[info.id] = {
      bracoAlavanca: config[info.id].bracoAlavanca.toString().replace(".", ","),
      coeficiente1RM: config[info.id].coeficiente1RM.toString().replace(".", ","),
    }
  }
  return form
}

export function Configuracoes() {
  const navigate = useNavigate()
  const configQuery = useConfig()
  const salvarConfigMutation = useSalvarConfig()
  const restaurarDadosMutation = useRestaurarDadosExemplo()
  const [form, setForm] = useState<FormConfig | null>(null)

  useEffect(() => {
    if (configQuery.data && form === null) setForm(paraFormulario(configQuery.data))
  }, [configQuery.data, form])

  function atualizarCampo(movimento: Movimento, campo: "bracoAlavanca" | "coeficiente1RM", valor: string) {
    setForm((atual) => (atual ? { ...atual, [movimento]: { ...atual[movimento], [campo]: valor } } : atual))
  }

  function restaurarPadrao() {
    setForm(paraFormulario(obterConfigPadrao()))
  }

  function aoSalvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (!form) return
    const config = {} as ConfigMovimentos
    for (const info of MOVIMENTOS) {
      config[info.id] = {
        bracoAlavanca: Number(form[info.id].bracoAlavanca.replace(",", ".")),
        coeficiente1RM: Number(form[info.id].coeficiente1RM.replace(",", ".")),
      }
    }
    salvarConfigMutation.mutate(config, { onSuccess: () => navigate("/painel") })
  }

  function aoRestaurarDadosDeExemplo() {
    restaurarDadosMutation.mutate(undefined, { onSuccess: () => navigate("/painel") })
  }

  if (configQuery.isLoading || !form) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </main>
      </>
    )
  }

  if (configQuery.isError) {
    return (
      <>
        <Cabecalho />
        <main className="mx-auto w-full max-w-3xl px-4 py-8">
          <p className="text-sm text-muted-foreground">Não foi possível carregar a configuração. Tente novamente.</p>
        </main>
      </>
    )
  }

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-3xl px-4 py-8">
        <Link to="/painel" className="btn-outline !px-3 !py-1.5 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao painel
        </Link>

        <h1 className="mt-5 font-display text-3xl font-semibold">Configurações</h1>
        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Os coeficientes de 1RM são estimativas, não uma fórmula clínica publicada — ajuste-os conforme a sua
          prática. O braço de alavanca entra no cálculo do torque (N·m = kgf × 9,80665 × braço).
        </p>

        <form onSubmit={aoSalvar} className="mt-6 space-y-4">
          {MOVIMENTOS.map((info) => (
            <section key={info.id} className="card p-5">
              <h2 className="font-medium">{info.nome}</h2>
              <p className="text-xs text-muted-foreground">{info.regiao}</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor={`${info.id}-braco`}>Braço de alavanca (m)</Label>
                  <Input
                    id={`${info.id}-braco`}
                    className="font-mono tabular-nums"
                    inputMode="decimal"
                    value={form[info.id].bracoAlavanca}
                    onChange={(e) => atualizarCampo(info.id, "bracoAlavanca", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`${info.id}-coef`}>Coeficiente de 1RM</Label>
                  <Input
                    id={`${info.id}-coef`}
                    className="font-mono tabular-nums"
                    inputMode="decimal"
                    value={form[info.id].coeficiente1RM}
                    onChange={(e) => atualizarCampo(info.id, "coeficiente1RM", e.target.value)}
                  />
                </div>
              </div>
            </section>
          ))}

          {salvarConfigMutation.isError && (
            <p className="text-sm text-status-alta-strong">Não foi possível salvar. Tente novamente.</p>
          )}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" variant="primary" disabled={salvarConfigMutation.isPending}>
              <Save className="h-4 w-4" />
              Salvar configurações
            </Button>
            <Button type="button" variant="outline" onClick={restaurarPadrao}>
              <RotateCcw className="h-4 w-4" />
              Restaurar padrão
            </Button>
          </div>
        </form>

        <div className="card mt-8 border-dashed p-5">
          <h2 className="text-sm font-semibold">Dados do protótipo</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Os dados ficam salvos no backend, compartilhados entre navegadores e dispositivos. Se quiser recomeçar
            com as alunas e avaliações de exemplo, restaure a demonstração.
          </p>
          {restaurarDadosMutation.isError && (
            <p className="mt-2 text-sm text-status-alta-strong">Não foi possível restaurar. Tente novamente.</p>
          )}
          <Button
            type="button"
            variant="outline"
            className="mt-3"
            onClick={aoRestaurarDadosDeExemplo}
            disabled={restaurarDadosMutation.isPending}
          >
            Restaurar dados de exemplo
          </Button>
        </div>
      </main>
    </>
  )
}
