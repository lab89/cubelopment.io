import {actionType, setConfigToPanelAction, toggleMirrorModeAction} from "../actions/action";


export interface ConfigState {
    stickerConfig: {
        f: string;
        r: string;
        u: string;
        d: string;
        b: string;
        l: string;
        marker: string;
    } | {},
    mirrorConfig: boolean;
}

const configState: ConfigState = {
    stickerConfig : {},
    mirrorConfig : false
};

 export function configReducer(state = configState, action: setConfigToPanelAction | toggleMirrorModeAction): ConfigState{
    switch(action.type){
        case actionType.SET_CONFIG_TO_PANEL:
            console.log("%c configReducer :  actionType.SET_CONFIG_TO_PANEL", 'background: #222; color: #bada55');
            console.log(action);
            console.log({ ...state, stickerConfig: action.payload});
            return { ...state, stickerConfig: action.payload};
        case actionType.TOGGLE_MIRROR_MODE:            
            if(typeof action.payload === "boolean"){
                console.log("%c configReducer :  actionType.TOGGLE_MIRROR_MODE", 'background: #222; color: #bada55');
                console.log({...state, ...{mirrorConfig : action.payload}})
                return {...state, ...{mirrorConfig : action.payload}};
            }
            return {...state};            
        default:
            return state;
    }
};


