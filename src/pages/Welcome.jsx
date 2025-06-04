import { useState } from 'react';
import { useNavigate } from 'react-router';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { loadNoteFile, fetchNoteData } from '@src/handleData';

import './Welcome.css';


export default function Welcome({ onFinish }) {
  const navigate = useNavigate();
  
  /**
   * Loads note data.
   * @param {Boolean} doCreate - Whether to create or read a file.
   */
  async function loadNotes(doCreate) {
    const notesFileHandle = await loadNoteFile(doCreate);
    onFinish(notesFileHandle);
    await fetchNoteData("maxCodes");
    navigate('/', {state: {"notesFileHandle": notesFileHandle}});
  }

  return (
    <>
      <h1>Welcome to Noteify!</h1>
      <button onClick={() => loadNotes(true)}>Create <code>notes.json</code> File</button>
      <br />
      <br />
      <button onClick={() => loadNotes(false)}>Open <code>notes.json</code> File</button>
    </>
  );
}
