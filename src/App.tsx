import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'
import CubeArea from './CubeArea/CubeArea'
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './stores/reducers';
import {CHECK_INDEXED_DB} from './enums/actionEnum'
import guify from 'guify'

function datGUI(guiObject: any){
  let gui: any = guiObject;
  return function(){
    return gui;
  }
}

// https://github.com/colejd/guify
const gui = datGUI(new guify({
  title: 'Test App',
  theme: 'dark', // dark, light, yorha, or theme object
  align: 'right', // left, right
  width: 300,
  barMode: 'none', // none, overlay, above, offset
  panelMode: 'inner',
  opacity: 0.95,
  open: true
}))();

function App() {
  const {cube, marker} = useSelector((state: RootState)=> state.appReducer.stickerConfig);
  const dispatch = useDispatch();  
  
  useEffect(()=>{            
    console.log("%c actionEnum.CHECK_INDEXED_DB", 'background: #222; color: #bada55')    
    dispatch({type : CHECK_INDEXED_DB})
  }, []) //once

  useEffect(()=>{
    console.log("%c App useEffect", 'background: #222; color: #bada55')
    console.log(cube);
    if(cube){
      gui.Register({
        type: 'folder',
        label: 'Sticker Config',
        open: true
      });
      gui.Register({
        type: 'color',
        label: 'f',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'f',
      });
      gui.Register({
        type: 'color',
        label: 'b',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'b',
      });
      gui.Register({
        type: 'color',
        label: 'u',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'u',
      });
      gui.Register({
        type: 'color',
        label: 'd',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'd',
      });
      gui.Register({
        type: 'color',
        label: 'l',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'l',
      });
      gui.Register({
        type: 'color',
        label: 'r',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'r',
      });      
    }
    console.log(gui)
  },[cube])

  return (
    <Container fluid>    
      <Row>
        <Col sm={12} style={{padding : "0px"}}>
          <CubeArea/>
        </Col>                
      </Row>
    </Container>
  );
}

export default App;
