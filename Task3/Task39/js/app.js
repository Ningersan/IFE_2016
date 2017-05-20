var head = ["姓名", "语文", "数学", "英语", "总分"];
var objData = {
    "小红": randomScore(3),
    "小橙": randomScore(3),
    "小黄": randomScore(3),
    "小绿": randomScore(3),
    "小青": randomScore(3),
    "小蓝": randomScore(3),
    "小紫": randomScore(3)
};
var table = new SortableTable($("#container"), head, objData);

table.init();

addEvent($("#container"), "click", function (event) {
    var targetClass = event.target.className;
    var targetIndex = event.target.parentNode.dataset.index;

    if (targetClass === "arrow-up") {
        table.sortData(ascSort, targetIndex);
    } else if (targetClass === "arrow-down") {
        table.sortData(desSort, targetIndex);
    }
});

addEvent(document, "scroll", function() {
    var table = $("#container").children[0];
    var offsetTop = table.getBoundingClientRect().top;
    var tableHight = table.offsetHeight;

    if (offsetTop < 0 && offsetTop >= -tableHight) {
        $("#container thead").style.cssText = "display: table-head-group";
        $("#container thead").nextElementSibling.style.cssText = "position: fixed; top: 0;";
    } else {
        $("#container thead").style.cssText = "display: none";
        $("#container thead").nextElementSibling.style.cssText = "";
    }
});
