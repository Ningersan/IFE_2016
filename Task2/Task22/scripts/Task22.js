var btn = document.querySelector("button");
var delay = 1000;

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
            renderTreeNode(root);
            preOrder(root.firstElementChild);
            preOrder(root.lastElementChild);
        }
    } else if (value === "LDR"){
        order = function inOrder(root) {
            if (!root) {
                return;
            }
            inOrder(root.firstElementChild);
            renderTreeNode(root);
            inOrder(root.lastElementChild);
        }
    } else {
        order = function postOrder(root) {
            if (!root) {
                return;
            }
            postOrder(root.firstElementChild);
            postOrder(root.lastElementChild);
            renderTreeNode(root);
        }
    }
    order(root);
}

btn.addEventListener("click", function () {
    var select = document.querySelector("select");
    var value = select[select.selectedIndex].value;
    var root = document.querySelector(".tree");
    traverseTree(value, root);
})