// 正则使用：字符串match()、replace()、search()和split()都使用了正则表达式实现功能。
/*创建正则表达式
1、RegExp构造函数的第一个参数是字符串（查询内容），第二个参数是查询模式
2、//，//内是查询内容，后面是查询模式
3、通过RegExp可以重构正则表达式的查询模式。
*/ 
const variate = 'Hello world!'
let regex = new RegExp('e','g')
console.log(regex.test(variate));  //true  使用regex正则判断e是否存在与variate中。

let reg = /e/g
console.log(reg.test(variate));  //true
let newReg = new RegExp(reg,'i') 
console.log(newReg.test(variate));  //true