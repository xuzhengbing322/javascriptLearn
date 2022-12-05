/*
    判断语句分为：if-else语句、switch-case语句、三目运算。
    1、switch语句根据表达式的结果，执行对应的case语句。如果没有case与之匹配，就执行default语句。
无论是case还是default都必须要有break终止程序，不然程序回继续往下执行。switch表达式一般是整数、字符串和布尔值。
    switch适用场景：判断条件是几个比较固定的情况。优势是简单明了
    2、if-else语句根据表达式的结果，执行相应的语句。
    if-else使用场景：主要用于判断区间的情况，或者很多个点的情况。
    3、三目运算的判断条件只能是布尔值。如果是true就执行?后面的代码，如果是false就执行:后面的代码。
    三目运算的使用场景：主要用于设置动态样式

    注意；===和!==是很常用的判断true/false的方法。
*/

let direction = 'right'

switch (direction) {
    case 'left' :
        console.log(`the direction is left`);
        break;
    case 'right' :
        console.log(`the direction is right`);
        break;
    case 'front' :
        console.log(`the direction is front`);
    default :
        console.log(`the direction is behind`);
}

let num = 60

if (num > 30) {
    console.log(`${num} greater than 30`)
}else if (num === 30) {
    console.log(`${num} equal to 30`);
}else {
    console.log(`${num} less than 30`);
}

let booleanValue = true
let variate = booleanValue ? 'true' : 'false'
console.log(`variate is ${variate} `)
