import parse from "html-react-parser";
import Dropdown from "./Dropdown.jsx";

import "./NotePreview.css";

/**
 *
 * @param {Object} props
 * @param {NoteData} props.noteData - The data of the note to display.
 * @param {Function} props.onDelete - The function to call when the note is deleted.
 * @param {string} props.noteKey - The note's key. Used for identifying the note.
 * @returns
 */
export default function NotePreview({ noteData, onDelete, noteKey }) {
  const optionsChoices = ["Delete Note"];
  const optionsOnClicks = [() => onDelete(noteKey)];

  return (
    <div className="note-preview" key={noteKey}>
      <div className="header-row">
        <h3>{noteData.title}</h3>
        <div className="right-icon">
          <Dropdown choices={optionsChoices} onClicks={optionsOnClicks}>
            <span className="material-symbols-outlined">more_vert</span>
          </Dropdown>
        </div>
      </div>
      <hr />
      <div className="note-body">{parse(noteData.body)}</div>
    </div>
  );
}
