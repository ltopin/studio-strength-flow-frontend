import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, UserPlus } from "lucide-react"

import { Cabecalho } from "@/components/shared/Cabecalho"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { criarCliente } from "@/lib/storage"

export function NovaAluna() {
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [peso, setPeso] = useState("")
  const [altura, setAltura] = useState("")

  function aoSalvar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    criarCliente({
      nome,
      idade: Number(idade.replace(",", ".")),
      peso: Number(peso.replace(",", ".")),
      altura: Number(altura.replace(",", ".")),
    })
    navigate("/painel")
  }

  return (
    <>
      <Cabecalho />
      <main className="mx-auto w-full max-w-xl px-4 py-8">
        <Link to="/painel" className="btn-outline !px-3 !py-1.5 text-xs">
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar ao painel
        </Link>

        <h1 className="mt-5 font-display text-3xl font-semibold">Nova aluna</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Dados básicos para identificar a aluna e contextualizar as avaliações.
        </p>

        <form onSubmit={aoSalvar} className="card mt-6 space-y-4 p-6">
          <div>
            <Label htmlFor="nome">Nome completo</Label>
            <Input
              id="nome"
              placeholder="Ex.: Marina Duarte"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label htmlFor="idade">Idade</Label>
              <Input
                id="idade"
                inputMode="numeric"
                placeholder="34"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="peso">Peso (kg)</Label>
              <Input
                id="peso"
                inputMode="decimal"
                placeholder="62"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="altura">Altura (m)</Label>
              <Input
                id="altura"
                inputMode="decimal"
                placeholder="1,68"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" variant="primary" className="w-full">
            <UserPlus className="h-4 w-4" />
            Cadastrar aluna
          </Button>
        </form>
      </main>
    </>
  )
}
