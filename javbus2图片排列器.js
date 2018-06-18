// ==UserScript==
// @name         Javbus2 图片排列器(重制版)
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  页面一分为二，做些缩略提，右侧详细信息(最好在窗口最大化的情况下查阅)
// @author       Roger Shen
// @match        https://www.javbus2.pw/star/*
// @match        https://www.javbus2.pw/series/*
// @match        https://www.javbus2.pw/label/*
// @match        https://www.javbus2.pw/search/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let ad = document.querySelectorAll(".ad-table, .ad-list");
    let item = document.querySelectorAll(".item");
    let waterfall = document.getElementById("waterfall");
    let createSection = document.createElement("section");
    let createImgBig = document.createElement("img");
    let oneImg = document.getElementsByClassName("one");
    let page = document.getElementsByClassName("pagination")[0];
    let CreatetoTop = document.createElement("div");

    // 挪动分页的位置
    page.style.position = "relative";
    page.style.transform = "translateX(-700px)";

    // 先删除所有的广告
    for (let i = 0; i < ad.length; i++) {
        ad[i].parentElement.removeChild(ad[i]);
    }

    // 删除所有item的内联style
    for (let i = 0; i < item.length; i++) {
        item[i].removeAttribute("style");
        item[i].style.height = "450px";     // 所有的item的高度都设置为相同的

        // 鼠标滑动到item上时创建查看按钮
        item[i].addEventListener("mouseenter", function (e) {
            let createSpan = document.createElement("span");
            createSpan.setAttribute("id", "view");
            createSpan.innerHTML = "查看";
            createSpan.setAttribute("style", "position:relative; transform:translate(10px,-50px); display:inline-block; width:167px; z-index:9999; background:gray; color:white; font-size:24px; height:42px; line-height:42px; text-align:center; cursor:pointer");
            item[i].appendChild(createSpan);

            createSpan.addEventListener("click", function (e) {
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

                // 创建图片容器
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
    waterfall.removeAttribute("style");

    // 所有item放置到左半边
    waterfall.setAttribute("style", "margin:10px; width:960px;");

    // 增加有半边的详细信息查看框
    createSection.setAttribute("id", "detail");
    createSection.setAttribute("style","position:fixed; width:817px; height:974px; top:0px; left:980px; background:gray; z-index:999; overflow-y:scroll;");
    document.body.appendChild(createSection);
    createSection.appendChild(createImgBig);

    //创建10个img标签
    for (let i = 0; i < 20; i++) {
        let imgs = document.createElement("img");
        imgs.classList.add("one");
        imgs.style.maxWidth = "817px";
        createSection.appendChild(imgs);
    }

    // 在详细信息框中添加返回顶部按钮
    CreatetoTop.innerHTML = "toTop";
    CreatetoTop.setAttribute("style", "position:relative; transform:translateX(719px); width:80px; height:30px; line-height:30px; font-size:20px; text-align:center; background:black; color:white; cursor: pointer;");
    createSection.appendChild(CreatetoTop);
    CreatetoTop.addEventListener("click", function (e) {
        createSection.scrollTop = "0px";
    }, false);

})();