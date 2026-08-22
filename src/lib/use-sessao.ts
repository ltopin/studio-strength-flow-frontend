import { useContext } from "react"
import { SessaoContext, type SessaoContextValue } from "@/lib/sessao-context"

export function useSessao(): SessaoContextValue {
  const ctx = useContext(SessaoContext)
  if (!ctx) throw new Error("useSessao deve ser usado dentro de SessaoProvider")
  return ctx
}
