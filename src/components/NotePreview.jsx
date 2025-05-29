import parse from 'html-react-parser';
import Dropdown from './Dropdown.jsx';

import './NotePreview.css';

export default function NotePreview({ noteData, onDelete, noteKey }) {
  const optionsChoices = ['Delete Note'];
  const optionsOnClicks = [() => onDelete(noteKey)];

  return (
    <div className='note-preview' key={noteKey}>
      <div className='header-row'>
        <h3>{noteData.title}</h3>
        <div className='right-icon'>
        <Dropdown choices={optionsChoices} onClicks={optionsOnClicks}>
          <span className='material-symbols-outlined'>
            more_vert
          </span>
        </Dropdown>
        </div>
      </div>
      <hr />
      <div className='note-body'>{parse(noteData.body)}</div>
    </div>
  );
}
