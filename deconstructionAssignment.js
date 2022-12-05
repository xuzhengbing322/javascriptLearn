/*  解构赋值的本质是模式匹配。只要等号两边的模式相同，左边的变量就会被赋值对应的值。
    对象的解构和数组的不同之处在于，数组的元素是按次序排列的，变量的取值是由它的位置决定的；
而对象的属性没有次序，变量必须在属性同名才能取到正确的值。
*/ 
let [foo, [[bar],baz]] = [1,[[2],3]]
let {fooobj, barobj} = {fooobj: 'aaa', barobj:'bbb'}
console.log(`foo is ${foo},bar is ${bar},baz is ${baz}`); //foo is 1,bar is 2,baz is 3
console.log(`fooobj is ${fooobj},barobj is ${barobj}`);  //fooobj is aaa,barobj is bbb

// 解构可以是不完全解构，即等号左边的模式只匹配一部分的等号右边的数组
let [x, y] = [1, 2, 3]
let [q, p] = [1]
console.log(`x is ${x}, y is ${y}`)  //x is 1, y is 2
console.log(`q is ${q}, p is ${p}`)  //q is 1, p is undefined

// 解构赋值允许指定默认值
let [w ,v='b'] = ['a']
console.log(`w is ${w}, v is ${v}`)  //w is a, v is b

//对象的解构赋值的内部机制是先找到同名属性，然后在赋值给对应的变量。真正被赋值的是变量，而不是属性。对象中，如果属性名和变量名不一致。
let {obj:objVariate} = {obj:'aaa',bas:'bbb'}
console.log(`objVariate is ${objVariate}`) //obj is not defined  objVariate is aaa

/*  字符串也可以解构，此时字符串被转换成一个类似于数组的对象。
    解构时，如果等号右边是数值和布尔值，则会先转为对象。
    函数的参数也可以解构赋值
*/ 
let array =  [[1,2],[3,4]].map(([a,b]) => a + b)
console.log(array)  //[ 3, 7 ]