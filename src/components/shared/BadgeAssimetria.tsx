import { Badge } from "@/components/ui/badge"
import type { ClassificacaoAssimetria } from "@/lib/calculations"

const VARIANTE_POR_CLASSIFICACAO: Record<ClassificacaoAssimetria, "leve" | "moderada" | "alta" | "muito-alta"> = {
  Leve: "leve",
  Moderada: "moderada",
  Alta: "alta",
  "Muito alta": "muito-alta",
}

interface BadgeAssimetriaProps {
  classificacao: ClassificacaoAssimetria
  className?: string
}

export function BadgeAssimetria({ classificacao, className }: BadgeAssimetriaProps) {
  return (
    <Badge variant={VARIANTE_POR_CLASSIFICACAO[classificacao]} className={className}>
      {classificacao}
    </Badge>
  )
}
