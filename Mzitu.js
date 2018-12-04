// ==UserScript==
// @name         Mzitu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  把mzitu的图片集中到一个界面
// @author       You
// @match        https://www.mzitu.com/*
// @grant        none
// ==/UserScript==

// https://i.meizitu.net/2018/11/27a01.jpg
// https://i.meizitu.net/2018/11/27a02.jpg
// https://i.meizitu.net/2018/11/27a03.jpg

(function() {
    'use strict';

    let allPages = document.getElementsByClassName('dots')[0].nextElementSibling.firstChild.innerHTML;
    let mainImg = document.getElementsByClassName('main-image')[0];
    let firstImg = document.getElementsByClassName('main-image')[0].getElementsByTagName('img')[0].src.substr(0,33);

    function addZero(n){
        return n <= 9 ? '0' + n : '' + n;
    }

    function createImg(){
        for(let i = 2; i < parseInt(allPages)+1; i++){
            let parent = document.createElement('div');
            let imgs = document.createElement('img');
            let section = document.createElement('section');

            imgs.src = firstImg + addZero(i) + '.jpg';
            section.innerHTML = i;

            parent.appendChild(imgs);
            parent.append(section);

            mainImg.appendChild(parent);
        }
    };

    createImg();


})();