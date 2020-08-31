import {actionType, createOperationlAction, saveOperationsAction} from "../actions/action";
import { uuid } from 'uuidv4';
export interface OperationState {
    uuid: string
    description: string;
    operation: string;
}

const operationState: Array<OperationState> = []

export function operationReducer(state = operationState, action: createOperationlAction | saveOperationsAction): Array<OperationState> { 
    const newState = state.map((opr)=> opr);
    switch(action.type){
        case actionType.CREATE_OPERATION:
            const operation = {
                uuid: uuid(),
                description: action.payload as string,
                operation : ""
            } as OperationState            
            newState.push(operation);
            return newState;        
        case actionType.REMOVE_OPERATION:
            return state.filter((operation)=> operation.description !== action.payload)            
        case actionType.REMOVE_OPERATIONS:
            return state.filter((operation)=> false);
        default:
            return state;
    }
}