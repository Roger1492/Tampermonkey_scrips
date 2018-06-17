// ==UserScript==
// @name         Javbus2 图片排列器(重制版)
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  页面一分为二，做些缩略提，右侧详细信息
// @author       You
// @match        https://www.javbus2.pw/series/*
// @match        https://www.javbus2.pw/star/*
// @match        https://www.javbus2.pw/label/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let ad = document.querySelectorAll(".ad-table, .ad-list");
    let item = document.querySelectorAll(".item");
    let waterfall = document.getElementById("waterfall");
    let createSection = document.createElement("section");
    let createImgBig = document.createElement("img");
    let oneImg = document.getElementsByClassName("one");
    
    
    // 先删除所有的广告
    for(let i = 0; i < ad.length; i++){
        ad[i].parentElement.removeChild(ad[i]);
    }
    
    // TODO: 1 点击查看按钮后，如果在底部，则返回到顶部
    // TODO: 2  番号的获取还有些问题，目前只能获取4的字母开头的。Regexp还有些问题。  

    // 删除所有item的内联style
    for(let i = 0; i < item.length; i++){
        item[i].removeAttribute("style");
        item[i].style.height = "400px";     // 所有的item的高度都设置为相同的

        // 给每一个item添加一个查看按钮，
        let createSpan = document.createElement("span");
        createSpan.style.position =  "absolute";
        createSpan.innerHTML = "查看";
        createSpan.style.display = "inline-block";
        createSpan.style.width = "50px";
        createSpan.style.zIndex = "99999";
        createSpan.style.background = "gray";
        createSpan.style.fontSize = "24px";
        createSpan.style.color = "whtie";
        createSpan.style.cursor = "pointer";
        item[i].appendChild(createSpan);
        createSpan.addEventListener("click", function(e){
            // console.log(this.previousElementSibling);

            // 获取AV大图的地址：
            // 原始图片：https://pics.javcdn.pw/thumb/6bgm.jpg
            // 大图地址：https://pics.javcdn.pw/cover/6bgm_b.jpg
            let add_img = this.previousElementSibling.querySelector(".photo-frame").getElementsByTagName("img")[0].getAttribute("src");
            let add_img1 = add_img.replace("thumb", "cover");
            let add_img2 = add_img1.replace(".jpg", "_b.jpg");

            // 获取AV番号
            let avBango = this.previousElementSibling.querySelector("date").innerHTML;
            // let avLetter = /[a-z]{1,6}/g.exec(avBango);
            // let avNum = /\d{3}/g.exec(avBango)[0];
            let avLetter = avBango.substr(0,4);
            let avNum = avBango.substr(5,3);
            // console.log(avLetter + " - " + avNum);
            let bango = avLetter.toLocaleLowerCase() + "00" + avNum; 

           
            // 创建图片容器
            createImgBig.src = add_img2;

            // 赋值图片地址
            for(let i = 1; i <= oneImg.length; i++){
                oneImg[i].src = "https://pics.dmm.co.jp/digital/video/" + bango + "/" + bango + "jp-" + i + ".jpg";
            }
            
        }, false);
    }
    waterfall.removeAttribute("style");
    
    // 所有item放置到左半边
    waterfall.style.margin = "10px";
    waterfall.style.width = "980px";
    
    // 增加有半边的详细信息查看框
    createSection.setAttribute("id", "detail");
    createSection.style.position = "fixed";
    createSection.style.width = "960px";
    createSection.style.height = "730px";
    createSection.style.top = "60px";
    createSection.style.left = "940px";
    createSection.style.border = "1px solid black";
    createSection.style.overflowY = "scroll";
    document.body.appendChild(createSection);
    createSection.appendChild(createImgBig);

    //创建10个img标签
    for(let i = 0; i < 10; i++){
        let imgs = document.createElement("img");
        imgs.classList.add("one");
        createSection.appendChild(imgs);
    }

})();