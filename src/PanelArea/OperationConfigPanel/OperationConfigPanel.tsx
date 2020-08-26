import React, {useEffect, useState, useRef} from 'react';
import guify from 'guify'
import { EventDispatcher } from 'EventDispatcher';
import { ConfigState } from '../../stores/ConfigReducer';
import { OperationState } from '../../stores/OperationReducer';
import { saveOperations, createOperation, removeOperation, removeOperations } from '../../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stores/reducers';
import { Modal, Button, InputGroup, FormControl, Alert, Fade} from 'react-bootstrap'
import { css3dEnv } from '../../CubeArea/CubeArea';

interface ConfigUIs {
    operationConfigUI : Array<any>
  }
  
class GUI {
    public gui: any;
    private configUIs:ConfigUIs; 
    public eventDispatcher = new EventDispatcher(['SAVE_OPERATIONS', 'CREATE_OPERATION', 'REMOVE_OPERATION', 'REMOVE_OPERATIONS', 'TOGGLE_MIRROR_MODE']);
    private operationConfigData: Array<OperationState> | null = null;
    constructor(guiObject: any){
        this.gui = guiObject;
        this.configUIs = {
            operationConfigUI : [],
        }     
        this._initBasicConfigUI();
    }

    private _initBasicConfigUI(){
        
        this.gui.Register({
            type: 'title',
            label: 'Operation Action'
        });
        // this.gui.Register({
        //     type : 'folder',
        //     label : 'Operation Action',
        //     open : true
        // });
        
        // this.gui.Register({
        //     type : 'button',
        //     label : 'Create Operation',
        //     folder : 'Operation Action',      
        //     action: () => {          
        //         this.eventDispatcher.trigger('CREATE_OPERATION')      
        //     }
        // });   
        // this.gui.Register({
        // type : 'button',
        // label : 'Remove All',
        // folder : 'Operation Action',
        // action: () => {        
        //     if(this.operationConfigData?.length)
        //         this.eventDispatcher.trigger('REMOVE_OPERATIONS', { data : null});
        // }})
        // this.gui.Register({
        //     type : 'button',
        //     label : 'Animate All',
        //     folder : 'Operation Action',      
        //     action: () => {          
        //     }
        // });   
        // this.gui.Register({
        //     type : 'button',
        //     label : 'Animate',
        //     folder : 'Operation Action',      
        //     action: () => {          
        //     }
        // });   

        // this.gui.Register({
        // type : 'button',
        // label : 'Save All',
        // folder : 'Operation Action',      
        // action: () => {          
        //     this.eventDispatcher.trigger('SAVE_OPERATIONS', {data : this.operationConfigData})
        // }
        // });   
    }

    public updateOperationUI(operationArray: Array<OperationState>){
        // if(this.configUIs.operationConfigUI.length > 0){      
        //     this.configUIs.operationConfigUI.forEach((ui)=> this.gui.Remove(ui))      
        //     this.configUIs.operationConfigUI = [];
        // }
        // operationArray.forEach((operation: OperationState)=>{
        //     this.configUIs.operationConfigUI.push(this.gui.Register({
        //         type : 'folder',
        //         label : operation.description,
        //         open : true
        //     }));
        //     this.configUIs.operationConfigUI.push(this.gui.Register({
        //         type : 'text',
        //         label : 'description',
        //         object: operation,
        //         property: 'description',        
        //         folder : operation.description,
        //     }));
        //     this.configUIs.operationConfigUI.push(this.gui.Register({
        //         type : 'text',
        //         label : 'operation',
        //         object: operation,
        //         property: 'operation',        
        //         folder : operation.description,
        //     }));           
        //     this.configUIs.operationConfigUI.push(this.gui.Register({
        //         type : 'button',
        //         label : 'Remove',
        //         folder : operation.description,
        //         action: () => {        
        //             this.eventDispatcher.trigger('REMOVE_OPERATION', { data : operation.description});
        //         }
        //     }))
        // })  
        // this.operationConfigData = operationArray;
    }  
}


// https://github.com/colejd/guify
let dat_gui: any = null;


function OperationConfigPanel(){
    const operations = useSelector((state: RootState)=> state.operationReducer);
    const dispatch = useDispatch();

    const [createModalShow, setCreateModalShow] = useState(false);
    const [removeModalShow, setRemoveModalShow] = useState(false);

    const description: null | {current : any} = useRef(null);
    const [warnMessage, setWarnMessage] = useState("");

    const panelDOM = useRef(null);
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

    function keydown(e: any){
        console.log(e.target.value);
    }

    useEffect(()=>{
        console.log("%c CHECK_INDEXED_DB", 'background: #222; color: #bada55') 
        console.log(panelDOM.current)
        dat_gui = new GUI(new guify({
            title: 'cubelopment.io',
            theme: 'dark', // dark, light, yorha, or theme object
            align: 'right', // left, right
            width: "100%",            
            barMode: 'offset', // none, overlay, above, offset
            panelMode: 'inner',
            opacity: 0.95,
            root : panelDOM.current,
            open: true
        }));

        dat_gui.eventDispatcher.on('CREATE_OPERATION', (event: any)=> setCreateModalShow(true));
        dat_gui.eventDispatcher.on('SAVE_OPERATIONS', (event: any)=> dispatch(saveOperations(event.data)));
        dat_gui.eventDispatcher.on('REMOVE_OPERATION', (event: any)=> dispatch(removeOperation(event.data)));
        dat_gui.eventDispatcher.on('REMOVE_OPERATIONS', (event: any)=> setRemoveModalShow(true));        
    }, []); //once
    
    useEffect(()=>{
        console.log("%c App useEffect operations", 'background: #222; color: #bada55')        
        dat_gui.updateOperationUI(operations);
    },[operations])

    return(
        <>
            <div ref={panelDOM} id="panelUI" style={{height: "300px"}}></div>
            <InputGroup>
                <FormControl as="textarea" style={{resize : "none"}} aria-label="With textarea" onKeyDown={keydown} rows={15} cols={15}/>
            </InputGroup>  
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

export default OperationConfigPanel;