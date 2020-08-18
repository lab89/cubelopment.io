import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'
import CubeArea from './CubeArea/CubeArea'
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './stores/reducers';
import {CHECK_INDEXED_DB, SAVE_CONFIG} from './enums/actionEnum'
import guify from 'guify'

function datGUI(guiObject: any){
  let gui: any = guiObject;
  return function(){
    return gui;
  }
}

// https://github.com/colejd/guify
const gui = datGUI(new guify({
  title: 'cubelopment.io',
  theme: 'dark', // dark, light, yorha, or theme object
  align: 'right', // left, right
  width: 300,
  barMode: 'none', // none, overlay, above, offset
  panelMode: 'inner',
  opacity: 0.95,
  open: true
}))();

function App() {
  const {cube} = useSelector((state: RootState)=> state.appReducer.stickerConfig);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("%c actionEnum.CHECK_INDEXED_DB", 'background: #222; color: #bada55')
    dispatch({type : CHECK_INDEXED_DB})
  }, []); //once

  useEffect(()=>{
    console.log("%c App useEffect", 'background: #222; color: #bada55')
    console.log(cube);
    if(cube && gui.loadedComponents.length === 0){
      gui.Register({
        type: 'title',
        label: 'App Config'
      });
      gui.Register({
          type : 'folder',
          label : 'Color Config',
          open : false
      });
      gui.Register({
        type: 'folder',
        label: 'Sticker Config',
        folder : 'Color Config',
        open: true
      });
      gui.Register({
        type: 'color',
        label: 'front',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'f',
      });
      gui.Register({
        type: 'color',
        label: 'back',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'b',
      });
      gui.Register({
        type: 'color',
        label: 'up',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'u',
      });
      gui.Register({
        type: 'color',
        label: 'down',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'd',
      });
      gui.Register({
        type: 'color',
        label: 'left',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'l',
      });
      gui.Register({
        type: 'color',
        label: 'right',
        format: 'rgb',
        folder : 'Sticker Config',
        object: cube,
        property: 'r',
      });

      gui.Register({
          type: 'folder',
          label: 'Marker Config',
          folder : 'Color Config',
          open: true
      });
      gui.Register({
            type: 'color',
            label: 'marker color',
            format: 'rgb',
            folder : 'Marker Config',
            object: cube,
            property: 'marker',
        });
      gui.Register({
          type: 'button',
          label: 'SAVE',
          folder : 'Color Config',
          action: () => {
              dispatch({type : SAVE_CONFIG, config: {
                      cube : cube
                  }});
          }
      });

      gui.Register({
          type: 'title',
          label: 'Operations'
      });
      gui.Register({
          type : 'folder',
          label : 'Operation Config',
          open : true
      });
      gui.Register({
          type: 'button',
          label: 'CREATE OPERATION',
          folder : 'Operation Config',
          action: () => {
              dispatch({type : SAVE_CONFIG, config: {
                      cube : cube
                  }});
          }
      });
      gui.Register({
          type : 'folder',
          label : 'description1',
          folder : 'Operation Config',
          open : true
      });
      gui.Register({
          type : 'button',
          label : 'Animate',
          folder : 'description1'
      });
      gui.Register({
          type : 'button',
          label : 'Stop',
          folder : 'description1'
      });
    }
    console.log(gui)
  },[cube])

  return (
    <Container fluid>
      <Row>
        <Col sm={10} style={{padding : "0px"}}>
          <CubeArea/>
        </Col>
        <Col sm={2} style={{padding : "0px"}}>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
