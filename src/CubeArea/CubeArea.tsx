import React, { useEffect, useRef } from 'react';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
import * as THREE from 'three';
import {useSelector} from "react-redux";
import {RootState} from "../stores/reducers";
import { ConfigState } from '../stores/ConfigReducer';
import RubiksCube from 'three-rubiks-cube'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { PerspectiveCamera } from 'three';

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

    public init(ref: any){
        this.camera = new THREE.PerspectiveCamera(40, ref.clientWidth / ref.clientHeight, 1, 10000);
        this.camera.position.x = 3000;
        this.camera.position.z = 3000;
        this.camera.position.y = 3000;
        
        this.scene = new THREE.Scene();
        
        this.renderer = new CSS3DRenderer();
        this.renderer.setSize(ref.offsetWidth, ref.clientHeight);
        ref.appendChild(this.renderer.domElement);        
        
        this.cube = new RubiksCube({
                blockColor : "black",
                size : {
                    width : 300,
                    height : 300,
                    depth : 300
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
                mirror : false,   
                hoverEnabled : true,
                clickEnabled : true,
                hoverColor : "red",
                clickColor : "rgb(131, 219, 28)",
                animateDuration : 1000
            });
        
        this.scene.add(this.cube);
        
        // this.cube.animate("MS");
        // this.cube.addEventListener("operationCompleted", function(){
        //     // alert("complete")
        // });
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.minDistance = 500;
        this.controls.maxDistance = 10000;
        this.controls.addEventListener("change", function (e) {
            console.log("change");
        });

        window.addEventListener('resize', ()=>{
            (this.camera as THREE.PerspectiveCamera).aspect = ref.clientWidth / ref.clientHeight;
            (this.camera as THREE.PerspectiveCamera).updateProjectionMatrix();
            
            (this.renderer as CSS3DRenderer).setSize(ref.offsetWidth, ref.clientHeight);
            
            this.render();
        })
    }
}
export const css3dEnv = new CSS3DEnv();
function CubeArea(){
    const {stickerConfig, mirrorConfig, mouseInteractionConfig}: ConfigState = useSelector((state: RootState)=> state.configReducer);
    const cubeContainer = useRef(null);

    useEffect(()=>{        
        css3dEnv.init(cubeContainer.current);
        css3dEnv.animate();
        console.log(css3dEnv);
    }, []);
    useEffect(() => {
        console.log("%c CubeArea Component stickerConfig", 'background: #222; color: #bada55')
        console.log(stickerConfig)      
        if(Object.keys(stickerConfig).length){
            Object.assign(css3dEnv.cube.options.stickerColorSet, stickerConfig);
            css3dEnv.cube.refreshStickers();
        }
    }, [stickerConfig])

    useEffect(() => {
        console.log("%c CubeArea Component mirrorConfig", 'background: #222; color: #bada55')
        console.log(mirrorConfig)    
        css3dEnv.cube.options.mirror = mirrorConfig;
        css3dEnv.cube.toggleMirror(mirrorConfig)    
    }, [mirrorConfig])

    useEffect(() => {
        console.log("%c CubeArea Component mouseInteractionConfig", 'background: #222; color: #bada55')
        console.log(mouseInteractionConfig)    
        Object.assign(css3dEnv.cube.options, mouseInteractionConfig);            
    }, [mouseInteractionConfig])

    return(
        <>            
            <div style={{"position" : "absolute", "bottom" : "0px" , "width" : "100%", "textAlign" : "center"}}>
                <h1>Operation Operation Operation Operation Operation Operation </h1>
                <h1>Operation Operation Operation Operation Operation Operation </h1>
            </div>
            <div className="min-vh-100" ref={cubeContainer} style={{"width" : "100%"}}>
            </div>
        </>
        
    )
}
export default CubeArea;
