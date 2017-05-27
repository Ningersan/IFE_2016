function DatePicker(append) {
    this.container = append;
    this.mainEle = null;
    this.selectedEle = null;
    this.date = new Date();
    this.init();
}

DatePicker.prototype.dayStr = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
DatePicker.prototype.monthStr = ['january', 'February', 'March', 'April', 'May', 'June', 'july', 'August', 'Septemper', 'October', 'November', 'December'];

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

    // 渲染表体, 添加事件
    $('<tbody>')
        .appendTo(table)
        .click(function(e) {
            var target = e.target;
            var targetValue = parseInt($(target).text());
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

    // 默认今天为选择的元素
    this.selectedEle = $('.datepicker-today');
};

DatePicker.prototype.preMonth = function() {
    var month = this.date.getMonth();
    var preMonth = new Date(this.date.setMonth(--month));

    this.renderByDate(preMonth);
};

DatePicker.prototype.nextMonth = function() {
    var month = this.date.getMonth();
    var nextMonth = new Date(this.date.setMonth(++month));

    this.renderByDate(nextMonth);
};

DatePicker.prototype.selectDate = function() {
    var curDate = new Date(this.date);
    var selectedValue = parseInt($(this.selectedEle).text());

    selectedDate = new Date(curDate.setDate(selectedValue));
    this.date = selectedDate;
    return this.date;
};

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
