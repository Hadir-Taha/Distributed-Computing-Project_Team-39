import { useCallback, useEffect, useState } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import io from 'socket.io-client';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import logo from './HomePageLogo.png'
const HEROKU_ADD = 'https://fresh-edit-server.herokuapp.com/';

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //different heading styles
            [{ font: [] }],  //different font types
            [{ list: "ordered" }, { list: "bullet" }],  //lists types
            [{ 'direction': 'rtl' }],   //left or right placement of text to be able to write different lang.
            [{ 'indent': '-1'}, { 'indent': '+1' }],   //indentation of text
            [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }], //alignment of text
            [{ size: [ 'small', false, 'large', 'huge' ]}], //another font sizes
            ["bold", "italic", "underline"], //for different styling of font
            [{ color: [] }, { background: [] }], //to change text color or the background color
            [{ script: "sub" }, { script: "super" }], //for making superscript or subscript
            ["image", "blockquote", "code-block","link","video","formula"], //to add various options rather than text
            ["clean"],
];
const TextEditor = () => {
  const [socket, setSocket] = useState(); //variable socket creation with empty initial value
  const [quill, setQuill] = useState();  //variable quill creation with empty initial value
  const { id: documentId } = useParams(); //variable id creation that will hold the id of each document

  // creation of the layout of the editor using react-hook functions
  const WrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const q = new Quill(editor, {   //creation of q variable that hold tha quill with the following features
      theme: 'snow',   //to add the tool bar
      modules: { toolbar: TOOLBAR_OPTIONS },
      history: {
        delay: 1500,
        userOnly: true,
      },
    });
    q.disable();
    q.setText('');
    setQuill(q);
  }, []);

  //connection of the server using socket.io functionalities & react-hook
  useEffect(() => {
    const s = io(HEROKU_ADD);  //creating a variable that will hold the URL of the server
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  // Recieving the updates and sending them to the server
  useEffect(() => {
    if (socket == null || quill == null) return; //check whether socket & quill have values or no
    const handler = (delta, oldDelta, source) => {  //handler fn creation with the parameters indicating the updated data, old data & user
      if (source !== 'user') return;
      socket.emit('Transfer-updates to server', delta); //socket send delta(updates) to the server
    };
    quill.on('New-text added', handler); //wait until new updates are made and transfer if to handler

    return () => {
      quill.off('New-text added', handler);
    };
  }, [socket, quill]);

  // update the tenor of the document
  useEffect(() => {
    if (socket == null || quill == null) return; //check whether socket & quill have values or no
    const handler = (delta) => {
      quill.updateContents(delta);  //transfer updates to all users
    };
    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [socket, quill]);

  useEffect(() => {  //for saving new content of document every 1.5 seconds
    const interval = setInterval(() => {
      socket.emit('saving-document', quill.getContents());
    }, 1500);

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
<div className="home-card">
//button to copy the id of the document
<Button className="like_button" onClick={() => {
        setShow(true)
        navigator.clipboard.writeText(documentId)
      }} style={{ "position": "absolute", "right": 0 }}>
        Copy ID
      </Button>
      //button the refer to the main home page
      <Link to="/" className="like_button" style={{ "position": "absolute", "left": 0  }}>Home</Link>
      //div for holding the main text editor
      <div className="container" ref={WrapperRef}></div>
  </div>
  );
};

export default TextEditor;