import NotePreview from "./NotePreview.jsx";
import "./NoteList.css";

/**
 * Displays a list of notes.
 * @param {Object} props - A list of the properties of the element.
 * @param {NoteData[]} props.noteDataList - A list of the note's data.
 */
export default function NoteList({ noteDataList, onDelete }) {
  const notes = noteDataList.map(
    /**
     * @param {NoteData} value
     */
    (value, index) => {
      return (
        <NotePreview
          noteData={value}
          onDelete={onDelete}
          key={noteDataList[index].timestamp}
          noteKey={noteDataList[index].timestamp}
        />
      );
    },
  );

  return <div className="note-list">{notes}</div>;
}
