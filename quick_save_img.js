// ==UserScript==
// @name         quick save img
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include    *
// @icon         https://www.google.com/s2/favicons?domain=arxiv.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

//以下方法可以下载除了gif格式的图片
    function downloadImgByBlob(url) {
        var img = new Image()
        img.onload = function() {
            var canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            var ctx = canvas.getContext('2d')
            // 将img中的内容画到画布上
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            // 将画布内容转换为Blob
            canvas.toBlob((blob) => {
                // blob转为同源url
                var blobUrl = window.URL.createObjectURL(blob)
                // 创建a链接
                var a = document.createElement('a')
                a.href = blobUrl
                a.download = ''
                // 触发a链接点击事件，浏览器开始下载文件
                //a.click()
            })
        }
        img.src = url
        // 必须设置，否则canvas中的内容无法转换为blob
        img.setAttribute('crossOrigin', 'Anonymous')
    }

    var keyflag = false;
    var src = null;

    document.body.addEventListener('keydown',
    event => {
        if ( event.metaKey || event.key == "s") {

            keyflag = true;
            //alert(keyflag);
           //alert("Ctrl+Vが押されました");
        }

    });
    document.body.addEventListener('keyup',
    event => {
        if ( event.metaKey || event.key == "s") {

            keyflag = false;

           //alert("Ctrl+Vが押されました");
        }

    });

   document.addEventListener('click', function ( e ) {
    //alert(e.target.src);

   src = e.target.src;
   if(src != null && keyflag){

       //downloadImgByBlob(src);

    //以下方法可以下载包含gif格式的图片
       var x=new XMLHttpRequest();
        x.open("GET", src, true);
        x.responseType = 'blob';
        x.onload=function(k){
            var url = window.URL.createObjectURL(x.response)
            var a = document.createElement('a');
            a.href = url
            a.download = ''
            a.click()
        }

        x.send();
    }
});

})();
