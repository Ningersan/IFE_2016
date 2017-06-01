/**
 * Created by Ningersan on 2017/2/13.
 */

function Form(data) {
    this.data = data;
    this.input = $("#" + data.id);
    this.tip = this.input.nextElementSibling; 
    this.validator = data.validator;
    this.init();
}

Form.prototype = {
    init: function () {
        this.input.addEventListener("focus", this.remainderTip.bind(this));
        this.input.addEventListener("blur", this.validator.bind(this));
        this.input.addEventListener("change", this.validator.bind(this));
    },

    remainderTip: function () {
        this.tip.innerHTML = this.data.remainder;
        this.tip.className = "remainder";
        this.input.className = "remainder";
    },

    trueTip: function () {
        this.tip.innerHTML = this.data.successRemainder;
        this.tip.className = "success";
        this.input.className = "success";
    },

    falseTip: function (i) {
        this.tip.innerHTML = this.data.failRemainder[i];
        this.tip.className = "error";
        this.input.className = "error";
    }
};
