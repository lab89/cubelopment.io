import React from 'react';
import CubeArea from './CubeArea/CubeArea'
import AppConfigPanel from './PanelArea/AppConfigPanel/AppConfigPanel'
import OperationConfigPanel from './PanelArea/OperationConfigPanel/OperationConfigPanel'
import {Container, Row, Col} from 'react-bootstrap'
import './App.css';

function App() {
  return (
    <>
    <Container fluid>
      <Row>   
        <Col sm={2} style={{padding : "0px"}}>
          <AppConfigPanel/>
        </Col>      
        <Col sm={8} style={{padding : "0px"}}>
          <CubeArea/>
        </Col>
        <Col sm={2} style={{padding : "0px"}}>
          <OperationConfigPanel/>
        </Col>        
      </Row>        
    </Container>    
    </>
  );
}

export default App;
