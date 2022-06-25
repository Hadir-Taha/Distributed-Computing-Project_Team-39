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
        <Navbar.Brand  style={{ "font-weight":"bold","font-size":"30px", "font-style":"italic", "color" : "white","margin-left":"2in"}}>Write It!</Navbar.Brand>
      </Navbar>
      <div className="home-container">
        <Card style={{ width: '110rem' }} className="home-card">
          <Card.Img variant="top"  src={logo} style={{ height: '100%', width: "40rem" , "margin-left":"-1.2in","margin-top":"0.8in"}} />
          <Card.Body style={{ width: '22rem' }}>
            <input
              value={docId}
              onChange={inputHandler}
              placeholder="Document ID"
              type="text"
            />
              <div className="home-btns-wrapper">
              <Link to={docId && `/rooms/documents/${docId}`}>
              <Button className="home-btns" >Open Document</Button>
              </Link>
              <Link to="/rooms">
               <Button className="home-btns">New Document</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
       );
};

export default HomeScreen