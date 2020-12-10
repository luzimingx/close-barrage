// chrome.browserAction.setBadgeText({ text: '关闭' });
// chrome.browserAction.setBadgeBackgroundColor({ color: '#fbdc00' });
var host = '';

chrome.runtime.onMessage.addListener(function(data, sender, sendResponse) {
    if (data.type === 'host') {
        host = data.value;
    }
    sendResponse('received ' + data.type);
});