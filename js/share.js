$(function () {
    shareFn();
})
//分享
function shareFn() {
    if ($.isWeiXin()) {
        $.wxConfig({
            debug: false,
            shared: true,
            title: '小黑端午节有礼啦！',
            desc: '来玩呀，顺便领个奖。',
            link: 'http://black-case.com/duanwu/share.html',
            imgUrl: 'http://black-case.com/duanwu/images/share.jpg',
            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "hideMenuItems", "showMenuItems"],
            name: '3b6621bd1ad6f489',
            code: '3b80a171380b579fd1bccaa6eb08efd6',
        }, success_Function);
    }
}
function success_Function() { }