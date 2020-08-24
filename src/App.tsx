import React from 'react';
import CubeArea from './CubeArea/CubeArea'
import AppConfigPanel from './PanelArea/AppConfigPanel/AppConfigPanel'
import OperationConfigPanel from './PanelArea/OperationConfigPanel/OperationConfigPanel'
import {Container, Row, Col} from 'react-bootstrap'
import './App.css';
import { ConfigState } from './stores/ConfigReducer';
import { useSelector } from 'react-redux';
import { RootState } from './stores/reducers';

function App() {
  const {cubeConfig}: ConfigState = useSelector((state: RootState)=> state.configReducer);

  return (
    <>
    <Container fluid>
      <Row>               
        <Col sm={10} style={{padding : "0px"}}>
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
