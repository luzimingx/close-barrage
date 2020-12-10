var bg = chrome.extension.getBackgroundPage();
var shieldList = [];
getShieldList();

function getShieldList() {
    var key = bg.host + 'shield';
    chrome.storage.local.get(key, function(obj) {
        shieldList = obj[key] || [];
        showShieldList();
    });
}

function showShieldList() {
    var father = getElement('.shield-anchor-items');
    father.innerHTML = '';
    shieldList.forEach(function(item, index) {
        var son = createElement('div', {
            class: 'flex flex-middle shield-anchor-item',
        });
        var span = createElement('span', {
            class: 'flex-1'
        });
        span.innerHTML = item;
        var button = createElement('button', {
            class: 'btn btn-delete'
        });
        button.innerHTML = '删除';
        button.addEventListener('click', function() {
            shieldList.splice(index, 1);
            var key = bg.host + 'shield';
            chrome.storage.local.set({
                [key]: shieldList
            }, function() {
                getShieldList();
            });
        });
        son.appendChild(span);
        son.appendChild(button);
        father.appendChild(son);
    });
}

var saveBtn = getElement('.btn-save');
var shieldInput = getElement('.input-shield');
saveBtn.addEventListener('click', function() {
    var key = bg.host + 'shield';
    shieldList.push(shieldInput.value);
    chrome.storage.local.set({
        [key]: shieldList
    }, function() {
        shieldInput.value = '';
        getShieldList();
    });
});


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