import { ConfigState } from "../stores/ConfigReducer";
import { OperationState } from "../stores/OperationReducer";


export enum actionType {
    CHECK_INDEXED_DB = 'CHECK_INDEXED_DB',
    SET_CONFIG_TO_PANEL = 'SET_CONFIG_TO_PANEL',
    SAVE_CONFIG = 'SAVE_CONFIG',
    SAVE_AS_DEFAULT_CONFIG = 'SAVE_AS_DEFAULT_CONFIG',
    CREATE_OPERATION = 'CREATE_OPERATION',
    REMOVE_OPERATION = 'REMOVE_OPERATION',
    SAVE_OPERATIONS = 'SAVE_OPERATIONS',
    REMOVE_OPERATIONS = 'REMOVE_OPERATIONS',
    TOGGLE_MIRROR_MODE = 'TOGGLE_MIRROR_MODE',
    TOGGLE_FACE_COLOR_PICKER = 'TOGGLE_FACE_COLOR_PICKER',
    SAVE_STICKER_CONFIG = 'SAVE_STICKER_CONFIG',
    SAVE_CUBE_CONFIG = 'SAVE_CUBE_CONFIG',
    SAVE_MIRROR_CONFIG = 'SAVE_MIRROR_CONFIG',
    SAVE_MOUSE_INTERACTION_CONFIG = "SAVE_MOUSE_INTERACTION_CONFIG"
}

export function checkIndexedDB() {
    return { type : 'CHECK_INDEXED_DB', payload: null};
}
export function saveConfig(config: ConfigState){
    return {type : 'SAVE_CONFIG', payload: config};
}
export function saveAsDefaultConfig(){
    return {type : 'SAVE_AS_DEFAULT_CONFIG', payload: null}
}
export function setConfigToPanel(config: ConfigState){
    return {type : 'SET_CONFIG_TO_PANEL', payload: config}
}
export function createOperation(){
    return {type : 'CREATE_OPERATION', payload: null}
}
export function saveOperations(operations: Array<OperationState>){
    return {type : 'SAVE_OPERATIONS', payload: operations}
}
export function removeOperation(description: string){
    return {type : 'REMOVE_OPERATION', payload: description }
}
export function removeOperations(){
    return {type : 'REMOVE_OPERATIONS', payload: null }
}
export function toggleMirrorMode(toggleMirror: boolean){
    return {type : 'TOGGLE_MIRROR_MODE', payload: toggleMirror}
}
export function toggleFaceColorPicker(face: string){
    return {type : 'TOGGLE_FACE_COLOR_PICKER', payload: face}
}
export function saveStickerConfig(stickerConfig: { [key: string]: string; }){
    return {type : 'SAVE_STICKER_CONFIG', payload: stickerConfig}
}
export function saveCubeConfig(cubeConfig: {[key: string]: string; }){
    return {type : 'SAVE_CUBE_CONFIG', payload: cubeConfig}
}
export function saveMirrorConfig(morrirConfig : boolean){
    return {type : 'SAVE_MIRROR_CONFIG', payload: morrirConfig}
}
export function saveMouseInteractionConfig(mouseInteractionConfig: {[key: string]: string | boolean; }){
    return {type : 'SAVE_MOUSE_INTERACTION_CONFIG', payload: mouseInteractionConfig}
}
export type checkIndexedDBAction = ReturnType<typeof checkIndexedDB>;
export type saveConfigAction = ReturnType<typeof saveConfig>;
export type setConfigToPanelAction = ReturnType<typeof setConfigToPanel>;
export type createOperationlAction = ReturnType<typeof createOperation>;
export type saveOperationsAction = ReturnType<typeof saveOperations>;
export type removeOperationAction = ReturnType<typeof removeOperation>;
export type removeOperationsAction = ReturnType<typeof removeOperations>;
export type toggleMirrorModeAction = ReturnType<typeof toggleMirrorMode>;
export type saveAsDefaultConfigAction = ReturnType<typeof saveAsDefaultConfig>;
export type toggleFaceColorPickerAction = ReturnType<typeof toggleFaceColorPicker>;
export type saveStickerConfigAction = ReturnType<typeof saveStickerConfig>;
export type saveCubeConfigAction = ReturnType<typeof saveCubeConfig>;
export type saveMirrorConfigAction = ReturnType<typeof saveMirrorConfig>;
export type saveMouseInteractionConfigAction = ReturnType<typeof saveMouseInteractionConfig>;