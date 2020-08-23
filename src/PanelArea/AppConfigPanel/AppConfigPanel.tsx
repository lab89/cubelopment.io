import React, {useEffect, useRef} from 'react';
import guify from 'guify'
import { EventDispatcher } from 'EventDispatcher';
import { ConfigState } from '../../stores/ConfigReducer';
import { checkIndexedDB, saveConfig, saveAsDefaultConfig} from '../../actions/action';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../stores/reducers';
import { css3dEnv } from '../../CubeArea/CubeArea';

interface ConfigUIs {
    colorConfigUI: Array<any>,  
    mirrorConfigUI: Array<any>,
    mouseInterationConfigUI: Array<any>,
  }
  
class GUI {
    public gui: any;
    private configUIs:ConfigUIs; 
    public eventDispatcher = new EventDispatcher(['SAVE_CONFIG', 'SET_DEFAULT']);
    private configData: ConfigState | null = null;
    constructor(guiObject: any){
        this.gui = guiObject;
        this.configUIs = {
            colorConfigUI: [],
            mirrorConfigUI : [],
            mouseInterationConfigUI: [],
        }     
        this._initBasicConfigUI();
    }

    private _initBasicConfigUI(){
        this.gui.Register({
            type: 'title',
            label: 'App Config'
        })
        this.gui.Register({
            type : 'folder',
            label : 'Color Config',
        open : true
        })
        this.gui.Register({
            type : 'folder',
            label : 'Mirror Config',
            open : true
        })        
        this.gui.Register({
            type: 'folder',
            label: 'Mouse Interaction Config',
            open : true
        })
        this.gui.Register({
            type : 'button',
            label : 'Reset Default Config',
            action: () => {        
                this.eventDispatcher.trigger('SET_DEFAULT', { data : null});
            }
        })
        this.gui.Register({
            type : 'button',
            label : 'Save',
            action: () => {        
                this.eventDispatcher.trigger('SAVE_CONFIG', { data : this.configData});
            }
        })
        this.gui.Register({
            type: 'folder',
            label: 'Camera',
            open : true
        })
        this.gui.Register({
            type: 'button',
            label : "Reset Camera Position",
            folder : "Camera",
            action : ()=>{
                (css3dEnv?.camera as THREE.PerspectiveCamera).position.x = 3000;
                (css3dEnv?.camera as THREE.PerspectiveCamera).position.y = 3000;
                (css3dEnv?.camera as THREE.PerspectiveCamera).position.z = 3000;
            }
        })
        this.gui.Register({
            type: 'folder',
            label: 'Cube',
            open : true
        })
        this.gui.Register({
            type: 'button',
            label : "Reset Cube",
            folder : "Cube",
            action : ()=>{
                css3dEnv.cube.refreshCube();
            }
        })    
        this.gui.Register({
            type: 'button',
            label : "unselect All",
            folder : "Cube",
            action : ()=>{
                // 모든 셀렉트 해제
            }
        })         
    }

    private _initializeAppConfigUI(data: ConfigState){
        this._colorConfigUI(data);
        this._mirrorToggleUI(data);
        this._mouseInterationUI(data);
    }

    private _colorConfigUI(data: ConfigState){        
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'front',
        format: 'rgb',
        folder : 'Color Config',
        object: data.stickerConfig,
        property: 'f'
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'back',
        format: 'rgb',
        folder : 'Color Config',
        object: data.stickerConfig,
        property: 'b',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'up',
        format: 'rgb',
        folder : 'Color Config',
        object: data.stickerConfig,
        property: 'u',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'down',
        format: 'rgb',
        folder : 'Color Config',
        object: data.stickerConfig,
        property: 'd',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'left',
        format: 'rgb',
        folder : 'Color Config',
        object: data.stickerConfig,
        property: 'l',
        }));
        this.configUIs.colorConfigUI.push(this.gui.Register({
        type: 'color',
        label: 'right',
        format: 'rgb',
        folder : 'Color Config',
        object: data.stickerConfig,
        property: 'r',
        }));
        
        
    }

    private _mirrorToggleUI(data: ConfigState){
        
        this.configUIs.mirrorConfigUI.push(this.gui.Register({
            type: 'checkbox',
            label: 'Toggle Mirror',
            folder : 'Mirror Config',
            object: data,
            property: 'mirrorConfig'            
        }));       
    }

    private _mouseInterationUI(data: ConfigState){
        this.configUIs.mouseInterationConfigUI.push(this.gui.Register({
            type: 'checkbox',
            label: 'Enable Click',
            folder : 'Mouse Interaction Config',
            object: data.mouseInteractionConfig,
            property: 'clickEnabled'            
        }));      
        this.configUIs.mouseInterationConfigUI.push(this.gui.Register({
            type: 'color',
            label: 'Click Color',
            format: 'rgb',
            folder : 'Mouse Interaction Config',
            object: data.mouseInteractionConfig,
            property: 'clickColor',
        }));
        this.configUIs.mouseInterationConfigUI.push(this.gui.Register({
            type: 'checkbox',
            label: 'Enable Hover',
            folder : 'Mouse Interaction Config',
            object: data.mouseInteractionConfig,
            property: 'hoverEnabled'            
        }));      
        this.configUIs.mouseInterationConfigUI.push(this.gui.Register({
            type: 'color',
            label: 'Hover Color',
            format: 'rgb',
            folder : 'Mouse Interaction Config',
            object: data.mouseInteractionConfig,
            property: 'hoverColor',
        }));
    }

    public updateAppConfigUI(data: ConfigState){
        if(this.configUIs.colorConfigUI.length > 0){      
            this.configUIs.colorConfigUI.forEach((ui)=> this.gui.Remove(ui))      
            this.configUIs.colorConfigUI = [];
        }
        if(this.configUIs.mirrorConfigUI.length>0){
            this.configUIs.mirrorConfigUI.forEach((ui)=> this.gui.Remove(ui))      
            this.configUIs.mirrorConfigUI = [];
        }
        if(this.configUIs.mouseInterationConfigUI.length>0){
            this.configUIs.mouseInterationConfigUI.forEach((ui)=> this.gui.Remove(ui))      
            this.configUIs.mouseInterationConfigUI = [];
        }
        this._initializeAppConfigUI(data);
        this.configData = data;
    }
}


// https://github.com/colejd/guify
let dat_gui: any = null;


function AppConfigPanel(){
    const appConfig: ConfigState = useSelector((state: RootState)=> state.configReducer);
    const dispatch = useDispatch();

    const panelDOM = useRef(null);

    useEffect(()=>{
        console.log("%c CHECK_INDEXED_DB", 'background: #222; color: #bada55') 
        console.log(panelDOM.current)
        dat_gui = new GUI(new guify({
            title: 'cubelopment.io',
            theme: 'dark', // dark, light, yorha, or theme object
            align: 'right', // left, right
            width: "100%",            
            barMode: 'offset', // none, overlay, above, offset
            panelMode: 'inner',
            opacity: 0.95,
            root : panelDOM.current,
            open: true
        }));

        dat_gui.eventDispatcher.on('SAVE_CONFIG', (event: any)=> dispatch(saveConfig(event.data)));   
        dat_gui.eventDispatcher.on('SET_DEFAULT', (event: any)=> dispatch(saveAsDefaultConfig()));   

        dispatch(checkIndexedDB())
    }, []); //once

    useEffect(()=>{
        console.log("%c App useEffect appConfig", 'background: #222; color: #bada55')
        console.log(appConfig);
        if(Object.keys(appConfig.stickerConfig).length){
            dat_gui.updateAppConfigUI(appConfig);
        }        
    },[appConfig])

    return(
        <>
            <div className="min-vh-100" ref={panelDOM} style={{"overflowY" : "auto", "overflowX" : "auto"}} id="panelUI"></div>            
        </>
    )
}

export default AppConfigPanel;