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
    },

    remainderTip: function () {
        this.tip.innerHTML = this.data.remainder;
        this.tip.className = "remainder";
        this.input.style.borderColor = "#0dc1c1";
    },

    trueTip: function () {
        this.tip.innerHTML = this.data.successRemainder;
        this.tip.style.color = "#0dc1c1";
        this.input.style.borderColor = "#0dc1c1";
    },

    falseTip: function () {
        this.tip.innerHTML = this.data.failRemainder;
        this.tip.className = "error";
        this.input.style.borderColor = "#F04C57";
    }
}
