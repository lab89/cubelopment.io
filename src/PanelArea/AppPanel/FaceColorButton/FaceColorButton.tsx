import React, { useEffect, useState } from 'react';
import { ConfigState } from '../../../stores/ConfigReducer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../stores/reducers';
import { saveStickerConfig } from '../../../actions/action';
import ColorButton from '../Components/ColorButton/ColorButton'
function FaceColorButton(props: {face: string}){
    const {stickerConfig} = useSelector((state: RootState)=> state.configReducer);
    const [colorDefault, setColorDefault] = useState([] as Array<string>)

    const dispatch = useDispatch();

    useEffect(()=>{
        if(props.face === "f") setColorDefault(["#83f52c","#68a920", "#1f9a00", "#008838", "#007b3f", "#00794a", "#005336", "#004027","#5aceb7","#009b97","#00818d"])
        else if(props.face === "b") setColorDefault(["#1991e0","#36a0d4","#0088c5","#0074be","#005bae","#004da4", "#1629ae", "#003e8e", "#00397b", "#13277a","#101f6e","#1c2f5b"])
        else if(props.face === "u") setColorDefault(["#e6e9ee", "#dad9e1","#bfc2c0","#8a8f8b", "#808689", "#757d7c", "#4b4c4c"])
        else if(props.face === "d") setColorDefault(["#defa04", "#f3e400", "#f3cb00", "#ffc700", "#fdab00", "#e7a800"])
        else if(props.face === "r") setColorDefault(["#fa7902", "#ff6b00", "#ed6700", "#f15715", "#f82c05"])
        else if(props.face === "l") setColorDefault(["#f5001b","#d52f00","#d12d14","#cb0b00", "#b20000", "#920b10", "#700009"])
    },[])

    function handleColorChange(color: any, event: any){        
        const newStickerConfig = { ...stickerConfig};
        newStickerConfig[props.face] = color.hex
        dispatch(saveStickerConfig(newStickerConfig))
    }

    return (
        <>
            <ColorButton 
                attr={props.face} 
                color={stickerConfig[props.face]} 
                text={props.face} 
                defaultColor={colorDefault}
                onChange={handleColorChange}
                className={""} 
            ></ColorButton>
        </>
    )
}

function FaceButtons(){
    const {stickerConfig}: ConfigState = useSelector((state: RootState)=> state.configReducer);
    
    if(Object.keys(stickerConfig).length){
        return(
            <>
                <FaceColorButton face={"f"}/>
                <FaceColorButton face={"b"}/>
                <FaceColorButton face={"u"}/>
                <FaceColorButton face={"d"}/>
                <FaceColorButton face={"r"}/>
                <FaceColorButton face={"l"}/>
            </>
            
        )       
    }else{
        return(<></>)
    }   
}

export default FaceButtons;