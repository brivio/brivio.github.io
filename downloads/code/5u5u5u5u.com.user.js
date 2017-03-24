// ==UserScript==
// @name         杭州驾考网络教学助手
// @namespace    brivio
// @include      http://hz.5u5u5u5u.com/studyOnLine*
// @require      http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @run-at       document-end
// @grant        unsafeWindow
// ==/UserScript==

$(function () {
    if (Notification && Notification.permission !== "granted") {
        Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
        });
    }
    if (Notification && Notification.permission != "granted") {
        return;
    }
    var notify_closed = true;
    var total_time=0;

    function show_notify(content) {
        if (!notify_closed) {
            return;
        }else{
            notify_closed = false;
        }

        var options = {
            dir: "ltr",
            lang: "utf-8",
            icon: "http://hz.5u5u5u5u.com/qunle/images/footlogo.png",
            body: content
        };
        var n = new Notification("提示", options);
        n.onclose = function () {
            notify_closed = true;
        };
    }
    console.log('每隔0.5秒检查一次');
    setInterval(function () {
        if ($('.xubox_layer').size() > 0) {    
            show_notify('检测到页面有弹层出现!');
        }
        total_time+=0.5;
        if(total_time>=60*15){
            show_notify('已经大于15分钟！');
        }
    }, 500);
});