// 隐藏礼物工具栏
click('#js-player-toolbar', dom => dom.style.opacity = '0');
// 关闭弹幕
click("[title='关闭弹幕']", dom => dom.click());
// 窗口全屏 没有效果
click("[title='窗口全屏']", dom => dom.click());
// 画质最佳
click("[value='画质 ']", dom => {
    var ul = dom.nextElementSibling;
    ul.firstElementChild.click();
});

function click(selector, suc, fail, maxTime) {
    var time = 0,
        maxTime = maxTime || 100,
        dom;
    var timer = setInterval(function() {
        time++;
        dom = document.querySelector(selector);
        if (dom) {
            suc && typeof suc === 'function' && suc(dom);
            return clearInterval(timer);
        }
        if (time > maxTime) {
            fail && typeof fail === 'function' && fail();
            return clearInterval(timer);
        }
    }, 500);
}