import { takeEvery, put, delay, all, call } from "redux-saga/effects";
import {actionType, setConfigToPanel, saveConfigAction} from "../actions/action"
import { openDB, deleteDB } from 'idb/with-async-ittr.js';

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
                  d: "rgba(235, 253, 57, 1)",
                  marker : "rgba(17, 123, 145, 1)"
                }
                ,"StickerConfig")

            }
          })
    });
    const val = yield call(()=> db.get('cubelopmentAppConfig', "StickerConfig"))
    console.log("%c 사가", 'background: #222; color: #bada55')
    console.log(val);
    yield put(setConfigToPanel(val));
}

function* watchSaveIndexedDB(){
    yield takeEvery<any>(actionType.SAVE_CONFIG, saveIndexedDB);
}
function* saveIndexedDB(action: saveConfigAction){
    console.log("%c saveIndexedDB", 'background: #222; color: #bada55');
    console.log(action);
    
    const db = yield call(()=> {
        return openDB('cubelopmentConfig', 1, {})
    });
    yield call(()=> db.put('cubelopmentAppConfig', action.payload,  "StickerConfig"));
    const val = yield call(()=> db.get('cubelopmentAppConfig', "StickerConfig"));
    yield put(setConfigToPanel(val));
}

export default function* rootSaga() {
  yield all([watchCheckIndexedDB(), watchSaveIndexedDB()]);
}
