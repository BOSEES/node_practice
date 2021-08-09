const fs = require("fs");

const readStream = fs.createReadStream("./text.txt", {
  // highWaterMark: 8, // 64 kbytes
  encoding:"utf-8",
});

readStream.on("data",chunk => {
  console.count(chunk);
})

readStream.on("error" , error => {
  console.log(error);
})