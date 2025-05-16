import { useState } from 'react';
import { useNavigate } from 'react-router';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { loadNoteData } from '@src/handleData';

// import '../App.css';


export default function Welcome({ onFinish }) {
  const navigate = useNavigate()
  async function loadNotes(doCreate) {
    const notesFileHandle = await loadNoteData(doCreate);
    onFinish();
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
