import React, { useEffect, useState, FC, useRef, RefObject } from 'react';
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { checkIndexedDB, saveMirrorConfig, setOperationInfo } from '../../actions/action';
import FaceButtons from './FaceColorButton/FaceColorButton'
import BlockColorButton from './BlockColorButton/BlockColorButton'
import FontColorButton from './FontColorButton/FontColorButton'
import BackgroundColorButton from './BackgroundColorButton/BackgroundColorButton'
import MouseInteractionColorButton from './MouseInteractionColorButton/MouseInteractionColorButton'
import CheckBox from './Components/CheckBox/CheckBox'
import "./AppPanel.css"
import { RootState } from '../../stores/reducers';
import { css3dEnv } from '../../CubeArea/CubeArea';

interface token {
    type: string;
    value : string;
}
interface CallExpression{
    type: string;
    name: string;
    arguments : Array<literalExpression>
}
interface literalExpression{
    type: string;
    value: string;
}
interface AST {
    type: string;
    body : Array<CallExpression>;
}

function lexer (code:string) : Array<token>{    
    const trimCode = code.replace("/\s\r\n\t/g", "");  
    const codeArray = Array.from(trimCode);
    return codeArray.map((char, index)=>{
          if(char === "[" && index > 0) char = " " + char;
          else if(char === "]" && index < codeArray.length - 1) char = char + " ";
          else if(char === ":") char = char + " ";
          return char;
      })
    .join("")
    .split(/\s+/)
    .filter((t)=>{ return t.length > 0 })
    .map((t)=>{
        if(t.includes("[") || t.includes("]")){
            if(t.includes("[") && t.includes("]")){
                return [
                        {type : "action", value : "keyGen"}, 
                        {type: "value", value : t.slice(1, t.length - 1)}
                    ];
            }else if(!t.includes("[") || !t.includes("]")){      
                const error = new Error("syntax error");
                error.message = "[, ] must be pair : " + t;
                throw error;
            }else if(t.includes(":")){
                const error = new Error("syntax error");
                error.message = "valid only string in [, ] : " + t
                throw error;
            }
        }else if(t.includes(":")){
            return {type : "action", value : "setValue"};
        }
        return {type : "value", value : t};
    })
    .flat();
  }

function parser(tokens: Array<token>): AST{
    const AST = {
        type : "GenerateRubiksCubeOperation",
        body : [] as Array<any>
    } as AST

    while(tokens.length){
        const current = tokens.shift();        
        if(current?.type === "action"){            
            if(current.value === "keyGen"){
                if(AST.body.length && AST.body[AST.body.length - 1].type !== "CallExpression") throw new Error("syntax Error")
                let expression = {
                    type : "CallExpression",
                    name : "keyGen",
                    arguments : [] as Array<any>
                }
                let argument = tokens.shift();
                expression.arguments.push({
                    type : "StringLiteral",
                    value : argument?.value
                })
                AST.body.push(expression);
            }else if(current.value === "setValue"){
                if(AST.body.length && (AST.body[AST.body.length - 1].type !== "CallExpression" || AST.body[AST.body.length - 1].name !== "keyGen")) throw new Error("syntax Error")
                let expression = {
                    type : "CallExpression",
                    name : "setValue",
                    arguments : [] as Array<any>
                }
                let argument = tokens.shift();
                if(argument?.type !== "value"){                  
                    throw new Error("syntax error!")                    
                }else{
                    expression.arguments.push({
                        type : "StringLiteral",
                        value : argument?.value
                    })
                }
                
                AST.body.push(expression);
            }            
        }else if(current?.type === "value") {
            const error = new Error("syntax error");
            error.message = "value is after : or in [] " + current?.value;
            throw error;
        }
    }
    return AST;
}
function generator(ast: AST): { [key: string]: Array<string> }{    
    const RubiksCubeOperationInfo = {} as { [key: string]: Array<string> }
    while(ast.body.length){
        var node = ast.body.shift();
        switch(node?.name){
            case "keyGen":
                if(RubiksCubeOperationInfo.hasOwnProperty(node.arguments[0].value)) {
                    const error = new Error("syntax error");
                    error.message = "description must be unique"
                    throw error;
                }
                RubiksCubeOperationInfo[node.arguments[0].value] = [""]
                break;
            case "setValue":
                const keys = Object.keys(RubiksCubeOperationInfo);
                const array = []
                for (let i = 0; i < node.arguments[0].value.length; i++) {
                    if (node.arguments[0].value[i] === "'" || node.arguments[0].value[i] === '2') array[array.length - 1] += node.arguments[0].value[i]
                    else array.push(node.arguments[0].value[i])
                }
                RubiksCubeOperationInfo[keys[keys.length - 1]] = array
                break;
        }
    }
    return RubiksCubeOperationInfo;
}

function compile(string: string): { [key: string]: Array<string> }{
    try{        
        const lexerResult = lexer(string);
        const parserResult = parser(lexerResult);
        const generateResult = generator(parserResult);
        
        // 모든 value 돌면서 정규식으로 유효한 Operation string인지 체크!
        // "F2".match(/[^FRUDBLSMEfrudblsme'2]/)
        for(const [key, value] of Object.entries(generateResult)){
            if(value.join("").match(/[^FRUDBLSMEfrudblsmexyz'2]/)) {
                const error = new Error("syntax error");
                error.message = 'unexpected operation string : ' + value
                throw error;
            }
        }        
        return generateResult;
    }catch(e){
        throw e;        
    }
}
const AppPanel: FC = () => { 
    const dispatch = useDispatch();
    const {mirrorConfig} = useSelector((state: RootState)=> state.configReducer);
    const textArea = useRef(null);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    function mirrorToggleHandler(checked: boolean){
        dispatch(saveMirrorConfig(checked))
    }
    
    useEffect(()=>{        
        dispatch(checkIndexedDB())
    }, [])    

    function setButtonHandler(){        
        try {
            const compileResult = compile((textArea.current as any).value);
            dispatch(setOperationInfo(compileResult));      
            setErrorMessage("");
            setShowError(false);
        }catch(e){            
            setErrorMessage(e.message);
            setShowError(true);
        }        
    }
    function resetCameraPosition(){
        if(css3dEnv.camera){
            css3dEnv.camera.position.x = 3000;
            css3dEnv.camera.position.y = 3000;
            css3dEnv.camera.position.z = 3000;
        }
        
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
                        <FontColorButton/>
                    </Col>
                </Row>
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        <CheckBox checked={mirrorConfig} text={"Mirror"} onChange={mirrorToggleHandler}/>
                    </Col>
                </Row>                
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        {/* <Button 
                        style={{fontWeight : "bold", marginLeft : "5px", border: "0px", textShadow : "-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000,  1px 1px 0 #000"}} 
                        > Reset Cube</Button> */}
                        <Button 
                        style={{fontWeight : "bold", marginLeft : "5px", border: "0px", textShadow : "-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000,  1px 1px 0 #000"}} 
                        onClick={resetCameraPosition}
                        > Reset Camera</Button>
                    </Col>                    
                </Row>
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        <Form>
                            <Row>
                                <Form.Control as="textarea" ref={textArea} placeholder="You can enter the desired content according to the [description]:operation format, regardless of line breaks and spaces." style={{backgroundColor:"transparent", resize:"none"}} rows={10} cols={10}/>
                                
                            </Row>
                        </Form>
                    </Col>                           
                </Row>
                {
                    showError &&                    
                    <Row style={{marginTop : "30px"}}>
                        <Col style={{textAlign : "center"}}>
                            <Alert variant={"danger"}>
                                {errorMessage}
                            </Alert>
                        </Col>                           
                    </Row>
                }
                
                <Row style={{marginTop : "30px"}}>
                    <Col style={{textAlign : "center"}}>
                        <Button 
                        style={{fontWeight : "bold", marginLeft : "5px", border: "0px", textShadow : "-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000,  1px 1px 0 #000"}}                         
                        onClick={setButtonHandler}>SET</Button>                        
                    </Col>                                        
                </Row>                               
            </Container>
        </>
    )
}
export default AppPanel