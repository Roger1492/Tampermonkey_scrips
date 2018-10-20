// ==UserScript==
// @name         去百度广告
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  清爽百度，去广告和恶心的东西
// @author       Roger Shen
// @match        https://www.baidu.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 删除右侧的推荐内容
    let content_right = document.getElementById("content_right");
    content_right.parentElement.removeChild(content_right);

})();