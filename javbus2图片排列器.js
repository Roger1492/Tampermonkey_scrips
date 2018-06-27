// ==UserScript==
// @name         Javbus2 图片排列器(重制版)
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  查看页面详细信息
// @author       Roger Shen
// @match        https://www.javbus2.pw/page/*
// @match        https://www.javbus2.pw/star/*
// @match        https://www.javbus2.pw/series/*
// @match        https://www.javbus2.pw/label/*
// @match        https://www.javbus2.pw/search/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let ad = document.querySelectorAll(".ad-table, .ad-list");
    let item = document.querySelectorAll("#waterfall>.item");
    let createSection = document.createElement("section");
    let createImgBig = document.createElement("img");
    let oneImg = document.getElementsByClassName("one");
    let createClose = document.createElement("div");
    let CreatetoTop = document.createElement("div");
    let winHeight = window.innerHeight;

    // 先删除所有的广告
    for (let i = 0; i < ad.length; i++) {
        ad[i].parentElement.removeChild(ad[i]);
    }

    // 创建信息框
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
        createClose.setAttribute("style", "position:relative; color:white; font-size:30px; font-weight:800px; cursor:pointer; z-index:999; width:40px; height:40px;line-height:40px;text-align:center; background:black;");
        createClose.addEventListener("click", function (e) {
            this.parentElement.style.top = "-2000px";
            // console.log(this.parentElement);
        }, false);

        // 在信息框中添加返回顶部按钮
        createSection.appendChild(CreatetoTop);
        CreatetoTop.innerHTML = "toTop";
        CreatetoTop.setAttribute("style", "position:relative; right:0px; bottom:0px; width:80px; height:30px; line-height:30px; font-size:20px; text-align:center; background:black; color:white; cursor: pointer;");
        CreatetoTop.addEventListener("click", function (e) {
            createSection.scrollTop = "0px";
        }, false);
    }
    detail();

    // 删除所有item的内联style
    for (let i = 0; i < item.length; i++) {
        // item[i].removeAttribute("style");
        item[i].setAttribute("style","width:187px; height:330px;");

        // 鼠标滑动到item上时创建查看按钮
        // TODO: 按钮的大小应该是缩略图的大小
        item[i].addEventListener("mouseenter", function (e) {
            let createSpan = document.createElement("span");
            createSpan.setAttribute("id", "view");
            createSpan.innerHTML = "查看";
            createSpan.setAttribute("style", "position:relative; transform:translate(10px,-300px); display:inline-block; width:167px; z-index:9999; background:rgba(0,0,0,.5); color:white; font-size:24px; height:167px; line-height:167px; text-align:center; cursor:pointer");
            item[i].appendChild(createSpan);

            createSpan.addEventListener("click", function (e) {
                createSection.style.top = "0px";
                createSection.scrollTop = "0px";

                // 获取AV大图的地址：
                // 原始图片：https://pics.javcdn.pw/thumb/6bgm.jpg
                // 大图地址：https://pics.javcdn.pw/cover/6bgm_b.jpg
                let add_img = this.previousElementSibling.querySelector(".photo-frame").getElementsByTagName("img")[0].getAttribute("src");
                let add_img1 = add_img.replace("thumb", "cover");
                let add_img2 = add_img1.replace(".jpg", "_b.jpg");

                // 获取AV番号
                let avBango = this.previousElementSibling.querySelector("date").innerHTML;
                let avLetter = avBango.split("-")[0];
                let avNum = avBango.split("-")[1];
                let bango = avLetter.toLocaleLowerCase() + "00" + avNum;

                createImgBig.src = add_img2;

                // 赋值图片地址
                for (let i = 0; i <= oneImg.length; i++) {
                    oneImg[i].src = "https://pics.dmm.co.jp/digital/video/" + bango + "/" + bango + "jp-" + (i + 1) + ".jpg";
                }

            }, false);

        }, false);

        item[i].addEventListener("mouseleave", function (e) {
            this.style.background = "";
            document.getElementById("view").parentElement.removeChild(document.getElementById("view"));
        }, false);
    }

})();