var textInput = document.querySelector("textarea");
var searchInput = document.getElementById("search-input");
var btnList = document.getElementsByTagName("button");
var textArea = document.getElementById("text-area");

//初始化队列
var queue = [];

//获取input的值
function getText() {
    var str = textInput.value.trim();
    var dealStr = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function (w) {
        return (w != null && w.length > 0)
    });
    queue = queue.concat(dealStr);
    render();
}

function getSearch() {
    var str =  searchInput.value.trim();
    render(str);
}

function render(str) {
    textArea.innerHTML = queue.map(function(w) {
        if (str != null && str.length > 0) {
            w = w.replace(new RegExp(str, "g"), "<span>" + str + "</span>");
        }
        return "<div>" + w + "</div>";
    }).join("");
}

btnList[0].addEventListener("click", getText);
btnList[1].addEventListener("click", getSearch);
