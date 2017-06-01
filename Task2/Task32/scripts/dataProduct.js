/**
 * Created by Ningersan on 2017/2/11.
 */

function FormProduct() {
    this.formId = 0;
    this.name = $("#name");
    this.type = $(".type");
    this.rule = $(".rule");
    this.submitBtn = $(".btn-sub");
    this.resultForm = $(".result-form");
    this.necessary = $(".necessary");
    this.tagArea = $("#tag-area");
}

FormProduct.prototype = {
    getData: function () {
        var data = {
            id: "",
            label: "",
            type: "",
            rule: "",
            options: [],
            necessary: true,
            minLength: "",
            maxLength: "",
            remainder: "",
            successRemainder: "",
            failRemainder: [],

            //表单验证规则
            validator: function () {
            }
        };

        data = this.getBaseData(data);

        switch (data.type) {
            case "input":
                switch (data.rule) {
                    case "text":
                    case "password":
                        data = this.getLengthRelativeData(data);
                        break;
                    case "number":
                    case "email":
                    case "tel":
                        data = this.getContactRelativeData(data);
                        break;
                }
                break;
            case "radio":
            case "checkbox":
            case "pulldown":
                data = this.getOptionRelativeData(data);
                break;
            case "textarea":
                data = this.getLengthRelativeData(data);
                break;
        }
        return data;
    },

    getBaseData: function (data) {
        data.id = "form" + this.formId++;
        data.label = this.name.value;
        data.type = getInputType(this.type);
        data.rule = getInputType(this.rule);
        data.necessary = getInputType(this.necessary) === "necessary" ? true : false;
        data.failRemainder = [data.label + "不能为空"];

        // 单选，多选，下拉栏获取选项
        if (data.type !== "input" && data.type !== "textarea") {
            data.options = this.getOptions();
        }

        return data;
    },

    //获取单选框，多选框，下拉菜单的选项信息
    getOptions: function () {
        var options = null;
        var tags = this.tagArea.childNodes;
        var tagsLen = tags.length;

        if (tagsLen === 0) {
            alert("请输入选项");
            return;
        } else if (tagsLen === 1) {
            alert("请再次输入一个选项");
            return;
        }

        options = Array.prototype.map.call(tags, function(tag) {
            return tag.innerHTML;
        });

        return options;
    },

    getLengthRelativeData: function (data) {
        data.minLength = $("#min-length").value;
        data.maxLength = $("#max-length").value;
        data.remainder = (data.necessary ? "必填" : "选填") + "，长度为" + data.minLength + "-" + data.maxLength + "个字符";
        data.successRemainder = data.label + "格式正确";
        data.failRemainder.push(data.label + "长度不能小于" + data.minLength +"个字符，" + "长度不能大于" + data.maxLength +"个字符！");
        data.validator = validator.lengthControl;

        return data;
    },

    getContactRelativeData: function (data) {
        data.remainder = (data.necessary ? "必填" : "选填") + "，请输入您的" + data.label;
        data.successRemainder = data.label + "格式正确!";
        data.failRemainder.push(data.label + "格式不正确，请检查！");
        data.validator = validator[data.rule];

        return data;
    },

    getOptionRelativeData: function (data) {
        data.remainder = (data.necessary ? "必填" : "选填") + "，请选择您的" + data.label;
        data.successRemainder = data.label + "已选择！";
        data.failRemainder.push(data.label + "未选择！");
        data.validator = validator[data.type];

        return data;
    },

    addForm : function (data) {
        switch (data.type) {
            case "input":
                this.addInputForm(data);
                break;
            case "radio":
                this.addRadioForm(data);
                break;
            case "checkbox":
                this.addCheckboxForm(data);
                break;
            case "pulldown":
                this.addPulldownForm(data);
                break;
            case "textarea":
                this.addTextareaForm(data);
                break;
        }

        return data;
    },

    addInputForm: function (data) {
        var box = document.createElement("div");
        box.innerHTML = "<label>" + data.label + "</label><input id="  + data.id + " type='" + data.rule + "'><span class='hidden'>"+ data.remainder +"</span>";
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addRadioForm: function (data) {
        var text = "";
        var box = document.createElement("div");

        box.className = "radio-form";

        text = "<div id=" + data.id + "><label>" + data.label + "</label>";
        data.options.forEach(function(option, index) {
            var id = data.id + "" + index;
            text += "<input id=" + id + " type='radio' name='option'><label>" + option + "</label>";
        });
        text += "</div><span class='hidden'>" + data.remainder + "</span>";

        box.innerHTML = text;
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addCheckboxForm: function (data) {
        var text = "";
        var box = document.createElement("div");

        box.className = "checkbox-form";

        text = "<div id=" + data.id + "><label>" + data.label + "</label>";
        data.options.forEach(function(option, index) {
            var id = data.id + "" + index;
            text += "<input id=" + data.id + " type='checkbox' name='option'><label>" + option + "</label>";
        });
        text += "</div><span class='hidden'>"+ data.remainder +"</span>";

        box.innerHTML = text;
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addPulldownForm: function (data) {
        var text = "";
        var box = document.createElement("div");

        text = "<label>" + data.label + "</label><select id=" + data.id + ">";
        data.options.forEach(function(option) {
            text += "<option>" + option + "</option>";
        });
        text += "</select><span class='hidden'>" + data.remainder +"</span>";

        box.innerHTML = text;
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addTextareaForm: function (data) {
        var box = document.createElement("div");
        box.innerHTML = "<label>" + data.label + "</label><textarea id=" + data.id + "></textarea><span class='hidden'>"+ data.remainder +"</span>"
        this.resultForm.insertBefore(box, this.submitBtn);
    }
};

var form = new FormProduct();
