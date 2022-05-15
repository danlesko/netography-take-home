import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux'
import {useEffect, useState} from "react";
import {Col, Container, Nav, Row} from "react-bootstrap";
import LaunchGraph from "./LaunchGraph";

function App() {

  const launches = useSelector(state => state.launches)

  const [localLaunches, setLocalLaunches] = useState([])
  const [yearArr, setYearArr] = useState([])
  const [shipNameArr, setShipNameArr] = useState([])
  const [dataSeries, setDataSeries] = useState([])

  useEffect(()=>{
    if(launches != null) {
      setLocalLaunches(launches)
      setYearArr([...new Set(launches.map(item => item.launch_year))])
      setShipNameArr([...new Set(launches.map(item => item.rocket.rocket_id))])
    }
  },[launches])

  useEffect(()=>{
    let series = []

    for(let i = 0; i < shipNameArr.length; i++){
      let entry = {
        'name': shipNameArr[i],
        'data': []
      }
      for (let j = 0; j < yearArr.length; j++){
        let filteredArr = localLaunches.filter(item => item.rocket.rocket_id === shipNameArr[i] && item.launch_year === yearArr[j])
        let count = filteredArr.length
        console.log(count)
        entry.data.push(filteredArr.length)
      }
      series.push(entry)
    }

    //console.log(series)

    setDataSeries(series)
  },[shipNameArr, localLaunches])

  useEffect(()=>{
    // console.log(yearArr)
    // console.log(shipNameArr)
  },[yearArr])

  return (
      <Container>
        <Nav activeKey="/home" >
          <Nav.Item>
            <Nav.Link><h2>SpaceX Launch Data</h2></Nav.Link>
          </Nav.Item>
        </Nav>
        <LaunchGraph bucket={yearArr} series={dataSeries}/>
      </Container>
  )
}

export default App
