import { combineReducers } from "redux";
import {configReducer} from "./ConfigReducer";
import {operationReducer} from './OperationReducer'

const rootReducer = combineReducers({
    configReducer,
    operationReducer
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
