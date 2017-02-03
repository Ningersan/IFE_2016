/**
 * Created by Ningersan on 2017/2/3.
 */

function $(ele) {
    return document.querySelector(ele);
}

function selectRadio() {
    if ($("#in-school").checked) {
        $(".school-space").className = "school-space";
        $(".work-space").className = "work-space hidden";
    } else {
        $(".work-space").className = "work-space";
        $(".school-space").className = "school-space hidden";
    }
}

function selectCity() {
    var data = {
        beijing: ["清华大学", "北京大学", "中国人民大学"],
        shanghai: ["复旦大学", "交通大学", "同济大学"],
        nanjing: ["南京大学", "南京理工大学", "南京师范大学"],
        hangzhou: ["浙江大学", "杭州工业大学", "杭州电子科技大学"]
    }
    var citys = $(".city");
    var schools = $(".school");
    var selectIndex = citys.options[citys.selectedIndex].value;
    schools.innerHTML = "";
    for (var i = 0; i < data[selectIndex].length; i++) {
        schools.innerHTML += "<option>" + data[selectIndex][i] + "</option>";
    }
}