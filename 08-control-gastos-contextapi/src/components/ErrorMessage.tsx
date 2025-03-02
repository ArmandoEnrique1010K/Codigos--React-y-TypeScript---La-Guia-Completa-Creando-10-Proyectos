import { PropsWithChildren } from "react"

// Componente para mostrar un mensaje de error
// se asigna el type PropsWithChildren a la prop children
export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className='bg-red-600 p-2 text-white font-bold text-sm text-center'>
      {children}
    </p>
  )
}