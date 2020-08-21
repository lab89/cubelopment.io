import React, { useEffect } from 'react';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
import * as THREE from 'three';
import {useSelector} from "react-redux";
import {RootState} from "../stores/reducers";
import { ConfigState } from '../stores/ConfigReducer';
import RubiksCube from 'three-rubiks-cube'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

class CSS3DEnv {
    public camera: THREE.PerspectiveCamera | null = null;
    public scene: THREE.Scene | null = null;
    public renderer: CSS3DRenderer | null = null;
    public controls: OrbitControls | null = null;
    public cube: any = null
    constructor(){
        console.log('css3dENV')
    }

    public animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls?.update();
        this.render();
    }
    
    public render() {
        this.renderer?.render(this.scene as THREE.Scene, this.camera as THREE.PerspectiveCamera);
    }

    public init(){
        this.camera = new THREE.PerspectiveCamera(40, (document.getElementById("container") as any)?.clientWidth / (document.getElementById("container") as any)?.clientHeight, 1, 10000);
        this.camera.position.x = 3000;
        this.camera.position.z = 3000;
        this.camera.position.y = 3000;
        
        this.scene = new THREE.Scene();
        
        this.renderer = new CSS3DRenderer();
        this.renderer.setSize((document.getElementById("container") as any)?.offsetWidth, (document.getElementById("container") as any)?.clientHeight);
        document.getElementById("container")?.appendChild(this.renderer.domElement);        
        
        this.cube = new RubiksCube({
                blockColor : "black",
                size : {
                    width : 500,
                    height : 500,
                    depth : 500
                },
                stickerColorSet : {
                    "f": "rgba(42, 249, 107, 1)",
                    "b": "rgba(5, 34, 174, 1)",
                    "l": "rgba(225, 10, 28, 1)",
                    "r": "rgba(252, 77, 30, 1)",
                    "u": "rgba(230, 245, 252, 1)",
                    "d": "rgba(235, 253, 57, 1)",
                },
                fitment : "fully_fitted",
                mirror : true
            });
        console.log(this.cube.children[0] instanceof CSS3DObject)
        
        this.scene.add(this.cube);
        
        this.cube.animate("MS");
        this.cube.addEventListener("operationCompleted", function(){
            // alert("complete")
        });
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = true;
        this.controls.enablePan = false;
        this.controls.minDistance = 500;
        this.controls.maxDistance = 10000;
        this.controls.addEventListener("change", function (e) {
            console.log("change");
        });
    }
}

function CubeArea(){
    const {stickerConfig} = useSelector((state: RootState)=> state.configReducer);
    
    useEffect(()=>{
        const css3dEnv = new CSS3DEnv();
        css3dEnv.init();
        css3dEnv.animate();
        console.log(css3dEnv);
    }, []);
    useEffect(() => {
        console.log("%c CubeArea Component", 'background: #222; color: #bada55')
        console.log(THREE);
        console.log(RubiksCube);
    }, [stickerConfig])

    return(
        <div className="min-vh-100" style={{"width" : "100%", "border": "1px solid black"}} id="container">
        </div>
    )
}
export default CubeArea;
