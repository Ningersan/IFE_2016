/**
 * Created by Ningersan on 2017/2/11.
 */
var validator = {
    lengthControl: function (target, data) {
        var text = target.value.trim();
        var minLength = data.minLength;
        var maxLength = data.maxLength;
        if (getLength(text) >= minLength && getLength(text) <= maxLength) {
            return true;
        } else {
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

    number: function (target) {
        var text = target.value;
        if (text.match(/^\d*$/)) {
            return true;
        } else {
            return false;
        }
    },

    email: function (target) {
        var text = target.value;
        if (text.match(/^[a-zA-Z0-9_\.\-]+@[^\.@]+\.[a-z]+$/)) {
            return true;
        } else {
            return false;
        }
    },

    tel: function (target) {
        var text = target.value;
        if (text.match(/^1\d{10}$/)) {
            return true;
        } else {
            return false;
        }
    },
}

