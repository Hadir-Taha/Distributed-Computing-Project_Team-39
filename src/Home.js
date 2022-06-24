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
return (
    <div className="parent-container">
      <Navbar variant="dark" sticky="top">
        <Navbar.Brand  style={{ "font-weight":"bold", "font-style":"italic" }}>Write It!</Navbar.Brand>
      </Navbar>
      <div className="home-container">
        <Card style={{ width: '110rem' }} className="home-card">
          <Card.Img variant="top"  src={logo} style={{ height: '100%', width: "40rem" }} />
          <Card.Body style={{ width: '22rem' }}>
            <input
              value={docId}
              onChange={inputHandler}
              placeholder="Document ID"
              type="text"
            />
       );
};

export default HomeScreen