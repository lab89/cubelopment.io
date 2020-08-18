import React, { useEffect } from 'react';
import * as THREE from 'three';
import RubiksCube from 'three-rubiks-cube'
import {useSelector} from "react-redux";
import {RootState} from "../stores/reducers";
import { ConfigState } from '../stores/ConfigReducer';

function CubeArea(){
    const {stickerConfig} = useSelector((state: RootState)=> state.configReducer);
    useEffect(() => {
        console.log("%c CubeArea Component", 'background: #222; color: #bada55')
        console.log(THREE);
        console.log(RubiksCube);
    }, [stickerConfig])

    return(
        <div className="min-vh-100" style={{"border": "1px solid black"}} id="container">
            <h1>Cube area</h1>
        </div>
    )
}
export default CubeArea;
