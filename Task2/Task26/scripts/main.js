/**
 * Created by Ningersan on 2017/1/29.
 */

//绑定添加飞船按钮事件
function addCraftControl() {
    addEvent($("#craft-add"), "click", function () {
        var hiddenBtn = $(".hidden");
        if (hiddenBtn) {
            var id =  hiddenBtn.children[0].textContent[0];
            command("operate-launch", id);
            hiddenBtn.className = "craft-control";
        } else {
            var text = "[指挥官]:轨道已满,请先销毁飞船!!!"
            renderConsole(text, true);
        }
    });
}

//绑定显示飞船操作选项事件
function showOperate() {
    for (var i = 0, len = $a(".craft-control").length; i < len; i++) {
        addEvent($a(".craft-control")[i], "click", function () {
            var operate = this.children[1];
            operate.style.display = operate.style.display === "" ? "inline-block" : "";
        })
    }
}

//绑定飞船操作按钮事件
function craftControl() {
    for (var i = 0, len = $a(".operates").length; i < len; i++) {
        addEvent($a(".operates")[i], "click", function (e) {
            var id = this.previousElementSibling.textContent.slice(0, 1);
            var operate = e.target.parentNode.parentNode.className;
            e.target.parentNode.disabled = false;
            command(operate, id);
        });
    }
}

//初始化事件
function initEvent() {
    addCraftControl();
    showOperate();
    craftControl()
}

initEvent();



