import React from 'react';
import CubeArea from './CubeArea/CubeArea'
import {Container, Row, Col} from 'react-bootstrap'
import './App.css';
import AppPanel from './PanelArea/AppPanel/AppPanel'

function App() {
  return (
    <>
    <Container fluid>
      <Row>       
        <Col sm={8} style={{padding : "0px", width: "100%", height : "100vh"}}>
          <CubeArea/>
        </Col>                     
        {/* , backgroundColor: (cubeConfig as any).backgroundColor}}  */}
        <Col sm={4} style={{padding : "10px"}}>
          <AppPanel/>
        </Col>
      </Row>        
    </Container>    
    </>
  );
}

export default App;
