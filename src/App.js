import './App.css';
import TextEditor from './text-editor';
import HomeScreen from './Home';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

function App() {
    const [Id, setId] = useState('');
  return (
      <Router>
      <Routes>
               <Route path="/" element={ <HomeScreen docId={docId} setDocId={setDocId} />} />
               <Route path="/rooms" element={  <Navigate to={`/rooms/documents/${uuidV4()}`} />} />
               <Route path="/rooms/documents/:id" element={ <TextEditor />} />
      </Routes>
    </Router>

  );
}

export default App;
