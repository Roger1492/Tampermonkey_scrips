// ==UserScript==
// @name         Javbus2 图片排列器
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  将缩略图变成大图，并排列好。
// @author       You
// @match        https://www.javbus2.pw/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let sampleWaterfall = document.getElementById("sample-waterfall");
    let sampleWaterfalla = document.getElementById("sample-waterfall").querySelectorAll("a");
    for(let i = 0; i < sampleWaterfalla.length; i++){
        let url_addr = sampleWaterfalla[i].getAttribute("href");
        let createImg = document.createElement("img");
        createImg.setAttribute("src", url_addr);
        sampleWaterfall.appendChild(createImg);
    }
})();