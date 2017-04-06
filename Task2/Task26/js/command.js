/**
 * Created by Ningersan on 2017/2/22.
 */

//定义传输信号的数据格式
var msg = {
    id: null,
    command: null
};

function command(operate, id) {
    var text = "";
    switch (operate) {
        case "operate-launch":
            msg.command = "launch";
            text = "[指挥官]：" + id + "号轨道添加飞船的指令已经发送";
            break;
        case "operate-fly":
            msg.command = "fly";
            text = "[指挥官]:" + id +"号飞船飞行指令已发送";
            break;
        case "operate-stop":
            msg.command = "stop";
            text = "[指挥官]:" + id +"号飞船停止指令已发送";
            break;
        case "operate-destory":
            msg.command = "destory";
            text = "[指挥官]:" + id +"号飞船摧毁指令已发送";
            $a(".craft-control")[id - 1].className = "craft-control hidden";
            break;
    }

    //向控制台发送消息
    renderConsole(text, false);

    //向介质发送消息
    msg.id = id;
    mediator(msg);
}

//渲染控制台
function renderConsole(text, fail) {
    var console = $(".console");
    var massage = document.createElement("p");

    massage.textContent = text;

    if (fail) {
        massage.className = "fail";
    }

    //更新控制台信息
    console.appendChild(massage);
    
    //控制栏滚动条自动滚动到底部
    console.scrollTop = console.scrollHeight;
}
