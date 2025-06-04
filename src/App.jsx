import { useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Home from "./pages/Home.jsx";
import Welcome from "./pages/Welcome";
import NoteEditor from "./pages/NoteEditor";

import "./App.css";

/**
 * The app.
 * @returns {React.JSX.Element}
 */
function App() {
  /**@type {[?FileSystemFileHandle, ?React.Dispatch<FileSystemFileHandle>]} */
  const [notesFileHandle, setNotesFileHandle] = useState(null);

  function handleFinishUpload(notesFileHandle) {
    setNotesFileHandle(notesFileHandle);
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            index
            path="/"
            element={
              <Suspense fallback={<h2>Loading notes...</h2>}>
                <Home notesFileHandle={notesFileHandle} />
              </Suspense>
            }
          />
          <Route
            path="/welcome"
            element={<Welcome onFinish={handleFinishUpload} />}
          />
          <Route
            path="/editnote"
            element={<NoteEditor notesFileHandle={notesFileHandle} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
