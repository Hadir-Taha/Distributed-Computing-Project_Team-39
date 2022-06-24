import { useCallback, useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import io from 'socket.io-client';
import Quill from 'quill';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import logo from './HomePageLogo.png'
const HEROKU_ADD = 'https://write-it-editor-server.herokuapp.com/';
const HEROKU_ADD2='https://alternative-server.herokuapp.com/';
//the toolbar options that the user can use
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],   //header values to show different font sizes
            [{ font: [] }],  //different font types
            [{ list: "ordered" }, { list: "bullet" }],  //ordered&unordered list
            [{ 'direction': 'rtl' }],   //left or right placement of text
            [{ 'indent': '-1'}, { 'indent': '+1' }],   //moving the text
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], //alignement of text
            [{ size: [ 'small', false, 'large', 'huge' ]}], //font sizes different from the headers
            ["bold", "italic", "underline"], //for different looks of text
            [{ color: [] }, { background: [] }], //to change text color or the background color
            [{ script: "sub" }, { script: "super" }], //for making superscript or subscript
            ["image", "blockquote", "code-block","link","video","formula"], //to add various options rather than text
            ["clean"],
];
//Creation of the object of the texteditor component
const TextEditor = () => {
//create socket variable using react-hook functionality
  const [socket, setSocket] = useState();
 //create quill variable using react-hook functionality
  const [quill, setQuill] = useState();
 //return ID from URL & store it in the documentID using Useparams()
  const { id: documentId } = useParams();
  //set up the editor
  const WrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {
      theme: 'snow',
      modules: { toolbar: TOOLBAR_OPTIONS },
      history: {
        delay: 2000,
        userOnly: true,
      },
    });
    q.disable();
    q.setText('');
    setQuill(q);
  }, []);
 // Setting up the connection to server
  useEffect(() => {
    const s = io(HEROKU_ADD);
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);
  // capturing the changes and sending it to the server
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };
    quill.on('text-change', handler);
    return () => {
      quill.off('text-change', handler);
    };
  }, [socket, quill]);
  };
