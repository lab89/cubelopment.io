import {actionType, createOperationlAction} from "../actions/action";
import { uuid } from "uuidv4";
export interface OperationState {
    uuid: string
    description: string;
    operation: string;
}

const operationState: Array<OperationState> = []

export function operationReducer(state = operationState, action: createOperationlAction): Array<OperationState> {
    switch(action.type){
        case actionType.CREATE_OPERATION:
            const operation = {
                uuid: uuid(),
                description: "please input description",
                operation : "pleas input operation"
            } as OperationState
            const newState = state.map((opr)=> opr)
            newState.push(operation);
            return newState;            
        case actionType.REMOVE_OPERATION:
            return state;
        case actionType.MODIFY_OPERATION:
            return state;
        default:
            return state;
    }
}
