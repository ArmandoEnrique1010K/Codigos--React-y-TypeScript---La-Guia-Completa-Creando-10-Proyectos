// Se puede simplicar las importaciones, de la siguiente manera
import type { Dispatch, SetStateAction } from "react"

// Arreglo para las opciones de la propina 
// El value es un numero de tipo decimal, ejm: 0.10 = .10
const tipOptions = [
  {
    id: 'tip-10',
    value: .10,
    label: '10%'
  },
  {
    id: 'tip-20',
    value: .20,
    label: '20%'
  },
  {
    id: 'tip-50',
    value: .50,
    label: '50%'
  },
]

// Type para las props recibidas
type TipPercentageFormProps = {
  // Recibe directamente la función para actualizar el estado de tip
  setTip: Dispatch<SetStateAction<number>>,
  tip: number
}

// Componente del formulario de propinas
export default function TipPercentageForm({ setTip, tip }: TipPercentageFormProps) {
  return (
    <div>
      <h3 className="font-black text-2xl">Propina:</h3>
      <form>
        {/* Itera sobre tipOptions para mostrar las propinas */}
        {tipOptions.map(tipOption => (
          <div key={tipOption.id} className="flex gap-2">
            {/* Los atributos htmlFor y id deben tener el mismo valor, es una buena practica */}
            <label htmlFor={tipOption.id}>{tipOption.label}</label>
            <input
              id={tipOption.id}
              type="radio"
              // Un grupo de radio buttons posee el mismo valor en name, solamente se puede marcar uno de ellos
              name="tip"
              // El valor asignado cuando se marca la opción
              value={tipOption.value}
              // OnChange ejecuta una función al cambiar el value
              // El termino "e" hace referencia al evento de este elemento
              // "target" es el elemento <input> asociado al evento
              // "value" contiene el valor definido en el atributo value
              // Además se utiliza el operador unario (+) para convertir texto a número
              onChange={e => setTip(+e.target.value)}
              // Marca la opción si tiene un valor igual a true
              // Se evaulua si el value de tipOption es igual a la prop tip recibida
              checked={tipOption.value === tip}
            />
          </div>
        ))}
      </form>
    </div>
  )
}
