import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import NoteList from '@components/NoteList.jsx';
import NewButton from '@components/NewButton.jsx';

import Home from './pages/Home';
import Welcome from './pages/Welcome';

import './App.css';

export default function App() {
  const [notesLoaded, setNotesLoaded] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path='/' element={notesLoaded ? <Home /> : <Navigate to='/welcome' />} />
          <Route path='/welcome' element={<Welcome onFinish={() => setNotesLoaded(true)}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
