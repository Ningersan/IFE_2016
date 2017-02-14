/**
 * Created by Ningersan on 2017/2/13.
 */
function formDealer(data) {
    this.data = data;
    this.input = $("#" + data.id);
    this.tip = this.input.nextSibling;
    this.validator = data.validator;
    this.init();
}

formDealer.prototype = {
    init: function () {
        this.input.addEventListener("focus", this.remainderTip.bind(this));
        this.input.addEventListener("blur", this.validator.bind(this));
        this.input.addEventListener("change", this.validator.bind(this));  //绑定单选多选下拉类型的事件
    },

    remainderTip: function () {
        this.tip.innerHTML = this.data.remainder;
        this.tip.className = "remainder";
        this.input.className = "remainder";
    },

    trueTip: function () {
        this.tip.innerHTML = this.data.successRemainder;
        this.tip.className = "true";
        this.input.className = "true";
    },

    falseTip: function (i) {
        this.tip.innerHTML = this.data.failRemainder[i];
        this.tip.className = "error";
        this.input.className = "error";
    }
}
