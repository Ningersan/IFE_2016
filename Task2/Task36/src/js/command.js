/* eslint-disable no-unused-vars */

/**
 * 记录指令的正则匹配规则和方法
 * @namespace
 */
var commands = {
    'go': {
        pattern: /^go(\s+)?(\d+)?$/i,
        run: function(grid) {
            return this.move(this.getCurrentDirection(), grid[1] || 1)
        },
    },
    'tun': {
        pattern: /^tun\s+(lef|rig|bac)$/i,
        run: function(direction) {
            return this.turn({ lef: -90, rig: 90, bac: 180 }[direction[0].toLowerCase()])
        },
    },
    'tra': {
        pattern: /^tra\s+(top|rig|bot|lef)(\s+)?(\d+)?$/i,
        run: function(params) {
            var direction = {top: TOP, rig: RIGHT, bot: BOTTOM, lef: LEFT}[params[0].toLowerCase()]
            return this.move(direction, params[2] || 1)
        },
    },
    'mov': {
        pattern: /^mov\s+(top|rig|bot|lef)(\s+)?(\d+)?$/i,
        run: function(params) {
            var direction = { top: TOP, rig: RIGHT, bot: BOTTOM, lef: LEFT }[params[0].toLowerCase()]
            this.turn(null, direction)
            return this.move(direction, params[2] || 1)
        },
    },
    'mov to': {
        pattern: /^mov\s+to\s+(\d+)?,(\d+)?$/i,
        run: function(coordinate) {
            return this.search(coordinate)
        },
    },
    'build': {
        pattern: /^build$/i,
        run: function() {
            return this.build()
        },
    },
    'bru': {
        pattern: /^bru\s+?(.*)$/i,
        run: function(color) {
            return this.setColor(color)
        },
    },
}
