import React, { useEffect } from 'react';
import * as THREE from 'three';
import RubiksCube from 'three-rubiks-cube'

function CubeArea(){    
    useEffect(() => {
        console.log(THREE);
        console.log(RubiksCube);        
    }, [])

    return(
        <div className="min-vh-100" style={{"border": "1px solid black"}} id="container">
            <h1>Cube area</h1>
        </div>
    )
}
export default CubeArea;