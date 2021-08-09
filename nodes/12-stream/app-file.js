const fs = require("fs");

const beforeMem = process.memoryUsage().rss;

fs.readFile("./text.txt", (_,data) => {
  fs.writeFile("./text2.txt", data, () => {
    const afterMem = process.memoryUsage().rss;
    const diff = afterMem - beforeMem;
    const consumed = diff / 1024 / 1024;
    console.log(diff);
    console.log(`Consumed Memory ${consumed}MB`);
  })
})