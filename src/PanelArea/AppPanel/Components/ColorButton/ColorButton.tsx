import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../../stores/reducers';
import { Button, Overlay } from 'react-bootstrap';
import { toggleFaceColorPicker } from '../../../../actions/action';
import { BlockPicker } from 'react-color';

function ColorButton(props: 
    {
        attr: string, 
        color: string, 
        text: string, 
        defaultColor: Array<string>,
        onChange: Function
    }){
    
    const ref = useRef(null);
    const globalButtonToggle =  useSelector((state: RootState)=> state.colorPickerButtonReducer);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const [color, setColor] =useState('')
    const [colorDefault, setColorDefault] = useState([] as Array<string>)

    function handleColorChange(color: any, event: any){
        console.log(color);
        setColor(color.hex);
        console.log(props.onChange);
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
                onClick={()=>{
                    if(props.attr === globalButtonToggle.target)
                        dispatch(toggleFaceColorPicker(""))
                    else
                        dispatch(toggleFaceColorPicker(props.attr))
                }}>                        
                {props.text}
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
                            <BlockPicker 
                                key={props.face + "colorPicker"} 
                                color={color} 
                                width={"85px"} 
                                colors={colorDefault}
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