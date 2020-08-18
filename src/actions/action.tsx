import {RootState} from "../stores/reducers";

export enum actionType {
    CHECK_INDEXED_ED = 'CHECK_INDEXED_DB',
    SET_CONFIG_TO_PANEL = 'SET_CONFIG_TO_PANEL',
    SAVE_CONFIG = 'SAVE_CONFIG'
}

export function checkIndexedDB() {
    return { type : 'CHECK_INDEXED_DB', payload: null};
}
export function saveConfig(config: RootState){
    return {type : 'SAVE_CONFIG', payload: config};
}
export function setConfigToPanel(config: RootState){
    return {type : 'SET_CONFIG_TO_PANEL', payload: config}
}

export type actions =
    ReturnType<typeof checkIndexedDB>
    | ReturnType<typeof saveConfig>
    | ReturnType<typeof setConfigToPanel>
