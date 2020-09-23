import { openDB } from 'idb/with-async-ittr.js';
import { deleteDB } from 'idb';

global.browser = require('webextension-polyfill');

chrome.runtime.onInstalled.addListener(async function(details) {
    console.log(details)
    if (details.reason == 'install') {
        //alert('install')    
    }else if(details.reason == 'update'){
        //alert('update');
    } 
});