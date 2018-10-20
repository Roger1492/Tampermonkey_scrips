// ==UserScript==
// @name         Javbus2 图片排列器 Verson:2.0
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  查看页面详细信息
// @author       Roger Shen
// @match        https://www.seedmm.net/
// @match        https://www.seedmm.net/page/*
// @match        https://www.seedmm.net/star/*
// @match        https://www.seedmm.net/series/*
// @match        https://www.seedmm.net/label/*
// @match        https://www.seedmm.net/search/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let ad = Array.from(document.querySelectorAll(".ad-table, .ad-list"));
    let item = Array.from(document.querySelectorAll(".item"));
    let createSection = document.createElement("section");
    let createImgBig = document.createElement("img");
    let oneImg = document.getElementsByClassName("one");
    let createClose = document.createElement("div");
    let CreatetoTop = document.createElement("div");
    let winHeight = window.innerHeight;

    // 先删除所有的广告
    ad.forEach(function (element, index, array) {
        element.parentElement.removeChild(element);
    })

    // 创建大图查看框
    function detail() {
        createSection.setAttribute("id", "detail");
        createSection.setAttribute("style", "position:fixed; right:0px; top:-2000px; width:817px; height:" + winHeight + "px; background:rgba(0,0,0,.4); z-index:999; overflow-y:scroll;");
        document.body.appendChild(createSection);
        createSection.appendChild(createClose);
        createSection.appendChild(createImgBig);

        //创建10个img标签
        for (let i = 0; i < 10; i++) {
            let imgs = document.createElement("img");
            imgs.classList.add("one");
            imgs.style.maxWidth = "817px";
            createSection.appendChild(imgs);
        }

        // 在信息框中添加关闭按钮
        createClose.innerHTML = "X";
        createClose.setAttribute("style", "position:fixed; opacity:.5; color:white; font-size:30px; font-weight:800px; cursor:pointer; z-index:999; width:40px; height:40px;line-height:40px;text-align:center; background:black;");
        createClose.addEventListener("click", function (e) {
            this.parentElement.style.top = "-2000px";
        }, false);

        // 在信息框中添加返回顶部按钮
        createSection.appendChild(CreatetoTop);
        CreatetoTop.innerHTML = "toTop";
        CreatetoTop.setAttribute("style", "position:relative; opacity:.5; right:0px; bottom:0px; width:80px; height:30px; line-height:30px; font-size:20px; text-align:center; background:black; color:white; cursor: pointer;");
        CreatetoTop.addEventListener("click", function (e) {
            createSection.scrollTop = "0px";
        }, false);
    }
    detail();

    // mouseenter 后显示查看按钮
    item.forEach(function (element, index, array) {
        element.addEventListener("mouseenter", function (e) {
            let div = document.createElement("div");
            div.classList.add("check");
            div.setAttribute("style", "position:absolute; top:10px; left:9px; width:168px; height:40px; line-height:40px; background:black; color:white; z-index:999; text-align:center;cursor:pointer;font-size:20px;");
            div.innerHTML = "Check";
            this.appendChild(div);
        }, false);

        // 点击查看按钮后显示大图查看框
        element.addEventListener("click", function () {
            createSection.style.top = "0px";
            createSection.scrollTop = "0px";

            // 获取AV大图的地址：
            // 原始图片：https://pics.javcdn.pw/thumb/6bgm.jpg
            // 大图地址：https://pics.javcdn.pw/cover/6bgm_b.jpg
            let add_img = this.getElementsByTagName("img")[0].src;
            let add_img1 = add_img.replace("thumb", "cover");
            let add_img2 = add_img1.replace(".jpg", "_b.jpg");
            createImgBig.src = add_img2;

            // 获取AV番号
            // https://pics.dmm.co.jp/digital/video/ngod00080/ngod00080jp-1.jpg
            // https://pics.dmm.co.jp/digital/video/ngod00080/ngod00080jp-2.jpg
            let avBango = this.getElementsByTagName("date")[0].innerHTML
            let avLetter = avBango.split("-")[0];
            let avNum = avBango.split("-")[1];
            let bango = avLetter.toLocaleLowerCase() + "00" + avNum;

            // 赋值图片地址
            for (let i = 0; i <= oneImg.length; i++) {
                oneImg[i].src = "https://pics.dmm.co.jp/digital/video/" + bango + "/" + bango + "jp-" + (i + 1) + ".jpg";
            }
        }, false);
    })
    // mouseleave后删除查看按钮
    item.forEach(function (element, index, array) {
        element.addEventListener("mouseleave", function (e) {
            let check = document.getElementsByClassName("check")[0];
            check.parentElement.removeChild(check);
        }, false);
    })

})();