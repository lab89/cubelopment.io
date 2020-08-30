import {actionType, setConfigToPanelAction, toggleMirrorModeAction} from "../actions/action";

interface StringMap { [key: string]: string; }
export interface ConfigState {
    stickerConfig: StringMap,
    mirrorConfig: boolean,
    mouseInteractionConfig: { [key: string]: string | boolean },
    cubeConfig: StringMap
}

const configState: ConfigState = {
    stickerConfig : {},
    mirrorConfig : false,
    mouseInteractionConfig : {},
    cubeConfig: {}
};

 export function configReducer(state = configState, action: setConfigToPanelAction): ConfigState{
    switch(action.type){
        case actionType.SET_CONFIG_TO_PANEL:
            console.log("%c configReducer :  actionType.SET_CONFIG_TO_PANEL", 'background: #222; color: #bada55');
            console.log(action);
            console.log({ ...state, ...action.payload});
            return { ...state, ...action.payload};                 
        default:
            return state;
    }
};


