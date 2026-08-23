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
import { RegistrarDor } from "@/pages/barbara/RegistrarDor"
import { DetalheRegistroDor } from "@/pages/barbara/DetalheRegistroDor"
import { RegistrarAnamnese } from "@/pages/barbara/RegistrarAnamnese"
import { DetalheAnamnese } from "@/pages/barbara/DetalheAnamnese"
import { RegistrarSF36 } from "@/pages/barbara/RegistrarSF36"
import { DetalheSF36 } from "@/pages/barbara/DetalheSF36"
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
            path="/alunas/:clienteId/dor/nova"
            element={
              <RequerBarbara>
                <RegistrarDor />
              </RequerBarbara>
            }
          />
          <Route
            path="/registro-dor/:registroId"
            element={
              <RequerBarbara>
                <DetalheRegistroDor />
              </RequerBarbara>
            }
          />
          <Route
            path="/alunas/:clienteId/anamnese/nova"
            element={
              <RequerBarbara>
                <RegistrarAnamnese />
              </RequerBarbara>
            }
          />
          <Route
            path="/anamnese/:registroId"
            element={
              <RequerBarbara>
                <DetalheAnamnese />
              </RequerBarbara>
            }
          />
          <Route
            path="/alunas/:clienteId/sf36/nova"
            element={
              <RequerBarbara>
                <RegistrarSF36 />
              </RequerBarbara>
            }
          />
          <Route
            path="/sf36/:registroId"
            element={
              <RequerBarbara>
                <DetalheSF36 />
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
