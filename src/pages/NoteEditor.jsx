import { useState, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router';

/** @import { NoteData } from '../typedefs.js' */

import { Editor } from 'primereact/editor';

import { saveNoteData } from '@src/handleData';

import './NoteEditor.css';


export default function NoteEditor({ notesFileHandle }) {
  const location = useLocation();
  if (location.state.noteData == null) {
    return <Navigate to='/welcome' />;
  } else {
    // alert(location.state.noteData);
  }
  const navigate = useNavigate();
  /** @type {NoteData[]} */
  const notesData = location.state.noteData;
  const noteDataIndex = notesData.findIndex(note => note.timestamp = location.state.timestamp);
  const noteData = notesData[noteDataIndex];
  /** @type {[string, React.Dispatch<string>]} */
  const [title, setTitle] = useState(noteData.title);
  /** @type {[string, React.Dispatch<string>]} */
  const [text, setText] = useState(noteData.body);
  const titleRef = useRef(null);
  const submitRef = useRef(null);

  useLayoutEffect(() => {
    const rightWidth = submitRef.current.offsetWidth;
    titleRef.current.style.marginLeft = rightWidth + 'px';
  }, []);

  async function saveNote() {
    const newNotesData = notesData.slice();
    const timestamp = new Date(Date.now()).toISOString();
    const data = {
      title: titleRef.current.innerText,
      body: text !== '' ? text : '<p></p>',
      timestamp: timestamp,
    }
    for (const key in data) {
      alert(key + ': ' + data[key]);
    }
    alert(JSON.stringify(data));
    newNotesData[noteDataIndex] = data;
    await saveNoteData(notesFileHandle, newNotesData);
    navigate('/');
  }

  return (
    <>
      <h1>Noteify</h1>
      <div className='header-row'>
        <h2 ref={titleRef} id='note-name' contentEditable={true}>{title}</h2>
        <button ref={submitRef} id='save-button' onClick={saveNote}>Save Note</button>
      </div>
      <Editor value={text} onTextChange={e => setText(e.htmlValue)} style={{height: '360px'}}/>
    </>
  );
}