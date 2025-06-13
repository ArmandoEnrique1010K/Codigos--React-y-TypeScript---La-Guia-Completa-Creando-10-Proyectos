import { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";

type NoteDetailProps = {
  note: Note;
};

// Detalles de una nota
export default function NoteDetail({ note }: NoteDetailProps) {
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
    </div>
  );
}
