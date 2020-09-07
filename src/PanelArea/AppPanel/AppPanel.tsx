import React, { useEffect, useState, FC, useRef } from 'react';
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
                throw new Error("syntax error");
            }else if(t.includes(":")){
                throw new Error("syntax error");
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
        }else if(current?.type === "value") throw new Error("syntax Error");
    }
    return AST;
}
function generator(ast: any){
    const RubiksCubeOperationInfo = {} as { [key: string]: string }
    while(ast.body.length){
        var node = ast.body.shift();
        switch(node.name){
            case "keyGen":
                if(RubiksCubeOperationInfo.hasOwnProperty(node.arguments[0].value)) {
                    console.error("duplicate descriptions!")
                    return;
                }
                RubiksCubeOperationInfo[node.arguments[0].value] = ""
                break;
            case "setValue":
                const keys = Object.keys(RubiksCubeOperationInfo);
                RubiksCubeOperationInfo[keys[keys.length - 1]] = node.arguments[0].value
                break;
        }
    }
    return RubiksCubeOperationInfo;
}

function compile(string: string){
    try{        
        const lexerResult = lexer(string);
        const parserResult = parser(lexerResult);
        return generator(parserResult)
    }catch(e){
        console.error(e);
    }
}
const AppPanel: FC = () => { 
    const dispatch = useDispatch();
    const {mirrorConfig} = useSelector((state: RootState)=> state.configReducer);
    const textArea = useRef(null);
    
    function mirrorToggleHandler(checked: boolean){
        dispatch(saveMirrorConfig(checked))
    }
    
    useEffect(()=>{        
        dispatch(checkIndexedDB())
    }, [])
    

    function keyUpHandler(){
        if(textArea.current){
            console.log((textArea.current as any).value);            
        }        
    }
    function setButtonHandler(){
        console.log(compile((textArea.current as any).value))
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
                        <Form>
                            <Row>
                                <Form.Control as="textarea" ref={textArea} placeholder="[Description]: Operation" style={{backgroundColor:"transparent", resize:"none"}} rows={10} cols={10} onKeyUp={keyUpHandler}/>
                            </Row>
                        </Form>
                    </Col>                           
                </Row>
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