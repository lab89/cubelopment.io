import React, { useEffect, useRef, useState } from 'react';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
import * as THREE from 'three';
import {useSelector} from "react-redux";
import {RootState} from "../stores/reducers";
import { ConfigState } from '../stores/ConfigReducer';
import RubiksCube from 'three-rubiks-cube'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { PerspectiveCamera } from 'three';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import {uuid} from 'uuidv4'

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
        this.camera = new THREE.PerspectiveCamera(40, ref.offsetWidth / ref.offsetHeight, 1, 10000);
        this.camera.position.x = 3000;
        this.camera.position.z = 3000;
        this.camera.position.y = 3000;
        
        this.scene = new THREE.Scene();        
        
        this.renderer = new CSS3DRenderer();
        this.renderer.setSize(ref.offsetWidth, ref.offsetHeight);
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
                fitment : "fitted",
                mirror : false,   
                hoverEnabled : true,
                clickEnabled : true,
                hoverColor : "red",
                clickColor : "black",
                animateDuration : 1000
            });
        
        this.scene.add(this.cube);

        // this.cube.animate("MS");
        // this.cube.addEventListener("operationCompleted", function(){
        //     // alert("complete")
        // });
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableRotate = false;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.minDistance = 500;
        this.controls.maxDistance = 10000;
        this.controls.addEventListener("change", function (e) {
            console.log("change");
        });

        window.addEventListener('resize', ()=>{
            console.log("resize");            
            (this.camera as THREE.PerspectiveCamera).aspect = ref.offsetWidth / ref.offsetHeight;
            (this.camera as THREE.PerspectiveCamera).updateProjectionMatrix();   
            (this.renderer as CSS3DRenderer).setSize(ref.offsetWidth, ref.offsetHeight);
            this.render();
         
        })
    }
}
export const css3dEnv = new CSS3DEnv();

function CubeArea(){
    const {stickerConfig, mirrorConfig, mouseInteractionConfig, cubeConfig, fontConfig}: ConfigState = useSelector((state: RootState)=> state.configReducer);
    const cubeOperationInfo: {[key:string]:string;} = useSelector((state: RootState)=> state.OperationInfoReducer);
    const cubeContainer = useRef(null);

    const [descriptionIdx, setDescriptionIdx] = useState(-1);
    const [operationIdx, setOperationIdx] = useState(-1);

    useEffect(()=>{        
        console.log(cubeContainer.current);
        css3dEnv.init(cubeContainer.current);
        css3dEnv.animate();      
    }, [cubeContainer]);

    useEffect(() => {
        console.log("%c CubeArea Component cubeConfig", 'background: #222; color: #bada55')
        console.log((cubeConfig as any).backgroundColor)               
        if(Object.keys(cubeConfig).length){
            (css3dEnv.renderer as CSS3DRenderer).domElement.style.backgroundColor = (cubeConfig as any).backgroundColor;
            css3dEnv.cube.options.blockColor = (cubeConfig as any).blockColor;
            css3dEnv.cube.refreshBlockColor();
        }       
    }, [cubeConfig])

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
    
    useEffect(()=>{        
        setDescriptionIdx(-1);
        setOperationIdx(-1);
    }, [cubeOperationInfo])    

    function play(){

    }
    function pause(){

    }
    function stop(){

    }
    function next(){                
        if(descriptionIdx < 0 && operationIdx < 0){
            setDescriptionIdx(0);
            setOperationIdx(0);
            return;
        }         
        const descriptionCnt = Object.keys(cubeOperationInfo).length;        
        if(descriptionIdx < descriptionCnt){            
            const keys = Object.keys(cubeOperationInfo);
            const currentKey = keys[descriptionIdx];
            const oprCnt = cubeOperationInfo[currentKey].length;
            if(operationIdx < oprCnt - 1){
                setOperationIdx(operationIdx + 1);
            }else{
                setOperationIdx(0);
                setDescriptionIdx(descriptionIdx + 1);
            }
        }else{
            setDescriptionIdx(-1);
            setOperationIdx(-1);
        }
    }
    function before(){       
        const descriptionCnt = Object.keys(cubeOperationInfo).length;
        if(descriptionIdx >= 0 && descriptionIdx < descriptionCnt){            
            const keys = Object.keys(cubeOperationInfo);
            const currentKey = keys[descriptionIdx];
            const oprCnt = cubeOperationInfo[currentKey].length;
            if(operationIdx > 0){
                setOperationIdx(operationIdx - 1);
            }else{                
                setOperationIdx(oprCnt-1);
                setDescriptionIdx(descriptionIdx - 1);
            }
        }else{
            setDescriptionIdx(-1);
            setOperationIdx(-1);
        }
    }
    
    return(
        <> 
            <div ref={cubeContainer} style={{"width" : "100%", "height" : "100%"}}>
                
            </div>
            <div style={{"position" : "absolute", "top" : "0px" , "width" : "100%", "zIndex" : 3, color : fontConfig.fontColor, fontSize : 40, fontWeight : "bold"}} >
            {
                Object.keys(cubeOperationInfo).map((d, i)=>{
                    return <div key={uuid()}>
                        <span style={{ color : i === descriptionIdx  ? "red" : "inherit"}}>{d} : </span>
                        {
                            Array.from(cubeOperationInfo[d]).map((f, j)=>{
                                return <span key={uuid()} style={{ color : j === operationIdx && i === descriptionIdx  ? "red" : "inherit"}}>{f}</span>                    
                            })
                        }
                    
                    </div>
                }).flat()
            }
            </div>
            <div style={{"position" : "absolute", "top" : "90%" , "width" : "100%", "zIndex" : 3, color : fontConfig.fontColor, fontSize : 40, fontWeight : "bold"}} >
            {
                Object.keys(cubeOperationInfo).length ?
                <div>
                    <Button style={{marginLeft : "5px"}} onClick={play}>play</Button>
                    <Button style={{marginLeft : "5px"}} onClick={pause}>pause</Button>
                    <Button style={{marginLeft : "5px"}} onClick={stop}>stop</Button>
                    <Button style={{marginLeft : "5px"}} onClick={next}>next</Button>
                    <Button style={{marginLeft : "5px"}} onClick={before}>before</Button>
                </div>
                : <div></div>
                
            }
            </div>
        </>
        
    )
}
export default CubeArea;
