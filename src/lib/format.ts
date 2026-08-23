export function formatarNumero(valor: number, casasDecimais = 1): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  })
}

/** Aceita tanto "YYYY-MM-DD" quanto um ISO datetime completo (ex.: retornado pelo backend). */
function extrairDataIso(dataIso: string): string {
  return dataIso.slice(0, 10)
}

export function formatarDataCurta(dataIso: string): string {
  const [ano, mes, dia] = extrairDataIso(dataIso).split("-")
  return `${dia}/${mes}/${ano}`
}

export function formatarDataLonga(dataIso: string): string {
  const data = new Date(`${extrairDataIso(dataIso)}T00:00:00`)
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" }).format(data)
}

export function formatarFaixa(min: number, max: number, sufixo: string): string {
  if (min === max) return `${formatarNumero(min)} ${sufixo}`
  return `${formatarNumero(min)}–${formatarNumero(max)} ${sufixo}`
}
