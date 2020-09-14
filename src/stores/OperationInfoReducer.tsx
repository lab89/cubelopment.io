import {actionType, setOperationInfoAction} from "../actions/action";

interface OperationInfoState {[key : string] : Array<string>}
let operationInfo : OperationInfoState = {};

export function OperationInfoReducer(state = operationInfo, action: setOperationInfoAction ){
    switch(action.type){
        case actionType.SET_OPERATION_INFO:            
            operationInfo = action.payload;
            return operationInfo;
        default:
            return operationInfo;
    }
}