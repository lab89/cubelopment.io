import React, {useEffect, useState, useRef} from 'react';
import guify from 'guify'
import { EventDispatcher } from 'EventDispatcher';
import { ConfigState } from '../stores/ConfigReducer';
import { OperationState } from '../stores/OperationReducer';
import { checkIndexedDB, saveConfig, saveOperations, createOperation, removeOperation, removeOperations, toggleMirrorMode } from '../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores/reducers';
import { Modal, Button, InputGroup, FormControl, Alert, Fade} from 'react-bootstrap'
import { css3dEnv } from '../CubeArea/CubeArea';

interface ConfigUIs {
    colorConfigUI: Array<any>,  
    mirrorConfigUI: Array<any>,
    operationConfigUI : Array<any>
  }
  
class GUI {
    public gui: any;
    private configUIs:ConfigUIs; 
    public eventDispatcher = new EventDispatcher(['SAVE_COLOR_CONFIG', 'SAVE_OPERATIONS', 'CREATE_OPERATION', 'REMOVE_OPERATION', 'REMOVE_OPERATIONS', 'TOGGLE_MIRROR_MODE']);
    private configData: ConfigState | null = null;
    private operationConfigData: Array<OperationState> | null = null;
    constructor(guiObject: any){
        this.gui = guiObject;
        this.configUIs = {
        colorConfigUI: [],
        mirrorConfigUI : [],
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
        type : 'folder',
        label : 'Mirror Config',
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
        label : 'Reset',
        folder : 'Operation Action',      
        action: () => {          
            css3dEnv.cube.refreshCube();
        }
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
            if(this.operationConfigData?.length)
                this.eventDispatcher.trigger('REMOVE_OPERATIONS', { data : null});
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
        this._mirrorToggleUI(data);
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
        object: data.stickerConfig,
        property: 'f',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'back',
        format: 'rgb',
        folder : 'Sticker Config',
        object: data.stickerConfig,
        property: 'b',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'up',
        format: 'rgb',
        folder : 'Sticker Config',
        object: data.stickerConfig,
        property: 'u',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'down',
        format: 'rgb',
        folder : 'Sticker Config',
        object: data.stickerConfig,
        property: 'd',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'left',
        format: 'rgb',
        folder : 'Sticker Config',
        object: data.stickerConfig,
        property: 'l',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'right',
        format: 'rgb',
        folder : 'Sticker Config',
        object: data.stickerConfig,
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
        object: data.stickerConfig,
        property: 'marker',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type : 'button',
        label : 'save',
        folder : 'Color Config',      
        action: () => {        
            this.eventDispatcher.trigger('SAVE_COLOR_CONFIG', { data : this.configData?.stickerConfig});
        }
        }));
    }

    private _mirrorToggleUI(data: ConfigState){
        
        this.configUIs.mirrorConfigUI.push(this.gui.Register({
            type: 'checkbox',
            label: 'Toggle Mirror Mode',
            folder : 'Mirror Config',
            object: data,
            property: 'mirrorConfig',
            onChange: (data: any) => {
                console.log(data);
                this.eventDispatcher.trigger('TOGGLE_MIRROR_MODE', { data : this.configData?.mirrorConfig});
            }
        }));
    }

    public updateAppConfigUI(data: ConfigState){
        if(this.configUIs.colorConfigUI.length > 0){      
            this.configUIs.colorConfigUI.forEach((ui)=> this.gui.Remove(ui))      
            this.configUIs.colorConfigUI = [];
        }
        if(this.configUIs.mirrorConfigUI.length>0){
            this.configUIs.mirrorConfigUI.forEach((ui)=> this.gui.Remove(ui))      
            this.configUIs.mirrorConfigUI = [];
        }
        this._initializeAppConfigUI(data);
        this.configData = data;
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
                this.eventDispatcher.trigger('REMOVE_OPERATION', { data : operation.description});
            }
        }))
        })  
        this.operationConfigData = operationArray;
    }  
}


// https://github.com/colejd/guify
let dat_gui: any = null;


function PanelArea(){
    const appConfig: ConfigState = useSelector((state: RootState)=> state.configReducer);
    const operations = useSelector((state: RootState)=> state.operationReducer);
    const dispatch = useDispatch();

    const [createModalShow, setCreateModalShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState(false);

    const description: null | {current : any} = useRef(null);
    const [warnMessage, setWarnMessage] = useState("");
    const handleClose = () => {
        setCreateModalShow(false);
        setRemoveModalShow(false);
    }
    const handlerRemoveOperations = () => {
        dispatch(removeOperations());
        setRemoveModalShow(false);
    }
    const handleAfterSaveClose = () => {    
        const inputedValue = description?.current?.value
        if(inputedValue.length){
        //중복 검사
        const duplicationCheckResult = operations.filter((operation) => inputedValue === operation.description)
        if(!duplicationCheckResult.length){
            setWarnMessage('')
            //make operation
            dispatch(createOperation(inputedValue));
            setCreateModalShow(false);
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

        dat_gui.eventDispatcher.on('SAVE_COLOR_CONFIG', (event: any)=> dispatch(saveConfig(event.data)));   
        dat_gui.eventDispatcher.on('CREATE_OPERATION', (event: any)=> setCreateModalShow(true));
        dat_gui.eventDispatcher.on('SAVE_OPERATIONS', (event: any)=> dispatch(saveOperations(event.data)));
        dat_gui.eventDispatcher.on('REMOVE_OPERATION', (event: any)=> dispatch(removeOperation(event.data)));
        dat_gui.eventDispatcher.on('REMOVE_OPERATIONS', (event: any)=> setRemoveModalShow(true));
        dat_gui.eventDispatcher.on('TOGGLE_MIRROR_MODE', (event: any) => dispatch(toggleMirrorMode(event.data)))
        dispatch(checkIndexedDB())
    }, []); //once

    useEffect(()=>{
        console.log("%c App useEffect appConfig", 'background: #222; color: #bada55')
        console.log(appConfig);
        if(Object.keys(appConfig.stickerConfig).length){
            dat_gui.updateAppConfigUI(appConfig);
        }        
    },[appConfig])
    useEffect(()=>{
        console.log("%c App useEffect operations", 'background: #222; color: #bada55')
        console.log(operations);   
        dat_gui.updateOperationUI(operations);
    },[operations])

    return(
        <>
            <div className="min-vh-100" style={{"border": "1px solid green", "overflow" : "auto"}} id="panelUI"></div>
            <Modal show={createModalShow}>
                <Modal.Header>
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
            <Modal show={removeModalShow}>
                <Modal.Header>
                <Modal.Title>Remove All Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    If you click the Accept button, 
                    all operations are deleted and cannot be reversed. 
                    Are you sure you want to delete?
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handlerRemoveOperations}>
                    Accept
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default PanelArea;