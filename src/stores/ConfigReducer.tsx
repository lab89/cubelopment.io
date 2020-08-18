import {actionType, setConfigToPanelAction} from "../actions/action";


export interface ConfigState {
    stickerConfig: {
        f: string;
        r: string;
        u: string;
        d: string;
        b: string;
        l: string;
        marker: string;
    } | {}
}

const configState: ConfigState = {
    stickerConfig : {}
};

 export function configReducer(state = configState, action: setConfigToPanelAction): ConfigState{
    switch(action.type){
        case actionType.SET_CONFIG_TO_PANEL:
            console.log("%c configReducer :  actionType.SET_CONFIG_TO_PANEL", 'background: #222; color: #bada55');
            console.log(action);
            console.log({ ...state, stickerConfig: action.payload});
            return { ...state, stickerConfig: action.payload};
        default:
            return state;
    }
};


