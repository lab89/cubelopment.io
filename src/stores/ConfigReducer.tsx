import {actionType, setConfigToPanelAction, toggleMirrorModeAction} from "../actions/action";


export interface ConfigState {
    stickerConfig: {
        f: string;
        r: string;
        u: string;
        d: string;
        b: string;
        l: string;
    } | {},
    mirrorConfig: boolean,
    mouseInteractionConfig: {
        hoverEnabled: boolean,
        clickEnabled: boolean,
        hoverColor: string,
        clickColor: string,
    } | {},
    cubeConfig: {
        backgroundColor: string,
        blockColor:string
    } | {}
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


