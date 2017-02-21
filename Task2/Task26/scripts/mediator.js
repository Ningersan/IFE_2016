/**
 * Created by Ningersan on 2017/2/21.
 */
var craftArr = [];

function getCraftIndex(array, id) {
    for (var i in array) {
        if (id === array[i].id) {
            return i;
        }
    }
}

function Mediator(msg) {
    var massage = document.createElement("p");
    var text = "";
    if (msg.command === "launch") {
        var newCraft = new CraftDirector(msg.id);
        newCraft.launch();
        craftArr.push({craft: newCraft,
                    id: msg.id});
        return;
    }

    if (Math.floor(Math.random() * 10) > 3) {
        switch (msg.command) {
            case "fly":
                text = "[消息]：" + msg.id + "号飞船启动成功"
                craftArr[getCraftIndex(craftArr, msg.id)].craft.fly();
                break;
            case "stop":
                text = "[消息]：" + msg.id + "号飞船停止成功";
                craftArr[getCraftIndex(craftArr, msg.id)].craft.stop();
                break;
            case "destory":
                text = "[消息]：" + msg.id + "号飞船摧毁成功";
                craftArr[getCraftIndex(craftArr, msg.id)].craft.destroy();
                break;
        }
    } else {
        switch (msg.command) {
            case "fly":
                text = "[注意]:" + msg.id + "号飞船的飞行命令丢包了!!!!";
                break;
            case "stop":
                text = "[注意]:" + msg.id + "号飞船的停止命令丢包了!!!!";
                break;
            case "destory":
                text = "[注意]:" + msg.id + "号飞船的摧毁命令丢包了!!!!";
                break;
        }
    }

    setTimeout(function () {
        massage.textContent = text;
        $(".console").appendChild(massage);
    }, 1000)
}