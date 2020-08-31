import React, { useEffect, useState, FC } from 'react';
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkIndexedDB, saveMirrorConfig, createOperation } from '../../actions/action';
import FaceButtons from './FaceColorButton/FaceColorButton'
import BlockColorButton from './BlockColorButton/BlockColorButton'
import BackgroundColorButton from './BackgroundColorButton/BackgroundColorButton'
import MouseInteractionColorButton from './MouseInteractionColorButton/MouseInteractionColorButton'
import CheckBox from './Components/CheckBox/CheckBox'
import "./AppPanel.css"
import { RootState } from '../../stores/reducers';
import { ReactSortable } from "react-sortablejs";
import { OperationState } from '../../stores/OperationReducer';

const AppPanel: FC = () => { 
    const dispatch = useDispatch();

    const {mirrorConfig} = useSelector((state: RootState)=> state.configReducer);
    const [state, setState] = useState<any[]>([]);
    const operations = useSelector((state: RootState)=> state.operationReducer);
    function mirrorToggleHandler(checked: boolean){
        dispatch(saveMirrorConfig(checked))
    }
    
    useEffect(()=>{
        dispatch(checkIndexedDB())
    }, [])

    useEffect(()=>{
        console.log(operations);
        const data = operations.map((oper)=>({id : oper.uuid, description: oper.description, operation : oper.operation}));
        setState(data)
    },[operations])

    function createOperationClickHandler(){
        dispatch(createOperation())
    }
   
    return(
        <>
            <Container>
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>                        
                        <FaceButtons/>
                    </Col>                    
                </Row>
                <Row style={{marginTop : "30px"}}>                
                    <Col style={{textAlign : "center"}}>                        
                        <BlockColorButton/>
                        <BackgroundColorButton/>                        
                    </Col>
                </Row>
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        <MouseInteractionColorButton/>
                    </Col>
                </Row>
                
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        <CheckBox checked={mirrorConfig} text={"Mirror"} onChange={mirrorToggleHandler}/>
                    </Col>
                </Row>
                
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        <Button 
                        style={{fontWeight : "bold", marginLeft : "5px", border: "0px", textShadow : "-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000,  1px 1px 0 #000"}} 
                        > Reset Cube</Button>
                        <Button 
                        style={{fontWeight : "bold", marginLeft : "5px", border: "0px", textShadow : "-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000,  1px 1px 0 #000"}} 
                        > Reset Camera</Button>
                    </Col>                    
                </Row>
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        <Button 
                        style={{fontWeight : "bold", marginLeft : "5px", border: "0px", textShadow : "-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000,  1px 1px 0 #000"}} 
                        onClick={createOperationClickHandler}
                        > Add Operation</Button>                        
                    </Col>                    
                </Row>
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                    <ReactSortable list={state} setList={setState}>
                        {state.map(item => (
                            <div key={item.id}>
                                {'얄루'}
                                {/* {item.description}
                                {item.operation} */}
                            </div>                            
                        ))}
                        </ReactSortable>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AppPanel