import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../stores/reducers';
import ColorButton from '../Components/ColorButton/ColorButton'
import { saveMouseInteractionConfig } from '../../../actions/action';

function MouseInteractionColorButton(){
    const {mouseInteractionConfig} = useSelector((state: RootState)=> state.configReducer);
    const dispatch = useDispatch();

    function handleHoverColorChange(color: any, event: any){
        const newCubeConfig = { ...mouseInteractionConfig};
        newCubeConfig["hoverColor"] = color.hex;  
        console.log(newCubeConfig);
        dispatch(saveMouseInteractionConfig(newCubeConfig))
    }

    function handleClickColorChange(color: any, event: any){
        const newCubeConfig = { ...mouseInteractionConfig};
        newCubeConfig["clickColor"] = color.hex;  
        dispatch(saveMouseInteractionConfig(newCubeConfig))
    }

    if(Object.keys(mouseInteractionConfig).length){
        return(
            <>
                <ColorButton 
                        attr={"hoverColor"} 
                        color={mouseInteractionConfig["hoverColor"] as string} 
                        text={"Hover Color"} 
                        defaultColor={[]}
                        onChange={handleHoverColorChange}
                ></ColorButton>
                <ColorButton 
                        attr={"clickColor"} 
                        color={mouseInteractionConfig["clickColor"] as string} 
                        text={"Click Color"} 
                        defaultColor={[]}
                        onChange={handleClickColorChange}
                ></ColorButton>
            </>
        )
    }else{
        return(<></>)
    }
    
}

export default MouseInteractionColorButton;