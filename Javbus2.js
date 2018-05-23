// ==UserScript==
// @name         Javbus2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  将缩略图变成大图，并排列好。
// @author       Roger Shen
// @match        https://www.javbus2.pw/
// @match        https://www.javbus2.pw/*
// @grant        none
// ==/UserScript==


(function () {
    'use strict';

    // Javbus2主页面大图查看器
    let masonryBrick = document.getElementsByClassName("masonry-brick");
    let createSection = document.createElement("section");
    let createSpan = document.createElement("span");
    let createImg = document.createElement("img");
    document.body.appendChild(createSection);
    createSection.appendChild(createSpan);
    createSection.appendChild(createImg);

    createSection.style.position = "fixed";
    createSection.style.top = "250px";
    createSection.style.width = "800px";
    createSpan.style.display = "inline-block";
    createSpan.style.background = "gray";
    createSpan.style.color = "white";

    for (let i = 0; i < masonryBrick.length; i++) {
        masonryBrick[i].addEventListener("mouseenter", function (e) {
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
    }

    // for(let i = 0; i < masonryBrick.length; i++){
    //     masonryBrick[i].addEventListener("mouseleave", function(e){
    //         createSection.style.display = "none";
    //     }, false)
    // }

    // 将具体AV的缩略图变成大图，并排列好。
    let sampleWaterfall = document.getElementById("sample-waterfall");
    let sampleWaterfalla = document.getElementById("sample-waterfall").querySelectorAll("a");
    for (let i = 0; i < sampleWaterfalla.length; i++) {
        let url_addr = sampleWaterfalla[i].getAttribute("href");
        let createImg = document.createElement("img");
        createImg.setAttribute("src", url_addr);
        sampleWaterfall.appendChild(createImg);
    }

})();