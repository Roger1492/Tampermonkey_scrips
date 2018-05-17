// 查看javbus的大图

(function() {
    'use strict';

    let createDiv = document.createElement("div");
    let createSection = document.createElement("section");
    let createImg = document.createElement("img");
    let getImgs = document.getElementsByTagName("img");
    createDiv.style.position = "fixed";
    createDiv.style.top = "100px";
    createDiv.style.background = "black";    
    createDiv.style.zIndex = "999";
    createSection.style.color = "white";
    createSection.style.fontSize = "20px";
    createDiv.appendChild(createSection);
    createDiv.appendChild(createImg);
    document.body.appendChild(createDiv);
    
    for(let i = 0; i < getImgs.length; i++){
        getImgs[i].addEventListener("mouseenter",function(e){
            // console.log(this.title);
            createSection.innerHTML = this.title;
            if(e.clientX < 950){
                createDiv.style.left = "1000px";
            }
            if(e.clientX > 950){
                createDiv.style.left = "100px";
            }
            let src1 = this.src.replace(/thumb/i, "cover");
            let src2 = src1.replace(/.jpg/i, "_b.jpg");
            createImg.setAttribute("src", src2);
            this.addEventListener("click",function(){
                this.src = "";
            },false);
        },false);
    }
})();
