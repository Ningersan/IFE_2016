/**
 * Created by Ningersan on 2017/2/21.
 */

//存储飞船对象
var craftArr = [];

function Mediator(msg) {
    var text = "";
    var fail = null;

    if (msg.command === "launch") {
        var newCraft = new CraftCreator(msg.id);
        newCraft.launch();
        craftArr.push({craft: newCraft.craft, id: msg.id});
        return;
    }

    if (Math.floor(Math.random() * 10) > 3) {
        setTimeout(function () {
            switch (msg.command) {
                case "fly":
                    text = "[消息]：" + msg.id + "号飞船启动成功";
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
            fail = false;
        }, 1000)
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
        fail = true;
    }

    setTimeout(function () {
        renderConsole(text, fail);
    }, 1000)
}