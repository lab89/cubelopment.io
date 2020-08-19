import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Modal, Button, InputGroup, FormControl} from 'react-bootstrap'
import CubeArea from './CubeArea/CubeArea'
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './stores/reducers';
import {checkIndexedDB, saveConfig, createOperation} from './actions/action'
import guify from 'guify'
import {ConfigState} from "./stores/ConfigReducer";
import { EventDispatcher } from 'EventDispatcher';
import { OperationState } from './stores/OperationReducer';
interface ConfigUIs {
  colorConfigUI: Array<any>,  
  operationConfigUI : Array<any>
}

class GUI {
  public gui: any;
  private configUIs:ConfigUIs; 
  public eventDispatcher = new EventDispatcher(['SAVE_COLOR_CONFIG', 'ANIMATE', 'STOP', 'PAUSE', 'REMOVE', 'CREATE_OPERATION']);
  constructor(guiObject: any){
    this.gui = guiObject;
    this.configUIs = {
      colorConfigUI: [],
      operationConfigUI : [],
    }     
    this._initBasicConfigUI();
  }

  private _initBasicConfigUI(){
    this.gui.Register({
      type: 'title',
      label: 'App Config'
    })
    this.gui.Register({
      type : 'folder',
      label : 'Color Config',
      open : false
    })
    this.gui.Register({
      type: 'title',
      label: 'Operation Action'
    });
    this.gui.Register({
      type : 'folder',
      label : 'Operation Action',
      open : true
    });
    this.gui.Register({
      type : 'button',
      label : 'Create Operation',
      folder : 'Operation Action',      
      action: () => {          
        this.eventDispatcher.trigger('CREATE_OPERATION')      
      }
    });
    
    this.gui.Register({
      type : 'button',
      label : 'Animate',
      folder : 'Operation Action',      
      action: () => {                
      }
    });
    this.gui.Register({
      type : 'button',
      label : 'Stop',
      folder : 'Operation Action',      
      action: () => {                
      }
    });
    this.gui.Register({
      type : 'button',
      label : 'Pause',
      folder : 'Operation Action',      
      action: () => {                
      }
    });
    this.gui.Register({
      type: 'title',
      label: 'Operations'
    });
    this.gui.Register({
      type : 'folder',
      label : 'Operations',
      open : true
    });
  }

  private _initializeAppConfigUI(data: ConfigState){
    this._colorConfigUI(data);
  }

  private _colorConfigUI(data: ConfigState){
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type: 'folder',
      label: 'Sticker Config',
      folder : 'Color Config',
      open: true
    }));
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type: 'color',
      label: 'front',
      format: 'rgb',
      folder : 'Sticker Config',
      object: data,
      property: 'f',
    }));
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type: 'color',
      label: 'back',
      format: 'rgb',
      folder : 'Sticker Config',
      object: data,
      property: 'b',
    }));
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type: 'color',
      label: 'up',
      format: 'rgb',
      folder : 'Sticker Config',
      object: data,
      property: 'u',
    }));
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type: 'color',
      label: 'down',
      format: 'rgb',
      folder : 'Sticker Config',
      object: data,
      property: 'd',
    }));
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type: 'color',
      label: 'left',
      format: 'rgb',
      folder : 'Sticker Config',
      object: data,
      property: 'l',
    }));
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type: 'color',
      label: 'right',
      format: 'rgb',
      folder : 'Sticker Config',
      object: data,
      property: 'r',
    }));
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type: 'folder',
      label: 'Marker Config',
      folder : 'Color Config',
      open: true
    }));
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type: 'color',
      label: 'marker color',
      format: 'rgb',
      folder : 'Marker Config',
      object: data,
      property: 'marker',
    }));
    this.configUIs.colorConfigUI.push(this.gui.Register({
      type : 'button',
      label : 'save',
      folder : 'Color Config',      
      action: () => {        
        this.eventDispatcher.trigger('SAVE_COLOR_CONFIG', { data : data});
      }
    }));
  }

  public operationUI(operationArray: Array<OperationState>){
    if(operationArray.length){
      this.gui.Register({ 
        type: 'select', 
        label: 'Animation Target', 
        options: ["all", ...operationArray.map((operation)=> operation.description)] ,
        folder : 'Operation Action',      
      })
    }
    
    operationArray.forEach((operation: OperationState)=>{
            this.gui.Register({
        type : 'folder',
        label : operation.description,
        folder : 'Operations',
        open : true
      });
      this.gui.Register({
        type : 'text',
        label : 'description',
        initial : operation.description,
        folder : operation.description,
      });
      this.gui.Register({
        type : 'text',
        label : 'operation',
        initial : operation.operation,
        folder : operation.description,
      });    
    })    
  }

  public updateAppConfigUI(data: ConfigState){
    if(this.configUIs.colorConfigUI.length > 0){      
      this.configUIs.colorConfigUI.forEach((ui)=> this.gui.Remove(ui))      
      this.configUIs.colorConfigUI = [];
    }
    this._initializeAppConfigUI(data);
  }
}


// https://github.com/colejd/guify
const dat_gui = new GUI(new guify({
  title: 'cubelopment.io',
  theme: 'dark', // dark, light, yorha, or theme object
  align: 'right', // left, right
  width: 300,
  barMode: 'none', // none, overlay, above, offset
  panelMode: 'inner',
  opacity: 0.95,
  open: true
}));

function App() {
  const {stickerConfig}: ConfigState = useSelector((state: RootState)=> state.configReducer);
  const operations = useSelector((state: RootState)=> state.operationReducer);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleAfterSaveClose = () => {
    console.log(description?.current?.value)    
    // setShow(false)
  };

  const handleShow = () => setShow(true);
  
  const description: null | {current : any} = useRef(null);
  
  useEffect(()=>{
    console.log("%c CHECK_INDEXED_DB", 'background: #222; color: #bada55') 
    dat_gui.eventDispatcher.on('SAVE_COLOR_CONFIG', (event: any)=>{ dispatch(saveConfig(event.data))})   
    dat_gui.eventDispatcher.on('CREATE_OPERATION', (event: any)=> { dispatch(createOperation())})
    dispatch(checkIndexedDB())
  }, []); //once

  useEffect(()=>{
    console.log("%c App useEffect stickerConfig", 'background: #222; color: #bada55')
    console.log(stickerConfig);
    if(Object.keys(stickerConfig).length){
      dat_gui.updateAppConfigUI(stickerConfig as ConfigState);
    }
    
  },[stickerConfig])
  useEffect(()=>{
    console.log("%c App useEffect operations", 'background: #222; color: #bada55')
    console.log(operations);   
    dat_gui.operationUI(operations);
  },[operations])

  return (
    <>
    <Container fluid>
      <Row>
        <Col sm={10} style={{padding : "0px"}}>
          <CubeArea/>
        </Col>
        <Col sm={2} style={{padding : "0px"}}>
        </Col>
      </Row>        
    </Container>
    <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Make Operation</Modal.Title>
        </Modal.Header>
        <Modal.Body>          
          <InputGroup>          
            <FormControl ref={description} type="text"
              placeholder="input operation's description!"
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAfterSaveClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
