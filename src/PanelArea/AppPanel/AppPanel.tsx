import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkIndexedDB, saveMirrorConfig } from '../../actions/action';
import FaceButtons from './FaceColorButton/FaceColorButton'
import BlockColorButton from './BlockColorButton/BlockColorButton'
import BackgroundColorButton from './BackgroundColorButton/BackgroundColorButton'
import MouseInteractionColorButton from './MouseInteractionColorButton/MouseInteractionColorButton'
import CheckBox from './Components/CheckBox/CheckBox'
import "./AppPanel.css"
import { RootState } from '../../stores/reducers';

function AppPanel(){ 
    const dispatch = useDispatch();

    const {mirrorConfig} = useSelector((state: RootState)=> state.configReducer);

    function mirrorToggleHandler(checked: boolean){
        dispatch(saveMirrorConfig(checked))
    }
    
    useEffect(()=>{
        dispatch(checkIndexedDB())
    }, [])

   
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
                    </Col>
                </Row>
                <Row style={{marginTop : "30px"}}>                
                    <Col style={{textAlign : "center"}}>
                        <BackgroundColorButton/>
                    </Col>
                </Row>
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        <CheckBox checked={mirrorConfig} text={"Mirror"} onChange={mirrorToggleHandler}/>
                    </Col>
                </Row>
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        <MouseInteractionColorButton/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default AppPanel