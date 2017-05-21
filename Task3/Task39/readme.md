# 表格插件

## 可配置选项

- 表格数据
- 插入位置
- 数据合计
- 排序开关
- 冻结开关
- 表头背景色

# #调用方法

```javascript
var table = new Table({
  append: $('#container'),
  tableHead: ['姓名'，'语文', '数学', '英语'],
  tableBody: {
    '小红': [95, 90, 99],
    '小蓝': [85, 89, 80],
    '小绿': [90, 90, 95]
  },
  isTotal: true, //default
  isSortable: true, // default
  isFrozen: true // default
})
```
