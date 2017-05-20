var head = ["姓名", "语文", "数学", "英语", "总分"];
var objData = {
    "小明": randomScore(3),
    "小红": randomScore(3),
    "小绿": randomScore(3)
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
