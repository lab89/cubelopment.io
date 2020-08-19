import {actionType, createOperationlAction} from "../actions/action";
import { uuid } from 'uuidv4';
export interface OperationState {
    uuid: string
    description: string;
    operation: string;
}

const operationState: Array<OperationState> = []

export function operationReducer(state = operationState, action: createOperationlAction): Array<OperationState> { 
    switch(action.type){
        case actionType.CREATE_OPERATION:
            if(action.payload && typeof action.payload  === 'string'){
                const operation = {
                    uuid: uuid(),
                    description: action.payload as string,
                    operation : ""
                } as OperationState
                const newState = state.map((opr)=> opr)
                newState.push(operation);
                return newState;
            }            
            return state;
        case actionType.REMOVE_OPERATION:
            return state;
        default:
            return state;
    }
}