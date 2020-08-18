import { takeEvery, put, delay, all, call } from "redux-saga/effects";
import {CHECK_INDEXED_DB, SAVE_CONFIG, SET_PANEL_COLOR} from "../enums/actionEnum"
import { openDB, deleteDB } from 'idb/with-async-ittr.js';

function* watchCheckIndexedDB() {
    yield takeEvery(CHECK_INDEXED_DB, checkIndexdDB);
}

function* checkIndexdDB() {
    const db = yield call(()=> {
        return openDB('cubelopmentConfig', 1, {
            async upgrade(db, oldVersion, newVersion, transaction) {
              // cubelopmentConfig가 없으면 실행됩니다.
              const store =db.createObjectStore('cubelopmentAppConfig');
              await store.add(
                {
                  cube : {
                    f: "rgba(42, 249, 107, 1)",
                    b: "rgba(5, 34, 174, 1)",
                    l: "rgba(225, 10, 28, 1)",
                    r: "rgba(252, 77, 30, 1)",
                    u: "rgba(230, 245, 252, 1)",
                    d: "rgba(235, 253, 57, 1)",
                    marker : "rgba(17, 123, 145, 1)"
                  }
                }
                ,"StickerConfig")

            }
          })
    });
    const val = yield call(()=> db.get('cubelopmentAppConfig', "StickerConfig"))
    console.log("%c 사가", 'background: #222; color: #bada55')
    console.log(val);
    yield put({ type: 'SET_PANEL_COLOR', config : val});
}

function* watchSaveIndexedDB(){
    yield takeEvery(SAVE_CONFIG, saveIndexedDB);
}
function* saveIndexedDB(t: any){
    console.log("%c saveIndexedDB", 'background: #222; color: #bada55');
    const db = yield call(()=> {
        return openDB('cubelopmentConfig', 1, {})
    });
    yield call(()=> db.put('cubelopmentAppConfig', t.config,  "StickerConfig"));
    const val = yield call(()=> db.get('cubelopmentAppConfig', "StickerConfig"));
    yield put({ type: 'SET_PANEL_COLOR', config : val});
}

export default function* rootSaga() {
  yield all([watchCheckIndexedDB(), watchSaveIndexedDB()]);
}
