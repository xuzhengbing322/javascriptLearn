// 1、变量的分类及存储原理
/*
    javascript的数据分为原始值（基本类型）和引用值（引用类型）。javascript是弱类型语言，它根据变量值
来推断变量的类型。因此，不同类型的变量可以相互赋值。typescript是强类型语言，变量的类型都由用户定义，
不同类型的变量不可以相互赋值。
    基本类型：number、string、boolean、undefined、null。
    引用类型：object、array、function、date、RegExp。
    内存分为栈内存和堆内存。如果变量是基本类型，则它存储在栈内存中。如果变量是引用类型，则使用堆内存来
存储变量的值，然后在栈内存中存储指向这个变量值的指针。
    从栈内存的角度讲，原始值不可以被更改，只会被创建和销毁，而且原始值的值会被永远保存，直到磁盘重置。
    栈内存的特点是先进后出，堆内存的特点是先进先出。
    思考：1、变量名就是栈内存的空间名称。声明变量或给变量赋值时，都是在栈内存中重新开辟空间，然后存储新的
值或指针。2、将对象等引用类型的数据赋给变量，相当于是把这个对象在堆内存中的地址交给变量存储，当需要使用
引用类型的值时，就通过变量的指针找到堆内存中的变量值。3、如果两个变量存储的指针相同，那么当指针指向的
在堆内存中的值发生改变时，两个变量所对应的值都变了。
    array用于存储多个同类数据，通过[]方法来调用数组数据。object用于存储对象的各种属性以及属性的值，
object通过.语法或['属性名']来调用数据。。
*/ 
//基本类型
let a = 3; //在栈内存中开辟一个空间，空间名称为a，空间存储的值为3。
let b = a; //在栈内存中再开辟一个空间，空间名称是b，复制一份空间a存储的值到空间b中。此后，a和b没有关系
a = 1;  //在栈内存中再开辟一个空间，空间名称是a，空间存储的值是1。由于空间名称不能重名，因此原来的空间a被销毁。但原空间a存储的值会被保存，不会被销毁。
//引用类型
let arr = [1, 2, 3, 4] //栈内存开辟一个空间，空间名称为arr，空间存储的是指针，这个指针指向[...]存放在堆内存的地址。
let arr2 = arr //栈内存再开辟一个空间，空间名称为arr2，空间存储着和arr相同的指针。
arr.push(5) //像arr存储的指针指向的堆内存中添加元素5。因为arr和arr2存储着相同的指针，因此arr2的值也变了。
arr = [1, 2] //栈内存再开辟一个空间，空间名称为arr，空间存储的指针指向堆内存中的[1, 2]

// 2、变量声明
/*
    变量的声明方式有var、let、const、import、class、function。
    let和const的特点：1、let和const为js新增了块级作用域。2、let和const不允许在同一作用域中声明重名变量。
3、let和const不存在变量提升。4、暂时性死区：在代码块中，let命令声明变量之前的区域都是“死区”，变量不可用。
变量只能在声明之后使用。5、const定义的变量必须初始化赋值，且变量值不可修改。let定义的变量可以修改。
    问题：为什么需要块级作用域：1、var是全局作用域，且存在变量提升。导致内部变量可能会覆盖外层变量。
2、用来计数的循环变量泄漏成为全局变量。3、有了块级作用域，外层作用域无法读取内层作用域的变量。
    const应用场景：不变的值，全局变量中声明变量。
    var和function声明的全局变量是顶层对象的属性，可以通过windox.attributeName调用。
let、const和class定义的全局变量不是顶层对象的属性。无法通过windox.attributeName调用。

    const实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址不得变动。
因此不能修改数组，但是可以修改数组中的数据
*/ 
const x = [{id: '001'}, 'jake', ['join']];
x[0].id = '002';
x[1] = 'tom'
x[2] = ['roes']
console.log(x)  //[ { id: '002' }, 'tom', [ 'roes' ] ]

// 3、typeof()判断参数的数据类型
//console.log(c) //报错：c is not defined
console.log(typeof(c))  // undefined      未定义的参数的类型是undefined。
console.log(typeof(typeof(c)))  //string    'undefined'的数据类型就是string
console.log(typeof(typeof(123)))  //string  'number'的数据类型就是string
console.log(typeof(null))  //object  这是历史遗留问题，以前null是空对象的指针，现在才是原始值
console.log(typeof([1]))  //object  array也是object数据类型
console.log(typeof(NaN))  //number   NaN的数据类型是number


// 4、显示类型转换
/*
    Number()将参数转换成number类型。转换规则：1、string类型的变量，若包含字母，则返回值为NaN。
2、string类型的变量，若不包含字母，则转化为去掉首尾0的number。3、null转化为0。undefined转化为NaN。
4、boolean类型的变量，若为true，则转化为1；若为false，则转化为0。
    parselnt(params1,params2)将参数转换成整型，原理和Number()相似。params1是待转换变量，
params2设置转换的进制，默认是十进制。
    parseInt只管将数字转换成整型，因此只有number和数字类型的string才能转换，其他的都是NaN。
    parseFloat()将参数转换成小数。
    isNaN()判断一个参数（字符串）是否不能转换为数值类型。如果不能转换为数字，返回true。
如果能转换为数字，返回false。
    变量.toString()将变量的值转化为字符串类型
    String()将变量的数据类型强制转换成字符串类型
*/ 
let d1 = 'null'
console.log(typeof(Number(d1)) + '-' + Number(d1))  // number-0
let d2 = 'undefined'
console.log(typeof(Number(d2)) + '-' + Number(d2))  // number-NaN
let d3 = true
console.log(typeof(parseInt(d3)) + '-' + parseInt(d3))  //number -NaN


// 5、隐式类型转换
/*
    运算等级：() > 乘除取余 > 加减 > 赋值
    为假的情况： false、undefined、 ''、 null、 NaN。  除此以外都是真  
    +  如果运算中有字符串，则将非字符串数据原原本本的转化为字符串数据，然后进行拼接。
    - *  / %  进行数据计算时，将能转化为数字的非number数据转化为number，然后再运算。如果运算中有
不能转化为数字的非number数据，则输出NaN。
    > < >= <=  进行比较时，有一个是字符串，另一个是数字，则将字符串转化为数字类型的数据，在进行比较。
但如果两个都是字符串，则将它们转化为ASCLL码在进行比较。
    NaN: not a number。NaN是数字类型，表示变量不是数字类型。
    Infinity： 正无穷 1/0
    -Infinity：负无穷
*/ 
console.log(1 + 3)  //4
console.log(1 + '1')  //11
console.log('2' + '1') //21
console.log(true + '1')  //true1

console.log('2' - 1)  //1
console.log('a' - 1)  //NaN
console.log(true - 1)  //0

console.log('2' > 1)  //true
console.log('a' > 'b')  //false

/*typeof(a)是字符串的undefined，为真。 
-true：-1。+undefined：NaN，因为undefined无法被转换成数字。NaN-1还是NaN，然后再加字符串，就是字符串类型的NaN，所以为真。
*/ 
if(typeof(a) && (-true) + (+undefined) + ''){
    console.log('通过了')  //通过了
}else{
    console.log('没通过')
}
console.log(+undefined)  //NaN

console.log(!!' ' + !!'' - !!false  || '未通过')  //1    ' '：空格字符串是真


// 6、== 和 ===
/*
    == != 只看值是否相等，不考虑类型是否相等。
    ===  !==既要看值是否相等，又要看类型是否相等。
    ==/===比较不会将string变为number类型，它直接比较''内的值。> <= >=会将string变为number再进行比较。
    NaN与包括自己在内的任何东西都不相等。
*/ 
console.log(1 == '1')  //true
console.log(1 === '1')  //false


// 7、错误提示
/*
    错误分为语法错误和通用错误。
    语法错误：SyntaxError，它的特点就是程序全部都不执行。
    通用错误：ReferenceError，它的特点是程序会执行错误之前的代码。
    多个<script>代码块的错误情况：代码块之间不会相互影响，正确的代码块会执行，有错误的代码块会报错。

*/

// 8、与&& 、 或|| 非!
/*
   假：false、undefined、 ''、 null、 NaN。  除此以外都是真  
   &&：遇到真就往后走，遇到假或走到最后就返回当前的值。
   ||：遇到假就往后走，遇到真或者走到最后就返回当前的值。
   &&和或||返回的是值，可以用做不同情况返回不同值。  在判断语句中才表示true/false
*/ 
let e1 = 1 && 2 && undefined && 10
let e2 = 0 ||null || 1 || 0
console.log(e1, e2)  //undefined 1

// 9、判断语句
/*
    if-else / if ：两者语句的选用。当条件具有互斥性时，就要选用if-else。
    它们的区别是：多个if是依次进行所有的判断。判断为true，就执行，判断为false就不执行。
if-else是只进行一次判断，然后寻求满足的条件，条件满足就执行。
    if/switch：适用场景的区别。if用于判断值范围，或者判断条件多个的情况。switch用于几个定制的情况下。

*/ 

// 10、逗号运算：返回最后一个数
let nums = (2 - 1, 6 + 5, 24 + 1)  //25
console.log(nums)

let fn = (
    function test20() {
     return 1;
    },

    function test21() {
        return '2'
    }
)()
console.log(typeof(fn)) // string