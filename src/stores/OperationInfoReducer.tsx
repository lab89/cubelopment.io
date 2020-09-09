import {actionType, setOperationInfoAction} from "../actions/action";

interface OperationInfoState {[key : string] : string}
let operationInfo : OperationInfoState = {};

export function OperationInfoReducer(state = operationInfo, action: setOperationInfoAction ){
    switch(action.type){
        case actionType.SET_OPERATION_INFO:
            console.log("%c faceButtonReducer :  actionType.SET_OPERATION_INFO", 'background: #222; color: #bada55');
            console.log(action);         
            console.log(action.payload);
            operationInfo = action.payload;
            return operationInfo;
        default:
            return operationInfo;
    }
}