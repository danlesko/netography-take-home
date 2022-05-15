import { useSelector } from 'react-redux'
import {useEffect, useState} from "react";
import { Container, Form, Nav, Spinner} from "react-bootstrap";
import LaunchGraph from "./LaunchGraph";
import "./App.css"

function App() {

  const launches = useSelector(state => state.launches)

  const [localLaunches, setLocalLaunches] = useState([])
  const [yearArr, setYearArr] = useState([])
  const [shipNameArr, setShipNameArr] = useState([])
  const [dataSeries, setDataSeries] = useState([])
  const [filterShip, setFilterShip] = useState("all")
  const [successFailAll, setSuccessFailAll] = useState("all")

  // Get launches from global store and also create year buckets / get ship names
  useEffect(()=>{
    if(launches != null) {
      setLocalLaunches(launches)
      setYearArr([...new Set(launches.map(item => item.launch_year))])
      setShipNameArr([...new Set(launches.map(item => item.rocket.rocket_id))])
    }
  },[launches])

  // Format data to be sent to the HighCharts api
  useEffect(()=>{
    let series = []

    if(filterShip === "all") {
      for (let i = 0; i < shipNameArr.length; i++) {
        let entry = {
          'name': shipNameArr[i],
          'data': []
        }
        for (let j = 0; j < yearArr.length; j++) {
          if (successFailAll === "all") {
            let filteredArr = localLaunches.filter(item => item.rocket.rocket_id === shipNameArr[i] && item.launch_year === yearArr[j])
            entry.data.push(filteredArr.length)
          } else if (successFailAll === "success") {
            let filteredArr = localLaunches.filter(item => item.rocket.rocket_id === shipNameArr[i] && item.launch_year === yearArr[j] && item.launch_success === true)
            entry.data.push(filteredArr.length)
          } else if (successFailAll === "failure") {
            let filteredArr = localLaunches.filter(item => item.rocket.rocket_id === shipNameArr[i] && item.launch_year === yearArr[j] && item.launch_success === false)
            entry.data.push(filteredArr.length)
          }
        }
        series.push(entry)
      }
      setDataSeries(series)
    } else {
      let entrySuccess = {
        'name': 'success',
        'data': []
      }
      let entryFailure = {
        'name': 'failure',
        'data': []
      }
      for (let j = 0; j < yearArr.length; j++) {
        let filteredArr = localLaunches.filter(item => item.rocket.rocket_id === filterShip && item.launch_year === yearArr[j]  && item.launch_success === true)
        entrySuccess.data.push(filteredArr.length)
        let filteredArr2 = localLaunches.filter(item => item.rocket.rocket_id === filterShip && item.launch_year === yearArr[j]  && item.launch_success === false)
        entryFailure.data.push(filteredArr2.length)
      }
      series.push(entryFailure)
      series.push(entrySuccess)
      setDataSeries(series)
    }

  },[shipNameArr, localLaunches, filterShip, successFailAll, yearArr])

  const handleChange = (e) => {
    let shipName = e.target.value
    setFilterShip(shipName)
    setSuccessFailAll("all")
  }

  const handleSelect = (e) => {
    let totalSuccessFail = e.target.value
    setSuccessFailAll(totalSuccessFail)
  }

  return (
      <Container>
        <Nav activeKey="/home" >
          <Nav.Item>
            <Nav.Link><h2>SpaceX Launch Data</h2></Nav.Link>
          </Nav.Item>
        </Nav>
        {localLaunches.length === 0 ? (
            <div className={"spinners"}>
              <Spinner animation="grow" variant="primary" />
              <Spinner animation="grow" variant="secondary" />
              <Spinner animation="grow" variant="success" />
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="info" />
              <Spinner animation="grow" variant="dark" />
            </div>
        ) : (
            <>
              <LaunchGraph bucket={yearArr} series={dataSeries} shipName={filterShip}/>
              <Form>
                <Form.Group className="md-3">
                  <div className={'col-md-3'}>
                    <Form.Label>Ship Name</Form.Label>
                    <Form.Select onChange={handleChange}>
                      <option name={"all"} value={"all"}>All</option>
                      <option name={"falcon1"} value={"falcon1"}>falcon1</option>
                      <option name={"falcon9"} value={"falcon9"}>falcon9</option>
                      <option name={"falconheavy"} value={"falconheavy"}>falconheavy</option>
                    </Form.Select>
                  </div>
                  <br />
                  { filterShip === "all" && (
                      <>
                        <Form.Check
                            defaultChecked={"true"}
                            inline
                            label="All"
                            name="group1"
                            value={"all"}
                            type={'radio'}
                            id={'inline-radio-1'}
                            onChange={e => handleSelect(e)}
                        />
                        <Form.Check
                            inline
                            label="Successful"
                            name="group1"
                            value={"success"}
                            type={'radio'}
                            id={'inline-radio-2'}
                            onChange={e => handleSelect(e)}
                        />
                        <Form.Check
                            inline
                            label="Failure"
                            name="group1"
                            value={"failure"}
                            type={'radio'}
                            id={'inline-radio-3'}
                            onChange={e => handleSelect(e)}
                        />
                      </>
                  )
                  }
                </Form.Group>
              </Form>
            </>
        )}
      </Container>
  )
}

export default App
