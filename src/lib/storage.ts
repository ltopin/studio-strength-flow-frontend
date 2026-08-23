import type { Avaliacao, Cliente, ConfigMovimentos, Protocolo } from "@/types/dominio"

/**
 * Cliente HTTP para a API do backend (repositório studio-strength-flow-backend).
 * Componentes React nunca chamam `fetch` diretamente — tudo passa por aqui.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL as string

const CHAVE_SESSAO = "dinamometria:sessao"

export type Sessao = { perfil: "barbara" } | { perfil: "aluna"; clienteId: string }

/**
 * Valores de fallback (braço de alavanca em m, coeficiente 1RM) usados só até o
 * backend responder `/api/config`. Para os 12 movimentos novos são estimativas
 * de partida — devem ser calibrados na tela de Configurações.
 */
const CONFIG_PADRAO: ConfigMovimentos = {
  kneeExt: { bracoAlavanca: 0.4, coeficiente1RM: 0.8 },
  kneeFlex: { bracoAlavanca: 0.4, coeficiente1RM: 0.81 },
  hipAbd: { bracoAlavanca: 0.5, coeficiente1RM: 0.84 },
  hipIR: { bracoAlavanca: 0.3, coeficiente1RM: 0.85 },
  hipER: { bracoAlavanca: 0.3, coeficiente1RM: 0.85 },
  hipFlex: { bracoAlavanca: 0.4, coeficiente1RM: 0.83 },
  hipExt: { bracoAlavanca: 0.4, coeficiente1RM: 0.85 },
  shoulderIR: { bracoAlavanca: 0.25, coeficiente1RM: 0.87 },
  shoulderER: { bracoAlavanca: 0.25, coeficiente1RM: 0.91 },
  shoulderAbd: { bracoAlavanca: 0.3, coeficiente1RM: 0.86 },
  shoulderFlex: { bracoAlavanca: 0.3, coeficiente1RM: 0.86 },
  elbowFlex: { bracoAlavanca: 0.25, coeficiente1RM: 0.88 },
  elbowExt: { bracoAlavanca: 0.25, coeficiente1RM: 0.88 },
  wristFlex: { bracoAlavanca: 0.1, coeficiente1RM: 0.9 },
  wristExt: { bracoAlavanca: 0.1, coeficiente1RM: 0.9 },
  ankleDF: { bracoAlavanca: 0.15, coeficiente1RM: 0.89 },
  ankleEv: { bracoAlavanca: 0.15, coeficiente1RM: 0.89 },
}

async function extrairMensagemErro(resposta: Response): Promise<string> {
  const corpo = await resposta.json().catch(() => null)
  const mensagem = corpo?.erro ?? corpo?.mensagem ?? corpo?.message ?? corpo?.error
  return typeof mensagem === "string" ? mensagem : `Falha na requisição (${resposta.status})`
}

async function apiFetch<T>(caminho: string, init?: RequestInit): Promise<T> {
  const resposta = await fetch(`${API_BASE_URL}${caminho}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  })
  if (!resposta.ok) throw new Error(await extrairMensagemErro(resposta))
  return (await resposta.json()) as T
}

async function apiFetchOuIndefinido<T>(caminho: string): Promise<T | undefined> {
  const resposta = await fetch(`${API_BASE_URL}${caminho}`)
  if (resposta.status === 404) return undefined
  if (!resposta.ok) throw new Error(await extrairMensagemErro(resposta))
  return (await resposta.json()) as T
}

// --- Clientes / alunas ---------------------------------------------------

export async function listarClientes(): Promise<Cliente[]> {
  return apiFetch<Cliente[]>("/api/clientes")
}

export async function obterCliente(clienteId: string): Promise<Cliente | undefined> {
  return apiFetchOuIndefinido<Cliente>(`/api/clientes/${clienteId}`)
}

export async function criarCliente(dados: Omit<Cliente, "id">): Promise<Cliente> {
  return apiFetch<Cliente>("/api/clientes", { method: "POST", body: JSON.stringify(dados) })
}

// --- Avaliações ------------------------------------------------------------

export async function listarAvaliacoes(clienteId: string): Promise<Avaliacao[]> {
  const avaliacoes = await apiFetch<Avaliacao[]>(`/api/clientes/${clienteId}/avaliacoes`)
  return [...avaliacoes].sort((a, b) => b.data.localeCompare(a.data))
}

export async function obterAvaliacao(avaliacaoId: string): Promise<Avaliacao | undefined> {
  return apiFetchOuIndefinido<Avaliacao>(`/api/avaliacoes/${avaliacaoId}`)
}

export async function obterUltimaAvaliacao(clienteId: string): Promise<Avaliacao | undefined> {
  const avaliacoes = await listarAvaliacoes(clienteId)
  return avaliacoes[0]
}

export async function criarAvaliacao(dados: Omit<Avaliacao, "id">): Promise<Avaliacao> {
  return apiFetch<Avaliacao>("/api/avaliacoes", { method: "POST", body: JSON.stringify(dados) })
}

// --- Protocolos --------------------------------------------------------

export async function listarProtocolos(): Promise<Protocolo[]> {
  return apiFetch<Protocolo[]>("/api/protocolos")
}

// --- Configurações -----------------------------------------------------

export async function obterConfig(): Promise<ConfigMovimentos> {
  return apiFetch<ConfigMovimentos>("/api/config")
}

export async function salvarConfig(config: ConfigMovimentos): Promise<void> {
  await apiFetch<ConfigMovimentos>("/api/config", { method: "PUT", body: JSON.stringify(config) })
}

export function obterConfigPadrao(): ConfigMovimentos {
  return CONFIG_PADRAO
}

export async function restaurarDadosExemplo(): Promise<void> {
  await apiFetch<unknown>("/api/restaurar-dados-exemplo", { method: "POST" })
}

// --- Sessão mock -----------------------------------------------------------
// Mock de autenticação: apenas guarda qual perfil foi selecionado, sem senha
// nem validação de credenciais. Não deve ser usado como referência de auth real.
// Continua em localStorage — não faz parte da integração com o backend.

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
