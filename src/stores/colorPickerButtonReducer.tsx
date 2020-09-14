import {actionType, toggleFaceColorPickerAction} from "../actions/action";
interface ColorPickerButtonState {
    target: string;
}
const colorPickerButtonState: ColorPickerButtonState = {
    target: ''
}
export function ColorPickerButtonReducer(state = colorPickerButtonState, action: toggleFaceColorPickerAction){
    switch(action.type){
        case actionType.TOGGLE_FACE_COLOR_PICKER:           
            return {...colorPickerButtonState, ...{target: action.payload}};
        default:
            return state;
    }   
}