import { useState } from "react";

import "./NewButton.css";

export default function NewButton({ onCreate }) {
  // const noteTypes = ["richtext", "plaintext (not implemented)"]
  // const [noteType, setNoteType] = useState("richtext");
  const [selectedValue, setSelectedValue] = useState("");

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  return (
    <div className="new-button">
      <button className="new" onClick={onCreate} title="Create new note">
        +
      </button>
      <select value={selectedValue} onChange={handleChange} className="options">
        <button>
          <div className="selectedcontent">
            {/* {selectedValue === 'plaintext' && <span>Plaintext</span>}
            {selectedValue === 'markdown' && <span>Markdown</span>} */}
          </div>
        </button>
        <option value="plaintext">Rich Text</option>
        <option value="markdown" disabled>
          Plain text (currently not implelemented)
        </option>
      </select>
    </div>
  );
}
