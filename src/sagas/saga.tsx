import { takeEvery, put, delay, all, call } from "redux-saga/effects";
import {actionType, setConfigToPanel, saveConfigAction} from "../actions/action"
import { openDB, deleteDB } from 'idb/with-async-ittr.js';

function* getConfigData(){
  const db = yield call(()=> {
    return openDB('cubelopmentConfig', 1, {})
  });
  const stickerConfig = yield call(()=> db.get('cubelopmentAppConfig', "StickerConfig"))
  const mirrorConfig = yield call(()=> db.get('cubelopmentAppConfig', "MirrorConfig"))
  const mouseInteractionConfig = yield call(()=> db.get('cubelopmentAppConfig', "MouseInterationConfig"))
  const cubeConfig = yield call(()=> db.get('cubelopmentAppConfig', "CubeConfig"))

  return {stickerConfig, mirrorConfig, mouseInteractionConfig, cubeConfig};
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
                  f: "rgba(42, 249, 107, 1)",
                  b: "rgba(5, 34, 174, 1)",
                  l: "rgba(225, 10, 28, 1)",
                  r: "rgba(252, 77, 30, 1)",
                  u: "rgba(230, 245, 252, 1)",
                  d: "rgba(235, 253, 57, 1)"
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
                  backgroundColor : "rgb(255, 255, 255)",
                  size : 300,
                  blockColor : "rgb(0, 0, 0)",                  
                }
                ,"CubeConfig");
            }
          })
    });
    
    console.log("%c saga", 'background: #222; color: #bada55')
    const appConfig = yield getConfigData();
    console.log(appConfig)
    yield put(setConfigToPanel(appConfig));
}

function* watchSaveIndexedDB(){
    yield takeEvery<any>(actionType.SAVE_CONFIG, saveIndexedDB);
}

function* saveIndexedDB(action: saveConfigAction){   
    
    const db = yield call(()=> {
        return openDB('cubelopmentConfig', 1, {})
    });
    yield call(()=> db.put('cubelopmentAppConfig', action.payload.stickerConfig,  "StickerConfig"));
    yield call(()=> db.put('cubelopmentAppConfig', action.payload.mirrorConfig,  "MirrorConfig"));
    yield call(()=> db.put('cubelopmentAppConfig', action.payload.mouseInteractionConfig,  "MouseInterationConfig"));
    yield call(()=> db.put('cubelopmentAppConfig', action.payload.cubeConfig,  "CubeConfig"));

    console.log("%c saveIndexedDB", 'background: #222; color: #bada55');    
    const appConfig = yield getConfigData();
    console.log(appConfig);
    
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
    f: "rgba(42, 249, 107, 1)",
    b: "rgba(5, 34, 174, 1)",
    l: "rgba(225, 10, 28, 1)",
    r: "rgba(252, 77, 30, 1)",
    u: "rgba(230, 245, 252, 1)",
    d: "rgba(235, 253, 57, 1)"
  },  "StickerConfig"));
  yield call(()=> db.put('cubelopmentAppConfig', false,  "MirrorConfig"));
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

  console.log("%c saveIndexedDB", 'background: #222; color: #bada55');    
  const appConfig = yield getConfigData();
  console.log(appConfig);
    
  yield put(setConfigToPanel(appConfig));
}
export default function* rootSaga() {
  yield all([watchCheckIndexedDB(), watchSaveIndexedDB(), wathSaveAsDefaultConfig()]);
}
