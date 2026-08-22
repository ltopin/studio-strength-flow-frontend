import type { Avaliacao, Cliente, ConfigMovimentos } from "@/types/dominio"
import { AVALIACOES_MOCK, CLIENTES_MOCK, CONFIG_PADRAO } from "@/lib/mockData"

/**
 * Persistência local do protótipo. Todo o acesso a localStorage do app passa
 * por este módulo — componentes React nunca leem/escrevem localStorage direto.
 */

const CHAVE_DADOS = "dinamometria:dados"
const CHAVE_SESSAO = "dinamometria:sessao"

interface EstadoPersistido {
  clientes: Cliente[]
  avaliacoes: Avaliacao[]
  config: ConfigMovimentos
}

export type Sessao = { perfil: "barbara" } | { perfil: "aluna"; clienteId: string }

function estadoInicial(): EstadoPersistido {
  return {
    clientes: CLIENTES_MOCK,
    avaliacoes: AVALIACOES_MOCK,
    config: CONFIG_PADRAO,
  }
}

function lerEstado(): EstadoPersistido {
  const bruto = localStorage.getItem(CHAVE_DADOS)
  if (!bruto) {
    const inicial = estadoInicial()
    salvarEstado(inicial)
    return inicial
  }
  return JSON.parse(bruto) as EstadoPersistido
}

function salvarEstado(estado: EstadoPersistido): void {
  localStorage.setItem(CHAVE_DADOS, JSON.stringify(estado))
}

// --- Clientes / alunas ---------------------------------------------------

export function listarClientes(): Cliente[] {
  return lerEstado().clientes
}

export function obterCliente(clienteId: string): Cliente | undefined {
  return lerEstado().clientes.find((c) => c.id === clienteId)
}

export function criarCliente(dados: Omit<Cliente, "id">): Cliente {
  const estado = lerEstado()
  const slug = dados.nome
    .toLowerCase()
    .split(" ")[0]
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
  const id = `cli-${slug}-${Date.now().toString(36)}`
  const cliente: Cliente = { id, ...dados }
  estado.clientes = [...estado.clientes, cliente]
  salvarEstado(estado)
  return cliente
}

// --- Avaliações ------------------------------------------------------------

export function listarAvaliacoes(clienteId: string): Avaliacao[] {
  return lerEstado()
    .avaliacoes.filter((a) => a.clienteId === clienteId)
    .sort((a, b) => b.data.localeCompare(a.data))
}

export function obterAvaliacao(avaliacaoId: string): Avaliacao | undefined {
  return lerEstado().avaliacoes.find((a) => a.id === avaliacaoId)
}

export function obterUltimaAvaliacao(clienteId: string): Avaliacao | undefined {
  return listarAvaliacoes(clienteId)[0]
}

export function criarAvaliacao(dados: Omit<Avaliacao, "id">): Avaliacao {
  const estado = lerEstado()
  const id = `ava-${dados.clienteId.replace("cli-", "")}-${Date.now().toString(36)}`
  const avaliacao: Avaliacao = { id, ...dados }
  estado.avaliacoes = [...estado.avaliacoes, avaliacao]
  salvarEstado(estado)
  return avaliacao
}

// --- Configurações -----------------------------------------------------

export function obterConfig(): ConfigMovimentos {
  return lerEstado().config
}

export function salvarConfig(config: ConfigMovimentos): void {
  const estado = lerEstado()
  estado.config = config
  salvarEstado(estado)
}

export function obterConfigPadrao(): ConfigMovimentos {
  return CONFIG_PADRAO
}

export function restaurarDadosExemplo(): void {
  salvarEstado(estadoInicial())
}

// --- Sessão mock -----------------------------------------------------------
// Mock de autenticação: apenas guarda qual perfil foi selecionado, sem senha
// nem validação de credenciais. Não deve ser usado como referência de auth real.

export function obterSessao(): Sessao | null {
  const bruto = localStorage.getItem(CHAVE_SESSAO)
  return bruto ? (JSON.parse(bruto) as Sessao) : null
}

export function salvarSessao(sessao: Sessao): void {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(sessao))
}

export function limparSessao(): void {
  localStorage.removeItem(CHAVE_SESSAO)
}
