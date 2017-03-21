var stack = [];
var delay = 1000;
var btn = document.querySelector("button");

/**
 * 渲染当前dom节点的颜色，并在一定时间后恢复它
 * @param {node} node - dom节点 
 */
function renderTreeNode(node) {
    node.style.backgroundColor = "#0dc1c1";

    setTimeout(function () {
        node.style.backgroundColor = "#fff";
    }, delay);
}

/**
 * 遍历二叉树，使用前序，中序，后序三种方法
 * @param {string} value - 选择方法的名称  
 * @param {node} root  - 二叉树根节点
 */
function traverseTree(value, root) {
    var order;
    
    // 前序遍历
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
        };
    // 中序遍历
    } else if (value === "LDR"){
        order = function inOrder(root) {
            if (!root) {
                return;
            }

            inOrder(root.firstElementChild);
            stack.push(function () {
                renderTreeNode(root);
            });
            inOrder(root.lastElementChild);
        };
    // 后序遍历
    } else {
        order = function postOrder(root) {
            if (!root) {
                return;
            }
            
            postOrder(root.firstElementChild);
            postOrder(root.lastElementChild);
            stack.push(function () {
                renderTreeNode(root);
            });
        };
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
    }, delay);
}

/**
 * 给按钮绑定事件，点击执行遍历
 */
btn.addEventListener("click", function () {
    var select = document.querySelector("select");
    var value = select[select.selectedIndex].value;
    var root = document.querySelector(".tree");

    traverseTree(value, root);
    btn.disabled = true;
});