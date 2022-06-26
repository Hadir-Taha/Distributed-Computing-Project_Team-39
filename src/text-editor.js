import React from 'react'
import ReactDOM from 'react-dom'
import { useCallback, useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './text.css';

import logo from './HomePageLogo.png'
const HEROKU_ADD = 'https://git.heroku.com/writeitapp.git';

const TOOLBAR_OPTIONS = [
[{ header: [1, 2, 3, 4, 5, 6, false] }], //header values to show different font sizes
[{ font: [] }], //different font types
[{ list: "ordered" }, { list: "bullet" }], //ordered&unordered list
[{ 'direction': 'rtl' }], //left or right placement of text
[{ 'indent': '-1'}, { 'indent': '+1' }], //moving the text
[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], //alignement of text
[{ size: [ 'small', false, 'large', 'huge' ]}], //font sizes different from the headers
["bold", "italic", "underline","strike"], //for different looks of text
[{ color: [] }, { background: [] }], //to change text color or the background color
[{ script: "sub" }, { script: "super" }], //for making superscript or subscript
["image", "blockquote", "code-block","link","video","formula"], //to add various options rather than text
["clean"],
];

const TextEditor = () => {
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const { id: documentId } = useParams();
  const [show, setShow] = useState(false);

  // setting up the editor
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
    q.setText(' ');
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

  // update content with the changes made
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  useEffect(() => {
    const interval = setInterval(() => {
      socket.emit('save-doc', quill.getContents());
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once('load-document', (document) => {
      quill.setContents(document);
      quill.enable();
    });

    socket.emit('get-document', documentId);
  }, [socket, quill, documentId]);


  // html for the text editor
  return (

<div className="home-cardd"
>
<Button className="like_button" onClick={() => {

        navigator.clipboard.writeText(documentId)
      }} style={{ "position": "absolute", "right": 0 ,"margin-top":"-0.7in"}}>
        Copy ID
      </Button>

      <Link to="/" className="like_button" style={{ "position": "absolute", "left": 0 ,"margin-top":"-0.7in" }}>Home</Link>

      <div className="container" ref={WrapperRef}></div>
  </div>
  );
};

export default TextEditor;

