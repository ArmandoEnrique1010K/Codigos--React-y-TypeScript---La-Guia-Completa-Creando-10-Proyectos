import { deleteNote } from "@/api/NoteAPI";
import { useAuth } from "@/hooks/useAuth";
import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
  note: Note;
};

// Detalles de una nota
export default function NoteDetail({ note }: NoteDetailProps) {
  // Llama al hook personalizado useAuth
  const { data, isLoading } = useAuth();

  // Debes verificar si el usuario autenticado es la persona que ha creado la nota para que lo pueda eliminar
  const canDelete = useMemo(() => data?._id === note.createdBy._id, [data]);

  // Extrae el id del parametro de la URL
  const params = useParams();
  const projectId = params.projectId!;

  // Extrae los query params de la URL
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("viewTask")!;

  // Instancia de useQueryClient
  const queryClient = useQueryClient();

  // Instancia de useMutation
  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      // Invalida el queryKey
      queryClient.invalidateQueries({ queryKey: ["task", taskId] });
    },
  });

  if (isLoading) return "Cargando...";

  return (
    <div className="p-3 flex justify-between items-center">
      <div>
        <p>
          {note.content} por:{" "}
          <span className="font-bold">{note.createdBy.name}</span>
        </p>
        <p className="text-xs text-slate-500">
          {/* Aplica un formato de fecha, definido en utils.ts */}
          {formatDate(note.createdAt)}
        </p>
      </div>
      {canDelete && (
        <button
          type="button"
          className="bg-red-400 hover:bg-red-500 p-2 text-xs text-white font-bold cursor-pointer transition-colors"
          // Llama a la función mutate directamente
          onClick={() => mutate({ projectId, taskId, noteId: note._id })}
        >
          Eliminar
        </button>
      )}
    </div>
  );
}
