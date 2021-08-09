//메모리 덩어리

const fs = require("fs");
const buf = Buffer.from("Hi");
console.log(buf[0])
console.log(buf[1])
console.log(buf.toString());