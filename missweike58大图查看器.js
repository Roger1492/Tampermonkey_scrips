(function() {
    'use strict';

    let createIMG = document.createElement("img");
    createIMG.style.position = "fixed";
    createIMG.style.right = "20px";
    createIMG.style.top = "20px";
    createIMG.setAttribute("id", "gimg");
    document.body.appendChild(createIMG);

    let images = document.getElementsByTagName("img");
    for(let i = 0; i < images.length; i++){
        images[i].addEventListener("mouseenter", function(){
            let gimg = document.getElementById("gimg");
            let current_src = this.currentSrc;
            createIMG.setAttribute("src", current_src);
            createIMG.style.height = "90vh";
            createIMG.style.maxWidth = "40vw";
            this.addEventListener("click", function(){
                this.src = "";
            },false);
        }, false);
    }
})();
