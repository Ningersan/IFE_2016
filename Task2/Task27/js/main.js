/**
 * Created by Ningersan on 2017/1/29.
 */

//绑定添加飞船按钮事件
function addCraftControl() {
    var addCraftBtn = $("#craft-add");
    addEvent(addCraftBtn, "click", function () {
        var hiddenBtn = $(".hidden");
        if (hiddenBtn) {
            var id =  hiddenBtn.children[0].textContent[0];
            hiddenBtn.className = "craft-control";

            //指挥官下达命令
            var command = new Commander(id, "launch");
            command.performCommand();
        } else {
            var text = "[指挥官]:轨道已满,请先销毁飞船!!!"
            BUS.renderConsole(text, true);
        }

        //创建飞船对象
        var speed = parseFloat(getSystemInfo($(".consume")));
        var consume = parseFloat(getSystemInfo($(".consume")));
        var restore = parseFloat(getSystemInfo($(".restore")));
        var newCraft = new CraftCreator(id, speed, consume, restore);
        newCraft.launch();
    });
}

//绑定显示飞船操作选项事件
function showOperate() {
    var controlBtn = $a(".craft-control");
    for (var i = 0, len = controlBtn.length; i < len; i++) {
        addEvent(controlBtn[i], "click", function () {
            var operate = this.children[1];
            operate.style.display = operate.style.display === "" ? "inline-block" : "";
        })
    }
}

//绑定飞船操作按钮事件
function craftControl() {
    var operateBtn = $a(".operates");
    for (var i = 0, len = operateBtn.length; i < len; i++) {
        addEvent(operateBtn[i], "click", function (e) {
            var id = this.previousElementSibling.textContent.slice(0, 1);
            var operate = e.target.parentNode.parentNode.className;
            var command = operate.split("-")[1];

            //指挥官发送信息
            var newCommand = new Commander(id, command);
            newCommand.init();
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



