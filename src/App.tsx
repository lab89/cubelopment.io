import React, { useRef, useState } from 'react';
import CubeArea from './CubeArea/CubeArea'
import AppConfigPanel from './PanelArea/AppConfigPanel/AppConfigPanel'
import OperationConfigPanel from './PanelArea/OperationConfigPanel/OperationConfigPanel'
import {Container, Row, Col, InputGroup, FormControl, ButtonGroup, Button, ListGroup} from 'react-bootstrap'
import './App.css';
import { ConfigState } from './stores/ConfigReducer';
import { useSelector } from 'react-redux';
import { RootState } from './stores/reducers';


function App() {
  const {cubeConfig}: ConfigState = useSelector((state: RootState)=> state.configReducer);
  const textAreaContent = useRef(null);


  function keydown(e: any){
    console.log(e.target.value);
  }
  return (
    <>
    <Container fluid>
      <Row>                    
        <Col sm={2} style={{padding : "0px", backgroundColor: (cubeConfig as any).backgroundColor}}>                      
          <div style={{margin : "10px"}}>
            {/* 입력된거 파싱해서 */}
            <InputGroup>
              <FormControl as="textarea" style={{resize : "none"}} aria-label="With textarea" onKeyDown={keydown} rows={15} cols={15}/>
            </InputGroup>     
          </div>          
          <div style={{margin : "10px"}} className= "text-center" >
            {/* 이거 클릭하면 */}
            <Button variant="info">Apply</Button>{' '}
          </div>          
          <div style={{margin : "10px"}}>
            {/* 목록으로 출력한다 */}
            <ListGroup>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </div>          
          {/* 버튼에 맞는 동작을 구현한다, 현재 무슨 operation 진행 중인지 표현한다 */}
          <div style={{margin : "10px"}} className= "text-center" >
            <Button variant="info">Before</Button>{' '}
            <Button variant="info">Auto</Button>{' '}
            <Button variant="info">Pause</Button>{' '}
            <Button variant="info">Stop</Button>{' '}
            <Button variant="info">Next</Button>{' '}            
          </div>    
        </Col>
        <Col sm={8} style={{padding : "0px"}}>
          <CubeArea/>
        </Col>
        <Col sm={2} style={{padding : "0px", backgroundColor: (cubeConfig as any).backgroundColor}}>
          <AppConfigPanel/>
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
