/**
 * Created by Ningersan on 2017/2/3.
 */

function $(ele) {
    return document.querySelector(ele);
}

function selectRadio() {
    $(".school-space").className = $("#in-school").checked ? "school-space" : "school-space hidden";
    $(".work-space").className = $("#in-school").checked ? "work-space hidden" : "work-space";
}

function selectCity() {
    var optionsHtml = [];
    var cityEle = $(".city");
    var schoolEle = $(".school");
    var selectedCity = cityEle.options[cityEle.selectedIndex].value;
    var data = {
        beijing: ["清华大学", "北京大学", "中国人民大学"],
        shanghai: ["复旦大学", "交通大学", "同济大学"],
        nanjing: ["南京大学", "南京理工大学", "南京师范大学"],
        hangzhou: ["浙江大学", "杭州工业大学", "杭州电子科技大学"]
    };

    data[selectedCity].forEach(function(school) {
        optionsHtml.push("<option>" + school + "</option>");
    });

    schoolEle.innerHTML = optionsHtml.join('');
}