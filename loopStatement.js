/*
    for循环就是满足循环的判断条件，就执行函数体。
    for：循环次数，for of：循环数组，for in：循环非数组对象
 */

//循环次数
for (let i = 0; i < 5; i++) {
    //i初始值为0；i是否小写5；每次循环后i加1
    console.log(i); //  0  1  2  3  4
}

// 循环数组 for of
let numArray = [1,2,3,4,5,6]
let sum = 0;
for (let num of numArray) {
    sum = sum + num;
}
console.log(`sum is ${sum}`)

//map循环
let newArray =  numArray.map(item => {
    return item * 2
})
console.log(`newArray is ${newArray}`)

//forEach循环
let newArrayForEach = numArray.forEach(item => {
    console.log(`element is ${item * 2}`)
})


// 循环对象 for in
const man = {
    age:21,
    name:"张三",
    sex:"男"
  }


for(let index in man){ 
    console.log(index + ':' + man[index]);//  age:21 name:张三 sex:男
}

//for of：for...of循环可以遍历数组、Set和Map结构、某些类似数组的对象、对象、以及字符串。遍历对象需要通过用Object.keys()
for(let index of Object.keys(man)){ 
    console.log(index + ':' + man[index]);//  age:21 name:张三 sex:男
}
