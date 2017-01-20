var btn = document.querySelector("button");
var delay = 1000;
var stack = [];

function renderTreeNode(node) {
    node.style.backgroundColor = "#0dc1c1";
    setTimeout(function () {
        node.style.backgroundColor = "#fff";
    }, delay);
}

function traverseTree(value, root) {
    var order;
    if (value === "DLR") {
        order = function preOrder(root) {
            if (!root) {
                return;
            }
            //将渲染函数压入栈中
            stack.push(function () {
                renderTreeNode(root);
            });
            preOrder(root.firstElementChild);
            preOrder(root.lastElementChild);
        }
    } else if (value === "LDR"){
        order = function inOrder(root) {
            if (!root) {
                return;
            }
            inOrder(root.firstElementChild);
            stack.push(function () {
                renderTreeNode(root);
            })
            inOrder(root.lastElementChild);
        }
    } else {
        order = function postOrder(root) {
            if (!root) {
                return;
            }
            postOrder(root.firstElementChild);
            postOrder(root.lastElementChild);
            stack.push(function () {
                renderTreeNode(root);
            })
        }
    }
    order(root);
    //设置时间间隔依次调用渲染函数
    var time = setInterval(function () {
        if (stack.length === 0) {
            clearTimeout(time);
            btn.disabled = false;
            return;
        }
        stack.shift()();
    }, delay)
}

btn.addEventListener("click", function () {
    var select = document.querySelector("select");
    var value = select[select.selectedIndex].value;
    var root = document.querySelector(".tree");
    traverseTree(value, root);
    btn.disabled = true;
})