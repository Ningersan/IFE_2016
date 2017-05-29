/**
 * Created by Ningersan on 2017/2/1.
 */
function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

var inputEle = $a(".sign-up input");

var tips = {
    name: ['名称格式正确！', '请检查字符数！'],
    password: ['密码格式正确！', '格式错误，请重新输入密码'],
    passwordChecked: ['密码正确！', '两次输入密码不一致，请重新检查'],
    email: ['邮箱格式正确！', '邮箱格式错误，请重新检查'],
    tel: ['手机格式正确！', '手机格式错误，请重新检查']
};

var validator = {
    name: /^[a-zA-Z0-9_]{4,16}$/,
    password: /^[a-zA-Z0-9_]{6,18}$/,
    passwordChecked: /^[a-zA-Z0-9_]{6,18}$/,
    email: /^[a-zA-Z0-9_\.\-]+@[^\.@]+\.[a-z]+$/,
    tel: /^1\d{10}$/
};

/**
 * 检查输入是否合法
 * @param {string} value --  检查的值
 */
function checkInputValue(element) {
    var id = element.id;

    var rightTips = tips[id][0];
    var errorTips = tips[id][1];
    var tipsEle = element.nextElementSibling;
    var showRemainder = renderTips(tipsEle);
    var value = id === 'name' ? element.value.trim().replace(/[\u0391-\uFFE5]/g, "cc") : element.value.trim();

    if (!value) {
        showRemainder("内容不能为空", false);
        return false;
    }

    if (id === 'passwordChecked') {
        if ($('#password').value.trim() === value) {
            showRemainder(rightTips, true);
            return true;
        } else {
            showRemainder(errorTips, false);
            return false;
        }
    }

    if (validator[id].test(value)) {
        showRemainder(rightTips, true);
        return true;
    } else {
        showRemainder(errorTips, false);
        return false;
    }
}

/**
 * curry
 * 显示提示
 * @param {*Node} tipsEle - 提示元素
 */
function renderTips(tipsEle) {
    var inputEle = tipsEle.previousElementSibling;

    return function(tips, isValid) {
        tipsEle.innerHTML = tips;
        tipsEle.style.display = "block";

        // 默认提示
        if (typeof isValid === 'undefined') {
            tipsEle.className = 'tips';
            inputEle.style.borderColor = '#75b86b';
            return;
        }

        tipsEle.className = isValid ? 'success' : 'error';
        inputEle.style.borderColor = isValid ? '#4fc08d' : '#f75659';
    };
}

// focus, blur, load 都不触发冒泡，但可以触发捕获
addEvent($('.sign-up'), 'focus', function(e) {
    var inputEle = e.target;
    var labelEle = inputEle.previousElementSibling;
    var tipsEle = inputEle.nextElementSibling;
    var render = renderTips(tipsEle);

    // set style
    // 默认提示
    render(labelEle.dataset.info);
});

addEvent($('.sign-up'), 'blur', function(e) {
    checkInputValue(e.target);
});

addEvent($('.submit'), 'click', function(e) {
    var isAllValid = true;

    inputEle.forEach(function(input) {
        if (!checkInputValue(input)) {
            isAllValid = false;
        }
    });

    if (isAllValid) {
        alert('提交成功');
    } else {
        alert('提交失败');
    }
});

//事件绑定函数，兼容浏览器差异（捕获）
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, true);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}
