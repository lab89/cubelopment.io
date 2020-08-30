import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../stores/reducers';
import { saveCubeConfig } from '../../../actions/action';
import ColorButton from '../Components/ColorButton/ColorButton'

function BlockColorButton(){   
    const {cubeConfig} = useSelector((state: RootState)=> state.configReducer);

    const dispatch = useDispatch();  

    function handleColorChange(color: any, event: any){
        const newCubeConfig = { ...cubeConfig};
        newCubeConfig["blockColor"] = color.hex;  
        dispatch(saveCubeConfig(newCubeConfig))
    }
    if(Object.keys(cubeConfig).length > 0)
        return (
            <>
                <ColorButton 
                    attr={"blockColor"} 
                    color={cubeConfig["blockColor"]} 
                    text={"Block Color"} 
                    defaultColor={['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']}
                    onChange={handleColorChange}
                ></ColorButton>
            </>
        )
    else
        return (<></>)
}
export default BlockColorButton;