import React, { useEffect, useRef, useState } from 'react';
import {CSS3DRenderer, CSS3DObject} from 'three/examples/jsm/renderers/CSS3DRenderer'
import * as THREE from 'three';
import {useSelector} from "react-redux";
import {RootState} from "../stores/reducers";
import { ConfigState } from '../stores/ConfigReducer';
import RubiksCube from 'three-rubiks-cube'

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop, faPause, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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
                size : 300,
                stickerColorSet : {
                    "f": "rgba(42, 249, 107, 1)",
                    "b": "rgba(5, 34, 174, 1)",
                    "l": "rgba(225, 10, 28, 1)",
                    "r": "rgba(252, 77, 30, 1)",
                    "u": "rgba(230, 245, 252, 1)",
                    "d": "rgba(235, 253, 57, 1)",
                },
                fitment : "fitted",
                mirror : true,   
                hoverEnabled : true,
                clickEnabled : true,
                hoverColor : "red",
                clickColor : "black",
                animateDuration : 1000
            });
        
        this.cube.playState = "stop";
        this.scene.add(this.cube);
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableRotate = true;
        this.controls.enableZoom = false;
        this.controls.enablePan = false;
        this.controls.minDistance = 500;
        this.controls.maxDistance = 10000;
        this.controls.addEventListener("change", function (e) {
        });

        window.addEventListener('resize', ()=>{
            (this.camera as THREE.PerspectiveCamera).aspect = ref.offsetWidth / ref.offsetHeight;
            (this.camera as THREE.PerspectiveCamera).updateProjectionMatrix();   
            (this.renderer as CSS3DRenderer).setSize(ref.offsetWidth, ref.offsetHeight);         
        })
    }
}
export const css3dEnv = new CSS3DEnv();

function CubeArea(){
    const {stickerConfig, mirrorConfig, mouseInteractionConfig, cubeConfig, fontConfig}: ConfigState = useSelector((state: RootState)=> state.configReducer);
    const cubeOperationInfo: {[key:string]:Array<string>;} = useSelector((state: RootState)=> state.OperationInfoReducer);
    const cubeContainer = useRef(null);
    const nextButton = useRef(null);
    const [descriptionIdx, setDescriptionIdx] = useState(-1);
    const [operationIdx, setOperationIdx] = useState(-1);
    const [operationMode, setOperationMode] = useState(0)

    useEffect(()=>{        
        css3dEnv.init(cubeContainer.current);
        css3dEnv.animate();   
        css3dEnv.cube.addEventListener("operationCompleted", ()=>{            
            if(css3dEnv.cube.playState === "play"){
                setOperationMode(0);
                (nextButton.current as any).dispatchEvent(new Event('click', {bubbles : true}))
            }            
        });
    }, [cubeContainer]);

    useEffect(() => {   
        if(Object.keys(cubeConfig).length){            
            document.body.style.backgroundColor = (cubeConfig as any).backgroundColor;     
            css3dEnv.cube.options.blockColor = (cubeConfig as any).blockColor;
            css3dEnv.cube.refreshBlockColor();
        }       
    }, [cubeConfig])

    useEffect(() => {        
        if(Object.keys(stickerConfig).length){
            Object.assign(css3dEnv.cube.options.stickerColorSet, stickerConfig);
            css3dEnv.cube.refreshStickers();
        }
    }, [stickerConfig])

    useEffect(() => {          
        css3dEnv.cube.options.mirror = mirrorConfig;
        css3dEnv.cube.refreshMirrorSticker()    
    }, [mirrorConfig])

    useEffect(() => {       
        Object.assign(css3dEnv.cube.options, mouseInteractionConfig);            
    }, [mouseInteractionConfig])
    
    useEffect(()=>{  
        const keys = Object.keys(cubeOperationInfo)
        if(keys.length){
            css3dEnv.cube.refreshCube();
            if(keys[0] === "SCRAMBLE" || keys[0] === "scramble"){
                css3dEnv.cube.operate(cubeOperationInfo[keys[0]].join(""))         
                setDescriptionIdx(0);                
                setOperationIdx(cubeOperationInfo[keys[0]].length - 1); 
            }else{
                setDescriptionIdx(0);
                setOperationIdx(-1);  
            }
            
        }else{
            setDescriptionIdx(0);
            setOperationIdx(-1);     
        }              
    }, [cubeOperationInfo])    

    useEffect(()=>{               
        if(operationMode === 1){
            if(operationIdx > -1){
                const keys = Object.keys(cubeOperationInfo);
                if(operationIdx < cubeOperationInfo[keys[descriptionIdx]].length ){
                    let operation = cubeOperationInfo[keys[descriptionIdx]][operationIdx];                
                    css3dEnv.cube.operateWidthAnimation(operation);            
                }            
            }
        }else if(operationMode === -1){
            if(operationIdx >= -1){
                const keys = Object.keys(cubeOperationInfo);
                let operation
                if(operationIdx === cubeOperationInfo[keys[descriptionIdx]].length - 1){
                    operation = cubeOperationInfo[keys[descriptionIdx + 1]][0];                
                }else{
                    operation = cubeOperationInfo[keys[descriptionIdx]][operationIdx + 1];                    
                }
                
                if (operation.includes("'")) {
                    operation = operation.replace((/'/i), "");
                } else {
                    if(operation.length === 1){
                        operation = operation + "'";
                    }else{
                        operation = Array.from(operation).join("'")
                    }
                }                
                css3dEnv.cube.operateWidthAnimation(operation);            
            }            
        }
    }, [operationIdx])
    function play(){
        setOperationMode(0);
        css3dEnv.cube.playState = "play";
        (nextButton.current as any).dispatchEvent(new Event('click', {bubbles : true}))
    }
    function pause(){
        css3dEnv.cube.playState = "pause";
    }
    function stop(){
        css3dEnv.cube.playState = "stop";
        setDescriptionIdx(0);
        setOperationIdx(-1);  
    }
    function next(){                
        if(!css3dEnv.cube.animationEnabled) return;        
        if(descriptionIdx < 0 && operationIdx < 0){
            setDescriptionIdx(0);
            setOperationIdx(0);            
            return;
        }                 
        const keys = Object.keys(cubeOperationInfo);
        const descriptionCnt = Object.keys(cubeOperationInfo).length;
        setOperationMode(1);

        if(descriptionIdx < descriptionCnt){
            const oprCnt = cubeOperationInfo[keys[descriptionIdx]].length; 
            const nextIdx = operationIdx + 1;
            const nextDescIdx = descriptionIdx + 1;
            if(nextIdx >= oprCnt){
                if(nextDescIdx < descriptionCnt){
                    setDescriptionIdx(descriptionIdx + 1);      
                    setOperationIdx(0);
                }else{
                    css3dEnv.cube.playState = "pause";
                    setOperationMode(0);
                }                
            }else{
                setOperationIdx(operationIdx + 1);
            }       
            
        }       
    }
    function before(){       
        if(!css3dEnv.cube.animationEnabled) return;
        setOperationMode(-1)        
        const keys = Object.keys(cubeOperationInfo);
        const descriptionCnt = Object.keys(cubeOperationInfo).length;

        if(descriptionIdx < descriptionCnt && descriptionIdx > -1){
            const oprCnt = cubeOperationInfo[keys[descriptionIdx]].length;
            const beforeIdx = operationIdx - 1;
            const beforeDescIdx = descriptionIdx - 1;
            if(beforeIdx > -1){                
                setOperationIdx(operationIdx - 1);
            }
            else{
                if(beforeDescIdx > -1){
                    setOperationIdx(cubeOperationInfo[keys[descriptionIdx - 1]].length - 1);                    
                    setDescriptionIdx(descriptionIdx - 1);                    
                }else{
                    setOperationIdx(-1);
                    setDescriptionIdx(0);
                }
            }
        }
    }
    
    return(
        <> 
            <div ref={cubeContainer} style={{"width" : "100%", "height" : "100%"}}>
                
            </div>
            <div style={{"position" : "absolute", "top" : "0px" , "width" : "50%", "zIndex" : 3, color : fontConfig.fontColor, fontSize : 25, fontWeight : "bold"}} >
            {
                Object.keys(cubeOperationInfo).map((d, i)=>{
                    return < >
                        <div key={uuid()}>
                            <span style={{ color : i === descriptionIdx  ? "red" : "inherit"}} key={uuid()}>{d} : </span>
                            {
                                Array.from(cubeOperationInfo[d]).map((f, j)=>{
                                    if(j % 10 !== 0 || j === 0)
                                        return <><span key={uuid()} style={{ color : j === operationIdx && i === descriptionIdx  ? "red" : "inherit"}}>{f}</span></>                    
                                    else if(j % 10 === 0)
                                        return <><span key={uuid()} style={{ color : j === operationIdx && i === descriptionIdx  ? "red" : "inherit"}}>{f}</span><br key={uuid()}/></>                    
                                })
                            }
                        
                        </div>
                        <br key={uuid()}/>
                    </>
                }).flat()
            }
            </div>
            <div style={{"position" : "absolute", "top" : "90%" , "left" : "42%", "width" : "100%", "zIndex" : 3, color : fontConfig.fontColor, fontSize : 40, fontWeight : "bold"}} >
            {
                Object.keys(cubeOperationInfo).length ?
                <div>                   
                    <Button style={{marginLeft : "5px"}} onClick={play}  variant="link">                    
                        <FontAwesomeIcon style={{marginLeft : "5px", cursor : "pointer", color : fontConfig.fontColor}} icon={faPlay}/>
                    </Button>
                    <Button style={{marginLeft : "5px"}} onClick={pause} variant="link">
                        <FontAwesomeIcon style={{marginLeft : "5px", cursor : "pointer", color : fontConfig.fontColor}} icon={faPause}/>
                    </Button>
                    <Button style={{marginLeft : "5px"}} onClick={stop} variant="link">
                        <FontAwesomeIcon style={{marginLeft : "5px", cursor : "pointer", color : fontConfig.fontColor}} icon={faStop}/>
                    </Button>
                    <Button style={{marginLeft : "5px"}} onClick={next} ref={nextButton} variant="link">
                        <FontAwesomeIcon style={{marginLeft : "5px", cursor : "pointer", color : fontConfig.fontColor}} icon={faArrowRight}/>
                    </Button>
                    <Button style={{marginLeft : "5px"}} onClick={before} variant="link">
                        <FontAwesomeIcon style={{marginLeft : "5px", cursor : "pointer", color : fontConfig.fontColor}} icon={faArrowLeft}/>
                    </Button>
                </div>
                : <div></div>
                
            }
            </div>
        </>
        
    )
}
export default CubeArea;
