// ==UserScript==
// @name         xgtutu聚合
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Roger Shen
// @match        http://www.xgtutu.com/*
// @match        http://www.xgtutu.com/rentihtml/zhaopian/20200706/86351.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let pagelist = Array.from(document.getElementsByClassName('pagelist')[0].querySelectorAll('a'));
    let picg = document.getElementById('picg').getElementsByTagName('p')[0].getElementsByTagName('a')[0];
    console.log(picg);
    for(let i = 0; i < pagelist.length; i++){
        let createImgs = document.createElement('img');
        picg.append(createImgs);
    }

})();