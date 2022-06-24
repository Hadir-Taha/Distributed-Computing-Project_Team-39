import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import './Home.css';
import logo from './HomePageLogo.png'

const HomeScreen = ({ docId, setDocId }) => {
  const inputHandler = (e) => {
    setDocId(e.target.value);
  };
