import {actionType, toggleFaceColorPickerAction} from "../actions/action";
interface ColorPickerButtonState {
    target: string;
}
const colorPickerButtonState: ColorPickerButtonState = {
    target: ''
}
export function colorPickerButtonReducer(state = colorPickerButtonState, action: toggleFaceColorPickerAction){
    switch(action.type){
        case actionType.TOGGLE_FACE_COLOR_PICKER:
            console.log("%c faceButtonReducer :  actionType.TOGGLE_FACE_COLOR_PICKER", 'background: #222; color: #bada55');
            console.log(action);         
            console.log(action.payload);
            console.log(colorPickerButtonState.target);   
            return {...colorPickerButtonState, ...{target: action.payload}};

        default:
            return state;
    }   
}