import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

import { useSessao } from "@/lib/use-sessao"

export function RequerBarbara({ children }: { children: ReactNode }) {
  const { sessao } = useSessao()

  if (!sessao || sessao.perfil !== "barbara") return <Navigate to="/" replace />

  return <>{children}</>
}

export function RequerAluna({ children }: { children: ReactNode }) {
  const { sessao } = useSessao()

  if (!sessao || sessao.perfil !== "aluna") return <Navigate to="/" replace />

  return <>{children}</>
}
