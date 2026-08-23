import { BrowserRouter, Route, Routes } from "react-router-dom"

import { SessaoProvider } from "@/lib/auth"
import { RequerAluna, RequerBarbara } from "@/components/shared/Protegido"
import { SelecaoPerfil } from "@/pages/SelecaoPerfil"
import { Painel } from "@/pages/barbara/Painel"
import { NovaAluna } from "@/pages/barbara/NovaAluna"
import { EscolherProtocolo } from "@/pages/barbara/EscolherProtocolo"
import { NovaAvaliacao } from "@/pages/barbara/NovaAvaliacao"
import { ResultadoAvaliacao } from "@/pages/barbara/ResultadoAvaliacao"
import { PerfilAluna } from "@/pages/barbara/PerfilAluna"
import { Configuracoes } from "@/pages/barbara/Configuracoes"
import { DashboardAluna } from "@/pages/aluna/DashboardAluna"

export function App() {
  return (
    <BrowserRouter>
      <SessaoProvider>
        <Routes>
          <Route path="/" element={<SelecaoPerfil />} />
          <Route
            path="/painel"
            element={
              <RequerBarbara>
                <Painel />
              </RequerBarbara>
            }
          />
          <Route
            path="/alunas/nova"
            element={
              <RequerBarbara>
                <NovaAluna />
              </RequerBarbara>
            }
          />
          <Route
            path="/alunas/:clienteId"
            element={
              <RequerBarbara>
                <PerfilAluna />
              </RequerBarbara>
            }
          />
          <Route
            path="/avaliar/:clienteId"
            element={
              <RequerBarbara>
                <EscolherProtocolo />
              </RequerBarbara>
            }
          />
          <Route
            path="/avaliar/:clienteId/:protocoloId"
            element={
              <RequerBarbara>
                <NovaAvaliacao />
              </RequerBarbara>
            }
          />
          <Route
            path="/avaliacao/:avaliacaoId"
            element={
              <RequerBarbara>
                <ResultadoAvaliacao />
              </RequerBarbara>
            }
          />
          <Route
            path="/configuracoes"
            element={
              <RequerBarbara>
                <Configuracoes />
              </RequerBarbara>
            }
          />
          <Route
            path="/aluna/:clienteId"
            element={
              <RequerAluna>
                <DashboardAluna />
              </RequerAluna>
            }
          />
        </Routes>
      </SessaoProvider>
    </BrowserRouter>
  )
}
