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