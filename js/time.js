// JavaScript Document

// Date: 2014-11-07
// Author: Agnes Xu


i = 0;
j = 0;
counttime = 0;
MM = 0;
SS = 60;  // 秒 90s
MS = 0;
d = 180 * (MM + 1);
MM = "0" + MM;
var gameTime = 40;
var s, t1;
//count down
var showTime = function () {
    totle = totle - 1;
    if (totle == 0) {
        clearInterval(s);
        clearInterval(t1);
        $('.pie1').css("backgroundColor", "#fff");
        $(".pie2").css("-webkit-transform", "rotate(" + d + "deg)");
        if (score >= 60) {
            $('.successScore').html(score + '分');
            $('.optimum').html('历史最佳成绩：' + 80 + '分');
            $('#page_6').show();
        } else {
            $('.failScore').html(score + '分');
            $('.optimum').html('历史最佳成绩：' + 80 + '分');
            $('#page_5').show();
        }
    } else {
        if (totle > 0 && MS > 0) {
            MS = MS - 1;
            if (MS < 10) {
                MS = "0" + MS
            }
            ;
        }
        ;
        if (MS == 0 && SS > 0) {
            MS = 10;
            SS = SS - 1;
            
        }
        ;
        if (SS == 0 && MM > 0) {
            SS = 60;
            MM = MM - 1;
            if (MM < 10) {
                MM = "0" + MM
            }
            ;
        }
        ;
    }
    ;
    $(".time").html(SS);
};

var start1 = function () {
    //i = i + 0.6;
    i = i + 360 / ((gameTime) * 10);  //旋转的角度  90s 为 0.4  60s为0.6
    counttime = counttime + 1;
    if (counttime <= ((gameTime / 2 * 10))+1) {  // 一半的角度  90s 为 450
        $(".pie1").css("-o-transform", "rotate(" + i + "deg)");
        $(".pie1").css("-moz-transform", "rotate(" + i + "deg)");
        $(".pie1").css("-webkit-transform", "rotate(" + i + "deg)");
    } else {
        $(".pie1").css("-webkit-transform", "rotate(180deg)");
        $(".pie2").css("backgroundColor", "#fff");
        $(".pie2").css("-o-transform", "rotate(" + i + "deg)");
        $(".pie2").css("-moz-transform", "rotate(" + i + "deg)");
        $(".pie2").css("-webkit-transform", "rotate(" + i + "deg)");
    }
};
var countDown = function () {
    //80*80px 时间进度条
    i = 0;
    j = 0;
    counttime = 0;
    MM = 0;
    SS = gameTime;
    MS = 0;
    totle = (MM + 1) * gameTime * 10;
    d = 180 * (MM + 1);
    MM = "0" + MM;
    showTime();
    s = setInterval("showTime()", 100);
    start1();
    t1 = setInterval("start1()", 100);
}