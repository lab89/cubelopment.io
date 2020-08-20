import React from 'react';
import CubeArea from './CubeArea/CubeArea'
import PanelArea from './PanelArea/PanelArea'
import {Container, Row, Col} from 'react-bootstrap'
import './App.css';

function App() {
  return (
    <>
    <Container fluid>
      <Row>
        <Col sm={10} style={{padding : "0px"}}>
          <CubeArea/>
        </Col>
        <Col sm={2} style={{padding : "0px"}}>
          <PanelArea/>
        </Col>
      </Row>        
    </Container>    
    </>
  );
}

export default App;
