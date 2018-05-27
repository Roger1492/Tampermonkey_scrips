// ==UserScript==
// @name         Javbus2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  本脚本实现两个功能：1，显示主页大图。2，将子页面缩略图变成大图，并排列好。
// @author       Roger Shen
// @match        https://www.javbus2.pw/
// @match        https://www.javbus2.pw/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    // 功能1：删除页面的所有广告
    let adTable = Array.from(document.querySelectorAll("table.ad-table,div.ad-list"));
    for(let i = 0; i  < adTable.length; i++){
        adTable[i].parentElement.removeChild(adTable[i]);
    }

    // 功能2：Javbus2主页面大图查看器
    let masonryBrick = document.getElementsByClassName("masonry-brick");

    for (let i = 0; i < masonryBrick.length; i++) {
        // 鼠标放到图片上，显示大图
        masonryBrick[i].addEventListener("mouseenter", function (e) {
            // console.log("mouse enter");
            let createSection = document.createElement("section");
            let createSpan = document.createElement("span");
            let createImg = document.createElement("img");
            document.body.appendChild(createSection);
            createSection.appendChild(createSpan);
            createSection.appendChild(createImg);

            createSection.style.position = "fixed";
            createSection.setAttribute("id", "big_img");
            createSection.style.top = "250px";
            createSection.style.width = "800px";
            createSpan.style.display = "inline-block";
            createSpan.style.background = "gray";
            createSpan.style.color = "white";

            let imgs = this.querySelector("img");
            let img_addr = imgs.getAttribute("src");        // 获取AV图片的缩略图地址
            let img_title = imgs.getAttribute("title");     // 获取AV图片的title
            let img_addr1 = img_addr.replace("thumb", "cover");
            let img_address = img_addr1.replace(".jpg", "_b.jpg");      // 获取AV图片的正常图片地址

            createSpan.innerHTML = img_title;
            createImg.setAttribute("src", img_address);

            if (e.clientX > 960) {
                createSection.style.left = "100px";
            } else {
                createSection.style.left = "1000px";
            }
        }, false);

        // 鼠标离开图片，大图消失
        masonryBrick[i].addEventListener("mouseleave", function () {
            // console.log("mouse leave");
            let BigImg = document.getElementById("big_img");
            BigImg.parentElement.removeChild(BigImg);
        }, false);
    }

    // 功能2： 将具体AV的缩略图变成大图，并排列好。
    let sampleWaterfall = document.getElementById("sample-waterfall");
    let sampleWaterfalla = document.getElementById("sample-waterfall").querySelectorAll("a");
    for (let i = 0; i < sampleWaterfalla.length; i++) {
        let url_addr = sampleWaterfalla[i].getAttribute("href");
        let createImg = document.createElement("img");
        let createBr = document.createElement("br");
        createImg.setAttribute("src", url_addr);
        sampleWaterfall.appendChild(createBr);
        sampleWaterfall.appendChild(createImg);
    }

})();