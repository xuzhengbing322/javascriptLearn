//1、对象的特性
/*
    对象具有属性和方法。对象可以通过object.attribute和object['attributeName']
来调用对象的属性和方法。对象属性的增删改查是找先找到对象名所存储的对象在堆内存中的地址，然后
再去增删改查堆内存中的属性。  如果对象1 = 对象2，相当于是将对象2在栈内存中存储的指针给对象1
对象1以前的指针就没了。
    对象中的this指向自身。
*/

let teacher = {
    name: '张三',
    age: 32,
    sex: 'male',
    height: 176,
    weight: 130,
    // 函数在对象中叫方法
    teach: function () {
        console.log(`I am teaching JavaScript`)
    },
    // 对象中this代表它本身。
    eat: function () {
        this.weight++;
        console.log(`I am having a dinner`)
    }
}
// 增
teacher.address = '北京'
// 删
delete teacher.address
delete teacher.teach
// 改
teacher.name = '李四'
teacher['age'] = 18
// 查
console.log(teacher.name, teacher['age'])


// 2、构造函数的this
/*
    构造函数形式上是首字母大写，但本质上它和普通函数没有区别。当构造函数没有实例化，也没有执行，
仅仅是被定义时，构造函数中的this无用。当构造函数没有实例化，而是直接执行时，this指向window。
当构造函数实例化后，this指向实例对象。
    构造函数在new的时候，就相当于是普通函数被执行的时候，此时构造函数也会生成自己的AO。然后它会自动将
this指向{}，然后执行后面的this.xxx = xxx语句相当于是给this:{}添加属性和方法。因此，构造函数里面的
属性和方法必须this.xxx书写。最后构造函数执行完后，return this，将实例化对象交给变量。这个变量就保存着
实例对象的指针，就可以通过指针访问到堆内存中的相应对象的属性和方法。因此，new实例化出来的是对象，
this指向实例化对象。this在不同的实例里面，指向的对象并不相同。同一个构造函数实例化出来的对象相互独立。
    对象的参数一般写成对象形式，方便维护和书写。
    如果构造函数写有return number/string，则返回的依旧是实例化对象。如果写有return {}/[]/function(){}，
则返回的就是{}/[]/function(){}。因为它的都是引用值，return 原始值没用，return 引用值才有用。
*/
function Teacher(opt) {
    // let this = {}
    this.name = opt.name;
    this.sex = opt.sex;
    this.drive = function () {
        console.log(`i like drive`)
    }
    // return this
}
let teacherOne = new Teacher({
    name: '刘一',
    sex: '男'
})
let teacherTwo = new Teacher({
    name: '徐二',
    sex: '女'
})
teacherOne.name = '孙六';
console.log(teacherOne, teacherTwo)

// 3、包装类
/*
   原始值没有自己的方法和属性，也就不可能有a.xxx。但可以通过new Number()/String()/Boolean()将原始值
转化为数字对象/字符串对象/布尔值对象。这样就能够给它赋属性和方法。
   当数字对象参与运算后，又会变成原始值。
   undefined和null不可以设置属性和方法，也无法转化为对象。
*/
let m = 1; //原始值
console.log(m)  //1
let n = new Number(m); //数字对象
n.len = 1
console.log(n) //[Number: 1] { len: 1 }      数字对象，实例化对象后的数字
//数字对象参与运算后，又会返回到原始值。
let s = n + 1;
console.log(s)  //2

/*当编译时，发现给原始值添加属性和方法时。系统会发现不对，但为了迎合程序员，系统会根据原始值的数据类型
默认的转化为相应的对象，即new Number(123)。虽然系统创建了对象并赋值，但它无法自动创建变量来保存这个对象。
所以系统就把这个对象（？对象的属性）给删除了。因此访问f.len就是undefined
*/ 
let f = 123;
// new Number(123).len = 3
f.len = 3
console.log(f)
console.log(f.len) //undefined


let g = 'abc'
// new String(g).length   length是字符串对象的固有属性
console.log(g.length) //3

let name = '张三'
name += 10;
let type = typeof (name);
// let type = new String(typeof(name))
if (type.length === 6) { //true
    type.text = 'string';
    // new String(type.text = 'string')   delete
}
console.log(type.text) //undefined

//数组的截断
let arr = [1, 2, 3, 4, 5]
arr.length = 3 //[1,2,3]
arr.length = 6 //[1,2,3, <3 empty items> ]
console.log(arr)


// 案例一：构造函数的封装和耦合
function Compute() {
    let res = 0;
    this.plus = function () {
        loop(arguments, 'add', res)
    }
    this.times = function () {
        res = 1;
        loop(arguments, 'mul', res)
    }

    function loop(args, method, res) {
        for (let i = 0; i < args.length; i++) {
            let item = args[i];
            if (method === 'add') {
                res += item
            } else if (method === 'mul') {
                res *= item
            }
        }
        console.log(res)
    }
}

let compute = new Compute();
compute.plus(2, 4, 6);   //12
compute.times(3, 5, 7);   //105


// 案例二：构造函数中调用构造函数
function Car(opt) {
    this.brand = opt.brand;
    this.color = opt.color;
    this.displacement = opt.displacement
}

function Person(opt) {
    this.name = opt.name;
    this.age = opt.age;
    this.income = opt.income;
    this.selectCar = function () {
        // Person的GO中有Car，所以它可以实例化Car。
        let myCar = new Car(opt.carOpt)
        console.log(`${this.name}挑选了一辆排量为${myCar.displacement}的${myCar.color}${myCar.brand}`)
    }
}

let jone = new Person({
    name: '约翰',
    age: 39,
    income: '20k',
    carOpt: {
        brand: '马自达',
        color: '红色',
        displacement: '2.0'
    }
})

jone.selectCar();  //约翰挑选了一辆排量为2.0的红色马自达

/* 对象可以用点语法来调用属性，也可以用[]来调用属性，只不过[]要以字符串的形式写属性名。
当属性名中有数字时，就需要用[]来拼接调用。
*/
let myLang = {
    No1: 'HTML',
    No2: 'CSS',
    No3: 'Javascript',
    myStudyingLang: function(num){
        console.log(this['No' + num])
    }
}

myLang.myStudyingLang(1)