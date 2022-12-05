/*1. Object.prototype.toString.call()
toString()用于返回数据的字符串内容，限非Object对象情况。
toSting()也可以用于判断所有数据的类型，限Object对象情况。此时需要使用call或者apply方法来改变toString方法的执行上下文。
*/ 
const array = ['arrayContent']
const callback = ()=>{
    return 1
}
console.log(array.toString());  //arrayContent
console.log(Object.prototype.toString.call(callback)); //[object Function]


// 2、instanceof 用于判断实例对象是否属于构造函数。
function Animal() { }
function Person() { }

Person.prototype = new Animal()  //原型链继承
var people = new Person()

console.log(people instanceof Person)  //true
console.log(people instanceof Animal)  //true

/*判断实例对象是否属于构造函数，本质上就是判断实例对象的原型链是否能指向构造函数的原型对象。
*/
function instanceofFun(instanceObject, constructor) {
    // 获取构造函数的原型对象
    let isPrototype = constructor.prototype;
    // 获取实例对象的原型
    let isProto = instanceObject.__proto__;
    // 无限循环，判断原型链上的每个原型，直至得到结果
    while (true) {
        // 实例对象的原型指向null，则证明构造函数的原型对象不在实例对象的原型链上，则这个实例对象并不是来源于这个构造函数
        if (isProto === null) {
            return false
            // 构造函数的原型对象在实例对象的原型链上，证明这个实例对象的确是源于这个构造函数。
        } else if (isProto === isPrototype) {
            return true
        }
        // 准备判断下一个原型，直至isProto=null
        isProto = isProto.__proto__
    }
}

console.log(instanceofFun(people, Person))  //true
console.log(instanceofFun(people, Animal)) //true

// Object.isPrototypeOf()和instanceof作用相同。
console.log(Animal.prototype.isPrototypeOf(people)) //true
console.log(Person.prototype.isPrototypeOf(people))  //true





