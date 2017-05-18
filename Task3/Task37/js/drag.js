(function() {
    var btnLogin = document.querySelector(".login");
    var boxLogin = document.querySelector(".login-box");
    var loginBoxHeader = document.querySelector(".login-box-header");

    function getStyle(ele, key) {
        return ele.style[key];
    }

    function autoCenter(ele) {
        var eleParent = ele.parentNode;

        // the width and height of the element
        // offsetWidth = border + padding + content（include scroolbar）
        var eleWidht = ele.offsetWidth;
        var eleHight = ele.offsetHeight;

        // the width and height of the element's parentNode
        // clientWidth = padding + content (not include border, margin and scrollbar)
        var eleParentWidth = eleParent.clientWidth;
        var eleParentHight = eleParent.clientHeight;

        ele.style.top = (eleParentHight - eleHight) / 2 + "px";
        ele.style.left = (eleParentWidth - eleWidht) / 2 + "px";
    }

    function drag(ele) {
        var dragFlag = false;
        var eleParent = ele.parentNode;

        // 鼠标开始拖拽点坐标
        var startMouseX, startMouseY;

        // 元素拖动前相对于父元素的偏移量 
        var startEleOffsetX, startEleOffsetY;

        // 拖拽时鼠标当前坐标
        var curMouseX, curMouseY;

        // 鼠标拖拽偏移量（相对与开始拖拽处）
        var mouseOffsetX, mouseOffsetY;

        // 当前元素偏移量
        var curEleOffsetX, curEleOffsetY;

        // 元素最大偏移量（不能超过容器）
        var maxEleOffsetX, maxEleOffsetY; 

        // 获取鼠标点击坐标和当前元素框相对于父元素的偏移量
        addEvent(ele, "mousedown", function (event) {
            var e = event || window.event;

            dragFlag = true;

            // the coordinate of mouse in the pixels of the event relative to the whole document
            startMouseX = e.pageX;
            startMouseY = e.pageY;

            // the current element is offset to the left within the HTMLElement.offsetParent node.
            startEleOffsetX = eleParent.offsetLeft;
            startEleOffsetY = eleParent.offsetTop;
        });

        // 鼠标拖拽，动态计算与开始拖拽处的偏移量，生成最终元素偏移量
        addEvent(document, "mousemove", function (event) {
            var e = event || window.event;

            // 拖拽元素宽高
            var eleWidht = eleParent.clientWidth;
            var eleHight = eleParent.clientHeight;

            // 拖拽元素父元素宽高（容器）
            var containerWidth = eleParent.parentNode.clientWidth;
            var containerHeight = eleParent.parentNode.clientHeight;
            
            if (dragFlag) {
                // 当前鼠标坐标
                curMouseX = e.pageX;
                curMouseY = e.pageY;

                // 当前鼠标偏移量
                mouseOffsetX = startMouseX - curMouseX;
                mouseOffsetY = startMouseY - curMouseY;

                // 最大元素偏移量（不能超过容器）
                maxEleOffsetX = containerWidth - eleWidht;
                maxEleOffsetY = containerHeight - eleHight;

                // 计算元素应该偏移量
                curEleOffsetX = startEleOffsetX - mouseOffsetX;
                curEleOffsetX = Math.min(maxEleOffsetX, Math.max(0, curEleOffsetX));

                curEleOffsetY = startEleOffsetY - mouseOffsetY;
                curEleOffsetY = Math.min(maxEleOffsetY, Math.max(0, curEleOffsetY));

                eleParent.style.left = curEleOffsetX + "px";
                eleParent.style.top = curEleOffsetY + "px";
            }
        });

        addEvent(ele, "mouseup", function() {
            dragFlag = false;
        });
    }

    // click event
    addEvent(document, "click", function (e) {
        var targetClassName = e.target.className;
        var loginDisplay = getStyle(boxLogin, "display");

        switch (targetClassName) {
            case "login":
                boxLogin.style.display = loginDisplay === "none" ? "block" : "none";
                autoCenter(boxLogin);
                break;
            case "mask":
            case "cancel":
                boxLogin.style.display = "none";
                break;
            default:
                break;
        }
    });

    // auto center when document view has been resized
    addEvent(window, "resize", function () {
        autoCenter(boxLogin);
    });

    // drag
    drag(loginBoxHeader);
})();


//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}
