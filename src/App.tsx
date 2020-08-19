import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'
import CubeArea from './CubeArea/CubeArea'
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './stores/reducers';
import {checkIndexedDB, saveConfig} from './actions/action'
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
  const {stickerConfig} = useSelector((state: RootState)=> state.configReducer);
  const operations = useSelector((state: RootState)=> state.operationReducer);
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("%c CHECK_INDEXED_DB", 'background: #222; color: #bada55')
    dispatch(checkIndexedDB())
  }, []); //once

  useEffect(()=>{
    console.log("%c App useEffect", 'background: #222; color: #bada55')
    console.log(stickerConfig);
    console.log(operations);
    if(Object.keys(stickerConfig).length && gui.loadedComponents.length === 0){
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
        object: stickerConfig,
        property: 'f',
      });
      gui.Register({
        type: 'color',
        label: 'back',
        format: 'rgb',
        folder : 'Sticker Config',
        object: stickerConfig,
        property: 'b',
      });
      gui.Register({
        type: 'color',
        label: 'up',
        format: 'rgb',
        folder : 'Sticker Config',
        object: stickerConfig,
        property: 'u',
      });
      gui.Register({
        type: 'color',
        label: 'down',
        format: 'rgb',
        folder : 'Sticker Config',
        object: stickerConfig,
        property: 'd',
      });
      gui.Register({
        type: 'color',
        label: 'left',
        format: 'rgb',
        folder : 'Sticker Config',
        object: stickerConfig,
        property: 'l',
      });
      gui.Register({
        type: 'color',
        label: 'right',
        format: 'rgb',
        folder : 'Sticker Config',
        object: stickerConfig,
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
            object: stickerConfig,
            property: 'marker',
        });
      gui.Register({
          type: 'button',
          label: 'SAVE',
          folder : 'Color Config',
          action: () => {
              dispatch(saveConfig(stickerConfig))
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
      gui.Register({
        type : 'button',
        label : 'Remove',
        folder : 'description1'
      });
      gui.Register({
        type : 'button',
        label : 'Save',
        folder : 'description1'
      });
    }
    console.log(gui)
  },[stickerConfig])

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
