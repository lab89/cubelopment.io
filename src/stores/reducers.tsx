import {CHECK_INDEXED_DB, SET_PANEL_COLOR} from '../enums/actionEnum'
// import {appAction} from '../actions/actions'
import { combineReducers } from "redux";

const appState = {
    stickerConfig : {
        cube : null,
        marker : null
    },    
}
const appReducer = (state = appState, action: any)=>{    
    console.log(action.type)

    switch(action.type){       
        case SET_PANEL_COLOR:
            const newState = { ...state, stickerConfig: action.config };
            console.log("%c 리듀서 SET_PANEL_COLOR", 'background: #222; color: #bada55')
            console.log(newState);
            return newState
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    appReducer
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>