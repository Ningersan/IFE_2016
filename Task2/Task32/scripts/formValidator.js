/**
 * Created by Ningersan on 2017/2/11.
 */
var validator = {
    lengthControl: function () {
        var text = this.input.value.trim();
        if (text === "") {
            this.falseTip(0);
            return;
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
            var count = 0;
            for (var i = 0; i < str.length; i++) {
                var charCode = str.charCodeAt(i);
                if (charCode >= 0 && charCode <= 128) {
                    count += 1;
                } else {
                    count += 2;
                }
            }
            return count;
        }
    },

    number: function () {
        var text = this.input.value.trim();
        if (text === "") {
            this.falseTip(0);
            return;
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
            this.falseTip(0);
            return;
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
            this.falseTip(0);
            return;
        }
        if (text.match(/^1\d{10}$/)) {
            this.trueTip();
            return true;
        } else {
            this.falseTip(1);
            return false;
        }
    },
}

