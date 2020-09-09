import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../stores/reducers';
import { saveFontConfig } from '../../../actions/action';
import ColorButton from '../Components/ColorButton/ColorButton'

function FontColorButton(){
    const {fontConfig} = useSelector((state: RootState) => state.configReducer);
    const dispatch = useDispatch();  

    function handleColorChange(color: any, event: any){
        const newCubeConfig = { ...fontConfig};
        newCubeConfig["fontColor"] = color.hex;  
        dispatch(saveFontConfig(newCubeConfig))
    }    

    if(Object.keys(fontConfig).length){
        return(
            <>
                <ColorButton 
                    attr={"fontColor"} 
                    color={fontConfig["fontColor"]} 
                    text={"Font Color"} 
                    defaultColor={['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']}
                    onChange={handleColorChange}
                    className={"icon-block"}
                ></ColorButton>
            </>
        )
    }else{
        return (<></>)
    }
}
export default FontColorButton;