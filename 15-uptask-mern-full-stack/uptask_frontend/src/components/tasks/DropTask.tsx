import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
  status: string;
};
// Componente para mostrar un mensaje de arrastrar aqui
export default function DropTask({ status }: DropTaskProps) {
  // El hook useDroppable tambien requiere un id unico (como argumento)
  const { isOver, setNodeRef } = useDroppable({
    id: status,
  });

  // Dropable retorna
  // setNodeRef: El elemento del codigo HTML, en el que se aplicara la funcionalidad

  return (
    <div
      // Llama a la función setNodeRef para aplicar la funcionalidad
      ref={setNodeRef}
      className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500"
    >
      Soltar tarea aqui - {status}
    </div>
  );
}
