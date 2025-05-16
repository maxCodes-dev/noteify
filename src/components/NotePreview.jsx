import Dropdown from './Dropdown';

import './NotePreview.css';

export default function NotePreview({ noteData, onDelete, key }) {
  const optionsChoices = ['Delete Note'];
  const optionsOnClicks = [() => onDelete(key)];

  return (
    <div className='note-preview'>
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
      <p>{noteData.body}</p>
    </div>
  );
}
