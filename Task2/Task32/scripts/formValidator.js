/**
 * Created by Ningersan on 2017/2/11.
 */
var validator = {
    lengthControl: function () {
        var text = this.input.value.trim();
        if (text === "") {
            if (this.data.necessary) {
                this.falseTip(0);
                return;
            } else {
                this.remainderTip();
                return true;
            }
        }
        var minLength = this.data.minLength;
        var maxLength = this.data.maxLength;
        if (getLength(text) >= minLength && getLength(text) <= maxLength) {
            this.trueTip();
            return true;
        } else {
            this.falseTip(1);
            return false;
        }

        function getLength(str) {
            for (var i = 0, count = 0; i < str.length; i++) {
                var charCode = str.charCodeAt(i);
                count += (charCode >= 0 && charCode <= 128) ? 1 : 2;
            }
            return count;
        }
    },

    number: function () {
        var text = this.input.value.trim();
        if (text === "") {
            if (this.data.necessary) {
                this.falseTip(0);
                return;
            } else {
                this.remainderTip();
                return true;
            }

        }
        if (text.match(/^\d*$/)) {
            this.trueTip();
            return true;
        } else {
            this.falseTip(1);
            return false;
        }
    },

    email: function () {
        var text = this.input.value.trim();
        if (text === "") {
            if (this.data.necessary) {
                this.falseTip(0);
                return;
            } else {
                this.remainderTip();
                return true;
            }

        }
        if (text.match(/^[a-zA-Z0-9_\.\-]+@[^\.@]+\.[a-z]+$/)) {
            this.trueTip();
            return true;
        } else {
            this.falseTip(1);
            return false;
        }
    },

    tel: function () {
        var text = this.input.value.trim();
        if (text === "") {
            if (this.data.necessary) {
                this.falseTip(0);
                return;
            } else {
                this.remainderTip();
                return true;
            }

        }
        if (text.match(/^1\d{10}$/)) {
            this.trueTip();
            return true;
        } else {
            this.falseTip(1);
            return false;
        }
    },

    radio: function () {
        var items = $("#" + this.data.id).getElementsByTagName("input");
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked) {
                this.trueTip();
                return true;
            }
        }
        if (this.data.necessary) {
            this.falseTip(0);
        } else {
            this.remainderTip();
            return true;
        }
        return false;
    },
    
    checkbox: function () {
        var items = $("#" + this.data.id).getElementsByTagName("input");
        for (var i = 0; i < items.length; i++) {
            if (items[i].checked) {
                this.trueTip();
                return true;
            }
        }
        if (this.data.necessary) {
            this.falseTip(1);
        } else {
            this.remainderTip();
            return true;
        }
        return false;
    },

    pulldown: function () {
        this.trueTip();
        return true;
    }
}

