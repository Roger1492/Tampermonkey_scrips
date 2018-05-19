// ==UserScript==
// @name         Mzitu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  把mzitu的图片集中到一个界面
// @author       You
// @match        http://www.mzitu.com/*
// @grant        none
// ==/UserScript==

// http://i.meizitu.net/2018/05/17c01.jpg

(function() {
    'use strict';

    let mainImage_p = document.getElementsByClassName("main-image")[0].querySelector("p");
    let mainImage_Img = mainImage_p.querySelector("img");
    let mainImage_Attr = mainImage_Img.getAttribute("src");     // 获取图片地址

    let pages = Number(document.getElementsByClassName("dots")[0].nextElementSibling.childNodes[0].textContent);     // 获取页面的全部页数

    let url_addr = mainImage_Attr.substr(0, 32);

    function addZero(n){
        return n <= 9 ? "0"+n : "" + n;
    }

    for(let i = 1; i < pages; i++){
        let url = url_addr + addZero(i) + ".jpg";
        let createA = document.createElement("a");
        let createImg = document.createElement("img");
        let createSpan = document.createElement("span");

        createImg.setAttribute("src", url);
        createSpan.setAttribute("class", "pages");
        createA.appendChild(createImg);
        createA.appendChild(createSpan);
        createSpan.style.display = "block";
        createSpan.innerText = pages + " - " + addZero(i);

        mainImage_p.appendChild(createA);
    }

})();