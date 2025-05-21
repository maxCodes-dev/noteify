import { useState, useRef, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { loadNoteData } from '@src/handleData';
import { Editor } from 'primereact/editor';

import { saveNoteData } from '@src/handleData';

import './NoteEditor.css';


export default function NoteEditor() {
  const location = useLocation();
  const [noteData, setNoteData] = useState(location.state.noteData[location.state.noteIndex]);
  const [title, setTitle] = useState(noteData.title);
  const [text, setText] = useState(noteData.body);
  const titleRef = useRef(null);
  const submitRef = useRef(null);

  useLayoutEffect(() => {
    const rightWidth = submitRef.current.offsetWidth;
    titleRef.current.style.marginLeft = rightWidth + 'px';
  }, []);

  function saveNote() {
    // saveNoteData();
  }

  return (
    <>
      <h1>Noteify</h1>
      <div className='header-row'>
        <h2 ref={titleRef} id='note-name' contentEditable onChange={e => setTitle(e.currentTarget.innerText)}>{title}</h2>
        <button ref={submitRef} id='save-button'>Save Note</button>
      </div>
      <Editor value={text} onTextChange={e => setText(e.htmlValue)} style={{height: '360px'}}/>
    </>
  );
}