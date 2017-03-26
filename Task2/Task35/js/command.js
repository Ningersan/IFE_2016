/**
 * 记录指令的正则匹配规则和方法
 * @namespace
 */
var commands = {
        "go": {
            pattern: /^go(\s+)?(\d+)?$/i,
            run: function(obj, grid) {
                console.log(grid);
                obj.move(obj.getDirection(), grid);
            }
        },
        "tun lef": {
            pattern: /^tun(\s+)?lef$/i,
            run: function(obj) {
                obj.turn(90);
            }
        },
        "tun rig": {
            pattern: /^tun(\s+)?rig$/i,
            run: function(obj) {
                obj.turn(-90);
            }
        },
        "tun bac": {
            pattern: /^tun(\s+)?bac$/i,
            run: function(obj) {
                obj.turn(180);
            }
        },
        "tra bot": {
            pattern: /^tra(\s+)?bot(\s+)?(\d+)?$/i,
            run: function(obj, grid) {
                obj.move(0, grid);
            }
        },
        "tra lef": {
            pattern: /^tra(\s+)?lef(\s+)?(\d+)?$/i,
            run:function(obj, grid) {
                obj.move(90, grid);
            }
        },
        "tra top": {
            pattern: /^tra(\s+)?top(\s+)?(\d+)?$/i,
            run: function(obj, grid) {
                obj.move(180, grid);
            }
        },
        "tra rig": {
            pattern: /^tra(\s+)?rig(\s+)?(\d+)?$/i,
            run: function (obj, grid) {
                obj.move(270, grid);
            }
        },
        "mov lef": {
            pattern: /^mov(\s+)?lef(\s+)?(\d+)?$/i,
            run: function(obj, grid) {
                obj.turn(null, 90);
                obj.move(90, grid);
            }
        },
        "mov top": {
            pattern: /^mov(\s+)?top(\s+)?(\d+)?$/i,
            run: function (obj, grid) {
                obj.turn(null, 180);
                obj.move(180, grid);
            }
        },
        "mov rig": {
            pattern: /^mov(\s+)?rig(\s+)?(\d+)?$/i,
            run: function(obj, grid) {
                obj.turn(null, 270);
                obj.move(270, grid);
            }
        },
        "mov bot": {
            pattern: /^mov(\s+)?bot(\s+)?(\d+)?$/i,
            run: function (obj, grid) {
                obj.turn(null, 0);
                obj.move(0, grid);
            }
        },
    };
