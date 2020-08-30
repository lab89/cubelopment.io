import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../stores/reducers';
import { saveCubeConfig } from '../../../actions/action';
import ColorButton from '../Components/ColorButton/ColorButton'

function BackgroundColorButton(){   
    const {cubeConfig} = useSelector((state: RootState)=> state.configReducer);
    const dispatch = useDispatch();

    function handleColorChange(color: any, event: any){
        const newCubeConfig = { ...cubeConfig};
        newCubeConfig["backgroundColor"] = color.hex;  
        dispatch(saveCubeConfig(newCubeConfig))
    }
    
    if(Object.keys(cubeConfig).length > 0)
        return (
            <>
                <ColorButton 
                    attr={"backgroundColor"} 
                    color={cubeConfig["backgroundColor"]} 
                    text={"Background Color"} 
                    defaultColor={[]}
                    onChange={handleColorChange}
                ></ColorButton>
            </>
        )
    else
        return (<></>)
}
export default BackgroundColorButton;