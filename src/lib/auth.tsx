import { useState, type ReactNode } from "react"
import { limparSessao, obterSessao, salvarSessao, type Sessao } from "@/lib/storage"
import { SessaoContext } from "@/lib/sessao-context"

/**
 * Mock de autenticação do protótipo: apenas registra qual perfil foi
 * selecionado para fins de navegação, sem senha, token ou validação de
 * credenciais. Não é, e não deve virar, referência de autenticação real.
 */
export function SessaoProvider({ children }: { children: ReactNode }) {
  const [sessao, setSessao] = useState<Sessao | null>(() => obterSessao())

  function entrarComoBarbara() {
    const nova: Sessao = { perfil: "barbara" }
    salvarSessao(nova)
    setSessao(nova)
  }

  function entrarComoAluna(clienteId: string) {
    const nova: Sessao = { perfil: "aluna", clienteId }
    salvarSessao(nova)
    setSessao(nova)
  }

  function sair() {
    limparSessao()
    setSessao(null)
  }

  return (
    <SessaoContext.Provider value={{ sessao, entrarComoBarbara, entrarComoAluna, sair }}>
      {children}
    </SessaoContext.Provider>
  )
}
