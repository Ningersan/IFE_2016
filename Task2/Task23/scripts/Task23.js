var stack = [];
var delay = 1000;

function get(name) {
    return document.querySelector(name);
}

function renderTreeNode(node) {
    node.style.backgroundColor = "#0dc1c1";
    setTimeout(function () {
        node.style.backgroundColor = "#fff";
    }, delay);
}

function traverseTree() {
    var order;
    var value = "BFS";
    var root = get(".tree");
    if (value === "DFS") {
        order = function depthFirstSearch(node) {
            if (node) {
                stack.push(node);
                for (var i = 0; i < node.children.length; i++) {
                    depthFirstSearch(node.children[i]);
                }
            }
        }
    } else if (value === "BFS") {
        order = function borderFirstSearch(node) {
            if (node) {
                stack.push(node);
                borderFirstSearch(node.nextElementSibling);
                borderFirstSearch(node.firstElementChild);
            }
        }
    }
    order(root);
    var time = setInterval(function () {
        if (stack.length === 0) {
            clearTimeout(time);
            return;
        }
        stack.shift()();
    }, delay)
}

get("button").addEventListener("click", traverseTree);