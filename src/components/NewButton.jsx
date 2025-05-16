import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

import './NewButton.css';

export default function NewButton({ onCreate }) {
  const noteTypes = ["plaintext", "markdown (not implemented)"]
  const [noteType, setNoteType] = useState("plaintext");
  const [selectedValue, setSelectedValue] = useState('');

  function handleChange(event) {
    setSelectedValue(event.target.value)
  }

  return (
    <div className="new-button">
      <button className="new" onClick={onCreate} title="Create new note">
        +
      </button>
      <select value={selectedValue} onChange={handleChange} className='options'>
        <button>
          <div className='selectedcontent'>
            {/* {selectedValue === 'plaintext' && <span>Plaintext</span>}
            {selectedValue === 'markdown' && <span>Markdown</span>} */}
          </div>
        </button>
        <option value='plaintext'>Plaintext</option>
        <option value='markdown' disabled>Markdown (currently not implemeted)</option>
      </select>
    </div>
  );
}
