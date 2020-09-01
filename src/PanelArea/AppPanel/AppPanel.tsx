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
import { ReactSortable, Sortable, MultiDrag, Swap } from "react-sortablejs";
import { OperationState } from '../../stores/OperationReducer';
Sortable.mount(new MultiDrag(), new Swap());
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
        //새로 생성하거나 할 때
        console.log(operations);
        setState(operations)
    },[operations])

    useEffect(()=>{
        //순서 바꾸거나 할 때
        console.log(state);
    }, [state])

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
                    <ReactSortable list={state} setList={setState} ghostClass={'blue-background-class'} animation={150}>
                        {state.map(item => (
                            <div key={item.id} style={{marginTop : "10px"}}> 
                                <Form>
                                    <Row>
                                        <Col xs={7}>
                                            <Form.Control as="textarea" placeholder="Description" style={{backgroundColor:"transparent", resize:"none"}} rows={3} cols={15} />
                                        </Col>
                                        <Col>
                                            <Form.Control as="textarea" placeholder="Operation" style={{backgroundColor:"transparent", resize:"none"}} rows={3} cols={15} />
                                        </Col>
                                    </Row>
                                    </Form>
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