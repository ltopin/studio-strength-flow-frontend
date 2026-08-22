import { ArrowLeftRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { useSessao } from "@/lib/use-sessao"

export function Cabecalho() {
  const navigate = useNavigate()
  const { sair } = useSessao()

  function trocarPerfil() {
    sair()
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span className="leading-none">
          <span className="block text-[10px] font-semibold tracking-[0.25em] text-muted-foreground uppercase">
            Studio
          </span>
          <span className="font-display text-xl font-semibold">Bárbara Lages</span>
        </span>
        <button type="button" onClick={trocarPerfil} className="btn-outline">
          <ArrowLeftRight className="h-4 w-4" />
          Trocar perfil
        </button>
      </div>
    </header>
  )
}
