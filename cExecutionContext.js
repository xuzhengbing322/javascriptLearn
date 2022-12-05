// 1、执行上下文
/*
    代码分为全局代码、函数代码和块代码。代码执行前都会进行预编译，并且创建各自的执行上下文。
执行上下文中包含三个属性：变量对象（GO/AO）、作用域链(scope chain)、this。
执行上下文按代码类型分为：1、全局执行上下文，程序预编译就创建一个全局执行上下文，它的变量对象是GO，即window。
2、函数执行上下文：在函数被定义的时候创建，执行函数时会生成变量对象AO。3、块执行上下文。
    变量对象用来存储执行上下文中定义的所有变量和函数声明。
*/

// 2、AO
// AO：函数调用时就会创建一个函数执行上下文，其中的活跃对象AO存储着函数的所有变量和函数声明
function test4(a4) {
    console.log('#', a4) //# [Function: a4]
    var a4 = 1;
    console.log(a4) // 1
    function a4() {}
    var b4 = function () {}
    console.log(b4) // [Function: b4]
    function c4() {}
}
test4(2)
//     this: window
//     AO = {
//         第一步： 寻找函数里面的形参和变量声明（变量声明的提升）(let定义的变量不提升)
//         a4: undefined
//         b4: undefined
//         第二步：把实参的值赋给形参
//         a4: undefined -> 2
//         b4: undefined
//         第三步：寻找函数，函数声明，赋值函数体
//         a4: undefined -> 2 -> function a4(){}
//         b4: undefined
//         c4:function c4(){}
//         第四步：执行函数(执行赋值语句、判断语句、return、函数调用)
//         a4:  undefined -> 2 -> function a4(){} -> 1
//         b4: function(){}
//         c4: function c4(){}
//     }

//GO：程序执行的时候会创建一个全局执行上下文，上下文中包含变量对象G0(window)。GO存储着所有的全局变量和全局函数声明
var a5 = 1

function a5() {
    console.log(2)
}
console.log('#', a5) //# 1

// 3、GO
// GO = {
//      1、找变量（let定义的变量不提升）
//          a5: undefined
//      2、找函数声明
//          a5: undefined -> function a5(){}
//      3、执行（赋值，函数执行）
//          a5: undefined -> function a5(){} -> 1 
//     }

// GO和AO
function test6() {
    let a6 = b6 = 1;
    console.log(b6)
}

test6() //1
/*
  1、创建GO
  GO = {
    test6: function test6 (){}
    b6: 1    //未声明就赋值的变量是全局变量。
  }
  2、GO执行代码时遇到函数执行语句test6()，于是创建AO
  AO = {
      a6: undefined -> 1
  }
*/

/*由此可见，变量var和函数声明会在预编译的时候提升，而函数表达式由于有赋值语句，所以无法提升。
但是，es6中使用let、const声明变量，let和const都不进行变量提升。也就是说，在预编译的过程中，let和const
定义的变量需要在执行的时候，才会被写入AO/GO。
    未声明就赋值的变量是全局变量。全局变量都存储在window全局对象中，window本身就是全局域。
全局环境中用let和const声明的变量是全局变量，但变量并不是存储在window全局对象中，因此无法通过window.来调用。
  用let声明变量后，let会变成
*/



//let会让if和for形成块作用域。因此外部无法访问b8。
let a8 = 1

function test8() {
    //console.log('&&&',b8) //b8 is not defined
    if (a8) {
        let b8 = 2;
        console.log('**', b8) //2
    }
    //console.log('&&&',b8)  //b8 is not defined
}
test8();


function test9() {
    a9 = 1;

    function a9() {}
    var a9 = 2;
    return a9;
}
console.log(test9()) //2

/*
    GO = {
        test9: function test9 (){}
    }
    AO = {
        a9: undefined -> function a9(){} -> 1 -> 2
    }
*/

function test10() {
    return a10;
    a10 = 1;

    function a10() {}
    var a10 = 2;
}
console.log(test10()) //[Function: a10]



a11 = 1;

function test11(e11) {
    function e11() {}
    arguments[0] = 2;
    console.log('#', e11) //2
    if (a11) {
        var b11 = 3
    }
    var c11
    a11 = 4;
    var a11;
    console.log(b11) // undefined
    f11 = 5;
    console.log(c11) //undefined
    console.log(a11) //4
}

var a11
test11(1)

/*
        GO = {
            a11: undefined -> function test11(){}
            f11: 5
        }
        AO = {
            e11: undefined -> function e11(){} -> 2 
            b11: undefined,
            c11: undefined,
            a11: undefined -> 4

        }
*/

// 4、作用域
/*
    函数是引用类型数据，它也有一些属性可供访问，如name、length、prototype。然而有些属性是隐式的，
不可访问，如[[scope]]：作用域。
    scope：函数被定义的时候，就会创建函数的作用域scope。作用域是存储作用域链的容器。作用域链里面存储的
就是从上到下链式排列的AO/GO。当函数执行完成以后，AO被销毁。如果再次执行函数，则重新生成一个新的AO。
也就是说，AO是一个即时的存储容器。

    当全局被执行的时候，首先生成GO，然后进行预编译。预编译的过程中如果发现被定义的函数，则会创建函数
的作用域。作用域中的作用域链和当前环境的作用域链相同。当函数被执行的时候，就会生成函数的AO。
    1、由于全局被执行时首先生成GO，因此每个函数的作用域链都有GO，且在最下方。
    2、函数被定义的时候只会创建函数的作用域和作用域链，函数被执行的前一刻才会在作用域链的最上方生成它的AO。
当函数执行完后，就会销毁它的AO。程序又会返回到函数被定义的状态（上层函数），然后继续执行上层函数。
当上层函数执行完毕后，销毁上层函数的AO，同时销毁函数的作用域。
    3、AO/GO是引用类型，类似于对象，它们的值存储在堆内存中。作用域链存储着的是指向堆内存中对应的AO/GO的
指针。因此每个函数的作用域链上都有指向GO的指针。
    4、当外层函数被执行的时候，内层函数被定义，被定义时创建出自己的作用域和作用域链。此时内层函数的作用域链
和外层函数执行时的作用域链一模一样。
    5、函数根据作用域链访问变量和函数，先查看自己的变量对象中是否有要找的变量和函数，如果没有再往下查AO/GO
中的变量对象是否有要找的变量和函数。外层函数的作用域链中没有内层函数的AO，所以外部函数无法访问内部函数的AO。
    6、全局函数保存在GO中，想调用的时候，随时都可以调用。
*/

function scopeOne() {
    function scopeTwo() {
        let m = 2;
    }
    let n = 1;
    scopeTwo();
}
let o = 3;
scopeOne();

/*
    执行全局         函数scopeOne    0-GO     scopeOne: function
                                            o: 3
    执行scopeOne    函数scopeOne    0-AO     scopeTwo: function
                                            n: 1
                                   1-GO     scopeOne: function
                                            o: 3
                    函数scopeTwo    0-AO     scopeTwo: function
                                            n: 1
                                    1-GO     scopeOne: function
                                            o: 3
    执行scopeTwo    函数scopeTwo     0-AO    m: 2
                                    1-AO    scopeTwo: function
                                            n: 1
                                    2-GO     scopeOne: function
                                            o: 3
  执行完scopeTwo     函数scopeOne    0-AO     scopeTwo: function
                                            n: 1
                                   1-GO     scopeOne: function
                                            o: 3
  执行完scopeOne     函数scopeOne    0-GO     scopeOne: function
                                            o: 3
  程序执行完

*/



// 5、闭包
/*
    当内部函数被返回到外部并保存时，一定会产生闭包。内部函数被返回前已经被定义了，所以内部函数的作用域链
和外部函数执行时的作用域链相同。当外部函数执行完后，由于外部函数的AO内部函数要引用，因此不会被销毁。
这就是闭包。过度的使用闭包可能会导致内存泄漏或加载过慢。
    简单来讲，AO只要还被引用，就不会被销毁。
    闭包的作用之一就是管理数据，它会把外部函数的AO中的变量变为私有变量，只能由内部函数访问。
*/
function test13() {
    function test14() {
        let b14 = 2;
        console.log(a14)
    }
    let a14 = 1;
    return test14
}
let c14 = 3;
let test15 = test13();
test15() //1



function test16() {
    let n = 100; //变量成为了私有变量，只能由add和reduce函数访问。
    function add() {
        n++;
        console.log(n);
    };

    function reduce() {
        n--;
        console.log(n)
    };
    return [add, reduce]
}
var arr = test16()
arr[0]() //101
arr[1]() //100



// 函数做闭包
function breadMgr(num) {
    let breadNum = arguments[0] || 10;

    function supply() {
        breadNum += 10;
        console.log(breadNum)
    }

    function sale() {
        breadNum--;
        console.log(breadNum);
    }

    return [supply, sale]
}

var breadMgr = breadMgr(50)

breadMgr[0]()
breadMgr[1]()
breadMgr[1]()

// 对象做闭包
function sunSched(thing) {
    let sunSched = '';
    let operation = {
        // 对象的方法 
        setSched: function (thing) {
            sunSched = thing;
            console.log(sunSched)
        },
        showSched: function () {
            console.log("my schedule on sunday is " + thing)
        }
    }

    return operation
}

let sunSched = sunSched('studying')
sunSched.setSched('eating');
sunSched.showSched()

// 构造函数形成闭包
function Compute() {
    let num = 0;

    this.add = function () {
        num++;
        console.log(num)
    }

    this.mixins = function () {
        num--;
        console.log(num);
    }

    //return this
}

let compute = new Compute()
compute.add()
compute.mixins()