import React from "react"
import { Link } from 'react-router'
import { useState } from 'react';
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./AuthContext"
import { BrowserRouter as Router, Switch, Route , Redirect} from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import { v4 as uuidV4 } from 'uuid';
import HomeScreen from "./Home"
import TextEditor from "./text-editor"

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
