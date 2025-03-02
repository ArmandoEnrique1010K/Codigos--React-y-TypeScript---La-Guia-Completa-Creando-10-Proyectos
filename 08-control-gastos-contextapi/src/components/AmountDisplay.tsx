import { formatCurrency } from "../helpers"

// Define los tipos de las props
type AmountDisplayProps = {
  label?: string
  amount: number
}

// Componente para mostrar un contador con formato de moneda
export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
  return (
    <p className="text-2xl text-blue-600 font-bold">
      {label && `${label}: `}
      <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
