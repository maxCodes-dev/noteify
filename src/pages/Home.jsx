import { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router";

/** @import { NoteData } from '../typedefs.js' */

import NoteList from "@components/NoteList.jsx";
import NewButton from "@components/NewButton.jsx";

import { saveNoteFile } from "@src/handleData";

import "./Home.css";

/**
 * Home page.
 * @param {Object} props - Properties of the component.
 * @param {FileSystemFileHandle} props.notesFileHandle - File handle for reading note data.
 * @returns
 */
export default function Home({ notesFileHandle }) {
  if (notesFileHandle === null) {
    // alert("no file handle");
    return <Navigate to="/welcome" />;
  }
  // alert("in home");
  /**@type {NoteData[]} */
  const defaultData = [];
  const [noteData, setNoteData] = useState(defaultData);
  // alert(noteData.toString());
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Fetches the note data.
   * @returns {Promise<NoteData[]>} - The note data.
   */
  async function fetchNoteData() {
    const file = await notesFileHandle.getFile();
    const data = await file.text();
    return JSON.parse(data);
  }

  async function loadNoteFile() {
    const noteData = await fetchNoteData();
    setNoteData(noteData);
  }

  useEffect(() => {
    loadNoteFile();
  }, []);

  async function createNote() {
    try {
      /** @type {NoteData[]} */
      const newNoteData = noteData.slice();
      const timestamp = new Date(Date.now()).toISOString();
      newNoteData.push({ title: "Untitled", body: "", timestamp: timestamp });
      setNoteData(newNoteData);
      await saveNoteFile(notesFileHandle, newNoteData);
      navigate("/editnote", {
        state: {
          noteData: newNoteData,
          timestamp: timestamp,
          handle: notesFileHandle,
        },
      });
    } catch (e) {
      alert(e);
    }
  }

  function deleteNote(noteKey) {
    /** @type {NoteData[]} */
    const newNoteData = noteData.slice();
    const toDelete = newNoteData.indexOf(
      newNoteData.find((note) => note.timestamp === noteKey),
    );
    newNoteData.splice(toDelete, 1);
    setNoteData(newNoteData);
    saveNoteFile(notesFileHandle, newNoteData);
  }

  return (
    <>
      <h1>Noteify</h1>
      <NewButton onCreate={createNote} />
      <NoteList noteDataList={noteData} onDelete={deleteNote} />
    </>
  );
}
