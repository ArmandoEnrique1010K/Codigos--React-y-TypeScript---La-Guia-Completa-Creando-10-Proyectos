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

  // Imprime varias veces false porque hay tareas, imprime un true si la tarea fue arrastrada hacia el componente que contiene la función setNodeRef
  // console.log(isOver);

  // Sintaxis de JavaScript para aplicar estilos
  const style = {
    opacity: isOver ? 0.4 : undefined,
    // backgroundColor: "red"
  };

  return (
    <div
      // Llama a la función setNodeRef para aplicar la funcionalidad
      ref={setNodeRef}
      // Aplica el estilo
      style={style}
      className="text-xs font-semibold uppercase p-2 border border-dashed border-slate-500 mt-5 grid place-content-center text-slate-500"
    >
      {/* No muestres la propiedad status */}
      Soltar tarea aqui
    </div>
  );
}
