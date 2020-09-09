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
        <Col md={10} style={{padding : "0px", width: "100%", height : "100vh"}}>
          <CubeArea/>
        </Col>                     
        {/* , backgroundColor: (cubeConfig as any).backgroundColor}}  */}
        <Col md={2} style={{padding : "0px", height : "100vh"}}>
          <AppPanel/>
        </Col>
      </Row>        
    </Container>    
    </>
  );
}

export default App;
