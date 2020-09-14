import React from 'react';
import CubeArea from './CubeArea/CubeArea'
import {Container, Row, Col} from 'react-bootstrap'
import './App.css';
import AppPanel from './PanelArea/AppPanel/AppPanel'
import { toggleFaceColorPicker } from './actions/action';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();  
  function closeColorPicker(){
    dispatch(toggleFaceColorPicker(""))
  }
  return (
    <>
    <Container fluid>
      <Row>       
        <Col md={10} style={{padding : "0px", width: "100%", height : "100vh"}}>
          <CubeArea/>
        </Col>                     
        {/* , backgroundColor: (cubeConfig as any).backgroundColor}}  */}
        <Col md={2} style={{padding : "0px", height : "100vh"}} onClick={closeColorPicker}>
          <AppPanel/>
        </Col>
      </Row>        
    </Container>    
    </>
  );
}

export default App;
