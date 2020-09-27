import { takeEvery, put, delay, all, call } from "redux-saga/effects";
import {actionType, setConfigToPanel, saveConfigAction, saveStickerConfigAction, saveCubeConfigAction, saveMirrorConfigAction, saveMouseInteractionConfigAction, saveFontConfigAction} from "../actions/action"
import { openDB, deleteDB } from 'idb/with-async-ittr.js';

function* getConfigData(){
  const db = yield call(()=> {
    return openDB('cubelopmentConfig', 1, {})
  });
  const stickerConfig = yield call(()=> db.get('cubelopmentAppConfig', "StickerConfig"))
  const mirrorConfig = yield call(()=> db.get('cubelopmentAppConfig', "MirrorConfig"))
  const mouseInteractionConfig = yield call(()=> db.get('cubelopmentAppConfig', "MouseInterationConfig"))
  const cubeConfig = yield call(()=> db.get('cubelopmentAppConfig', "CubeConfig"))
  const fontConfig = yield call(()=> db.get('cubelopmentAppConfig', "FontConfig"))

  return {stickerConfig, mirrorConfig, mouseInteractionConfig, cubeConfig, fontConfig};
}

function* watchCheckIndexedDB() {
    yield takeEvery(actionType.CHECK_INDEXED_DB, checkIndexdDB);
}

function* checkIndexdDB() {
    const db = yield call(()=> {
        return openDB('cubelopmentConfig', 1, {
            async upgrade(db, oldVersion, newVersion, transaction) {
              // cubelopmentConfig가 없으면 실행됩니다.
              const store =db.createObjectStore('cubelopmentAppConfig');
              await store.add(
                {
                  f: "#83f52c",
                  b: "#1991e0",
                  l: "#fa7902",
                  r: "#f5001b",
                  u: "#e6e9ee",
                  d: "#defa04"
                }
                ,"StickerConfig");
              await store.add(false
                ,"MirrorConfig");
              await store.add(
                {
                  hoverEnabled : true,
                  clickEnabled : true,
                  hoverColor : "red",
                  clickColor : "rgb(131, 219, 28)"
                }
                ,"MouseInterationConfig");
              await store.add(
                {
                  backgroundColor : "#fff",
                  size : 300,
                  blockColor : "#000",                  
                }
                ,"CubeConfig");
              await store.add(
                {
                  fontColor : "#000000",                  
                }
                ,"FontConfig");
            }
          })
    });    
    const appConfig = yield getConfigData();
    yield put(setConfigToPanel(appConfig));
}
function* watchSaveStickerConfig(){
  yield takeEvery<any>(actionType.SAVE_STICKER_CONFIG, saveStickerConfig)
}
function* saveStickerConfig(action: saveStickerConfigAction){
  const db = yield call(()=> {
    return openDB('cubelopmentConfig', 1, {})
  });
  yield call(()=> db.put('cubelopmentAppConfig', action.payload,  "StickerConfig"));
  
  const appConfig = yield getConfigData();
  yield put(setConfigToPanel(appConfig));
}

function* wathSaveCubeConfig(){
  yield takeEvery<any>(actionType.SAVE_CUBE_CONFIG, saveCubeConfig)
}
function* saveCubeConfig(action: saveCubeConfigAction){
  const db = yield call(()=> {
    return openDB('cubelopmentConfig', 1, {})
  });
  yield call(()=> db.put('cubelopmentAppConfig', action.payload,  "CubeConfig"));
  const appConfig = yield getConfigData();  
  yield put(setConfigToPanel(appConfig));
}

function* watchSaveMirrorConfig(){
  yield takeEvery<any>(actionType.SAVE_MIRROR_CONFIG, saveMirrorConfig)
}
function* saveMirrorConfig(action: saveMirrorConfigAction){
  const db = yield call(()=> {
    return openDB('cubelopmentConfig', 1, {})
  });
  yield call(()=> db.put('cubelopmentAppConfig', action.payload,  "MirrorConfig"));
  const appConfig = yield getConfigData();
  yield put(setConfigToPanel(appConfig));

}

function* watchSaveMouseInteractionConfig(){
  yield takeEvery<any>(actionType.SAVE_MOUSE_INTERACTION_CONFIG, saveMouseInteractionConfig);
}
function* saveMouseInteractionConfig(action: saveMouseInteractionConfigAction){
  const db = yield call(()=> {
    return openDB('cubelopmentConfig', 1, {})
  });
  
  yield call(()=> db.put('cubelopmentAppConfig', action.payload,  "MouseInterationConfig"));
  const appConfig = yield getConfigData();
  yield put(setConfigToPanel(appConfig));
}
function* watchSaveFontConfig(){
  yield takeEvery<any>(actionType.SAVE_FONT_CONFIG, saveFontConfig);
}
function* saveFontConfig(action: saveFontConfigAction){
  const db = yield call(()=> {
    return openDB('cubelopmentConfig', 1, {})
  });
  yield call(()=> db.put('cubelopmentAppConfig', action.payload,  "FontConfig"));
  const appConfig = yield getConfigData();
  yield put(setConfigToPanel(appConfig));

}

function* wathSaveAsDefaultConfig(){
  yield takeEvery<any>(actionType.SAVE_AS_DEFAULT_CONFIG, saveAsDefaultConfig);
}

function* saveAsDefaultConfig(){
  const db = yield call(()=> {
    return openDB('cubelopmentConfig', 1, {})
  });

  yield call(()=> db.put('cubelopmentAppConfig', {
    f: "#83f52c",
    b: "#1991e0",
    l: "#fa7902",
    r: "#f5001b",
    u: "#e6e9ee",
    d: "#defa04"
  },  "StickerConfig"));
  yield call(()=> db.put('cubelopmentAppConfig', true,  "MirrorConfig"));
  yield call(()=> db.put('cubelopmentAppConfig', {
    hoverEnabled : true,
    clickEnabled : true,
    hoverColor : "red",
    clickColor : "rgb(131, 219, 28)"
  },  "MouseInterationConfig"));
  yield call(()=> db.put('cubelopmentAppConfig', {
    backgroundColor : "rgba(255, 255, 255,1)",
    blockColor : "rgba(0, 0, 0, 1)",                  
  },  "CubeConfig"));  
  const appConfig = yield getConfigData();    
  yield put(setConfigToPanel(appConfig));
}
export default function* rootSaga() {
  yield all([
    watchCheckIndexedDB(), 
    wathSaveAsDefaultConfig(), 
    watchSaveStickerConfig(),
    wathSaveCubeConfig(),
    watchSaveMirrorConfig(),
    watchSaveMouseInteractionConfig(),
    watchSaveFontConfig()
  ]);
}
