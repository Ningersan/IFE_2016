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

/**
 * 需要使用到的月份，星期字符串
 */
DatePicker.prototype.dayStr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
DatePicker.prototype.monthStr = ['january', 'February', 'March', 'April', 'May', 'June', 'july', 'August', 'Septemper', 'October', 'November', 'December'];

/**
 * 初始化日历元素
 * 初始化事件
 */
DatePicker.prototype.init = function() {
    var div = $('<div>')
        .addClass('datepicker-pannel')
        .appendTo(this.container);

    var label = $('<label>Date: </label>')
        .addClass('datepicker-date')
        .appendTo(div);

    var input = $('<input>')
        .attr('readonly', 'readonly')
        .attr('type', 'text')
        .appendTo(div)
        .click(function() {
            $('.datepicker-main').toggle();
        });

    this.mainEle = $('<div>')
        .addClass('datepicker-main')
        .hide()
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

    this.renderByDate(this.date);

    // hover event
    $('.datepicker-main td').hover(function (e) {
        $(e.target).addClass('td-hover');
    }, function (e) {
        $(e.target).removeClass('td-hover');
    });
};

/**
 * 获取上个月日历项
 */
DatePicker.prototype.preMonth = function() {
    var month = this.date.getMonth();
    var preMonth = new Date(this.date.setMonth(--month));

    this.renderByDate(preMonth);
};

/**
 * 获取下个月日历项
 */
DatePicker.prototype.nextMonth = function() {
    var month = this.date.getMonth();
    var nextMonth = new Date(this.date.setMonth(++month));

    this.renderByDate(nextMonth);
};

/**
 * 获取选择日期
 * @param {*Date} date - 日期
 */
DatePicker.prototype.selectDate = function() {
    var curDate = new Date(this.date);
    var selectedValue = parseInt($(this.selectedEle).text());
    var selectedDate = new Date(curDate.setDate(selectedValue));

    // set selectedDate value
    this.date = selectedDate;

    // display selectedDate
    this.showSelectedDate();

    return selectedDate;
};

/**
 * 在输入框中显示选择的日期
 */
DatePicker.prototype.showSelectedDate = function() {
    var dateStr = '';
    var date = new Date(this.date);

    // set date input value
    dateStr = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
    $('.datepicker-pannel input').val(dateStr);
    $('.datepicker-main').hide();
};

/**
 * 根据日期来渲染当月日历
 * @param {*Node} date - 日期
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
