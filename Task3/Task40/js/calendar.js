/**
 * 日历构造函数
 * @constructor
 * @param {*Node} append - 挂载元素 
 */
function DatePicker(append) {
    this.container = append;
    this.date = new Date();
    this.mainEle = null;
    this.selectedEle = null;
    this.init();
}

// 使用到的月份，星期字符串
DatePicker.prototype.dayStr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
DatePicker.prototype.monthStr = ['january', 'February', 'March', 'April', 'May', 'June', 'july', 'August', 'Septemper', 'October', 'November', 'December'];

/**
 * 生成日历头部，表格头部
 * 初始化事件
 */
DatePicker.prototype.init = function() {
    this.mainEle = $('<div>')
        .addClass('datepicker-main')
        .appendTo(this.container);

    var headEle = $('<div>')
        .addClass('datepicker-head')
        .appendTo(this.mainEle);

    var arrowLeft = $('<i>')
        .addClass('icon-left-big arrow-left arrow')
        .click(this.preMonth.bind(this))
        .appendTo(headEle);

    var arrowRight = $('<i>')
        .addClass('icon-right-big arrow-right arrow')
        .click(this.nextMonth.bind(this))
        .appendTo(headEle);

    var title = $('<div>')
        .addClass('datepicker-title')
        .appendTo(headEle);

    var table = $('<table>')
        .addClass('datepicker-table')
        .appendTo(this.mainEle);

    var thead = [];

    var self = this;

    // 动态加载css
    $('head').append('<link rel="stylesheet" type="text/css" href="./css/icon.css">')
        .append('<link rel="stylesheet" type="text/css" href="./css/calendar.css">')
        .ready(console.log('css加载成功啦'));

    // 渲染表头
    thead.push('<thead><tr>');

    this.dayStr.forEach(function(day) {
        thead.push('<th>'+ day +'</th>');
    });

    thead.push('</tr></thead>');
    table.append(thead.join(''));

    // 默认今天为选择的元素
    this.selectedEle = $('.datepicker-today');

    // 渲染表体, 添加事件
    $('<tbody>')
        .appendTo(table)
        .click(function(e) {
            var target = e.target;
            var selectedDate = null;

            self.selectedEle = target;

            if (!$(target).hasClass('date-out-of-range')) {
                // reset all selected marks
                $('.datepicker-today').removeClass();
                $('.datepicker-selected').removeClass();
                $(target).addClass('datepicker-selected');

                self.selectDate();
            }
        });

    // 根据当月日历渲染表格项
    this.renderByDate(this.date);
};

/**
 * 获取上个月的当月日历数据
 */
DatePicker.prototype.preMonth = function() {
    var month = this.date.getMonth();
    var preMonth = new Date(this.date.setMonth(--month));

    this.renderByDate(preMonth);
};

/**
 * 获取下个月的当月日历数据
 */
DatePicker.prototype.nextMonth = function() {
    var month = this.date.getMonth();
    var nextMonth = new Date(this.date.setMonth(++month));

    this.renderByDate(nextMonth);
};

/**
 * 获取点击日历日期信息
 */
DatePicker.prototype.selectDate = function() {
    var curDate = new Date(this.date);
    var selectedValue = parseInt($(this.selectedEle).text());
    var selectedDate = new Date(curDate.setDate(selectedValue));

    this.date = selectedDate;
    return this.date;
};

/**
 * 根据日期渲染当月日历
 * @param {*Date} date - 日期
 */
DatePicker.prototype.renderByDate = function(date) {
    // 当前年，月，日
    var thisDate = date.getDate();
    var thisMonth = date.getMonth();
    var thisYear = date.getFullYear();

    // 本月（从第一天起）
    var thisMonthDay = new Date(thisYear, thisMonth, 1);

    // 本月的第一天是星期中的第几天
    var thisMonthFirstDay = thisMonthDay.getDay();

    // 当前日历显示的第一个日期
    var thisMonthFirstDate = new Date(thisYear, thisMonth, 1 - thisMonthFirstDay);

    var tbody = [];

    var tdStr = null;

    // set title
    $('.datepicker-title').html('<span>' + this.monthStr[thisMonth] + '</span>' + '&nbsp' + '<span>' + thisYear + '</span>');

    // generate table
    for (var i = 0; i < 6; i++) {
        tbody.push('<tr>');

        for (var j = 0; j < 7; j++) {
            var curDate = thisMonthFirstDate.getDate();
            var curMonth = thisMonthFirstDate.getMonth();

            if (curMonth === thisMonth) {
                tdStr = curDate === thisDate ? '<td class="datepicker-today">' + curDate + '</td>' : '<td>' + curDate + '</td>';
                tbody.push(tdStr);
            } else {
                tbody.push("<td class='date-out-of-range'>" + curDate + "</td>");
            }

            thisMonthFirstDate.setDate(++curDate);
        }

        tbody.push('</tr>');
    }

    $('.datepicker-table tbody').html(tbody.join(''));
};
