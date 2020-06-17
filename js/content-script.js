var host = location.host.split('.')[1],
    hosts = ['douyu', 'huya', 'huomao'];

var selectors = {
    douyu: {
        layout: ['.layout-Player-video'],
        toolbar: ['#js-player-toolbar'],
        barrage: ['\[title="关闭弹幕"\]'],
        fullScreen: ['\[title="全屏"\]'],
        quality: ['\[value="画质 "\]', 'nextElementSibling']
    },
    huya: {
        layout: ['.room-player'],
        toolbar: ['#player-gift-wrap'],
        barrage: ['\[title="关闭弹幕"\]'],
        fullScreen: ['\[title="全屏"\]'],
        // fullScreen: ['#player-fullscreen-btn'],
        quality: ['.player-videotype-list']
    },
    huomao: {
        layout: ['#playing-box-root'],
        toolbar: ['.live-bottom-bigbox'],
        barrage: ['.danmu_state_state_notice'],
        fullScreen: ['.full-screen'],
        quality: ['.h5player_bitrate_change']
    }
};
selectors = selectors[host];

// 在左上角创建全屏按钮
createFullScreenButton();
// 隐藏礼物工具栏
click(selectors.toolbar, dom => dom.style.opacity = '0');
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

// 在左上角创建全屏按钮
function createFullScreenButton() {
    var layout = getElement(selectors.layout[0]);
    layout.style.position = 'relative';
    var button = createElement('div', {
        style: 'width: 80px;height:80px;background:red;position:absolute;top:0;left:0'
    });
    button.addEventListener('click', function() {
        click(selectors.fullScreen, dom => dom.click());
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