/**
 * Created by Ningersan on 2017/2/11.
 */
function dataProduct() {
    this.id = 0;
}

dataProduct.prototype = {
    name: $("#name"),
    type: $(".type"),
    rule: $(".rule"),
    submitBtn: $(".btn-sub"),
    resultForm: $(".result-form"),

    getData: function () {
        var data = {
            id: "",
            label: "",
            type: "",
            inputType: "",
            items: [],
            necessary: true,
            minLength: "",
            maxLength: "",
            remainder: "",
            successRemainder: "",
            failRemainder: "",
            validator: function (str, data) {     //表单验证规则
            }
        }
        data = this.getBaseData(data);
        switch (data.type) {
            case "input":
                switch (data.inputType) {
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
        data.id = "form" + this.id++;
        data.label = this.name.value;
        data.type = getType(this.type);
        data.inputType = getType(this.rule);
        if (data.type != "input" && data.type != "textarea") data.items = getOptions();
        return data;
    },

    getLengthRelativeData: function (data) {
        data.minLength = $("#min-length").value;
        data.maxLength = $("#max-length").value;
        data.remainder = (data.necessary? "必填": "选填") + "，长度为" + data.minLength + "-" + data.maxLength + "个字符";
        data.successRemainder = data.label + "格式正确";
        data.failRemainder = data.label + "长度不能小于" + data.minLength +"个字符，" + "长度不能大于" + data.maxLength +"个字符！"
        data.validator = validator.lengthControl;
        return data;
    },

    getContactRelativeData: function (data) {
        data.remainder = (data.necessary? "必填": "选填") + "，请输入您的" + data.label;
        data.successRemainder = data.label + "格式正确!";;
        data.failRemainder = data.label + "格式不正确，请检查！";
        data.validator = validator[data.inputType];
        return data;
    },

    getOptionRelativeData: function (data) {
        data.remainder = (data.necessary? "必填": "选填") + "，请选择您的" + data.label;
        data.successRemainder = data.label + "单选框已选择";
        data.failRemainder = data.label + "未选择！";
        data.validator = validator;
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
        box.innerHTML = "<label>" + data.label + "</label><input id="+ data.id +" type='" + data.inputType + "'><span class='hidden'>"+ data.remainder +"</span>";
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addRadioForm: function (data) {
        var text = "";
        var box = document.createElement("div");
        text = "<label>" + data.label + "</label>";
        for (var i = 0; i < data.items.length; i++) {
            text += "<input id=" + data.id + " type='radio' name='option'><label>" + data.items[i] + "</label>";
        }
        text += "<span class='hidden'>"+ data.remainder +"</span>";
        box.innerHTML = text;
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addCheckboxForm: function (data) {
        var text = ""
        var box = document.createElement("div");
        text = "<label>" + data.label + "</label>";
        for (var i = 0; i < data.items.length; i++) {
            text += "<input id=" + data.id +" type='checkbox' name='option'><label>" + data.items[i] + "</label>";
        }
        text += "<span class='hidden'>"+ data.remainder +"</span>";
        box.innerHTML = text;
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addPulldownForm: function (data) {
        var text = "";
        var box = document.createElement("div");
        text = "<label>" + data.label + "</label><select id=" + data.id + ">";
        for (var i = 0; i < data.items.length; i++) {
            text += "<option>" + data.items[i] + "</option>";
        }
        text += "</select><span class='hidden'>"+ data.remainder +"</span>";
        box.innerHTML = text;
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addTextareaForm: function (data) {
        var box = document.createElement("div");
        box.innerHTML = "<label>" + data.label + "</label><textarea id=" + data.id + "></textarea><span class='hidden'>"+ data.remainder +"</span>"
        this.resultForm.insertBefore(box, this.submitBtn);
    }
}

var test = new dataProduct();