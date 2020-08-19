import { ConfigState } from "../stores/ConfigReducer";


export enum actionType {
    CHECK_INDEXED_DB = 'CHECK_INDEXED_DB',
    SET_CONFIG_TO_PANEL = 'SET_CONFIG_TO_PANEL',
    SAVE_CONFIG = 'SAVE_CONFIG',
    CREATE_OPERATION = 'CREATE_OPERATION',
    REMOVE_OPERATION = 'REMOVE_OPERATION'
}

export function checkIndexedDB() {
    return { type : 'CHECK_INDEXED_DB', payload: null};
}
export function saveConfig(config: object){
    return {type : 'SAVE_CONFIG', payload: config};
}
export function setConfigToPanel(config: ConfigState){
    return {type : 'SET_CONFIG_TO_PANEL', payload: config}
}
export function createOperation(description: string){
    return {type : 'CREATE_OPERATION', payload: description}
}


export type checkIndexedDBAction = ReturnType<typeof checkIndexedDB>;
export type saveConfigAction = ReturnType<typeof saveConfig>;
export type setConfigToPanelAction = ReturnType<typeof setConfigToPanel>;
export type createOperationlAction = ReturnType<typeof createOperation>;

