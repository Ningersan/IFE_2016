//绑定添加飞船按钮事件
function addCraft() {
    var hiddenBtn = $(".hidden");

    if (hiddenBtn) {
        var id =  hiddenBtn.children[0].textContent[0];
        command("operate-launch", id);
        hiddenBtn.className = "craft-control";
    } else {
        var text = "[指挥官]:轨道已满,请先销毁飞船!!!";
        renderConsole(text, true);
    }
}

//绑定显示飞船操作选项事件
function showOperate(ele) {
    var operate = ele.children[1];
    operate.style.display = operate.style.display === "" ? "inline-block" : "";
}

//绑定飞船操作按钮事件
function craftControl(ele) {
    var id = ele.parentNode.previousElementSibling.textContent.slice(0, 1);
    var operate = ele.className;
    command(operate, id);

    // 关闭飞船操作选项
    ele.parentNode.style.display = "";
}

addEvent(document, "click", function (e) {
    var target = e.target;

    if (target.id === "craft-add") {
        addCraft();
    } else if (target.parentNode.className === "craft-control") {
        showOperate(target.parentNode);
    } else if (target.nodeName === "I") {
        craftControl(target.parentNode.parentNode);
    }
});
