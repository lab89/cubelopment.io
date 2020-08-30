import { combineReducers } from "redux";
import {configReducer} from "./ConfigReducer";
import {operationReducer} from './OperationReducer'
import {colorPickerButtonReducer} from './colorPickerButtonReducer'

const rootReducer = combineReducers({
    configReducer,
    operationReducer,
    colorPickerButtonReducer
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
