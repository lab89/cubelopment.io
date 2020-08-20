import React, {useEffect, useState, useRef} from 'react';
import guify from 'guify'
import { EventDispatcher } from 'EventDispatcher';
import { ConfigState } from '../stores/ConfigReducer';
import { OperationState } from '../stores/OperationReducer';
import { checkIndexedDB, saveConfig, saveOperations, createOperation } from '../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/reducers';
import {Container, Row, Col, Modal, Button, InputGroup, FormControl, Alert, Fade} from 'react-bootstrap'

interface ConfigUIs {
    colorConfigUI: Array<any>,  
    operationConfigUI : Array<any>
  }
  
class GUI {
    public gui: any;
    private configUIs:ConfigUIs; 
    public eventDispatcher = new EventDispatcher(['SAVE_COLOR_CONFIG', 'SAVE_OPERATIONS', 'CREATE_OPERATION']);
    private colorConfigData: ConfigState | null = null;
    private operationConfigData: Array<OperationState> | null = null;
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
        label : 'Save All',
        folder : 'Operation Action',      
        action: () => {          
            this.eventDispatcher.trigger('SAVE_OPERATIONS', {data : this.operationConfigData})
        }
        });  
        this.gui.Register({
        type : 'button',
        label : 'Remove All',
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
            this.eventDispatcher.trigger('SAVE_COLOR_CONFIG', { data : this.colorConfigData});
        }
        }));
    }


    public updateAppConfigUI(data: ConfigState){
        if(this.configUIs.colorConfigUI.length > 0){      
        this.configUIs.colorConfigUI.forEach((ui)=> this.gui.Remove(ui))      
        this.configUIs.colorConfigUI = [];
        }
        this._initializeAppConfigUI(data);
        this.colorConfigData = data;
    }

    public updateOperationUI(operationArray: Array<OperationState>){
        if(this.configUIs.operationConfigUI.length > 0){      
        this.configUIs.operationConfigUI.forEach((ui)=> this.gui.Remove(ui))      
        this.configUIs.operationConfigUI = [];
        }
        operationArray.forEach((operation: OperationState)=>{
        this.configUIs.operationConfigUI.push(this.gui.Register({
            type : 'folder',
            label : operation.description,
            folder : 'Operations',
            open : true
        }));
        this.configUIs.operationConfigUI.push(this.gui.Register({
            type : 'text',
            label : 'description',
            object: operation,
            property: 'description',        
            folder : operation.description,
        }));
        this.configUIs.operationConfigUI.push(this.gui.Register({
            type : 'text',
            label : 'operation',
            object: operation,
            property: 'operation',        
            folder : operation.description,
        }));  
        this.configUIs.operationConfigUI.push(this.gui.Register({
            type : 'button',
            label : 'Animate',
            folder : operation.description,
            action: () => {        
            }
        }));        
        this.configUIs.operationConfigUI.push(this.gui.Register({
            type : 'button',
            label : 'Remove',
            folder : operation.description,
            action: () => {        
            }
        }))
        })  
        this.operationConfigData = operationArray;
    }  
}


// https://github.com/colejd/guify
let dat_gui: any = null;


function PanelArea(){
    const {stickerConfig}: ConfigState = useSelector((state: RootState)=> state.configReducer);
    const operations = useSelector((state: RootState)=> state.operationReducer);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const description: null | {current : any} = useRef(null);
    const [warnMessage, setWarnMessage] = useState("");
    const handleClose = () => setShow(false);
    const handleAfterSaveClose = () => {    
        const inputedValue = description?.current?.value
        if(inputedValue.length){
        //중복 검사
        const duplicationCheckResult = operations.filter((operation) => inputedValue === operation.description)
        if(!duplicationCheckResult.length){
            setWarnMessage('')
            //make operation
            dispatch(createOperation(inputedValue));
            setShow(false);
        }else{
            setWarnMessage('duplication description name')
        }      
        }else{
        setWarnMessage('required description name')
        }    
    };
    const keyDownHander = (event: any) => {
        console.log(event.target.value.length);
        if(event.target.value.length === 0){
        setWarnMessage('required description name')
        }else{
        setWarnMessage('')
        }    
    }

    
    useEffect(()=>{
        console.log("%c CHECK_INDEXED_DB", 'background: #222; color: #bada55') 
        
        dat_gui = new GUI(new guify({
            title: 'cubelopment.io',
            theme: 'dark', // dark, light, yorha, or theme object
            align: 'right', // left, right
            width: "100%",            
            barMode: 'offset', // none, overlay, above, offset
            panelMode: 'inner',
            opacity: 0.95,
            root : document.getElementById('panelUI'),
            open: true
        }));

        dat_gui.eventDispatcher.on('SAVE_COLOR_CONFIG', (event: any)=>{ dispatch(saveConfig(event.data))})   
        dat_gui.eventDispatcher.on('CREATE_OPERATION', (event: any)=> { 
        setShow(true);
        })
        dat_gui.eventDispatcher.on('SAVE_OPERATIONS', (event: any)=>{dispatch(saveOperations(event.data))})
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
        dat_gui.updateOperationUI(operations);
    },[operations])

    return(
        <>
            <div className="min-vh-100" style={{"border": "1px solid green", "overflow" : "auto"}} id="panelUI"></div>
            <Modal show={show}>
                <Modal.Header closeButton>
                <Modal.Title>Make Operation</Modal.Title>
                </Modal.Header>
                <Modal.Body>          
                <InputGroup>          
                    <FormControl ref={description} type="text"
                    placeholder="input operation's description!"
                    onKeyUp = {keyDownHander}
                    />
                </InputGroup>
                <Fade in={warnMessage.length > 0}>
                    <Alert variant = "danger" show={warnMessage.length > 0}>{warnMessage}</Alert>
                </Fade>          
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
    )
}

export default PanelArea;