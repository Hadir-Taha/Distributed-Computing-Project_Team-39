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
//defining th different paths & where each path will lead us to
//path "/" will lead us to the home page
//path "/rooms" will lead us to the texteditor but with random id
// path "/rooms/documents/:id" will lead us to the texteditor with specific id for certain document
function App() {
//creation of variable docID that will hold empty value at the beginning
    const [docId, setDocId] = useState('');
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
