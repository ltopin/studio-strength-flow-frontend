import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  criarAvaliacao,
  criarCliente,
  listarAvaliacoes,
  listarClientes,
  obterAvaliacao,
  obterCliente,
  obterConfig,
  restaurarDadosExemplo,
  salvarConfig,
} from "@/lib/storage"

/**
 * Hooks de data-fetching sobre storage.ts, usando react-query para lidar com
 * carregamento/erro nos pontos que hoje chamam essas funções durante a renderização.
 */

export const chavesQuery = {
  clientes: ["clientes"] as const,
  cliente: (id: string) => ["clientes", id] as const,
  avaliacoesDoCliente: (clienteId: string) => ["clientes", clienteId, "avaliacoes"] as const,
  avaliacao: (id: string) => ["avaliacoes", id] as const,
  config: ["config"] as const,
}

export function useClientes() {
  return useQuery({ queryKey: chavesQuery.clientes, queryFn: listarClientes })
}

export function useCliente(clienteId: string | undefined) {
  return useQuery({
    queryKey: chavesQuery.cliente(clienteId ?? ""),
    queryFn: () => obterCliente(clienteId!),
    enabled: Boolean(clienteId),
  })
}

export function useAvaliacoesDoCliente(clienteId: string | undefined) {
  return useQuery({
    queryKey: chavesQuery.avaliacoesDoCliente(clienteId ?? ""),
    queryFn: () => listarAvaliacoes(clienteId!),
    enabled: Boolean(clienteId),
  })
}

export function useUltimaAvaliacao(clienteId: string | undefined) {
  return useQuery({
    queryKey: chavesQuery.avaliacoesDoCliente(clienteId ?? ""),
    queryFn: () => listarAvaliacoes(clienteId!),
    enabled: Boolean(clienteId),
    select: (avaliacoes) => avaliacoes[0] as (typeof avaliacoes)[number] | undefined,
  })
}

export function useAvaliacao(avaliacaoId: string | undefined) {
  return useQuery({
    queryKey: chavesQuery.avaliacao(avaliacaoId ?? ""),
    queryFn: () => obterAvaliacao(avaliacaoId!),
    enabled: Boolean(avaliacaoId),
  })
}

export function useConfig() {
  return useQuery({ queryKey: chavesQuery.config, queryFn: obterConfig })
}

export function useCriarCliente() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: criarCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chavesQuery.clientes })
    },
  })
}

export function useCriarAvaliacao() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: criarAvaliacao,
    onSuccess: (avaliacao) => {
      queryClient.invalidateQueries({ queryKey: chavesQuery.avaliacoesDoCliente(avaliacao.clienteId) })
      queryClient.invalidateQueries({ queryKey: chavesQuery.clientes })
    },
  })
}

export function useSalvarConfig() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: salvarConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: chavesQuery.config })
    },
  })
}

export function useRestaurarDadosExemplo() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: restaurarDadosExemplo,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
