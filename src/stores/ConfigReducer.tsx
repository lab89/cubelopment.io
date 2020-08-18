import {actions, actionType} from "../actions/action";

const configState = {
    stickerConfig : {
        cube : null,
        marker : null
    }
};

export const configReducer = (state = configState, action: actions) =>{
    switch(action.type){
        case actionType.SET_CONFIG_TO_PANEL:
            console.log("%c configReducer :  actionType.SET_CONFIG_TO_PANEL", 'background: #222; color: #bada55');
            console.log({ ...state, stickerConfig: action.payload});
            return { ...state, stickerConfig: action.payload};
        default:
            return state;
    }
};

export type ConfigState = ReturnType<typeof configReducer>;

