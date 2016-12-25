/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95',
    '#edae9e', '#c1b9c2', '#bec3cb', '#9ea7bb', '#99b4ce', '#d7f0f8'];

var citySelect = document.getElementById("city-select");
var dateInput = document.getElementsByName("gra-time");
var aqiChartWrap =  document.getElementsByClassName("aqi-chart-wrap")[0];

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var color = "";
    var text = "";
    for (var date in chartData) {
        color = colors[Math.floor(Math.random() * 11)];
        text += "<div title='"+date+"' style='height:"+chartData[date]+"px; background-color:"+color+"'></div>";
    }
    aqiChartWrap.innerHTML = text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 设置对应数据
    pageState.nowGraTime = event.target.value;
    //初始化数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 设置对应数据
    pageState.nowSelectCity = event.target.value;
    //初始化数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    for (var i = dateInput.length - 1; i >= 0; i--) {
        dateInput[i].addEventListener("click", graTimeChange)
    }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var city = "";
    for (var key in aqiSourceData) {
        city += "<option>" + key + "</option>";
    }
    citySelect.innerHTML = city;

    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    citySelect.addEventListener("change", citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    //初始化当前选择城市的数据
    chartData = aqiSourceData[pageState.nowSelectCity];

    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var newChartData = chartData;
    if (pageState.nowGraTime === "week") {
        chartData = {};
        var countDay = 0, countWeek = 0, countData = 0;
        for (var date in newChartData) {
            countDay++;
            countData += newChartData[date];
            if ((new Date(date)).getDay() === 6) {
                countWeek++;
                chartData["第"+countWeek+"周"] = Math.round(countData/countDay);
                countData = 0;
                countDay = 0;
            }
        }
        if (countDay != 0) {
            countWeek++;
            chartData["第"+countWeek+"周"] = Math.round(countData/countDay);
        }
    }

    if (pageState.nowGraTime === "month") {
        chartData = {};
        var countDay = 0, countMonth = 0, countData = 0;
        for (var date in newChartData) {
            countDay++;
            countData += newChartData[date];
            if ((new Date(date)).getMonth() != countMonth) {
                countMonth++;
                chartData["第" + countMonth + "月"] = Math.round(countData / countDay);
                countData = 0;
                countDay = 0;
            }
        }
        if (countDay != 0) {
            countMonth++;
            chartData["第"+countWeek+"月"] = Math.round(countData/countDay);
        }
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();
