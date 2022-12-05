// 字符串的方法
/*判断字符串是否在另一个字符串中
indexOf()：表示参数字符串是否包含在原字符串中。如果不在返回-1，如果在则返回参数字符串所在源字符串的位置
includes()：返回布尔值，表示是否找到了参数字符串
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部
*/ 
const stringVariate = 'Hello world!'
const stringVariateTwo = 'ello'
console.log(stringVariate.indexOf(stringVariateTwo));  //1 
console.log(stringVariate.includes(stringVariateTwo));  //true
console.log(stringVariate.startsWith('Hello'));  //true
console.log(stringVariate.endsWith('!'));  //true

// repeat()：返回一个新的字符串，表示将原字符串重复n次
console.log("hello".repeat(2));  //hellohello

// charAt()：返回字符串给定位置的字符。
console.log('hello'.charAt(0));  //h

/*padStart()：如果某个字符串不够指定长度，会在头部补全
padEnd()：如果某个字符串不够指定长度，会在尾部补全
*/ 
console.log('x'.padStart(5,'ab'));  //ababx
console.log('x'.padEnd(5,'ab'));  //xabab


// 模版字符串中的空格和换行都会被保留，模版字符串里面可以通过${}调用变量和函数，${}内如果是字符串，则原样输出
