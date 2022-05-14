import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux'
import {useEffect, useState} from "react";
import {Col, Container, Nav, Row} from "react-bootstrap";

function App() {

  const launches = useSelector(state => state.launches)

  const [localLaunches, setLocalLaunches] = useState([])
  const [yearArr, setYearArr] = useState([])

  useEffect(()=>{
    setLocalLaunches(launches)
    setYearArr([...new Set(launches.map(item => item.launch_year))])
  },[launches])

  useEffect(()=>{
    console.log(yearArr)
  },[yearArr])

  return (
      <Container>
        <Nav activeKey="/home" >
          <Nav.Item>
            <Nav.Link><h2>SpaceX Launch Data</h2></Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
  )
}

export default App
