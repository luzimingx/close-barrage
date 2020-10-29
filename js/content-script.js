var host = location.host.split('.')[1],
    hosts = ['douyu', 'huya'];

var selectors = {
    douyu: {
        layout: ['.layout-Player-video'], // 视频框
        toolbar: ['#js-player-toolbar'], // 礼物栏
        barrage: ['\[title="关闭弹幕"\]'], // 弹幕按钮
        fullScreen: ['\[title="全屏"\]'], //  全屏按钮
        pageScreen: ['\[title="网页全屏"\]'], // 网页全屏按钮
        quitPageScreen: ['\[title="退出网页全屏"\]'], // 退出网页全屏按钮
        asideToggle: ['.layout-Player-asidetoggleButton'], // 网页全屏后 收起边栏按钮
        quality: ['\[value="画质 "\]', 'nextElementSibling'], // 清晰度按钮
    },
    huya: {
        layout: ['.room-player-wrap'],
        toolbar: ['#player-gift-wrap'],
        barrage: ['\[title="关闭弹幕"\]'],
        fullScreen: ['\[title="全屏"\]'],
        // fullScreen: ['#player-fullscreen-btn'],
        pageScreen: ['\[title="剧场模式"\]'],
        quitPageScreen: ['\[title="退出剧场"\]'],
        asideToggle: ['#player-fullpage-right-btn'],
        quality: ['.player-videotype-list']
    },
    // huomao: {
    //     layout: ['#playing-box-root'],
    //     toolbar: ['.live-bottom-bigbox'],
    //     barrage: ['.danmu_state_state_notice'],
    //     fullScreen: ['.full-screen'],
    //     quality: ['.h5player_bitrate_change']
    // }
};
selectors = selectors[host];

// 在左上角创建全屏按钮
createButton({
    style: 'width: 50%;height:50%;position:absolute;top:0;left:0;',
    realButton: 'fullScreen'
});
// 在右上角创建全屏按钮
createButton({
    style: 'width: 50%;height:50%;position:absolute;top:0;right:0;',
    realButton: 'pageScreen',
    cb: function() {
        click(selectors.asideToggle, dom => dom.click());
    },
});
// 在右下角创建退出全屏按钮
createButton({
    style: 'width: 50%;height:50%;position:absolute;bottom:0;right:0;',
    realButton: 'quitPageScreen'
});
// 隐藏礼物工具栏
click(selectors.toolbar, dom => dom.parentNode.removeChild(dom));
// 关闭弹幕
click(selectors.barrage, dom => dom.click());
// 画质最佳
click(selectors.quality, dom => {
    dom && dom.firstElementChild.click();
});

function click(selector, suc, fail, maxTime) {
    var time = 0,
        maxTime = maxTime || 100,
        dom;
    var timer = setInterval(function() {
        time++;
        dom = getElement(selector[0]);
        dom && selector[1] && (dom = dom[selector[1]]);
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

// 创建方便操作的隐形按钮：全屏、网页全屏
function createButton(options) {
    var layout = getElement(selectors.layout[0]);
    if (!layout) {
        return setTimeout(function() {
            createButton(options);
        }, 500);
    }
    var button = createElement('div', {
        style: options.style
    });
    button.addEventListener('click', function() {
        click(selectors[options.realButton], dom => dom.click());
        options.cb && typeof options.cb === 'function' && options.cb();
    });
    layout.appendChild(button);
}
// 创建dom
function createElement(tag, attrs) {
    var elem = document.createElement(tag);
    for (var key in attrs) {
        elem.setAttribute(key, attrs[key]);
    }
    return elem;
}
// 获取dom
function getElement(selector) {
    return document.querySelector(selector);
}