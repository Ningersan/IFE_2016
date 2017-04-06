/**
 * Created by Ningersan on 2017/1/29.
 */

/**
 * 绑定添加飞船按钮事件
 */
function addCraft() {
    var hiddenBtn = $(".hidden");

    if (hiddenBtn) {
        var id = hiddenBtn.children[0].textContent[0];
        hiddenBtn.className = "craft-control";

        //指挥官下达命令
        var command = new Commander(id, "launch");
        command.performCommand();
        command.launch();
    } else {
        var text = "[指挥官]:轨道已满,请先销毁飞船!!!";
        BUS.renderConsole(text, true);
    }
}

/**
 * 绑定显示飞船操作选项事件
 * @param {Node} ele - DOM节点 
 */
function showOperate(ele) {
    var operate = ele.children[1];
    operate.style.display = operate.style.display === "" ? "inline-block" : "";
}

/**
 * 绑定飞船操作按钮事件
 * @param {Node} ele -  DOM节点
 */
function craftControl(ele) {
    var id = ele.parentNode.previousElementSibling.textContent.slice(0, 1);
    var command = ele.className.split("-")[1];

    //指挥官发送信息
    var newCommand = new Commander(id, command);
    newCommand.init();

    // 关闭飞船操作选项
    ele.parentNode.style.display = "";
}

/**
 * 事件委托
 */
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
