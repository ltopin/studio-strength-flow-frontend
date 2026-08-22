import { cva } from "class-variance-authority"

export const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        leve: "bg-status-leve/15 text-status-leve-strong",
        moderada: "bg-status-moderada/20 text-status-moderada-strong",
        alta: "bg-status-alta/15 text-status-alta-strong",
        "muito-alta": "bg-status-muito-alta/15 text-status-muito-alta-strong",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)
