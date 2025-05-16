import { useState } from 'react';
import { useLocation } from 'react-router';

import NoteList from '@components/NoteList.jsx';
import NewButton from '@components/NewButton.jsx';

import { saveNoteData } from '@src/handleData';

import './Home.css';

const hash = str => Array.from(str).reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0);


export default function Home() { try {
  const defaultData = [];
  const [noteData, setNoteData] = useState(defaultData);
  /**@type {FileSystemFileHandle} */
  const notesFileHandle = useLocation().state["notesFileHandle"];

  if (noteData === defaultData) {
    notesFileHandle.getFile()
        .then(file => file.text())
        .then(data => setNoteData(JSON.parse(data)));
  }

  function createNote() {
    /** @type {Array} */
    const newNoteData = noteData.slice();
    newNoteData.push({"title": "Untitled", "body": "", "timestamp": (new Date(Date.now())).toISOString()});
    setNoteData(newNoteData);
    saveNoteData(notesFileHandle, newNoteData);
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
} catch (e) {
  alert(e);
}
}
