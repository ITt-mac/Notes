Mock.js 的语法规范包括两部分：

1.数据模板定义规范（Data Template Definition，DTD）
2.数据占位符定义规范（Data Placeholder Definition，DPD）

第一种模板定义规范不讲，看一下就懂。

第二种占位符定义主要内容与规范如下：
名词解释：占位符 只是在属性值字符串中占个位置，并不出现在最终的属性值中。

占位符 的格式为：
@占位符
@占位符(参数 [, 参数])
注意：

用 @ 来标识其后的字符串是 占位符。
占位符 引用的是 Mock.Random 中的方法。
通过 Mock.Random.extend() 来扩展自定义占位符。
占位符 也可以引用 数据模板 中的属性。
占位符 会优先引用 数据模板 中的属性。
占位符 支持 相对路径 和 绝对路径。
Mock.mock({
    name: {
        first: '@FIRST',
        middle: '@FIRST',
        last: '@LAST',
        full: '@first @middle @last'
    }
})
// =>
{
    "name": {
        "first": "Charles",
        "middle": "Brenda",
        "last": "Lopez",
        "full": "Charles Brenda Lopez"
    }
}

Mock.Random
名词解释：Mock.Random 是一个工具类，用于生成各种随机数据。
具体详看：https://github.com/nuysoft/Mock/wiki/Mock.Random

文章内容来源于（https://github.com/nuysoft/Mock/wiki/Syntax-Specification）

