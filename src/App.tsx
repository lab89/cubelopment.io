import React, { useRef, useState } from 'react';
import CubeArea from './CubeArea/CubeArea'
import AppConfigPanel from './PanelArea/deleteSoon/AppConfigPanel/AppConfigPanel'
import OperationConfigPanel from './PanelArea/deleteSoon/OperationConfigPanel/OperationConfigPanel'
import {Container, Row, Col, InputGroup, FormControl, ButtonGroup, Button, ListGroup, Overlay, Tooltip} from 'react-bootstrap'
import './App.css';
import { ConfigState } from './stores/ConfigReducer';
import { useSelector } from 'react-redux';
import { RootState } from './stores/reducers';
import { BlockPicker } from 'react-color';
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
          {/* <CubeArea/> */}
        </Col>             
        {/* , backgroundColor: (cubeConfig as any).backgroundColor}} */}
        <Col sm={2} style={{padding : "0px"}}> 
        {/* <>
          <Button variant="danger" ref={target} onClick={() => setShow(!show)}>
            Click me to see
          </Button>
          <Overlay target={target.current} show={show} placement='bottom'>
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
              <div
                {...props}
                style={{     
                  top : "10px",                    
                  ...props.style,
                }}
              >
                <div style={{position:"relative", top : "10px"}}>
                  <BlockPicker />
                </div>
                
              </div>
            )}
          </Overlay>
        </>                */}

          
        </Col>        
        {/* , backgroundColor: (cubeConfig as any).backgroundColor}}  */}
        <Col sm={2} style={{padding : "10px"}}>
          <AppPanel/>
          {/* <AppConfigPanel/> */}
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
