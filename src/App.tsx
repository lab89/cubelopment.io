import React, { useRef, useState } from 'react';
import CubeArea from './CubeArea/CubeArea'
import {Container, Row, Col, InputGroup, FormControl, ButtonGroup, Button, ListGroup, Overlay, Tooltip} from 'react-bootstrap'
import './App.css';
import { ConfigState } from './stores/ConfigReducer';
import { useSelector } from 'react-redux';
import { RootState } from './stores/reducers';
import AppPanel from './PanelArea/AppPanel/AppPanel'

function App() {
  const {cubeConfig}: ConfigState = useSelector((state: RootState)=> state.configReducer);
  const textAreaContent = useRef(null);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  function keydown(e: any){
    console.log(e.target.value);
  }
  return (
    <>
    <Container fluid>
      <Row>       
        <Col sm={8} style={{padding : "0px"}}>
          <CubeArea/>
        </Col>                     
        {/* , backgroundColor: (cubeConfig as any).backgroundColor}}  */}
        <Col sm={4} style={{padding : "10px"}}>
          <AppPanel/>
        </Col>
        
        {/* https://github.com/SortableJS/react-sortablejs 요걸로 어케 만들어보기 */}
        {/* <Col sm={2} style={{padding : "0px", backgroundColor: (cubeConfig as any).backgroundColor}}>
                    <OperationConfigPanel/>

        </Col>         */}
      </Row>        
    </Container>    
    </>
  );
}

export default App;
