import { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router';

import NoteList from '@components/NoteList.jsx';
import NewButton from '@components/NewButton.jsx';

import { saveNoteData } from '@src/handleData';

import './Home.css';


export default function Home({ notesLoaded }) {
  if (!notesLoaded) {
    return <Navigate to='/welcome' />;
  }
  const defaultData = [];
  const [noteData, setNoteData] = useState(defaultData);
  /**@type {FileSystemFileHandle} */
  const notesFileHandle = useLocation().state["notesFileHandle"];
  const navigate = useNavigate();

  if (noteData === defaultData) {
    notesFileHandle.getFile()
        .then(file => file.text())
        .then(data => setNoteData(JSON.parse(data)));
  }

  function createNote() { try {
    /** @type {Array} */
    const newNoteData = noteData.slice();
    newNoteData.push({"title": "Untitled", "body": "", "timestamp": (new Date(Date.now())).toISOString()});
    setNoteData(newNoteData);
    saveNoteData(notesFileHandle, newNoteData);
    navigate('/editnote', { state: { noteData: noteData, noteIndex: noteData.length - 1 } });
  } catch (e) {
    alert(e);
  }
  }

  function deleteNote(noteKey) {
    const newNoteData = noteData.slice();
    const toDelete = newNoteData.indexOf(newNoteData.find(note => note.timestamp === noteKey));
    newNoteData.splice(toDelete, 1);
    setNoteData(newNoteData);
    saveNoteData(notesFileHandle, newNoteData);
  } 

  return (
    <>
      <h1>Noteify</h1>
      <NewButton onCreate={createNote}/>
      <NoteList
        noteDataList={noteData} onDelete={deleteNote}
      />
    </>
  );
}
