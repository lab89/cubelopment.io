import {actionType, setConfigToPanelAction, toggleMirrorModeAction, setOperationInfoAction} from "../actions/action";

interface StringMap { [key: string]: string; }
export interface ConfigState {
    stickerConfig: StringMap,
    mirrorConfig: boolean,
    mouseInteractionConfig: { [key: string]: string | boolean },
    cubeConfig: StringMap,
    fontConfig: StringMap
}

const configState: ConfigState = {
    stickerConfig : {},
    mirrorConfig : false,
    mouseInteractionConfig : {},
    cubeConfig: {},
    fontConfig : {}
};

 export function configReducer(state = configState, action: setOperationInfoAction): ConfigState{
    switch(action.type){
        case actionType.SET_CONFIG_TO_PANEL:            
            return { ...state, ...action.payload};                 
        default:
            return state;
    }
};


