var html = document.documentElement;
var height = html.clientHeight;
var wait = 3;//当天的抽奖次数
var currentPage = 0;
var count = 1;
var prizeNumber = 0;
var degree = 1;
var swiper = null;
var CatalogName ="/duanwu";
var firstPlay = 1; //0 第一次玩
var loader = new resLoader({
    resources: [
        'images/1.png',
        'images/2.png',
        'images/3.png',
        'images/4.png',
        'images/5.png',
        'images/bottom.jpg',
        'images/explain.png',
        'images/failIcon.png',
        'images/failTitle.png',
        'images/page1Bg.jpg',
        'images/playMethod.png',
        'images/popBg.png',
        'images/popBg2.png',
        'images/popBg3.png',
        'images/popBg4.png',
        'images/successIcon.png',
        'images/tiger.png',
        'images/top.jpg',
    ],
    onStart: function (total) {
    },
    onProgress: function (current, total) {
    },
    onComplete: function (total) {
        $('#loading').hide();
        $('.main').show();
    }
});
(function () {
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
        handleFontSize();
    } else {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", handleFontSize);
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize() {
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function () {
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
        });
    }
    loader.start();
    var viewport = document.getElementById("metav");
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.toUpperCase().indexOf('IPHONE') > -1 || ua.toUpperCase().indexOf('IPOD') > -1) {
        $('.txtInput').css({ 'width': '80%', 'height': '55px' });
    }
    $('.main').css('height', height + 'px');
    $('.page').css('height', height + 'px');
    $('.bottom').css('height', height - 366 + 'px');
    $('.learn').click(function () {
        $('#page_3').hide();
        timeOut(wait);
    })
    $(".noChance").click(function () {
        $(".noChance").hide();
    })
})();
$(function () {
    //信息提交
    $('.btnSubmit').click(function () {
        var name = $('#name').val().replace(/\s/ig, '');
        if (name == '') {
            $('.error').html('请填写您的姓名');
            return;
        }
        var phone = $('#phone').val().replace(/\s/ig, '');
        if (phone == '') {
            $('.error').html('请填写您的联系方式');
            return;
        }
        var phonePattern = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
        if (!phonePattern.test(phone)) {
            $('.error').html('请正确填写您的联系方式');
            return;
        }
        var address = $('#address').val().replace(/\s/ig, '');
        if (address == '') {
            $('.error').html('请填写您的邮寄地址');
            return;
        }
        var Address = name + "|" + phone + "|" + address;
        AddAddress(Address);
    });
    $('.txtInput').focus(function () {
        $('.error').html('');
    });
    autoPlayAudio();
    //音乐
    music = document.getElementById('bgMusic');
    $('#music').on({
        click: function () {
            music_video();
        }
    });
})
function music_video() {
    if ($('#music').hasClass("open")) {
        //$('.musicImg').removeClass('rotateAni');
        $('#music').removeClass("open");

        music.pause();
    } else {
        //$('.musicImg').addClass('rotateAni');
        $('#music').addClass("open");
        music.play();
    }
}
function autoPlayAudio() {
    wx.config({
        // 配置信息, 即使不正确也能使用 wx.ready
        debug: false,
        appId: '',
        timestamp: 1,
        nonceStr: '',
        signature: '',
        jsApiList: []
    });
    wx.ready(function () {
        document.getElementById('bgMusic').play();
    });
}
function closeFn(id) {
    $('#page_' + id).hide();
    var val = parseInt($('.hiddenInput').val());
    switch (val) {
        case 2:
            $('#page_5').show();
            break;
        case 3:
            $('#page_6').show();
            break;
        case 4:
            $('#page_7').show();
            break;
        default:
            resetFn();
            $("#page_1").show();
            break;
    }

}
function startFn() {
    var msg = true;
    if (msg) {
        $('#page_1').hide();
        $('#page_2').show();
        if (firstPlay == 0) {
            $('#page_3').show();
            firstPlay = 1;
        } else {
            resetFn();
            timeOut(wait);
        }
    }
}
//3秒倒计时
function timeOut(wait) {
    $('#page_4').show();
    var time;
    if (wait != 0) {
        time = setTimeout(function () {
            $('.p4Number').html(--wait);
            timeOut(wait);
        }, 1000);
    } else {
        clearTimeout(time);
        $('#page_4').hide();
        showFn();
        setTimeout(function () {
            countDown();
        }, 1000)
    }
}
var barrierNumber = [2, 3, 4, 5, 5, 5, 6, 6, 6]; //每关小黑显示的个数
var barrierScore = [1, 2, 3, 4, 4, 5, 5, 6, 6];
var barrier = 0; //当前关卡
var countNumber = 0;
var time = 0;
var arr = [];
var score = 0;
randomFn(barrierNumber[barrier]);
//生成随机数
function randomFn(number) {
    arr = [];
    var json = {};
    while (arr.length < number) {
        var k = Math.round(Math.random() * 8);
        if (!json[k]) {
            json[k] = true;
            arr.push(k);
        }
    }
    console.log(arr);
}
//小黑显示
function showFn() {
    for (var i = 0; i < arr.length; i++) {
        if (barrier > 5) {
            time += 0.10;
        } else if (barrier > 3) {
            time += 0.15;
        } else {
            time += 0.30;
        }
        var img = Math.round(Math.random() * 3);
        var imgClass = arr[i] + 1;
        $('#img_' + imgClass).attr({ 'name': (i + 1), 'onclick': 'clickFn(this)' });
        $('#img_' + imgClass).css({ '-webkit-animation': 'fadeIn 0.4s ease-out ' + time + 's both' });
    }
}
//小黑点击
function clickFn(obj) {
    countNumber++;
    var name = $(obj).attr('name');
    var id = $(obj).attr('id');
    var oldscore = $("#oldScore").val();
    var drwNum = $("#drwNum").val();
    if (countNumber == name) { //正确
        score += barrierScore[barrier];
        $('.topLeft').html(score);
        $(obj).css({ '-webkit-animation': 'fadeOut 0.4s ease-out both' }).removeAttr("onclick");
        if (barrier == 8 && barrierNumber[barrier] == countNumber) {
            if (drwNum > 0) { //已抽过奖
                $('.btnDraw').hide();
                $('#page_6 .btnItem').css('bottom', '176px');
            } else {
                $('#page_6 .btnItem').css('bottom', '106px');
            }
            $('.successScore').html(score + '分');
            if (score > oldscore) {
                oldscore = score;
                $("#oldScore").val(oldscore);
            }
            $('.optimum').html('历史最佳成绩：' + oldscore + '分');
            $('#page_6').show();
            $('.hiddenInput').val(3);
        } else {
            if (barrierNumber[barrier] == countNumber) {
                Up(score, 1);
                setTimeout(function () {
                    countNumber = 0;
                    barrier++;
                    $('.topRight').html(barrier + 1);
                    arr = [];
                    $('.img').removeAttr('name');
                    randomFn(barrierNumber[barrier]);
                    time = 0;
                    showFn();
                }, 500)

            }
        }

    } else {
        Up(score, 0);
        if (score > oldscore) {
            oldscore = score;
            $("#oldScore").val(oldscore);
        }
        $('#' + id).children('.errorBg').addClass('fadeIn');
        $('.img').removeAttr('onclick');
        clearInterval(s);
        clearInterval(t1);
        setTimeout(function () {
            if (score >= 60) {
                if (drwNum > 0) { //已抽过奖
                    $('.btnDraw').hide();
                    $('#page_6 .btnItem').css('bottom', '176px');
                } else {
                    $('#page_6 .btnItem').css('bottom', '106px');
                }
                $('.successScore').html(score + '分');
                $('.optimum').html('历史最佳成绩：' + oldscore + '分');
                $('#page_6').show();
                $('.hiddenInput').val(3);
            } else {
                $('.failScore').html(score + '分');
                $('.optimum').html('历史最佳成绩：' + oldscore + '分');
                $('#page_5').show();
                $('.hiddenInput').val(2);
            }

        }, 500)
    }
}
//再玩一次
function againFn(id, wait) {
    var msg = Play();
    if (msg) {
        $('#page_' + id).hide();
        //var val = parseInt($('.hiddenInput').val());
        //if (val == 1) {
        //    $('#page_1').hide();
        //    $('#page_2').show();
        //}
        $('.page').hide();
        $('#page_2').show();
        wait = 3;
        $('.p4Number').html(wait);
        resetFn();
        timeOut(wait);
    }
}
//重置
function resetFn() {
    $('.pie1').css({ "backgroundColor": "#9dd4c1", 'transform': 'rotate(0deg)' });
    $('.pie2').css({ "backgroundColor": "#9dd4c1", 'transform': 'rotate(0deg)' });
    $('.time').html(40);
    $('.img').attr({ 'name': '', 'style': '' });
    $('.errorBg').removeClass('fadeIn');
    $('.topLeft').html(0);
    $('.topRight').html(1);
    countNumber = 0;
    barrier = 0;
    time = 0;
    arr = [];
    score = 0;
    randomFn(barrierNumber[barrier]);
    wait = 3;
    $('.p4Number').html(wait);
}
//去抽奖
function toDrawFn() {
    $("#drwNum").val("1");
    $(".page").hide();
    resetFn();
    $("#page_1").show();
    $('#page_7').show();
    $('.hiddenInput').val(4);
}
var machine1 = $("#machine1").slotMachine({  //第一个老虎机设置
    active: 0, //初始化时显示第几张图案
    delay: 500 //延迟
});

var machine2 = $("#machine2").slotMachine({
    active: 1,
    delay: 500
});

var machine3 = $("#machine3").slotMachine({
    active: 2,
    delay: 500
});
var arr1 = [], arrRnd = [];
function onComplete1($el, active) { //抽奖回调
    if (arr1.length <= 1) {
        arr1.push(active);
    }
    else if (arr1.length > 1) {
        arr1.push(active);
        if (arr1[0].index == arr1[1].index && arr1[1].index == arr1[2].index) {  //成功
            var index = arr1[0].index;
            $('.drawTitle').css('background-image', 'url(../images/winTitle.png)');
            $('.drawTitle').addClass('fadeIn');
            switch (index) {
                case 0:  //胶囊耳机
                    $('.successInfo').html('恭喜你，获得<br>价值<span class="blue">99元</span>的ThinkPad 胶囊耳机一个！');
                    $('.successInfo').css('margin-top', '30px');
                    $('.successItem').show();
                    break;
                case 1:  //小黑公仔
                    $('.successInfo').html('恭喜你，获得小黑呆萌公仔一个！');
                    $('.successInfo').css('margin-top', '0');
                    $('.successItem').show();
                    break;
                case 2: //爱奇艺果
                    $('.successInfo').html('价值<span class="blue">200元</span>爱奇艺电视果一台');
                    $('.successInfo').css('margin-top', '0px');
                    $('.successItem').show();
                    break;
                case 3:  //20积分
                    $('.integralItem .successInfo').html('<span class="blue">100积分</span>已到账，<br>快去积分商城看看吧！');
                    $('.integralItem .successInfo').css('margin', '50px 0 0 0');
                    $('.btnIntegral').show();
                    $('.integralItem').show();
                    break;
                case 4:  //安慰奖
                    $('.integralItem .successInfo').html('一定是你的抽奖姿势不对！');
                    $('.integralItem .successInfo').css('margin', '80px 0');
                    $('.btnIntegral').hide();
                    $('.integralItem').show();
                    break;
                default:
            }
        }
        else {
            $('.drawTitle').css('background-image', 'url(../images/nowin.png)').addClass('nowinTitle');
            $('.drawTitle').addClass('fadeIn');
            $('.failItem').show();  //失败
        }
        arr1 = [];
        arrRnd = [];
    }
}
//老虎机bar
function barFn() {
    $('.bar').removeAttr('onClick');
    $('.drawTitle').removeClass('fadeIn');
    draw();
}
//排行榜
function rankFn(id) {
    //LoadRanking();
    $('#page_' + id).hide();
    $('#page_11').show();
}
//活动说明
function explainFn(id) {
    if (id != 1) {
        $('#page_' + id).hide();
    }
    $('#page_10').show();
}
//我的奖品
function prizeFn(id) {
    $('#page_' + id).hide();
    $('.prizeContent').html('');
    //LoadPrize();
winrecord=0;
    if (winrecord == 0) {
        $('#page_12 .nomore').show();
        $('.prizeContent').hide();
    } else {
        $('#page_12 .nomore').hide();
        $('.prizeContent').show();
        $('.center').html('');
        var num = parseInt($("#PrizeType").val()) + 1;
        var integral = 0;//积分
        var strHtml = '';
        strHtml += '<div class="swiper-container" id="record">';
        strHtml += '<div class="swiper-wrapper">';
        strHtml += '<div class="swiper-slide">';
        if (num == 4) {
            integral = 1;
        }
        strHtml += '<img src="images/slot' + num + '.png">';
        switch (num) {
            case 1:  //胶囊耳机
                strHtml += '<div class="prizeName">胶囊耳机</div>'
                break;
            case 2:  //小黑公仔
                strHtml += '<div class="prizeName">小黑公仔</div>'
                break;
            case 3: //爱奇艺果
                strHtml += '<div class="prizeName">爱奇艺果</div>'
                break;
            case 4:  //20积分
                strHtml += '<div class="prizeName">100积分</div>'
                break;
        }

        if (integral != 1) {
            strHtml += '<div class="btn" onclick="infoFn(12)">个人信息</div>';
        } else {
            strHtml += '<div class="btn " onclick="goshop()">积分商城</div>';
        }
        strHtml += '</div>';
        strHtml += '</div>';
        strHtml += '<div class="swiper-button-next"></div>';
        strHtml += '<div class="swiper-button-prev"></div>';
        strHtml += '</div>';
        $('.prizeContent').append(strHtml);
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            //loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            observer: true,
            observeParents: true,
        });
    }
    $('#page_12').show();
}
function scrollFn(obj, numb) {
    var scrollTop = $(obj).scrollTop();
    var scrollHeight = $('#rank_' + numb).height() + 20;
    var windowHeight = $(obj).height();
    if (scrollTop + windowHeight >= scrollHeight) {
        setTimeout(function () {
            loadList();
        }, 1000);

    }
}
//填写信息
function infoFn(id) {
    if (id != 12) {
        $('#page_' + id).hide();
    } else {
        $(".page").hide();
        $('#page_' + id).show();
        resetFn();
        $("#page_1").show();
    }
    $('#page_8').show();
    $('#page_8').css("z-index", "10");
}

//获取排行榜
function LoadRanking() {
    $.ajaxSetup({ async: false, cache: false });
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        url: CatalogName + '/WebService.asmx/LoadRanking',
        data: '{}',
        success: function (data) {
            var strJson = JSON.parse(data.d);
            if (strJson.Code == 1) {
                $(".rankContent").show();
                $("#page_11 .nomore").hide();
                rankHtml(strJson.msg);
            } else {
                $(".rankContent").hide();
                $("#page_11 .nomore").show();
            }
        }
    });
}
function rankHtml(list) {
    var strHtml = "";
    for (var i = 0; i < list.length; i++) {
        var num = parseInt(i) + 1;
        strHtml += '<div class="rankList">';
        if (num > 3 && num < 7) {
            strHtml += '<div class="rank1 rankList_4">' + num + '</div>';
        } else {
            strHtml += '<div class="rank1 rankList_' + num + '">' + num + '</div>';
        }
        strHtml += '<div class="rank2">' + list[i].NickName + '</div>';
        strHtml += '<div class="rank3">' + list[i].CodesId + '</div>';
        strHtml += '</div>';
    }
    $("#rank_1").html(strHtml);
}


function AddAddress(Address) {
    $.ajaxSetup({ async: false, cache: false });
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        url: '' + CatalogName + '/WebService.asmx/AddAddress',
        data: '{Address:"' + Address + '"}',
        success: function (data) {
            var megr = data.d;
            if (megr == "1") {
                $('#page_8').hide();
                $('#page_9').show();
                $('#page_9').css("z-index", "11");
                setTimeout("$('#page_9').hide()", 2000);
            } else {
                $('.error').html('没有找到中奖记录');
            }
        },
        error: function () {

        }
    });
}
function LoadPrize() {
    $.ajaxSetup({ async: false, cache: false });
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        url: '' + CatalogName + '/WebService.asmx/LoadPrizeRecord',
        success: function (data) {
            var strJson = JSON.parse(data.d);
            if (strJson.Code == 1) {
                winrecord = 1;
                $("#PrizeType").val(strJson.msg);
                var address = strJson.address;
                if (address != "" && address != null) {
                    var list = address.split("|");
                    $('#name').val(list[0]);
                    $('#phone').val(list[1]);
                    $('#address').val(list[2]);
                }

            } else {
                winrecord = 0;
                $('#page_12 .nomore').show();
                $('.prizeContent').hide();
            }
        },
        error: function () {

        }
    });
}

function Play() {
    var msg = true;
    $.ajaxSetup({ async: false, cache: false });
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        url: CatalogName + '/WebService.asmx/Play',
        data: '',
        success: function (data) {
            var megr = data.d;
            if (megr != "0" && megr != "1") {
                $('#strCode').val(megr);
            } else if (megr == "1") {
                $(".noChance").show();
                msg = false;
            }
            var num = parseInt($("#GameNum").val());
            if (num > 0) {
                num--;
            }
            $("#GameNum").val(num);
            game();
        },
        error: function () {

        }
    });
    return msg;
}
function Up(score, type) {
    var bl = false;
    $.ajaxSetup({ async: true, cache: false });
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        url: CatalogName + '/WebService.asmx/Up',
        data: '{Code:"' + $("#strCode").val() + '",score:' + score + ',type:' + type + '}',
        success: function (data) {
            var megr = data.d;
            if (megr != "0") {
                $('#strCode').val(megr);
            }
        },
        error: function () {

        }
    });
    return bl;
}

function draw() {
    var msg = true;
    $.ajaxSetup({ async: true, cache: false });
    $.ajax({
        type: 'POST',
        contentType: 'application/json;charset=utf-8',
        url: CatalogName + '/WebService.asmx/draw',
        data: '{Code:"' + $("#strCode").val() + '"}',
        success: function (data) {
            var megr = data.d;
            if (megr > 3) {
                ran = 0; //未 中奖
                megr = 4;
            } else {
                ran = 1; //1 中奖
            }
            random = parseInt(megr);  //随机在4个奖品中抽取一个
            machine1.shuffle(3, onComplete1);
            setTimeout(function () {
                machine2.shuffle(3, onComplete1);
            }, 500);
            setTimeout(function () {
                machine3.shuffle(3, onComplete1);
            }, 1000);
        },
        error: function () {

        }
    });
    return msg;
}
//是否中奖
function isWin() {
    ran = 0; //1 中奖
}

function goshop() {
    window.location.href = "http://black-case.com/duanwu/integral.aspx";
}

function game() {
    var num = parseInt($("#GameNum").val());
    if (num > 0) {
        $(".opportunity").html("您今天还有" + num + "次机会");
    } else {
        $(".opportunity").html("您今天的机会已用完");
    }
}