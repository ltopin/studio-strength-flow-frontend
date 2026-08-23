import { useNavigate } from "react-router-dom"
import { ClipboardList, Sparkles, UserRound } from "lucide-react"

import { useSessao } from "@/lib/use-sessao"
import { useClientes } from "@/lib/queries"

export function SelecaoPerfil() {
  const navigate = useNavigate()
  const { entrarComoBarbara, entrarComoAluna } = useSessao()
  const clientesQuery = useClientes()
  const clientes = clientesQuery.data ?? []

  function handleEntrarComoBarbara() {
    entrarComoBarbara()
    navigate("/painel")
  }

  function handleEntrarComoAluna(clienteId: string) {
    entrarComoAluna(clienteId)
    navigate(`/aluna/${clienteId}`)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-14">
        <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-muted-foreground uppercase">
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          Protótipo
        </p>
        <h1 className="mt-3 text-center font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Studio <span className="text-primary">Bárbara Lages</span>
        </h1>
        <p className="mt-3 max-w-md text-center text-sm text-muted-foreground">
          Avaliação física com dinamometria: força, torque, 1RM estimado e assimetrias musculares de cada aluna.
        </p>

        <div className="mt-10 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleEntrarComoBarbara}
            className="card group flex flex-col gap-3 p-6 text-left transition hover:border-primary/40"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ClipboardList className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold">Sou a Bárbara</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Painel das alunas, novas avaliações, resultados completos e configurações.
              </p>
            </div>
            <span className="mt-auto text-sm font-medium text-primary group-hover:underline">
              Entrar no painel →
            </span>
          </button>

          <div className="card flex flex-col gap-3 p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <UserRound className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold">Sou aluna</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Ver meus resultados mais recentes em uma visão simples e motivadora.
              </p>
            </div>
            <ul className="mt-auto space-y-1.5 pt-1">
              {clientes.map((cliente) => (
                <li key={cliente.id}>
                  <button
                    type="button"
                    onClick={() => handleEntrarComoAluna(cliente.id)}
                    className="text-sm font-medium text-accent hover:underline"
                  >
                    Entrar como {cliente.nome} →
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 max-w-lg text-center text-xs text-muted-foreground">
          Protótipo de front-end: os dados ficam salvos apenas neste navegador, para validar o fluxo antes de
          investir em backend.
        </p>
      </section>
    </main>
  )
}
