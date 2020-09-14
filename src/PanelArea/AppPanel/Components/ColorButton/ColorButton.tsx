import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../stores/reducers';
import { Button, Overlay } from 'react-bootstrap';
import { toggleFaceColorPicker } from '../../../../actions/action';
import { SketchPicker } from 'react-color';
import './ColorButton.css'
function ColorButton(props: 
    {
        attr: string, 
        color: string, 
        text: string, 
        defaultColor: Array<string>,
        onChange: Function,
        className: string
    }){
    
    const ref = useRef(null);
    const globalButtonToggle =  useSelector((state: RootState)=> state.ColorPickerButtonReducer);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const [color, setColor] =useState('')
    const [colorDefault, setColorDefault] = useState([] as Array<string>)

    function handleColorChange(color: any, event: any){
        setColor(color.hex);
        props.onChange(color, event);
    }

    useEffect(()=>{
        setColor(props.color);
        setColorDefault(props.defaultColor);
    }, [props.color, props.defaultColor])
    
    useEffect(()=>{
        if(props.attr === globalButtonToggle.target) setToggle(true);
        else setToggle(false);
    }, [globalButtonToggle])

    return (
        <>
            <Button 
                key={props.attr} 
                ref={ref} 
                style={{backgroundColor: props.color, fontWeight : "bold", marginLeft : "5px", border: "0px", textShadow : "-1px -1px 0 #000,  1px -1px 0 #000, -1px 1px 0 #000,  1px 1px 0 #000"}} 
                onClick={(evt)=>{
                    evt.stopPropagation();
                    if(props.attr === globalButtonToggle.target)
                        dispatch(toggleFaceColorPicker(""))
                    else
                        dispatch(toggleFaceColorPicker(props.attr))
                }}>                        
                {props.text}
                {/* {
                    props.className.length > 0 &&
                    <img className={props.className} style={{width: "30px", height: "30px"}} alt=""/>
                } */}
                
            </Button>
            <Overlay key={props.attr + "overlay"} target={ref} 
                show={toggle} placement='bottom'>
                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div
                        {...props}
                        style={{     
                        top : "10px",                    
                        ...props.style,
                        }}
                    >
                        <div style={{position:"relative", top : "10px"}}>                           
                            <SketchPicker
                                key={props.face + "colorPicker"} 
                                color={color} 
                                width={"300px"} 
                                presetColors = {colorDefault}
                                onChange={handleColorChange}
                            />
                            
                        </div>
                        
                    </div>
                    )}
            </Overlay> 
        </>
    )
    
}

export default ColorButton;