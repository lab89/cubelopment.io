import { combineReducers } from "redux";
import {configReducer} from "./ConfigReducer";
import {ColorPickerButtonReducer} from './ColorPickerButtonReducer'
import {OperationInfoReducer} from './OperationInfoReducer'
const rootReducer = combineReducers({
    configReducer,    
    ColorPickerButtonReducer,
    OperationInfoReducer,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
