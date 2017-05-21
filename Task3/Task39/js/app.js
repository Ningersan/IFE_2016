var head = ["姓名", "语文", "数学", "英语"];
var data = {
    "小红": randomScore(3),
    "小橙": randomScore(3),
    "小黄": randomScore(3),
    "小绿": randomScore(3),
    "小青": randomScore(3),
    "小蓝": randomScore(3),
    "小紫": randomScore(3)
};

var table0 = new tableCreator({
    append: $("#container-0"),
    tableHead: head,
    tableBody: data,
    isTotal: false,
    isSortable: false,
    isFrozen: false
});

var table1 = new tableCreator({
    append: $("#container-1"),
    tableHead: head,
    tableBody: data,
    isTotal: true,
    isSortable: false,
    isFrozen: false
});

var table2 = new tableCreator({
    append: $("#container-2"),
    tableHead: head,
    tableBody: data,
    isTotal: true,
    isSortable: true,
    isFrozen: false
});

var table3 = new tableCreator({
    append: $("#container-3"),
    tableHead: head,
    tableBody: data,
    isTotal: true,
    isSortable: false,
    isFrozen: true
});

var table4 = new tableCreator({
    append: $("#container-4"),
    tableHead: head,
    tableBody: data,
    isTotal: true,
    isSortable: true,
    isFrozen: true,
    tableHeadStyle: {
        background: '#22C3AA',
        color: '#fff',
        arrowColor: '#D0648A'
    }
});

var table5 = new tableCreator({
    append: $("#container-5"),
    tableHead: head,
    tableBody: data,
});
