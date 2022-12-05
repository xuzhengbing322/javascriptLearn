// 数组的数据类型是object。它可以存储所有类型的数据，如字符串、数字、对象、数组
// 数组的调用方式：arrayName[index]。数组长度：array.Name.length
/* 数组的常用方法：
    1、arrayName.forEach((item)=>{})：遍历数组的每项数据，并且每项数据都执行函数。
        注意：函数只能操作数组的每项数组，但不会生成新数组。因此函数不能是具有返回值的函数。
        使用场景：遍历数组每项数据，并操作数据项中的属性。
    2、push()：增添元素到数组的末尾，并且不会生成新数组。若用变量接收arrayName.push()，得到的是新数组的长度。
    3、unshift()：添加元素到数组的头部，并且不会生成新数组。若用变量接收arrayName.unshift()，得到的是新数组的长度。
    3、pop()：删除数组末尾的元素，并不会生成新数组。若用变量接收arrayName.pop()，得到的是被删的末尾元素
    4、shift()：删除数组头部元素，并不会生成新数组。若用变量接收arrayName.shift()，得到的是被删的头部元素
    5、indexof()：找到元素的索引值。如果不存在，则返回 -1。indexOf为splice提供删除元素的位置。
    6、splice(params1,params2)：删除元素。params1是被删元素的索引位置，params2是删除几个元素。
    7、slice()：复制一个数组。
    8、map()：创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。不符合调用函数的元素，则直接原样
    返回新数组
        使用场景：若数组元素为对象，map可以很方便的修改对象的属性，并将新的元素组成数组。
        forEach和map的区别：forEach不生成新数组，map生成新数组。
    9、filter()方法创建一个新的数组，新数组中的元素是指定数组中附有条件的所有元素。
        使用场景：通常用于过滤数组中的某些元素，例如删除操作。
    10、find()方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。 
*/

let animal = ["dog", "cat", "panda"]

// forEach
animal.forEach((item) => {
    item.active = !item.active
})
console.log("forEach", animal)

// push
let newArrays = animal.push("monkey")
console.log("new array", animal)
console.log("new array length is:", newArrays);

//unshift
let newFirst = animal.unshift("tiger")
console.log("shift new array", animal)
console.log("new array length is:", newFirst)


// pop
let lastElement = animal.pop()
console.log("pop new array", animal)
console.log("the deleted element is: ", lastElement)

// shift
let first = animal.shift()
console.log("shift new array", animal)
console.log("the deleted element is:", first)

//indexof()
let pos = animal.indexOf("cat")
console.log("the index of element is:", pos)

// splice
let removedItem = animal.splice(1, 1)
console.log("shift new array", animal)
console.log("the deleted element is:", removedItem)

// slice()
let shallowCopy = animal.slice()
console.log("the copy array is:", shallowCopy)

// map
/*props.data.map(({ title }) => title)：
map()方法创建一个新数组，这个新数组由原数组中的每个元素都执行一次提供的函数后的返回值组成。
显然，我要的是props.data中的title数据，而不是整个{title+data}的数据。
因此用{title}来获取props.data元素对象中的title属性，作为函数体的参数。
我原本已经获取到了item={title+data}数据，然后通过{title}就能获取到item.title数据。可见{}有缩小对象范围值的作用。
*/ 
let photo = [{
        title: "华为",
        data: [{
                id: 1,
                phone_name: "Mate 40 Pro",
                disabled: false,
            },
            {
                id: 2,
                phone_name: "P40 Pro",
                disabled: true,
            },
        ]
    },
    {
        title: "小米",
        data: [{
                id: 1,
                phone_name: "Mate 40 Pro",
                disabled: false,
            },
            {
                id: 2,
                phone_name: "P40 Pro",
                disabled: true,
            },
        ]
    },
]

let photoTitle = photo.map(({
    title
}) => {
    return title
})
console.log("photo title is:", photoTitle)  //photo title is: [ '华为', '小米' ]

// filter
const numArray = [24,64,32,10]
let newNumArray = numArray.filter((item) => {
    if(item > 18){
        return item
    }
}) 
console.log("newNumArray:",newNumArray)  //newNumArray: [ 24, 64, 32 ]

//find

const numFindArray = [24,64,32,10]
let newNumFindArray = numArray.find((item) => {
    if(item > 18){
        return item
    }
}) 
console.log("newNumFindArray:",newNumFindArray)  //newNumFindArray: 24