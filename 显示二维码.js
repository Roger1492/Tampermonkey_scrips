// ==UserScript==
// @name         自己写的二维码显示
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  灵感来源于 油猴脚本显示二维码，我自己写了一个一样的。按 alt +　q 显示二维码
// @author       Roger shen
// @match        *://*/*
// @grant        none
// @require     https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @require     https://cdn.bootcss.com/lrsjng.jquery-qrcode/0.14.0/jquery-qrcode.min.js
// ==/UserScript==

(function () {
  'use strict';
  let wrap = document.createElement('div');
  let qrcode = document.createElement('div');
  wrap.setAttribute('class', 'wrap');
  qrcode.setAttribute('class', 'qrcode');
  wrap.setAttribute('style', 'position: fixed; padding: 20px; background: white; border: 5px solid black; top: 30%; left: 42%; display: none; z-index: -9999;');
  wrap.appendChild(qrcode);
  document.body.appendChild(wrap);

  // alt+q 显示二维码
  document.addEventListener('keydown', function (e) {
    let url = document.URL;
    if (e.keyCode === 81 && e.altKey) {
      wrap.setAttribute('style', 'position: fixed; padding: 20px; background: white; border: 5px solid black; top: 30%; left: 42%; display: block; z-index: 9999;');
      qrcode.innerHTML = '';
      $(document).ready(function () {
        $('.qrcode').qrcode({
          render: 'div',
          minVersion: 1,
          ecLevel: 'L',
          left: 0,
          top: 0,
          size: 200,
          fill: '#000',
          background: '#fff',
          text: url
        })
      })
    }
  }, false);

  // 取消二维码 点击界面任意位置
  document.addEventListener('click', function (e) {
    wrap.style.display = 'none';
  }, false);

  // 取消二维码 按 Esc 键
  document.addEventListener('keypress', function (e) {
    if (e.keyCode === 27) {
      wrap.style.display = 'none';
    }
  }, false);

})();
