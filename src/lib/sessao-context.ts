import { createContext } from "react"
import type { Sessao } from "@/lib/storage"

export interface SessaoContextValue {
  sessao: Sessao | null
  entrarComoBarbara: () => void
  entrarComoAluna: (clienteId: string) => void
  sair: () => void
}

export const SessaoContext = createContext<SessaoContextValue | null>(null)
